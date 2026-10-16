import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dossierStatus, fencedMarkdown } from '../lib/quality.js';

const complete = { Titre:'Cas fictif', Public:'Groupe test', Besoin:'Tester', Format:'Fiche projet', Prompt:'Consigne', V1:'Brouillon', Corrections:'Correction documentée', V2:'Texte corrigé', Sources:'Contrôle fictif', Limites:'Aucune limite identifiée dans ce scénario fictif', Feedback:'1. Est-ce clair ?\n2. Que manque-t-il ?' };
const criteria = Array.from({ length: 8 }, () => ({ status:'conforme' }));
test('une revue humaine reste nécessaire même lorsque toutes les rubriques sont remplies', () => {
  assert.equal(dossierStatus(complete, criteria, true)[0], 'Prêt pour revue humaine');
  assert.equal(dossierStatus(complete, criteria, false)[0], 'Contrôle à finaliser');
});
test('les points non vérifiés et les pièces manquantes bloquent la complétude', () => {
  assert.equal(dossierStatus(complete, [...criteria.slice(1), { status:'non-verifie' }], true)[0], 'À revoir / compléter');
  for (const key of ['Sources', 'Limites', 'Feedback']) {
    assert.equal(dossierStatus({ ...complete, [key]:'' }, criteria, true)[0], 'Contrôle à finaliser');
  }
  assert.equal(dossierStatus({ ...complete, Feedback:'Une seule question ?' }, criteria, true)[0], 'Contrôle à finaliser');
  assert.equal(dossierStatus({ ...complete, Format:'' }, criteria, true)[0], 'À compléter');
});
test('les blocs Markdown conservent espaces, titres et délimiteurs imbriqués', () => {
  const original = '  \n# Titre\n```js\nconst x = 1;\n```\n  ';
  const wrapped = fencedMarkdown(original);
  assert.equal(wrapped, '````text\n' + original + '\n````');
});
