/* =============================================================================
   config.js  –  ZENTRALE KONFIGURATION
   -----------------------------------------------------------------------------
   HIER trägst du alle Werte ein, die sich ändern können. Das ist die EINZIGE
   Stelle, die du normalerweise anfassen musst. Nach dem Ändern speichern und
   die Seite neu deployen (siehe README.md).

   Diese Datei wird von index.html UND kurs.html eingebunden.
   ========================================================================== */

const CONFIG = {

  /* ---------------------------------------------------------------------------
     1) STRIPE PAYMENT LINK
     ---------------------------------------------------------------------------
     Der Link, auf den der Kauf-Button führt. Solange hier der Platzhalter
     steht, zeigt der Button einen Hinweis statt weiterzuleiten.

     >>> HIER DEINEN STRIPE PAYMENT LINK EINTRAGEN <<<
     Beispiel: "https://buy.stripe.com/abc123..."
     Anleitung: siehe README.md, Abschnitt "Stripe einrichten".
  --------------------------------------------------------------------------- */
  STRIPE_PAYMENT_LINK: "https://buy.stripe.com/bJe4gzb024yEaAA3YF8N201",

  /* ---------------------------------------------------------------------------
     1b) GRATIS-PDF / NEWSLETTER-ANMELDUNG (Lead-Magnet)
     ---------------------------------------------------------------------------
     Die Landingpage sammelt Name + E-Mail für ein kostenloses PDF. Eine
     statische Seite kann selbst KEINE E-Mails verschicken – das übernimmt
     BREVO (dein gewähltes Tool). In Brevo baust du ein Anmeldeformular +
     eine Automation, die das PDF nach Double-Opt-in automatisch versendet.

     NEWSLETTER_ACTION = die "action"-URL deines Brevo-Formulars. Die findest du
     im Brevo-Formular unter "Teilen / HTML-Code einbetten"; sie sieht so aus:
     https://DEINSUBDOMAIN.sibforms.com/serve/XXXXXXXXXXXXXXXX

     ABLAUF (neu): Der Gratis-Guide wird nach dem Absenden SOFORT als Download
     bereitgestellt (Seite guide-download.html). An Brevo werden Name + E-Mail
     nur DANN im Hintergrund gesendet, wenn der Nutzer die optionale
     Newsletter-Checkbox anhakt. Solange hier der Platzhalter steht, wird nichts
     an Brevo geschickt – der Download funktioniert trotzdem.

     >>> HIER DIE BREVO-FORM-ACTION-URL EINTRAGEN <<<
     Anleitung: siehe README.md, Abschnitt "Gratis-PDF & E-Mail-Funnel (Brevo)".
  --------------------------------------------------------------------------- */
  NEWSLETTER_ACTION: "PLATZHALTER_BREVO_FORM_ACTION_URL",

  // Feldnamen MÜSSEN zu deinem Brevo-Formular passen. Brevo nutzt standardmäßig
  // "EMAIL" für die E-Mail und ein Kontakt-Attribut (oft "FIRSTNAME") für den
  // Vornamen. Prüfe die Namen im HTML-Code deines Brevo-Formulars und passe hier
  // ggf. an.
  NEWSLETTER_FIELD_NAME:  "FIRSTNAME",
  NEWSLETTER_FIELD_EMAIL: "EMAIL",

  // Titel des Gratis-PDFs (wird auf der Seite angezeigt):
  FREE_PDF_TITEL: "Kettlebell Starter-Guide (PDF)",

  /* ---------------------------------------------------------------------------
     2) ZUGANGSCODE für den Kursbereich (kurs.html)
     ---------------------------------------------------------------------------
     WICHTIG / SICHERHEITSHINWEIS:
     Dieser Code ist NUR eine leichte Hürde, KEINE echte Sicherheit.
     Er steht im Klartext im ausgelieferten JavaScript und kann von jedem
     im Browser-Quelltext gelesen werden. Für den Start ist das bewusst so
     gewählt (einfach, kostenlos, kein Backend). Wenn du echten Schutz willst,
     brauchst du später eine serverseitige Freischaltung.

     >>> HIER DEINEN WUNSCH-ZUGANGSCODE EINTRAGEN <<<
     Diesen Code gibst du deinen Käufern (z. B. auf der Stripe-Dankeseite
     oder per E-Mail). Tipp: Beim Stripe Payment Link kannst du die
     Success-URL so setzen, dass sie direkt zu kurs.html führt.
  --------------------------------------------------------------------------- */
  ACCESS_CODE: "SWING2024",

  /* ---------------------------------------------------------------------------
     3) SOCIAL HANDLES
     --------------------------------------------------------------------------- */
  INSTAGRAM_HANDLE: "samuel_coeln",     // ohne @
  TIKTOK_HANDLE: "sam_coeln",           // ohne @

  // Vollständige Profil-URLs (werden aus den Handles gebaut, kannst du aber
  // auch direkt überschreiben, falls dein Nutzername anders lautet):
  get INSTAGRAM_URL() { return "https://instagram.com/" + this.INSTAGRAM_HANDLE; },
  get TIKTOK_URL()    { return "https://tiktok.com/@" + this.TIKTOK_HANDLE; },

  /* ---------------------------------------------------------------------------
     4) PREIS
     --------------------------------------------------------------------------- */
  PREIS: "30",              // nur die Zahl
  WAEHRUNG: "€",            // Währungssymbol
  PREIS_ANZEIGE: "30 €",    // wie es auf der Seite steht

  /* ---------------------------------------------------------------------------
     5) DEINE KONTAKTDATEN
     ---------------------------------------------------------------------------
     Werden u. a. im Footer und (als Referenz) für Impressum/Datenschutz
     genutzt. Trage deine echten Daten ein.
     Rechtlicher Hinweis: Impressum & Datenschutz solltest du zusätzlich
     anwaltlich / mit einem Impressum-Generator prüfen lassen.
  --------------------------------------------------------------------------- */
  NAME: "Samuel Coeln",
  KONTAKT_EMAIL: "PLATZHALTER_deine@email.de",

  /* Keyword, mit dem Interessenten dir für 1:1-Coaching schreiben sollen: */
  COACHING_KEYWORD: "LOCK IN"
};

/* Für Klarheit im Code: friert das Objekt ein, damit nichts versehentlich
   zur Laufzeit überschrieben wird. */
Object.freeze(CONFIG);
