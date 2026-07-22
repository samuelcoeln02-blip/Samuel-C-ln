# Kettlebell-Kurs – Verkaufsfunnel (Samuel Coeln)

Zweiseitige, statische Website als Verkaufsfunnel für einen digitalen
Kettlebell-Kurs. Kein Framework, kein Build-Step – reines HTML/CSS/JS.
Gehostet auf Netlify.

## Projektstruktur

```
.
├── index.html            # Landingpage / Funnel
├── kurs.html             # Kursbereich (Success-URL nach Stripe-Zahlung)
├── impressum.html        # Rechtsseite (Grundgerüst mit Platzhaltern)
├── datenschutz.html      # Rechtsseite (Grundgerüst mit Platzhaltern)
├── README.md             # diese Datei
└── assets/
    ├── css/
    │   └── style.css     # gemeinsames Stylesheet (mobile-first)
    ├── js/
    │   └── config.js     # ⭐ ZENTRALE KONFIGURATION – hier trägst du alles ein
    └── img/              # Platz für deine Bilder (Hero, Foto, ...)
```

## ⭐ Wichtigste Datei zuerst: `assets/js/config.js`

Alle Werte, die du ändern musst, stehen **gesammelt** in `assets/js/config.js`.
Das ist die einzige Datei, die du normalerweise anfassen musst:

| Wert | Bedeutung |
|------|-----------|
| `STRIPE_PAYMENT_LINK` | Link zur Stripe-Bezahlseite (siehe unten) |
| `ACCESS_CODE` | Zugangscode für den Kursbereich |
| `INSTAGRAM_HANDLE` / `TIKTOK_HANDLE` | deine Social-Handles (ohne @) |
| `PREIS` / `PREIS_ANZEIGE` | Preis des Kurses |
| `NAME` / `KONTAKT_EMAIL` | deine Kontaktdaten |
| `COACHING_KEYWORD` | Keyword für 1:1-Coaching-DMs (Standard: `LOCK IN`) |

Nach jeder Änderung: Datei speichern und neu deployen (siehe „Deployment“).

---

## 1) In Stripe ein Produkt für 20 € anlegen

1. Erstelle (falls noch nicht vorhanden) ein kostenloses Konto auf
   [stripe.com](https://stripe.com) und schließe die Kontoeinrichtung ab
   (Bankverbindung etc.), damit du echte Zahlungen empfangen kannst.
2. Gehe im Stripe-Dashboard auf **Produktkatalog → Produkte → + Produkt hinzufügen**.
3. Trage ein:
   - **Name:** z. B. „Kettlebell-Kurs“
   - **Beschreibung:** kurze Beschreibung des Kurses
   - **Preis:** `20,00` EUR, Preismodell **Einmalig** (nicht wiederkehrend)
4. Speichern.

> Hinweis Kleinunternehmer (§ 19 UStG): Du weist keine Umsatzsteuer aus. In den
> Stripe-Steuereinstellungen musst du entsprechend **keine** Steuer aufschlagen.
> Kläre die korrekte Konfiguration im Zweifel mit deinem Steuerberater.

## 2) Einen Payment Link erstellen

1. Im Stripe-Dashboard: **Zahlungslinks (Payment Links) → + Neuer Link**.
2. Wähle das eben erstellte Produkt „Kettlebell-Kurs“ (20 €) aus.
3. **Wichtig – Success-URL / Weiterleitung nach Zahlung:**
   - Suche in den Einstellungen des Payment Links den Punkt
     **„Nach der Zahlung“** → **„Kunden auf eine Website weiterleiten“**
     (bzw. „Confirmation page → Redirect to your website“).
   - Trage dort die URL deiner **kurs.html** ein, z. B.:
     ```
     https://DEINE-DOMAIN.de/kurs.html
     ```
     (Deine echte Netlify-URL bekommst du in Schritt 5.)
4. Link erstellen und die generierte URL kopieren
   (Format: `https://buy.stripe.com/....`).

## 3) Wo du die Success-URL auf kurs.html setzt

Die Success-URL wird **in Stripe** gesetzt (siehe Schritt 2, Punkt 3) – nicht im
Code. Sie muss auf deine `kurs.html` zeigen. Nach der Zahlung landet der Käufer
dann automatisch im Kursbereich.

Den **Zugangscode** teilst du dem Käufer mit – z. B.:
- direkt auf der Stripe-Bestätigungsseite (Text „Dein Zugangscode lautet: …“), und/oder
- in der automatischen Stripe-Bestätigungs-E-Mail.

Den Code selbst legst du in `assets/js/config.js` unter `ACCESS_CODE` fest.

> ⚠️ **Sicherheitshinweis:** Der Zugangscode steht im ausgelieferten JavaScript
> und ist im Browser-Quelltext lesbar. Das ist **keine echte Sicherheit**,
> sondern nur eine leichte Hürde – bewusst so gewählt für einen einfachen,
> kostenlosen Start. Für echten Schutz bräuchtest du eine serverseitige Lösung.

## 4) Wo du den Stripe-Link im Code einträgst

1. Öffne `assets/js/config.js`.
2. Ersetze den Platzhalter bei `STRIPE_PAYMENT_LINK`:
   ```js
   STRIPE_PAYMENT_LINK: "https://buy.stripe.com/dein-echter-link",
   ```
3. Speichern.

Solange dort noch `PLATZHALTER_...` steht, zeigt der Kauf-Button beim Klick einen
Hinweis an, statt weiterzuleiten (praktisch zum Testen).

## 5) Deployment auf Netlify

**Variante A – ganz ohne Git (Drag & Drop):**
1. Auf [app.netlify.com](https://app.netlify.com) einloggen.
2. **„Add new site“ → „Deploy manually“**.
3. Den gesamten Projektordner (mit `index.html`, `kurs.html`, `assets/` …) in
   das Upload-Feld ziehen.
4. Netlify vergibt eine URL wie `https://dein-name.netlify.app`.
5. Diese URL (mit `/kurs.html`) trägst du als Success-URL in Stripe ein
   (Schritt 2).

**Variante B – mit Git (empfohlen für Updates):**
1. Dieses Repository zu GitHub pushen.
2. In Netlify: **„Add new site“ → „Import an existing project“** → GitHub → Repo wählen.
3. **Build command:** _leer lassen_. **Publish directory:** `.` (Projektwurzel).
4. Deploy starten. Bei jedem `git push` deployt Netlify automatisch neu.

**Eigene Domain (optional):** In Netlify unter **Domain management** kannst du
eine eigene Domain verbinden. Dann verwendest du diese Domain in der Stripe
Success-URL.

---

## Testen vor dem Livegang

- [ ] `config.js` vollständig ausgefüllt (Stripe-Link, Code, Handles, Kontakt)
- [ ] Kauf-Button: Checkbox „Widerrufsrecht“ muss gesetzt sein, damit der Button aktiv wird
- [ ] Kauf-Button leitet zum Stripe-Link weiter
- [ ] Stripe Success-URL zeigt auf `kurs.html`
- [ ] Zugangscode schaltet den Kursbereich frei und bleibt gespeichert (localStorage)
- [ ] Impressum & Datenschutz mit echten Daten gefüllt und geprüft
- [ ] Auf dem Handy getestet (Großteil des Traffics kommt mobil)

## Rechtliches (bitte ernst nehmen)

Diese Seite enthält vorbereitete, aber **nicht rechtsverbindliche** Vorlagen:
- **Impressum** (`impressum.html`) mit Hinweis auf Kleinunternehmerregelung § 19 UStG
- **Datenschutzerklärung** (`datenschutz.html`) für eine statische Seite
- **Pflicht-Checkbox** beim Kauf zum Erlöschen des Widerrufsrechts bei digitalen Inhalten

➡️ **Lass Impressum, Datenschutz und die Kauf-/Widerrufs-Formulierung vor dem
Livegang rechtlich prüfen** (Anwalt oder seriöser Generator). Alle Platzhalter
sind im Code klar markiert.

## Anpassen von Inhalten

- **Texte/Design:** direkt in den HTML-Dateien bzw. `assets/css/style.css`.
- **Bilder:** in `assets/img/` ablegen und die `media-placeholder`-Blöcke in
  `index.html` / `kurs.html` durch echte `<img>`- oder Video-Einbettungen ersetzen.
- **Kurs-Videos:** In `kurs.html` sind 16:9-`video-placeholder`-Container
  vorbereitet. Ersetze sie später durch YouTube-unlisted- oder Vimeo-`<iframe>`s.
