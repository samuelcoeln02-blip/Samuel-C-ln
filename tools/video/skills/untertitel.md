# Skill: Untertitel

Status: Grundgerüst, wird durch Learnings geschärft.

## Ablauf

1. Transkribieren: `python3 tools/video/scripts/transkribieren.py material/clip.mp4`
   Ergebnis: `clip.srt` und `clip.woerter.json` (Zeitstempel pro Wort, Grundlage für Schnitt und Wort Hervorhebung)
   Modell `small` als Standard; bei vielen Fehlern `--modell medium` (langsamer, genauer)
2. Unsichere Wörter (`p` unter 0.6) gezielt prüfen
3. Transkript korrigieren lassen (Fachbegriffe, Namen) und Korrekturen hier unter Glossar sammeln
4. Stil festlegen und als Standbild probieren, erst dann einbrennen

## Standard Stil (vorläufig)

* Schrift: Inter, fett
* Max. Zeichen pro Zeile: offen
* Position: offen
* Hervorhebung: offen

## Glossar (korrekte Schreibweisen)

* Kettlebell
