# Video Workflow: So arbeiten wir zusammen

Ziel: Ein eigener Schnitt Workflow, der mit jedem Video besser wird. Wissen wird nicht im Chat gehalten, sondern in diesem Ordner.

## Ordner

| Pfad | Inhalt |
|---|---|
| `referenzen/` | Videos, die Samuel gefallen, und was genau daran gefällt (eine Datei pro Referenz) |
| `videos/<datum>_<titel>/` | Ein Ordner pro Video: `briefing.md` (Ziel und Stand), `material/`, `arbeitsfassungen/`, `export/` |
| `videos/_vorlage/` | Kopiervorlage für neue Videos |
| `skills/` | Wiederverwendbare Abläufe (Untertitel, Schnitt, Bildsprache) |
| `lernen.md` | Jedes Learning aus der Zusammenarbeit, mit Datum |
| `marke.md` | Ziele, Zielgruppe, Tonalität und CTA des Kettlebell Contents |

## Einstieg

In jedem neuen Chat reicht `/video` (Skill `.claude/skills/video/SKILL.md`). Er enthält den kompletten Ablauf: Referenzen, Skript, Material, Rohschnitt, Feinausarbeitung (Typografie, Schnittfarbe), Vorschau, Final.

## Arbeitsregeln

1. **Vor jeder Aufgabe lesen:** passende Skills in `skills/`, relevante `referenzen/`, komplette `lernen.md`. Kurz bestätigen, was davon angewendet wird.
2. **In Etappen arbeiten:** Ziel → Material → Rohschnitt (Go 1) → Gestaltung ⇄ Vorschau → Final (Go 2). Nach jeder Etappe Zwischenstand zeigen und auf Freigabe warten. Stand in `briefing.md` aktualisieren.
3. **So spät wie möglich rendern:** erst Standbilder und kurze Proben (max. 10 s, niedrige Auflösung), dann volle Vorschau (720p, schnelles Preset), Final erst nach ausdrücklichem Go.
4. **Feedback festhalten:** jedes Feedback sofort in `lernen.md` (Datum, Video, Feedback, Ableitung).
5. **Generalisieren nur mit Bestätigung:** Gilt ein Learning für alle Videos, fragen. Nach Bestätigung in den passenden Skill übernehmen, in `lernen.md` als übernommen markieren und kurz Bescheid geben.

## Technik

* Rohmaterial und Renderings liegen nicht in Git (zu groß, und die Website veröffentlicht das Repo). Nur `.md`, Schnittlisten, Untertitel (`.srt`) und kleine Standbilder werden versioniert.
* Die Cloud Session ist flüchtig. Fester Ablageort ist Google Drive: Rohmaterial kommt von dort, Vorschauen und Finals gehen dorthin zurück. Struktur, Skills und Learnings liegen in Git.
* Werkzeuge: ffmpeg, Python, faster-whisper (lokale Transkription, `scripts/transkribieren.py`), yt-dlp (Referenzen von YouTube).
* Schnitt wird als Datei beschrieben (`schnittliste.md` bzw. ffmpeg Befehle), damit jeder Schritt reproduzierbar ist.
* Tipp: Beim Ausprobieren und Iterieren hohes Reasoning nutzen; sobald Skills und Vorlagen stehen, reicht weniger.
* Optionale Werkzeuge, nur bei Bedarf: Gemini (Video verstehen), ElevenLabs (Soundeffekte, Musik), Bildgeneratoren (B Roll), DaVinci Resolve Export. Standard ist alles mit Claude Code, ffmpeg und Python.
* Methodik Quelle: Community Call "Videos schneiden mit Claude Code" (Content Room Prinzip), eingearbeitet am 2026-11-05.
* Schreibstil in allen Dateien: knapp, sachlich, ohne Gedankenstriche.
