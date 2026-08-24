// ============================================================
//  Automations-Engine
//  Laedt automations.json und entscheidet, welche Regel auf
//  einen Kommentar passt.
// ============================================================

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = join(__dirname, '..', 'automations.json');

let rules = [];

/** Regeln aus automations.json (neu) laden. */
export function loadRules() {
  const raw = readFileSync(CONFIG_PATH, 'utf8');
  rules = JSON.parse(raw).rules || [];
  return rules;
}

/**
 * Erste Regel finden, deren Keyword im Kommentartext vorkommt.
 * Leeres keywords-Array = Catch-All (matcht immer).
 * @param {string} text - Kommentartext
 * @returns {object|null} passende Regel oder null
 */
export function matchRule(text) {
  const lower = (text || '').toLowerCase();
  for (const rule of rules) {
    const kws = rule.keywords || [];
    if (kws.length === 0) return rule; // Catch-All
    if (kws.some((kw) => lower.includes(kw.toLowerCase()))) return rule;
  }
  return null;
}

// Beim Import direkt einmal laden.
loadRules();
