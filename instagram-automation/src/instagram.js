// ============================================================
//  Instagram Graph API Client
//  Duenne Wrapper um die drei Calls, die wir brauchen:
//   1. Oeffentlich auf einen Kommentar antworten
//   2. Eine DM mit Text senden
//   3. Eine DM mit PDF-Anhang senden
// ============================================================

const GRAPH = 'https://graph.facebook.com/v21.0';

const TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IG_ID = process.env.IG_BUSINESS_ID;

/**
 * Kleiner Helfer fuer POST-Requests an die Graph API.
 * Wirft mit lesbarer Fehlermeldung, damit man im Log sieht was los ist.
 */
async function graphPost(path, body) {
  const res = await fetch(`${GRAPH}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error?.message || res.statusText;
    throw new Error(`Graph API ${res.status}: ${msg}`);
  }
  return data;
}

/**
 * Oeffentliche Antwort direkt unter dem Kommentar posten.
 * @param {string} commentId - ID des Kommentars aus dem Webhook
 * @param {string} message   - Antworttext
 */
export function replyToComment(commentId, message) {
  return graphPost(`${commentId}/replies`, {
    message,
    access_token: TOKEN,
  });
}

/**
 * Private DM mit reinem Text an den Kommentierenden senden.
 * @param {string} recipientId - IGSID des Nutzers (aus dem Webhook)
 * @param {string} text        - Nachrichtentext
 */
export function sendTextDM(recipientId, text) {
  return graphPost(`${IG_ID}/messages`, {
    recipient: { id: recipientId },
    message: { text },
    access_token: TOKEN,
  });
}

/**
 * Private DM mit PDF-Anhang senden.
 * Instagram laedt die Datei selbst von der uebergebenen URL,
 * daher muss die URL oeffentlich erreichbar sein.
 * @param {string} recipientId - IGSID des Nutzers
 * @param {string} pdfUrl      - oeffentliche URL zur PDF
 */
export function sendPdfDM(recipientId, pdfUrl) {
  return graphPost(`${IG_ID}/messages`, {
    recipient: { id: recipientId },
    message: {
      attachment: {
        type: 'file',
        payload: { url: pdfUrl, is_reusable: true },
      },
    },
    access_token: TOKEN,
  });
}
