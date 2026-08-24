# Instagram Automation (ManyChat-Style)

Kommentiert jemand unter deinem Instagram-Post ein Keyword, passiert automatisch:

1. **Öffentliche Antwort** direkt unter dem Kommentar ("Check deine DMs 📩")
2. **DM** an die Person mit einem Text **+ deiner PDF** (dem Kettlebell-Guide)

Alles läuft über die offizielle **Instagram Graph API** von Meta — kein Drittanbieter, keine monatliche ManyChat-Gebühr.

---

## Wie es funktioniert

```
Nutzer kommentiert  ──►  Meta Webhook  ──►  dein Server (/webhook)
                                                   │
                          ┌────────────────────────┼────────────────────────┐
                          ▼                         ▼                         ▼
                  Keyword prüfen           öffentliche Antwort          DM + PDF senden
                (automations.json)           (Graph API)                 (Graph API)
```

---

## Voraussetzungen (wichtig!)

Damit das überhaupt funktioniert, braucht Meta ein paar Dinge:

- **Instagram-Konto = Business- oder Creator-Account** (kein privates Profil)
- Das IG-Konto ist mit einer **Facebook-Seite** verknüpft
- Ein **Meta Developer Account** → https://developers.facebook.com
- Ein **öffentlich erreichbarer Server mit HTTPS** (Meta schickt Webhooks nur an HTTPS-URLs)

> Für erste Tests reicht **ngrok** (`ngrok http 3000`) — das gibt dir sofort eine HTTPS-URL auf deinen lokalen Server. Für den Dauerbetrieb: Railway, Render, Fly.io oder ein kleiner VPS.

---

## 1. Lokal starten

```bash
cd instagram-automation
npm install
cp .env.example .env      # danach .env mit deinen Werten füllen
npm start
```

Server läuft dann auf `http://localhost:3000`. Test: `http://localhost:3000` sollte "Instagram Automation läuft ✅" zeigen.

---

## 2. Meta App einrichten

### 2.1 App anlegen
1. https://developers.facebook.com/apps → **App erstellen**
2. Typ **"Business"** wählen
3. In der App: Produkt **"Instagram"** hinzufügen (bzw. "Messenger" + "Instagram Graph API")

### 2.2 Verify Token & App Secret
- **App Secret**: App-Dashboard → *Einstellungen → Allgemein* → App-Geheimnis → in `.env` als `APP_SECRET`
- **Verify Token**: denk dir selbst ein Passwort aus (z. B. `mein_geheimes_verify_token`) → in `.env` als `VERIFY_TOKEN`. **Genau dasselbe** trägst du gleich im Webhook-Feld ein.

### 2.3 Webhook eintragen
1. In der App: *Webhooks* (oder *Instagram → Konfiguration*)
2. **Callback-URL**: deine öffentliche URL + `/webhook`
   Beispiel: `https://dein-name.ngrok-free.app/webhook`
3. **Verify Token**: der Wert aus deiner `.env`
4. Auf **Verifizieren und speichern** klicken → in der Server-Konsole muss `✅ Webhook verifiziert` erscheinen
5. Bei **Felder abonnieren** unbedingt **`comments`** aktivieren (optional `messages` für DM-Automationen)

### 2.4 Access Token holen
1. *Tools → Graph API Explorer*
2. Deine App + die verknüpfte Seite auswählen
3. Diese Berechtigungen anfragen:
   - `instagram_basic`
   - `instagram_manage_comments`
   - `instagram_manage_messages`
   - `pages_manage_metadata`
   - `pages_read_engagement`
4. Token generieren → das ist ein kurzlebiger Token. **In einen Long-Lived Token umwandeln** (60 Tage):

```bash
curl "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=DEINE_APP_ID&client_secret=DEIN_APP_SECRET&fb_exchange_token=KURZER_TOKEN"
```

Den langen Token in `.env` als `PAGE_ACCESS_TOKEN`.

### 2.5 Instagram Business ID holen

```bash
curl "https://graph.facebook.com/v21.0/me/accounts?access_token=DEIN_TOKEN"
# -> Page-ID merken, dann:
curl "https://graph.facebook.com/v21.0/PAGE_ID?fields=instagram_business_account&access_token=DEIN_TOKEN"
```

Die zurückgegebene `instagram_business_account.id` in `.env` als `IG_BUSINESS_ID`.

---

## 3. PDF öffentlich hosten

Instagram lädt die PDF selbst von einer URL — sie muss also **öffentlich erreichbar** sein. Der Guide liegt schon im Hauptprojekt unter `assets/downloads/kettlebell-guide.pdf`. Sobald deine Seite (z. B. über Netlify) live ist, trägst du in `.env` ein:

```
PDF_URL=https://deine-domain.de/assets/downloads/kettlebell-guide.pdf
```

---

## 4. Automationen anpassen

Alle Trigger stehen in **`automations.json`** — kein Code nötig:

```json
{
  "id": "guide",
  "keywords": ["guide", "pdf", "kettlebell"],
  "publicReply": "Check deine DMs 📩",
  "dm": { "text": "Hier ist dein Guide! 💪", "sendPdf": true }
}
```

- **`keywords`**: Löst aus, wenn eines davon (egal ob groß/klein) im Kommentar vorkommt. Leeres Array `[]` = Catch-All (matcht jeden Kommentar → ans Ende stellen).
- **`publicReply`**: Öffentliche Antwort unterm Kommentar. Weglassen = keine öffentliche Antwort.
- **`dm.text`**: DM-Text. **`dm.sendPdf`**: `true` hängt die PDF an.
- Regeln werden **von oben nach unten** geprüft — die erste passende gewinnt.

Nach dem Ändern ohne Neustart neu laden:

```bash
curl -X POST http://localhost:3000/reload
```

---

## 5. Wichtige Meta-Regeln (damit nichts blockiert wird)

- **24-Stunden-Fenster**: Eine DM darf nur innerhalb von 24 h nach der letzten Interaktion des Nutzers gesendet werden. Ein frischer Kommentar zählt als Interaktion → passt für diesen Use-Case.
- **App Review**: Solange die App im *Entwicklungsmodus* ist, funktioniert alles nur mit Konten, die du als Tester/Admin hinzugefügt hast. Für den öffentlichen Live-Betrieb musst du die o. g. Permissions bei Meta im **App Review** freischalten lassen.
- **Rate Limits**: Nicht spammen — Meta drosselt bei zu vielen Calls.

---

## Deployment-Checkliste

- [ ] Business-/Creator-Account mit FB-Seite verknüpft
- [ ] Meta App erstellt, `comments`-Webhook abonniert
- [ ] `.env` komplett ausgefüllt (Token, Secret, IDs, PDF-URL)
- [ ] Server auf HTTPS-Domain deployed
- [ ] PDF öffentlich erreichbar
- [ ] Mit Test-Kommentar geprüft (Konsole zeigt `🎯 Regel ...`)
- [ ] Permissions im App Review eingereicht (für Live)

---

## Struktur

```
instagram-automation/
├── server.js            # Webhook-Server + Ablaufsteuerung
├── automations.json     # deine Keyword-Regeln (hier anpassen)
├── src/
│   ├── instagram.js     # Graph-API-Calls (Antwort, DM, PDF)
│   └── automations.js   # Regel-Matching
├── .env.example         # Vorlage für Zugangsdaten
└── package.json
```
