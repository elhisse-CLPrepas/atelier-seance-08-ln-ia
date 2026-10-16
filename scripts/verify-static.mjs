import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const get = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const html = get('index.html');
const js = get('main.js');
const css = get('src.css');
const theme = get('theme-ln-ia.css');
const requiredViews = ['accueil','presentation','methode','demos','atelier','prompts','cartes','validation','ressources'];
for (const view of requiredViews) {
  if (!html.includes(`id="view-${view}"`)) throw Error('Vue manquante : '+view);
}
for (const asset of ['public/assets/logo-LN-IA.webp','public/assets/affiche-seance-08.webp','.github/workflows/deploy-pages.yml','AGENTS.md','prompts/PROMPT-MAITRE-PILOTAGE-CODEX.md']) {
  if (!fs.existsSync(path.join(root,asset))) throw Error('Fichier manquant : '+asset);
}
for (const [file,text] of [['index.html',html],['main.js',js],['src.css',css],['theme-ln-ia.css',theme],['lib/quality.js',get('lib/quality.js')]]) {
  if (/^<<<<<<< |^>>>>>>> |^=======\s*$/m.test(text)) throw Error(`Marqueur de conflit Git dans ${file}`);
}
for (const match of html.matchAll(/(?:src|href)="\.\/([^"#]+)"/g)) {
  const relative = match[1];
  const location = relative.startsWith('assets/') ? 'public/' + relative : relative;
  if (!fs.existsSync(path.join(root, location))) throw Error('Lien local manquant : ' + relative);
}
const posters = fs.readdirSync(path.join(root, 'public/assets/affiches')).filter(name => name.endsWith('.webp'));
if (posters.length !== 7) throw Error('Sept affiches optimisées sont attendues.');
for (const poster of posters) {
  if (!html.includes('assets/affiches/' + poster)) throw Error('Affiche non intégrée : ' + poster);
}
for (const phrase of ['controlCriteria','buildTrace','renderSlide','renderQuiz','chosenCriteria','downloadV2']) {
  if (!js.includes(phrase)) throw Error('Fonction requise introuvable : '+phrase);
}
console.log(`Contrôle statique réussi : ${requiredViews.length} vues et ressources LN-IA présentes.`);
