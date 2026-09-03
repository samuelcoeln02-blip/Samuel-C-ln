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
  STRIPE_PAYMENT_LINK: "https://buy.stripe.com/5kQeVd9VY6GMeQQ0Mt8N203",

  /* ---------------------------------------------------------------------------
     1a) KURS SCHON KAUFBAR?  (Schalter für "Bald verfügbar")
     ---------------------------------------------------------------------------
     false = der Kurs-Kaufbereich zeigt "Bald verfügbar" (Button inaktiv, keine
             Widerruf-Checkbox). Nutze das, solange der Kurs noch nicht fertig ist.
     true  = normaler Kauf-Flow (Widerruf-Checkbox + Kauf-Button -> Stripe).

     >>> Sobald dein Kurs fertig ist, hier einfach auf true stellen. <<<
  --------------------------------------------------------------------------- */
  KURS_VERFUEGBAR: true,

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
  PREIS: "20",              // nur die Zahl
  WAEHRUNG: "€",            // Währungssymbol
  PREIS_ANZEIGE: "20 €",    // wie es auf der Seite steht

  // Durchgestrichener Vergleichspreis (E-Commerce-Anker-Effekt):
  PREIS_ALT_ANZEIGE: "45 €",

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
