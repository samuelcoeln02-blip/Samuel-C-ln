# E-Book-Build „Kettlebell Mastery"

Erzeugt das E-Book-PDF aus designtem HTML/CSS über Chromium (kein Standard-
Report-Look): full-bleed Cover, klickbares Inhaltsverzeichnis mit echten
Seitenzahlen und Seitenzahlen in der Fußzeile.

## Aufbau
- `content.js` – die Kapitel-Texte (Teil 1) als HTML-Fragmente + `TOC`-Liste.
  **Hier wird der Inhalt gepflegt.** Bild-Platzhalter über `bild(caption)`,
  „Häufiger Fehler"-Boxen über `fehler(text)`, blaue Hinweise über `hinweis()`.
- `build.js` – Design (CSS), Cover, Body, Render-Pipeline. Bindet Inter-Fonts
  aus `assets/fonts` ein und die SVG aus `assets/images`.
- `pagemap.py` – findet per Textsuche die Seiten der Kapitel (für das TOC).
- `merge.py` – setzt das Cover vor den Body (Links bleiben erhalten).

## Voraussetzungen
- Node mit `playwright` installiert
- ein Chromium unter `/opt/pw-browsers/chromium-*` (wird automatisch gefunden)
- `python3` mit `pymupdf`

## Bauen
```
node tools/ebook/build.js
```
Ergebnis: `assets/downloads/kettlebell-mastery-teil1-vorschau.pdf`

Zwei-Pass-Logik: erst rendern, dann mit `pagemap.py` die Kapitelseiten
ermitteln, dann mit den echten Seitenzahlen im TOC neu rendern und mit dem
Cover mergen.

## Echte Fotos einsetzen
Die `bild(...)`-Platzhalter durch `<figure><img src="...">…</figure>` ersetzen,
sobald die Fotos vorliegen (nach `assets/images/ebook/` legen).

## Fotos auf einheitlichen Vibe bringen (`process_photo.py`)
Stellt die Person frei (rembg/u2net) und setzt sie auf einen einheitlichen
Marken-Hintergrund – so passen Fotos aus unterschiedlichen Umgebungen zusammen.
```
pip install pillow numpy rembg onnxruntime
python3 tools/ebook/process_photo.py INPUT OUTPUT --bg panel --shadow
```
`--bg light|panel|dark`. Beim ersten Lauf lädt rembg einmalig das Modell
(~176 MB) nach `~/.rembg`.
