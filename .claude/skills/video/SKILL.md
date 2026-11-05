---
name: video
description: Kompletter Workflow für Samuels Kettlebell Short Form Videos (Reels, TikTok, Shorts) von Referenz über Skript, Rohschnitt und Feinausarbeitung bis Final. Nutzen, sobald Samuel ein Video schneiden, ein Skript schreiben, Referenzen analysieren oder eine Rohdatei bearbeiten will, auch wenn er nur "neues Video" oder "/video" sagt.
---

# Video Workflow (Kettlebell Short Form)

Arbeitsordner: `tools/video/`. Dieser Skill ist der Fahrplan; das Wissen liegt in den Dateien.

## Schritt 0: Start (immer, vor allem anderen)

1. Lesen: `tools/video/CLAUDE.md`, komplette `tools/video/lernen.md`, alle Dateien in `tools/video/skills/`, alle Dateien in `tools/video/referenzen/`.
2. Werkzeuge prüfen: `ffmpeg -version`, `python3 -c "import faster_whisper"`. Fehlt etwas: `pip3 install -q --break-system-packages faster-whisper yt-dlp`.
3. In 3 bis 5 Stichpunkten bestätigen, welche Learnings und Regeln für dieses Video gelten.
4. Fragen, wo wir einsteigen: neues Video ab Schritt 1, oder laufendes Video (dann `videos/<ordner>/briefing.md` lesen und dort weitermachen).
5. Neues Video: `videos/_vorlage` nach `videos/<JJJJ-MM-TT>_<titel>/` kopieren.

## Feste Rahmenbedingungen (gelten, solange nichts anderes in lernen.md steht)

* Thema: immer Kettlebell (Technik, Übungen, Fehler, Workouts, Mindset). Absender: Samuel Coeln, Coach.
* Format: 9:16, 1080x1920, 30 fps, 15 bis 60 s. Plattformen: Instagram Reels, TikTok, YouTube Shorts.
* Ziel jedes Videos: Mehrwert in Sekunden, dann Call to Action auf E-Book oder Coaching (Website).
* Ablage: Rohmaterial und Referenzvideos in Google Drive. Vorschauen und Finals zurück nach Drive. Nur Text, Schnittlisten, `.srt` und kleine Standbilder in Git.

## Die Etappen

Nach JEDER Etappe: Ergebnis zeigen, `briefing.md` Stand aktualisieren, auf Freigabe warten. Jedes Feedback sofort in `lernen.md`. Gilt es für alle Videos, nachfragen und nach Bestätigung in den passenden Skill übernehmen.

### 1. Referenzen
* Referenzvideos aus dem Drive Referenzordner holen (oder YouTube Link, falls Download möglich).
* Pro Referenz analysieren: Hook (erste 3 s, als Standbilder), Schnitttempo (`ffmpeg ... -vf "scdet=threshold=10"`, Schnitte pro Sekunde), Untertitel (Schrift, Größe, Position, Wort Hervorhebung), Farben und Licht (3 Standbilder), Ton und Musik, CTA.
* Ergebnis als `referenzen/<name>.md` nach Vorlage. Samuel ergänzt, was ihm gefällt.
* Bekannte Referenzen nicht neu analysieren, nur die relevanten auswählen.

### 2. Ziel und Skript
* Kernaussage in einem Satz, Zielgruppe, Länge, CTA.
* Skript in `briefing.md`: Hook (max. 2 s gesprochen oder als Text), 2 bis 4 Kernpunkte, CTA. Kurze Sätze, gesprochene Sprache.
* Optional Shotlist, falls noch gedreht wird: Einstellung, Perspektive, Dauer.
* Freigabe abwarten.

### 3. Material
* Rohdatei aus Drive nach `material/` laden (nicht in Git).
* `ffprobe`: Auflösung, fps, Dauer, Ausrichtung, Audio.
* Kontaktbogen (ein Standbild alle 2 s) zeigen.
* Transkribieren: `python3 tools/video/scripts/transkribieren.py material/<datei>` (siehe `skills/untertitel.md`).
* Bewertung: brauchbare Takes, Versprecher, Bildprobleme.

### 4. Rohschnitt
* Schnittliste aus Transkript und Wort Zeitstempeln (siehe `skills/schnitt.md`): beste Takes, Pausen und Versprecher raus, Reihenfolge nach Skript.
* Erst Schnittliste als Tabelle zeigen, dann 720p Vorschau ohne Gestaltung rendern.
* Freigabe abwarten.

### 5. Feinausarbeitung
Immer zuerst Standbilder, dann max. 10 s Probe, erst danach auf das ganze Video anwenden.
* Typografie und Untertitel: Stil laut `skills/untertitel.md`, Probe als Standbild.
* Schnittfarbe und Look: laut `skills/bildsprache.md`, vorher/nachher an 3 Standbildern.
* Dynamik: Zooms, Jump Cuts, Text Overlays, B Roll laut `skills/schnitt.md`.
* Ton: Lautheit auf ca. -14 LUFS, Musik leise unter Sprache, falls gewünscht.

### 6. Vorschau
* Komplettes Video 720p, schnelles Preset, nach Drive. Feedback Runde.

### 7. Final
* Nur nach ausdrücklichem Go: 1080x1920, H.264, hohe Qualität, nach Drive `export/`.
* Abschluss: Learnings dieses Videos in `lernen.md` zusammenfassen, Status in `briefing.md` auf fertig, Commit und Push.
