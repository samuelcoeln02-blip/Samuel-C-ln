---
name: video
description: Kompletter Workflow für Samuels Kettlebell Short Form Videos (Reels, TikTok, Shorts) von Referenz über Skript, Rohschnitt und Gestaltung bis Final. Nutzen, sobald Samuel ein Video schneiden, ein Skript schreiben, eine Referenz speichern oder eine Rohdatei bearbeiten will, auch wenn er nur "neues Video", "Referenz" oder "/video" sagt.
---

# Video Workflow: Kettlebell Content Room

Arbeitsordner: `tools/video/`. Dieser Skill ist der Fahrplan, das Wissen liegt in den Dateien.
Grundprinzip: Samuel ist Regisseur, Claude ist das Team. Erst die Story, dann das Design. Rendern so spät wie möglich.

## Schritt 0: Start (immer, vor allem anderen)

1. Lesen: `tools/video/CLAUDE.md`, `tools/video/marke.md`, komplette `tools/video/lernen.md`, alle `tools/video/skills/*.md`, alle `tools/video/referenzen/*.md`.
2. Werkzeuge prüfen: `ffmpeg -version`, `python3 -c "import faster_whisper"`. Fehlt etwas: `pip3 install -q --break-system-packages faster-whisper yt-dlp`.
3. In 3 bis 5 Stichpunkten bestätigen, welche Learnings und Regeln gelten.
4. Modus klären:
   * **R: Referenz speichern** (auch ohne Video, jederzeit) → Abschnitt Referenzkarte
   * **A: Yap Video** (frei in die Kamera gesprochen, Claude findet die Story) → ab Etappe 1
   * **B: Skript zuerst** (Skript erarbeiten, filmen, abgleichen) → ab Etappe 1
   * **Laufendes Video** → `videos/<ordner>/briefing.md` lesen, an der offenen Etappe weitermachen
5. Neues Video: `videos/_vorlage` nach `videos/<JJJJ-MM-TT>_<titel>/` kopieren, in Drive unter `03 Videos/` gleichnamigen Ordner anlegen.
6. Offene Punkte aktiv erfragen. Mehr Klarheit am Anfang spart die teuren letzten 20 %.

## Drive (Kettlebell Content Room)

| Ordner | ID | Inhalt |
|---|---|---|
| Kettlebell Content Room | `12VRnuEQVMkos9S_Wd0f1TiKrjczE02Yx` | Hauptordner |
| 01 Referenzen | `1jSrFjkETJ2n1ILQLBn4o90_ZROPddRzT` | Referenzvideos und Screenshots |
| 02 Eingang | `1hg3kytAdq9dlahGnkNTPSXLhq1xNDYqm` | Alles ungeordnet: Memos, Ideen, Bilder, Rohdateien |
| 03 Videos | `1pVu3AcWzCkqeaqFmpLh_YWhcEzElI68A` | Ein Ordner pro Video: Rohmaterial, Vorschau, Final |

## Referenzkarte (Modus R)

Referenzen sind die Grundlage für Geschmack. Nicht kopieren, kombinieren: von einer Referenz die Untertitel, von der nächsten das Pacing.
1. Video aus `01 Referenzen` laden, Standbilder ziehen (Hook: 0, 0.5, 1, 2, 3 s; danach alle 2 s), Schnitte messen (`ffmpeg -i ref.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null -`), Ton prüfen.
2. Karte nach `referenzen/_vorlage.md` füllen: Hook, Untertitel, Pacing, Schnitt (z. B. Jump Cuts an Wortgrenzen), Einblendungen (Aussehen und Zeitpunkt), Look und Farben, Sound (Effekte, Musik), CTA.
3. Samuel fragen: Was genau gefällt dir? Was übernehmen, was nicht? Antwort wörtlich in die Karte.
4. Speichern als `referenzen/<thema>_<account>.md`, Commit.

## Die Etappen

Zwei feste Freigaben: **Go 1** nach dem Rohschnitt, **Go 2** vor dem Final. Gestaltung und Vorschau laufen im Wechsel, so oft wie nötig. Zurückgehen ist jederzeit erlaubt. Nach jeder Etappe `briefing.md` aktualisieren.

### 1. Ziel
* Worum geht es, Kernaussage in einem Satz, Zielgruppe, Länge, CTA (aus `marke.md`).
* Welche Referenzkarten gelten, und für welchen Aspekt.
* Modus A oder B. Bei B: Skript in `briefing.md` (Hook max. 2 s, 2 bis 4 Kernpunkte, CTA, kurze gesprochene Sätze), optional Shotlist. Inhalt und Visuelles getrennt erarbeiten.

### 2. Material
* Rohdateien aus Drive `03 Videos/<ordner>` nach `material/` (nie in Git).
* `ffprobe` (Auflösung, fps, Dauer, Ausrichtung, Audio), Kontaktbogen zeigen.
* Transkript mit Wort Zeitstempeln: `python3 tools/video/scripts/transkribieren.py material/<datei>`.
* Modus A: Story aus dem Gesagten vorschlagen, beste Takes markieren. Modus B: gesprochen gegen Skript abgleichen, Retakes und Lücken melden.

### 3. Rohschnitt → Go 1
* Schnittliste in `briefing.md` aus Wort Zeitstempeln: jeweils letzter vollständiger Take, Sprechpausen und Versprecher raus, Schnitte an Wortgrenzen.
* Erst Tabelle zeigen, dann günstige Vorschau (720p, ultrafast, ohne Gestaltung) nach Drive.
* Geprüft wird nur: Stimmen Aussagen, Reihenfolge, Tempo, roter Faden? Nichts gestalten, bevor Go 1 da ist.

### 4. Gestaltung (Kostenleiter, immer von billig nach teuer)
1. **Storyboard** (nur Text): pro Abschnitt Timecode, gesprochener Text, Untertitel, Einblendung, Zoom oder Schnitt, Sound. Billigste Korrekturstufe, hier am meisten iterieren.
2. **Standbilder** aus echtem Material mit Untertitel, Einblendung und Look, so wie es im Video aussähe.
3. **Kurze Proben**: pro Motion Graphic oder Effekt ein Schnipsel von max. 10 bis 15 s.
Bezug: Typografie in `skills/untertitel.md`, Schnittfarbe und Look in `skills/bildsprache.md`, Tempo und Dynamik in `skills/schnitt.md`. Ton auf ca. -14 LUFS, Musik leise unter Sprache.

### 5. Vorschau
* Erst wenn Storyboard, Standbilder und Proben abgestimmt sind: volles Video 720p nach Drive.
* Feedback zurück in Gestaltung, bis Samuel zufrieden ist → Go 2.

### 6. Final
* Nur nach Go 2: 1080x1920, 30 fps, H.264 hohe Qualität (oder was Samuel sagt), nach Drive `03 Videos/<ordner>`.
* Danach Abschluss (unten).

## Feedback verarbeiten

* Gutes Feedback hat **Stelle, Beobachtung, Wunsch** (z. B. "0:17, Karte verdeckt das Kinn, über den Kopf setzen"). Fehlt ein Teil, nachfragen.
* Einzelfall (nur dieses Video) → `briefing.md` und `lernen.md` mit Status `offen`.
* Universelle Regel (z. B. "Karten nie übers Kinn") → fragen, nach Bestätigung in den passenden Skill, in `lernen.md` als übernommen markieren, kurz Bescheid geben.

## Abschluss (am Ende jedes Videos, oder wenn Samuel "speicher alles" sagt)

1. Chat durchgehen: Ist jedes Feedback in `lernen.md`? Fehlende nachtragen.
2. Universelle Learnings zur Übernahme in Skills vorschlagen.
3. `briefing.md` auf fertig, Drive Links eintragen.
4. Commit und Push. Kurze Liste: was gelernt, was in welchen Skill übernommen.
