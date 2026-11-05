"""Transkribiert ein Video/Audio lokal mit faster-whisper.

Aufruf: python3 transkribieren.py <eingabe> [--modell small] [--sprache de]
Ausgabe neben der Eingabe: <name>.srt (Untertitel) und <name>.woerter.json (Zeitstempel pro Wort)
"""
import argparse, json, subprocess, sys
from pathlib import Path
import numpy as np
from faster_whisper import WhisperModel


def audio_laden(pfad):
    # ffmpeg dekodiert direkt zu 16 kHz mono float32, unabhängig von PyAV
    roh = subprocess.run(
        ["ffmpeg", "-nostdin", "-loglevel", "error", "-i", str(pfad),
         "-f", "f32le", "-ac", "1", "-ar", "16000", "-"],
        capture_output=True, check=True).stdout
    return np.frombuffer(roh, np.float32)


def zeit(s):
    ms = int(round(s * 1000))
    return f"{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}"


def main():
    p = argparse.ArgumentParser()
    p.add_argument("eingabe")
    p.add_argument("--modell", default="small")
    p.add_argument("--sprache", default="de")
    a = p.parse_args()
    ein = Path(a.eingabe)
    modell = WhisperModel(a.modell, device="cpu", compute_type="int8")
    segmente, info = modell.transcribe(audio_laden(ein), language=a.sprache,
                                       word_timestamps=True, vad_filter=True)
    srt, woerter = [], []
    for i, s in enumerate(segmente, 1):
        srt.append(f"{i}\n{zeit(s.start)} --> {zeit(s.end)}\n{s.text.strip()}\n")
        woerter += [{"wort": w.word.strip(), "start": round(w.start, 3),
                     "ende": round(w.end, 3), "p": round(w.probability, 2)} for w in s.words or []]
    ein.with_suffix(".srt").write_text("\n".join(srt), encoding="utf-8")
    ein.with_suffix(".woerter.json").write_text(json.dumps(woerter, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(srt)} Segmente, {len(woerter)} Wörter, Dauer {info.duration:.1f} s")


if __name__ == "__main__":
    sys.exit(main())
