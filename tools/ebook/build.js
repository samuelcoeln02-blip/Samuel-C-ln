/* Kettlebell-Mastery E-Book – Build-Pipeline
 * Rendert das designte HTML/CSS über Chromium zu PDF:
 *  - Cover (full-bleed) + Body (Inhalt + Kapitel)
 *  - klickbares Inhaltsverzeichnis (Sprungmarken)
 *  - echte Seitenzahlen im TOC (Zwei-Pass: rendern -> Seiten suchen -> neu rendern)
 *  - Seitenzahlen in der Fußzeile
 * Voraussetzungen: node + playwright, python3 + pymupdf, ein Chromium unter /opt/pw-browsers.
 * Aufruf:  node tools/ebook/build.js
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { TOC, chapters } = require('./content.js');

const DIR = __dirname;
const REPO = path.resolve(DIR, '..', '..');
const OUT = path.join(REPO, 'assets/downloads/kettlebell-mastery-teil1-vorschau.pdf');

// Chromium automatisch finden (Version kann je Umgebung variieren)
function findChrome() {
  const base = '/opt/pw-browsers';
  if (fs.existsSync(base)) {
    for (const d of fs.readdirSync(base)) {
      const p = path.join(base, d, 'chrome-linux', 'chrome');
      if (d.startsWith('chromium-') && fs.existsSync(p)) return p;
    }
  }
  return undefined; // Playwright-Default nutzen
}
const CHROME = findChrome();

// ---- Fonts als base64 einbetten ----
const fontDir = path.join(REPO, 'assets/fonts');
const b64 = f => fs.readFileSync(path.join(fontDir, f)).toString('base64');
const FONTS = `
@font-face{font-family:'Inter';font-weight:400;font-style:normal;src:url(data:font/woff2;base64,${b64('inter-400.woff2')}) format('woff2');}
@font-face{font-family:'Inter';font-weight:600;font-style:normal;src:url(data:font/woff2;base64,${b64('inter-600.woff2')}) format('woff2');}
@font-face{font-family:'Inter';font-weight:700;font-style:normal;src:url(data:font/woff2;base64,${b64('inter-700.woff2')}) format('woff2');}
@font-face{font-family:'Inter';font-weight:800;font-style:normal;src:url(data:font/woff2;base64,${b64('inter-800.woff2')}) format('woff2');}
`;

const CSS = `
${FONTS}
:root{--blau:#1552F0;--dunkelblau:#0A2E8F;--gruen:#12B76A;--schwarz:#0B0B0F;--grau:#6B7280;--panel:#EEF1F6;--border:#E3E7EF;--rot:#E5323B;}
*{box-sizing:border-box;}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
body{font-family:'Inter',Arial,sans-serif;color:#17181C;font-size:10.6pt;line-height:1.62;margin:0;hyphens:auto;-webkit-hyphens:auto;}
p{margin:0 0 9pt;text-align:justify;}
strong{font-weight:700;} em{font-style:italic;}
.chapter{break-before:page;}
.chapter:first-of-type{break-before:auto;}
.ch-head{margin:0 0 14pt;}
.ch-teil{font-size:8pt;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--grau);margin-bottom:16pt;}
.ch-kicker{font-size:8.5pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gruen);margin-bottom:6pt;}
.ch-title{font-size:24pt;font-weight:800;line-height:1.1;letter-spacing:-.02em;color:var(--schwarz);margin:0 0 10pt;}
.ch-rule{height:3px;width:64px;background:var(--blau);border-radius:2px;}
h2{font-size:13pt;font-weight:800;letter-spacing:-.01em;color:var(--dunkelblau);margin:16pt 0 7pt;break-after:avoid;}
.drop{font-size:13pt;line-height:1.4;color:var(--schwarz);text-align:left;margin-bottom:11pt;}
ul,ol{margin:0 0 10pt;padding-left:0;}
ul.plain{list-style:none;}
ul.plain li{position:relative;padding-left:16pt;margin-bottom:6pt;}
ul.plain li::before{content:"";position:absolute;left:2pt;top:7pt;width:5pt;height:5pt;background:var(--blau);border-radius:50%;}
ul.ticks{list-style:none;}
ul.ticks li{position:relative;padding-left:20pt;margin-bottom:6pt;}
ul.ticks li::before{content:"\\2713";position:absolute;left:0;top:0;color:var(--gruen);font-weight:800;}
ol.steps{list-style:none;counter-reset:st;}
ol.steps li{position:relative;padding-left:26pt;margin-bottom:8pt;counter-increment:st;}
ol.steps li::before{content:counter(st);position:absolute;left:0;top:1pt;width:17pt;height:17pt;background:var(--blau);color:#fff;border-radius:50%;font-size:9pt;font-weight:700;display:flex;align-items:center;justify-content:center;}
ul.cues{list-style:none;}
ul.cues li{position:relative;padding-left:18pt;margin-bottom:5pt;color:#26272C;}
ul.cues li::before{content:"\\201C";position:absolute;left:0;top:4pt;color:var(--blau);font-weight:800;font-size:13pt;}
.merk{background:var(--panel);border-radius:8px;padding:9pt 12pt;text-align:center;font-size:11pt;}
.closer{margin-top:12pt;font-size:11pt;}
.fehler{background:#FCEDED;border-left:4px solid var(--rot);border-radius:0 8px 8px 0;padding:9pt 13pt;margin:8pt 0;break-inside:avoid;}
.fehler-tag{display:inline-block;font-size:7.5pt;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--rot);margin-bottom:3pt;}
.fehler p{margin:0;text-align:left;font-size:10pt;}
.hinweis{background:#EEF3FF;border-left:4px solid var(--blau);border-radius:0 8px 8px 0;padding:10pt 13pt;margin:10pt 0;break-inside:avoid;}
.hinweis-tag{display:inline-block;font-size:7.5pt;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--dunkelblau);margin-bottom:3pt;}
.hinweis p{margin:0;text-align:left;font-size:9.6pt;color:#2A2E39;}
figure{margin:12pt 0;break-inside:avoid;}
figure.bild .bild-box{background:#F4F6FA;border:1.4px dashed #C7CFDD;border-radius:10px;height:78pt;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2pt;color:#9AA3B2;}
.bild-ic{font-size:17pt;line-height:1;}
.bild-note{font-size:8pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;}
figcaption{font-size:8.4pt;color:var(--grau);margin-top:5pt;font-style:italic;text-align:left;}
figure.svgfig svg{width:100%;height:auto;display:block;background:#fff;border:1px solid var(--border);border-radius:10px;padding:6pt;}
table.wtab{width:100%;border-collapse:collapse;margin:10pt 0;font-size:9.6pt;break-inside:avoid;}
table.wtab th{background:var(--dunkelblau);color:#fff;text-align:left;padding:7pt 10pt;font-weight:700;}
table.wtab td{padding:7pt 10pt;border-bottom:1px solid var(--border);}
table.wtab tbody tr:nth-child(even){background:var(--panel);}
.toc{break-after:page;}
.toc-title{font-size:24pt;font-weight:800;letter-spacing:-.02em;margin:0 0 4pt;}
.toc-rule{height:3px;width:64px;background:var(--blau);border-radius:2px;margin-bottom:20pt;}
.toc-teil{font-size:8pt;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gruen);margin:14pt 0 8pt;}
a.toc-row{display:flex;align-items:baseline;gap:8px;text-decoration:none;color:#17181C;margin-bottom:11pt;}
.toc-num-lead{font-size:11pt;font-weight:800;color:var(--blau);width:24pt;flex:none;}
.toc-name{font-size:11.5pt;font-weight:600;}
.toc-dots{flex:1;border-bottom:1.4px dotted #C7CFDD;position:relative;top:-3pt;}
.toc-pg{font-size:10.5pt;font-weight:700;color:var(--grau);flex:none;}
`;

function bodyHtml(pagemap){
  const tocRows = TOC.map((c,i)=>{
    const teil = c.teil ? `<div class="toc-teil">${c.teil}</div>` : '';
    const pg = pagemap && pagemap[c.id] ? pagemap[c.id] : '';
    return `${teil}<a class="toc-row" href="#${c.id}">
      <span class="toc-num-lead">${i+1}</span>
      <span class="toc-name">${c.title}</span>
      <span class="toc-dots"></span>
      <span class="toc-pg">${pg}</span>
    </a>`;
  }).join('');
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
    <section class="toc"><div class="toc-title">Inhalt</div><div class="toc-rule"></div>${tocRows}</section>
    ${chapters.join('\n')}
  </body></html>`;
}

const COVER = `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${CSS}
  html,body{margin:0;}
  .cover{position:relative;width:210mm;height:297mm;background:var(--schwarz);overflow:hidden;color:#fff;}
  .cbar{position:absolute;top:0;left:0;right:0;height:16mm;background:var(--blau);}
  .cside{position:absolute;top:16mm;bottom:0;left:0;width:7mm;background:var(--gruen);}
  .cwrap{position:absolute;left:24mm;right:20mm;top:96mm;}
  .ceyebrow{font-size:11pt;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:var(--gruen);margin-bottom:16mm;}
  .ctitle{font-size:56pt;font-weight:800;line-height:.98;letter-spacing:-.03em;}
  .ctitle .b{color:var(--blau);}
  .csub{font-size:13pt;line-height:1.5;color:#C7CBD4;margin-top:12mm;max-width:150mm;font-weight:400;}
  .cfoot{position:absolute;left:24mm;right:20mm;bottom:26mm;}
  .cauthor{font-size:13pt;font-weight:800;letter-spacing:.18em;text-transform:uppercase;}
  .ctag{display:inline-block;margin-top:8mm;font-size:8.5pt;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--schwarz);background:var(--gruen);padding:4pt 10pt;border-radius:20px;}
</style></head><body>
  <div class="cover">
    <div class="cbar"></div><div class="cside"></div>
    <div class="cwrap">
      <div class="ceyebrow">Das Kettlebell-E-Book</div>
      <div class="ctitle">KETTLEBELL<br><span class="b">MASTERY</span></div>
      <div class="csub">Dein kompletter Weg zu sauberer Technik, Kraft, Kondition und Athletik – mit einem Werkzeug.</div>
    </div>
    <div class="cfoot"><div class="cauthor">Samuel Coeln</div><div class="ctag">Vorschau · Teil 1 · Grundlagen</div></div>
  </div>
</body></html>`;

const FOOTER = `<div style="width:100%;font-size:8px;color:#9AA1AD;font-family:Arial,sans-serif;padding:0 17mm;display:flex;justify-content:space-between;"><span>Kettlebell Mastery · Samuel Coeln</span><span class="pageNumber"></span></div>`;
const EMPTY = `<div></div>`;

async function renderPDF(browser, html, out, opts){
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil:'networkidle' });
  await page.emulateMedia({ media:'print' });
  await page.pdf(Object.assign({ path:out, format:'A4', printBackground:true }, opts));
  await page.close();
}

(async () => {
  const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
  await renderPDF(browser, COVER, path.join(DIR,'cover.pdf'), { margin:{top:'0',bottom:'0',left:'0',right:'0'} });
  const bodyOpts = { displayHeaderFooter:true, headerTemplate:EMPTY, footerTemplate:FOOTER,
    margin:{ top:'18mm', bottom:'18mm', left:'17mm', right:'17mm' } };
  await renderPDF(browser, bodyHtml(null), path.join(DIR,'body1.pdf'), bodyOpts);
  const finds = {}; TOC.forEach(c => finds[c.id] = c.find);
  const raw = execSync(`python3 ${path.join(DIR,'pagemap.py')} ${path.join(DIR,'body1.pdf')} '${JSON.stringify(finds)}'`).toString().trim();
  const pagemap = JSON.parse(raw);
  console.log('pagemap:', pagemap);
  await renderPDF(browser, bodyHtml(pagemap), path.join(DIR,'body2.pdf'), bodyOpts);
  await browser.close();
  const mergeOut = execSync(`python3 ${path.join(DIR,'merge.py')} ${path.join(DIR,'cover.pdf')} ${path.join(DIR,'body2.pdf')} "${OUT}"`).toString().trim();
  console.log('merge:', mergeOut, '\nwritten:', OUT);
})();
