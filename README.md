# Kettlebell E-Book (kostenlos) & Coaching – Website (Samuel Coeln)

Statische Website: kostenloses Kettlebell-E-Book zum Direkt-Download plus
Buchungs-CTA für 1:1-Coaching (Calendly). Kein Framework, kein Build-Step –
reines HTML/CSS/JS. Gehostet auf Netlify.

## Projektstruktur

```
.
├── index.html            # Landingpage
├── ebook-download.html   # Direkter Download des kostenlosen E-Books
├── impressum.html        # Rechtsseite
├── datenschutz.html      # Rechtsseite (Grundgerüst mit Platzhaltern)
├── widerruf.html         # Rechtsseite: Widerrufsbelehrung
├── README.md             # diese Datei
└── assets/
    ├── css/
    │   └── style.css     # gemeinsames Stylesheet (mobile-first)
    ├── js/
    │   └── config.js     # ⭐ ZENTRALE KONFIGURATION – hier trägst du alles ein
    └── images/           # Bilder NUR für die Landingpage (index.html):
        ├── hero.png      #   Hero-Bereich (Empfehlung 16:10)
        └── ueber-mich.png#   Über-mich-Bereich (Hochformat 4:5)
```

### Bilder für die Landingpage

Lege einfach `hero.png` und `ueber-mich.png` in `assets/images/` ab – sie werden
in `index.html` **automatisch** angezeigt, sobald die Dateien vorhanden sind.
Willst du andere Dateinamen/Formate (z. B. `.jpg`), passe die zwei `src`-Pfade
der `<img>`-Tags in `index.html` entsprechend an.

### Reels-Videos (Landingpage)

Zwischen „Das Problem" und „Warum Kettlebell" läuft ein Reel-Player. Er spielt
**eigene MP4-Dateien** ab: es läuft automatisch immer eines (stummgeschaltetes
Autoplay – Browser erlauben Ton-Autoplay nicht), danach wechselt er zum nächsten;
der Besucher kann den Ton per Button an-/ausschalten.

Lege deine Reels als **`reel-1.mp4`, `reel-2.mp4`** in `assets/videos/` ab
(Hochformat 9:16). Sobald sie da sind, spielt der Player sie automatisch; fehlen
sie, zeigt er einen Platzhalter. Die Liste der Reels steht im `<script>` von
`index.html` (Konstante `REELS`) – dort kannst du Videos ergänzen/entfernen.

**Wichtig – Dateigröße:** GitHub-Web-Uploads sind auf 25 MB pro Datei begrenzt,
und große Autoplay-Videos machen die Seite mobil langsam. Komprimiere deine
Reels vor dem Upload (z. B. CapCut-Export 720p, oder HandBrake „Fast 720p30").
Ein automatisches Ziehen der „neuesten" Reels ist auf einer statischen Seite
nicht möglich (dafür bräuchte es die Instagram-Graph-API mit Business-Account +
Server). Neue Reels = einfach die Dateien austauschen.
Fehlt eine Datei, bleibt der jeweilige Platzhalter sichtbar (der `onerror`-Handler
am `<img>` blendet das fehlende Bild aus).

## ⭐ Wichtigste Datei zuerst: `assets/js/config.js`

Alle Werte, die du ändern musst, stehen **gesammelt** in `assets/js/config.js`.
Das ist die einzige Datei, die du normalerweise anfassen musst:

| Wert | Bedeutung |
|------|-----------|
| `NEWSLETTER_ACTION` | Form-Action-URL deines E-Mail-Tools (Gratis-PDF-Anmeldung) |
| `NEWSLETTER_FIELD_NAME` / `NEWSLETTER_FIELD_EMAIL` | Feldnamen, die dein E-Mail-Tool erwartet |
| `FREE_PDF_TITEL` | Titel des Gratis-PDFs (auf der Seite angezeigt) |
| `INSTAGRAM_HANDLE` / `TIKTOK_HANDLE` | deine Social-Handles (ohne @) |
| `NAME` / `KONTAKT_EMAIL` | deine Kontaktdaten |

Nach jeder Änderung: Datei speichern und neu deployen (siehe „Deployment“).

---

## Gratis-PDF & E-Mail-Funnel (Brevo)

Die Landingpage führt mit einem **Gratis-PDF** (Lead-Magnet): sie sammelt über ein
Formular **Vorname + E-Mail**. Den Kurs kann man am Seitenende direkt kaufen und/
oder du verkaufst ihn später per E-Mail an die gesammelten Leads.

Eine statische Seite kann selbst keine E-Mails senden – das übernimmt **Brevo**
(EU-Anbieter, Brevo GmbH Köln, DSGVO-freundlich, kostenloser Tarif).

**Einrichtung in Brevo:**
1. Kostenloses Brevo-Konto anlegen.
2. Eine **Kontaktliste** anlegen und ein **Anmeldeformular** erstellen (mit den
   Feldern E-Mail und Vorname). **Double-Opt-in** aktivieren.
3. Eine **Automation** bauen: „Wenn Kontakt Liste beitritt → sende E-Mail mit dem
   PDF-Download-Link“ (Link auf `…/guide-danke.html` oder direkt auf die PDF).
4. Im Formular unter **Teilen → HTML-Code einbetten** findest du die
   **Action-URL** (`https://….sibforms.com/serve/…`) und die **Feldnamen**
   (meist `EMAIL` und `FIRSTNAME`).
5. In `assets/js/config.js` eintragen:
   - `NEWSLETTER_ACTION` = die Brevo-Action-URL
   - `NEWSLETTER_FIELD_EMAIL` / `NEWSLETTER_FIELD_NAME` = die Feldnamen (Standard
     bereits `EMAIL` / `FIRSTNAME`)
   - `FREE_PDF_TITEL` = Titel deines PDFs
6. **AVV/DPA** mit Brevo abschließen (im Brevo-Konto).

Solange `NEWSLETTER_ACTION` den Platzhalter enthält, wird das Formular nicht
abgeschickt, sondern zeigt einen Hinweis (praktisch zum Testen).

> **Schriftart:** Inter ist lokal selbst-gehostet (`assets/fonts/`) und wird von
> deiner eigenen Seite ausgeliefert – keine Google-Fonts, keine Datenübertragung
> an Dritte.

---

## Wie die Auslieferung des E-Books funktioniert

Das E-Book ist **kostenlos**. Der Button auf der Startseite führt direkt auf
`ebook-download.html`, dort kann die PDF (`assets/downloads/kettlebell-mastery.pdf`)
sofort heruntergeladen werden – kein Kauf, kein Zugangscode, kein Login nötig.

> ⚠️ **Hinweis:** Das Repository ist öffentlich auf GitHub. Die PDF liegt als
> normale Datei im Repo und ist damit über den GitHub-Dateibrowser theoretisch
> von jedem auffindbar – das ist bei einem kostenlosen Download unproblematisch.

## 1) Deployment auf Netlify

**Variante A – ganz ohne Git (Drag & Drop):**
1. Auf [app.netlify.com](https://app.netlify.com) einloggen.
2. **„Add new site“ → „Deploy manually“**.
3. Den gesamten Projektordner (mit `index.html`, `ebook-download.html`, `assets/` …) in
   das Upload-Feld ziehen.
4. Netlify vergibt eine URL wie `https://dein-name.netlify.app`.

**Variante B – mit Git (empfohlen für Updates):**
1. Dieses Repository zu GitHub pushen.
2. In Netlify: **„Add new site“ → „Import an existing project“** → GitHub → Repo wählen.
3. **Build command:** _leer lassen_. **Publish directory:** `.` (Projektwurzel).
4. Deploy starten. Bei jedem `git push` deployt Netlify automatisch neu.

**Eigene Domain (optional):** In Netlify unter **Domain management** kannst du
eine eigene Domain verbinden.

---

## Testen vor dem Livegang

- [ ] `config.js` vollständig ausgefüllt (Handles, Kontakt)
- [ ] Download-Button auf der Startseite führt zu `ebook-download.html`
- [ ] Download-Button auf `ebook-download.html` liefert die richtige PDF aus
- [ ] Impressum & Datenschutz mit echten Daten gefüllt und geprüft
- [ ] Auf dem Handy getestet (Großteil des Traffics kommt mobil)

## Rechtliches (bitte ernst nehmen)

Diese Seite enthält vorbereitete, aber **nicht rechtsverbindliche** Vorlagen:
- **Impressum** (`impressum.html`) mit Hinweis auf Kleinunternehmerregelung § 19 UStG
- **Datenschutzerklärung** (`datenschutz.html`) für eine statische Seite

➡️ **Lass Impressum und Datenschutz vor dem Livegang rechtlich prüfen**
(Anwalt oder seriöser Generator).

## Anpassen von Inhalten

- **Texte/Design:** direkt in den HTML-Dateien bzw. `assets/css/style.css`.
- **Bilder (Landingpage):** `hero.png` und `ueber-mich.png` in `assets/images/`
  ablegen – sie erscheinen in `index.html` automatisch (siehe oben).
