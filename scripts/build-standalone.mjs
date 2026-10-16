import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
let html = read('index.html');
const css = read('src.css');
const quality = read('lib/quality.js').replace(/^export /gm, '');
const js = read('main.js').replace(/^import .*from '\.\/lib\/quality\.js';\r?\n/m, '');
html = html.replace('<link rel="stylesheet" href="./src.css" />', `<style>${css}</style>`);
html = html.replace('<link rel="stylesheet" href="./theme-ln-ia.css" />', `<style>${read('theme-ln-ia.css')}</style>`);
html = html.replace('<script type="module" src="./main.js"></script>', () => `<script type="module">${quality}\n${js}</script>`);
// Même image intégrée pour le lien d'ouverture et la vignette : aucun réseau requis.
html = html.replace(/(?:\.\/assets\/)[a-zA-Z0-9/_.-]+\.webp/g, url => {
  const data = fs.readFileSync(path.join(root, 'public', url.slice(2)));
  return `data:image/webp;base64,${data.toString('base64')}`;
});
fs.writeFileSync(path.join(root, 'APERCU-AUTONOME-SEANCE-08.html'), html);
console.log('Aperçu autonome régénéré depuis les fichiers actifs.');
