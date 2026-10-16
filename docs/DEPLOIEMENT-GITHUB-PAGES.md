# Publication LN-IA Séance 08 sur GitHub Pages

## État actuel — publication réussie le 16 octobre 2026

[Site public vérifié](https://elhisse-clprepas.github.io/atelier-seance-08-ln-ia/) · [workflow initial réussi](https://github.com/elhisse-CLPrepas/atelier-seance-08-ln-ia/actions/runs/38898887930) · commit applicatif `ddadd17`. Git est initialisé sur main et suit origin/main. Pages utilise GitHub Actions. Tests navigateur distants : 3/3 réussis, avec contrôles ordinateur/mobile et aperçu autonome local.

Les étapes ci-dessous sont conservées comme procédure de référence.

## 1. Ouvrir VS Code

```bash
npm ci
npm run dev
```

Vérifier le site localement puis exécuter :

```bash
npm run build
```

Le répertoire `dist/` est créé si le build réussit.

## 2. Dépôt Git

Le dépôt cible existe : https://github.com/elhisse-CLPrepas/atelier-seance-08-ln-ia.git. État initial avant publication : dépôt sans branche et Pages non configuré. Ces étapes ont depuis été réalisées ; consulter le bilan en tête de document.

Après accord explicite du formateur, initialiser et publier le dossier revu :

```bash
git init -b main
git add .
git commit -m "feat: relancer l'atelier LN-IA séance 08 avec affiches et thème clair"
git remote add origin https://github.com/elhisse-CLPrepas/atelier-seance-08-ln-ia.git
git push -u origin main
```

Effectuer commit et push seulement après accord et inspection des fichiers. Les archives restent conservées localement dans ce pack et sont exclues du futur dépôt public par `.gitignore`. `node_modules/`, `dist/`, les résultats de tests et les secrets `.env` sont aussi ignorés. Le site Pages publie uniquement `dist/`.

## 3. GitHub Pages

- Dépôt → `Settings` → `Pages`.
- Choisir `Build and deployment` → `Source : GitHub Actions`.
- Le workflow `.github/workflows/deploy-pages.yml` se déclenche sur un push vers `main` ou à la demande.
- Il installe Node 22 et les dépendances verrouillées via `npm ci`, exécute le contrôle statique et les tests ciblés, construit Vite, puis publie `dist/`.
- Dans `Actions`, ouvrir le run et vérifier qu'il est passé.
- Consulter l'adresse GitHub Pages affichée par GitHub. Ne pas inventer cette adresse avant publication.

## 4. Vérifier la publication

- Logo et affiche visibles.
- Navigation des neuf rubriques.
- Avance/retour des 18 diapositives.
- Flashcards et quiz.
- Grille de contrôle, exemple fictif et téléchargements Markdown.
- Aucun document personnel accessible.
- Affichage sur téléphone.
- Sept affiches réparties selon leur contenu, affichées en entier et ouvrables.
- Lien « Ouvrir l’application LN-IA » vers l'atelier Landing Pages.

## Contrôles locaux avant publication

```bash
npm ci
npm run verify
npm test
npm run standalone
npm run build
npm run test:browser
```

Les tests Playwright emploient Chrome installé et reproduisent le chemin `/atelier-seance-08-ln-ia/`. Leur serveur local n'effectue aucune publication. La réussite locale ne prouve pas la réussite de GitHub Actions ; l'URL du site cible ne sera annoncée comme opérationnelle qu'après vérification réelle.

## 5. Limites

GitHub Pages fournit des pages statiques : il ne centralise pas les saisies des candidats. Le nouveau site ne stocke ni ne transmet les données saisies. Une collecte réelle requiert une solution distincte, avec consentement et protection adaptée. Les solutions PHP/cPanel de l'archive historique ne sont pas intégrées au déploiement Vite actuel.
