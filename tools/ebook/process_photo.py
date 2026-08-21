#!/usr/bin/env python3
"""Foto-Aufbereitung fürs E-Book.
Stellt die Person frei (rembg/u2net) und setzt sie auf einen einheitlichen
Marken-Hintergrund, damit alle Fotos denselben Vibe haben – egal, wo sie
aufgenommen wurden. Optional weicher Schlagschatten + Zuschnitt.

Aufruf:
  python3 tools/ebook/process_photo.py INPUT OUTPUT [--bg light|dark|panel] [--shadow]
"""
import sys, argparse
from PIL import Image, ImageFilter
import numpy as np
from rembg import remove, new_session

BG = {
    "light": (255, 255, 255),
    "panel": (238, 241, 246),   # --panel #EEF1F6
    "dark":  (11, 11, 15),      # --schwarz #0B0B0F
}

def autocrop(rgba, pad_frac=0.06):
    a = np.array(rgba)[:, :, 3]
    ys, xs = np.where(a > 12)
    if len(xs) == 0:
        return rgba
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    w, h = rgba.size
    px, py = int((x1 - x0) * pad_frac), int((y1 - y0) * pad_frac)
    return rgba.crop((max(0, x0 - px), max(0, y0 - py),
                      min(w, x1 + px), min(h, y1 + py)))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("inp"); ap.add_argument("out")
    ap.add_argument("--bg", default="panel", choices=list(BG))
    ap.add_argument("--shadow", action="store_true")
    ap.add_argument("--width", type=int, default=1400)
    a = ap.parse_args()

    src = Image.open(a.inp).convert("RGB")
    sess = new_session("u2net")
    cut = remove(src, session=sess)          # RGBA freigestellt
    cut = autocrop(cut)

    # auf Zielbreite skalieren
    scale = a.width / cut.width
    cut = cut.resize((a.width, int(cut.height * scale)), Image.LANCZOS)

    margin = int(a.width * 0.08)
    canvas = Image.new("RGB", (cut.width + 2 * margin, cut.height + 2 * margin), BG[a.bg])

    if a.shadow:
        alpha = cut.split()[3]
        sh = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        sha = Image.new("L", canvas.size, 0)
        sha.paste(alpha, (margin + int(a.width*0.015), margin + int(a.width*0.02)))
        sha = sha.filter(ImageFilter.GaussianBlur(a.width * 0.02))
        shcol = Image.new("RGBA", canvas.size, (0, 0, 0, 90))
        sh = Image.composite(shcol, sh, sha)
        canvas = Image.alpha_composite(canvas.convert("RGBA"), sh).convert("RGB")

    canvas.paste(cut, (margin, margin), cut)
    canvas.save(a.out, quality=92)
    print(f"OK -> {a.out}  ({canvas.width}x{canvas.height}, bg={a.bg}, shadow={a.shadow})")

if __name__ == "__main__":
    main()
