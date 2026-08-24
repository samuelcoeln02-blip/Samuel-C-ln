// ============================================================
//  Instagram Automation Server (ManyChat-Style)
//
//  Ablauf:
//   1. Jemand kommentiert unter deinem Instagram-Post
//   2. Meta schickt ein Webhook-Event an POST /webhook
//   3. Wir pruefen die Signatur, matchen ein Keyword
//   4. Wir antworten oeffentlich UND schicken eine DM (+ PDF)
// ============================================================

import 'dotenv/config';
import express from 'express';
import crypto from 'node:crypto';

import { matchRule, loadRules } from './src/automations.js';
import { replyToComment, sendTextDM, sendPdfDM } from './src/instagram.js';

const app = express();
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const APP_SECRET = process.env.APP_SECRET;
const PDF_URL = process.env.PDF_URL;

// Rohen Body mitspeichern - brauchen wir fuer die Signaturpruefung.
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

// --- Anti-Doppelverarbeitung --------------------------------
// Meta sendet Webhooks teils mehrfach. Wir merken uns kurz die
// bereits verarbeiteten Kommentar-IDs (In-Memory, reicht fuer Start).
const seen = new Map();
const SEEN_TTL_MS = 10 * 60 * 1000; // 10 Minuten

function alreadyHandled(id) {
  const now = Date.now();
  for (const [key, ts] of seen) if (now - ts > SEEN_TTL_MS) seen.delete(key);
  if (seen.has(id)) return true;
  seen.set(id, now);
  return false;
}

// --- Signaturpruefung ---------------------------------------
// Stellt sicher, dass der Webhook wirklich von Meta kommt.
function validSignature(req) {
  if (!APP_SECRET) return true; // Im Dev ohne Secret erlaubt
  const header = req.get('x-hub-signature-256') || '';
  const expected =
    'sha256=' +
    crypto.createHmac('sha256', APP_SECRET).update(req.rawBody).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(header), Buffer.from(expected));
  } catch {
    return false;
  }
}

// ============================================================
//  Routen
// ============================================================

// Healthcheck
app.get('/', (_req, res) => res.send('Instagram Automation laeuft ✅'));

// 1) Webhook-Verifizierung (Meta ruft das einmalig beim Einrichten auf)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verifiziert');
    return res.status(200).send(challenge);
  }
  console.warn('❌ Webhook-Verifizierung fehlgeschlagen');
  return res.sendStatus(403);
});

// 2) Eingehende Events
app.post('/webhook', async (req, res) => {
  if (!validSignature(req)) {
    console.warn('❌ Ungueltige Signatur - Event verworfen');
    return res.sendStatus(401);
  }

  // Sofort 200 zurueckgeben, sonst wiederholt Meta die Zustellung.
  res.sendStatus(200);

  try {
    for (const entry of req.body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field === 'comments') {
          await handleComment(change.value);
        }
      }
    }
  } catch (err) {
    console.error('Fehler bei der Event-Verarbeitung:', err.message);
  }
});

// 3) Regeln zur Laufzeit neu laden, ohne Neustart
app.post('/reload', (_req, res) => {
  const r = loadRules();
  res.json({ ok: true, rules: r.length });
});

// ============================================================
//  Kommentar-Verarbeitung
// ============================================================
async function handleComment(value) {
  const commentId = value.id;
  const text = value.text || '';
  const fromId = value.from?.id;
  const fromName = value.from?.username || 'unbekannt';

  if (!commentId || alreadyHandled(commentId)) return;

  // Eigene Kommentare (Antworten des Accounts) nicht verarbeiten.
  if (fromId && fromId === process.env.IG_BUSINESS_ID) return;

  const rule = matchRule(text);
  if (!rule) {
    console.log(`⏭️  Kein Match fuer @${fromName}: "${text}"`);
    return;
  }

  console.log(`🎯 Regel "${rule.id}" fuer @${fromName}: "${text}"`);

  // a) Oeffentliche Antwort
  if (rule.publicReply) {
    try {
      await replyToComment(commentId, rule.publicReply);
      console.log('   ↳ oeffentliche Antwort gepostet');
    } catch (err) {
      console.error('   ↳ Antwort fehlgeschlagen:', err.message);
    }
  }

  // b) DM (Text + optional PDF)
  if (rule.dm && fromId) {
    try {
      if (rule.dm.text) await sendTextDM(fromId, rule.dm.text);
      if (rule.dm.sendPdf && PDF_URL) await sendPdfDM(fromId, PDF_URL);
      console.log('   ↳ DM gesendet' + (rule.dm.sendPdf ? ' (mit PDF)' : ''));
    } catch (err) {
      console.error('   ↳ DM fehlgeschlagen:', err.message);
    }
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Server laeuft auf Port ${PORT}`);
});
