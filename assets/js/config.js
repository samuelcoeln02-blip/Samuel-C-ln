/* =============================================================================
   config.js  –  ZENTRALE KONFIGURATION
   -----------------------------------------------------------------------------
   HIER trägst du alle Werte ein, die sich ändern können. Das ist die EINZIGE
   Stelle, die du normalerweise anfassen musst. Nach dem Ändern speichern und
   die Seite neu deployen (siehe README.md).

   Diese Datei wird von index.html eingebunden.
   ========================================================================== */

const CONFIG = {

  /* ---------------------------------------------------------------------------
     1) SOCIAL HANDLES
     --------------------------------------------------------------------------- */
  INSTAGRAM_HANDLE: "samuel_coeln",     // ohne @
  TIKTOK_HANDLE: "sam_coeln",           // ohne @

  // Vollständige Profil-URLs (werden aus den Handles gebaut, kannst du aber
  // auch direkt überschreiben, falls dein Nutzername anders lautet):
  get INSTAGRAM_URL() { return "https://instagram.com/" + this.INSTAGRAM_HANDLE; },
  get TIKTOK_URL()    { return "https://tiktok.com/@" + this.TIKTOK_HANDLE; },

  /* ---------------------------------------------------------------------------
     2) DEINE KONTAKTDATEN
     ---------------------------------------------------------------------------
     Werden u. a. im Footer und (als Referenz) für Impressum/Datenschutz
     genutzt. Trage deine echten Daten ein.
     Rechtlicher Hinweis: Impressum & Datenschutz solltest du zusätzlich
     anwaltlich / mit einem Impressum-Generator prüfen lassen.
  --------------------------------------------------------------------------- */
  NAME: "Samuel Coeln",
  KONTAKT_EMAIL: "PLATZHALTER_deine@email.de"
};

/* Für Klarheit im Code: friert das Objekt ein, damit nichts versehentlich
   zur Laufzeit überschrieben wird. */
Object.freeze(CONFIG);
