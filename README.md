# LN-IA — Séance 08 : contrôler, corriger, valider

**Challenge 100 jours · Automne 2026 · Module 02 · Semaine 04**
**Lundi 19 octobre 2026, 19h00 GMT**
Pilotage : **Prof. Abderrahman EL HISSE**.

Ce projet est un **nouvel atelier Vite / JavaScript natif**, rédigé à partir de deux ZIP fournis et du programme de module. Il vise les formateurs, coachs, cadres, entrepreneurs, étudiants et porteurs de projets.

## Démarrer

1. Ouvrir ce dossier `atelier-seance-08-ln-in` dans VS Code.
2. Dans le terminal :

   ```bash
   npm ci
   npm run dev
   ```

3. Ouvrir l'adresse locale annoncée par Vite.
4. Vérifier : `npm run verify`, `npm test`, puis `npm run build`.

Sous Windows, utiliser `npm.cmd` si PowerShell bloque `npm.ps1`.

Pour les essais navigateur : Chrome doit être installé ; exécuter `npm run test:browser` après le build. Si le nettoyage automatique du serveur de test reste en attente sous Windows, lancer `node scripts/serve-built.mjs` dans un terminal distinct avant les tests. Le serveur reproduit le sous-dossier `/atelier-seance-08-ln-ia/`.

**Alternative sans installation :** ouvrir `APERCU-AUTONOME-SEANCE-08.html` dans un navigateur moderne. Le fichier autonome embarque ses styles, scripts et images. Il ne remplace pas le projet Vite pour le déploiement.

## Le site

- **Accueil** : objectif, parcours et livrables.
- **Présentation** : 18 diapositives projetables avec notes.
- **Méthode** : les 6 étapes de l'atelier et la traçabilité.
- **Démonstrations** : 4 cas fictifs (formation, association, entreprise, enseignement).
- **Atelier V1 → V2** : saisie, grille à 8 critères, traces, export Markdown.
- **Prompts** : prompt maître LN-IA et 5 prompts spécialisés, copiables.
- **Flashcards** : 10 cartes ; mini-quiz de 5 questions.
- **Validation** : checklist de fin de module et statuts humains.
- **Ressources** : VS Code, Codex, GitHub Actions, sources conservées.

**Important :** les simulations n'appellent aucun modèle IA et n'effectuent aucune vérification factuelle réelle. L'utilisateur doit interroger lui-même l'outil IA choisi. Les données saisies restent en mémoire de la page, sans stockage centralisé ni transmission automatique. Exportez le Markdown avant de quitter.

## Structure

```text
atelier-seance-08-ln-ia/
├── index.html / main.js / src.css / vite.config.js
├── APERCU-AUTONOME-SEANCE-08.html
├── AGENTS.md
├── prompts/
│   ├── PROMPT-MAITRE-PILOTAGE-CODEX.md
│   ├── PROMPT-MAITRE-CANDIDAT-SEANCE-08.md
│   └── PROMPTS-DE-CONTROLE.md
├── docs/
│   ├── COMMENCER-ICI.md
│   ├── GUIDE-FORMATEUR.md
│   ├── WORKFLOW-LN-IA.md
│   ├── DEPLOIEMENT-GITHUB-PAGES.md
│   └── ANALYSE-SOURCES.md
├── modeles/ — grilles et preuves à compléter
├── exemples/ — cas fictifs documentés
├── public/assets/ — logo et affiche
├── sources-originales/ — archives fournies inchangées
└── .github/workflows/deploy-pages.yml
```

## Publication GitHub Pages

Dépôt : [elhisse-CLPrepas/atelier-seance-08-ln-ia](https://github.com/elhisse-CLPrepas/atelier-seance-08-ln-ia). Publication autorisée et réalisée le 16 octobre 2026 : [ouvrir le site](https://elhisse-clprepas.github.io/atelier-seance-08-ln-ia/). [Workflow initial réussi](https://github.com/elhisse-CLPrepas/atelier-seance-08-ln-ia/actions/runs/38898887930), commit applicatif `ddadd17`. Tests navigateur sur le site public : 3/3 réussis (36,9 s).

1. Le dépôt cible existe déjà ; pour une réutilisation, choisir votre propre dépôt GitHub.
2. Initialiser et pousser ce dossier. Ne pas pousser de documents personnels ou de données confidentielles.
3. Dans **Settings > Pages**, choisir **GitHub Actions**.
4. Le workflow `.github/workflows/deploy-pages.yml` prépare et publie `dist/` après push vers `main`.
5. Vérifier la page, la navigation et les images à l'URL générée par GitHub.

Le `base: './'` de Vite permet l'hébergement à la racine d'un dépôt de projet GitHub Pages. Le workflow a été exécuté avec succès sur le dépôt cible le 16 octobre 2026 ; les jobs build et deploy sont réussis.

## Repères méthodologiques

**LN-IA — 8 étapes :** besoin réel → cadrage → prompt → production → contrôle humain → correction → documentation → preuve.

**Séance 08 :** améliorer un livrable et rendre les corrections vérifiables. Aucune IA ne valide son propre travail.

Les ZIP historiques restent dans `sources-originales/`, conservés localement et exclus du futur dépôt public par `.gitignore`. Certains fichiers contiennent des marqueurs de conflit Git ; voir `docs/ANALYSE-SOURCES.md`. Les documents actifs sont propres et indépendants.

## Présentation et affiches

Thème LN-IA : cible de composition 50 % blanc nuancé, 25 % bleu nuit, 15 % or et 10 % dégradés. Ces proportions sont des repères visuels, variables selon la vue et la largeur d'écran. Les cartes disposent de reliefs et de reflets 3D discrets, désactivés avec la préférence « réduire les animations ».

Les sept PNG de `affiches/` sont conservés. Leurs copies WebP optimisées sont dans `public/assets/affiches/`. La séance 08 accompagne l'accueil et la validation, la séance 07 les prompts, les séances 05–06 la méthode. L'affiche « Bases du prompt » accompagne spécifiquement la séance 05 du 9 octobre 2026. La vue d'ensemble du module est dans les ressources avec une note sur sa mention historique de semaine.

Application liée : [Atelier Landing Pages LN-IA](https://elhisse-clprepas.github.io/Atelier-Landing-Pages-LN-IA/), accessible depuis l'accueil et les ressources, sans transfert automatique des saisies.

Après une modification du HTML, des styles, du JavaScript ou des images : `npm run standalone` régénère l'aperçu autonome. Si les affiches changent, `python scripts/prepare-posters.py` (Pillow requis) prépare leurs copies WebP avant cette régénération.

Consulter `docs/JOURNAL-QUALITE.md` et `docs/CONTROLES-TECHNIQUES.md` pour les tests et les limites de la reprise.
