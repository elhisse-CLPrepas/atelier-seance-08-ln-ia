# Journal de contrôle technique — Atelier 08

## Reprise contrôlée du 16 octobre 2026 — état actuel

- Installation npm réussie via `npm.cmd` ; verrou `package-lock.json` généré.
- `npm.cmd run verify`, `npm.cmd test` (3/3), `npm.cmd run standalone` et `npm.cmd run build` : réussis.
- Tests navigateur relancés sur le build sous `/atelier-seance-08-ln-ia/` : `node node_modules/@playwright/test/cli.js test`, 3/3 réussis, code de sortie 0. Le serveur a été lancé séparément pour éviter un nettoyage bloqué sous Windows lors du premier essai.
- Parcours : neuf vues, 18 diapositives, quatre démonstrations fictives, flashcards au clavier, quiz 5/5 et reset, copie de prompts, trois téléchargements Markdown, statuts et réinitialisation. Espaces et titres des productions exportées conservés ; délimiteurs Markdown imbriqués testés.
- Les six affiches chargent sans erreur et apparaissent dans les rubriques correspondant à leur contenu. Images ouvrables et non recadrées. Note de contexte ajoutée à la vue d'ensemble du module.
- Mobile : neuf vues à 390 et 320 px sans débordement horizontal de page ; préférence de réduction des animations respectée. Captures ordinateur/mobile relues et remplacées dans le pack.
- Aperçu autonome depuis le fichier local, réseau bloqué : image, cas fictif et export opérationnels.
- Application Landing Pages : HTTP 200, titre de page attendu. Aucun parcours fonctionnel complet réalisé sur cette application externe.
- `npm.cmd audit --json` : aucune vulnérabilité signalée au moment du contrôle.
- Dépôt GitHub cible accessible et vide ; Pages non configuré. Aucun commit, push ni déploiement exécuté. Plein écran, copie de secours, lecteur d'écran, Safari/Firefox et appareil mobile physique non retestés.

Voir `JOURNAL-QUALITE.md` pour les changements, limites et demande d'accord avant publication.

## Historique du pack avant reprise

Les sections ci-dessous conservent les déclarations du pack initial. Leur limite sur l'installation et le build est levée par les essais actuels ci-dessus.

## Tests réalisés (16 octobre 2026)

- `node --check main.js` : syntaxe JavaScript valide.
- Aperçu autonome : chargé via l'API Chromium/Playwright de rendu du HTML (politique de navigateur empêchant la navigation vers file:// et localhost), sans erreur JavaScript.
- Navigation : les 9 vues s'affichent correctement.
- Présentation : passage de la diapositive 1 à 3 par boutons et clavier.
- Démonstrations : sélection de 2 cas différents.
- Flashcards : retournement et passage à la carte suivante.
- Quiz : réponse à 5 questions ; score affiché, 5/5 lors du scénario de test.
- Atelier : chargement du cas fictif, corrections, passage du statut « À revoir / compléter » à « Prêt pour revue humaine » après saisie d'un contrôle de test et attestation.
- Exports : fichiers `grille-controle-reponses-ia.md`, `reponse-ia-corrigee-v2.md` et `checklist-validation-seance-08.md` téléchargés pendant les essais.
- Mobile 390 px : aucun débordement horizontal détecté ; affichage de l'atelier vérifié.
- Captures : accueil, présentation, atelier, mobile.

## Non vérifié dans cet environnement

- `npm install` et `npm run build` sur le projet Vite : registre npm injoignable (erreur DNS EAI_AGAIN).
- Exécution réelle du workflow GitHub Actions et chargement du site sur GitHub Pages : aucun dépôt cible n'a été connecté/publié.
- Vérification factuelle des textes des candidats : à réaliser par chaque participant et le formateur.

## Limites fonctionnelles

- Pas d'appel à un modèle IA : démonstrations fictives ; utiliser ChatGPT ou autre outil pour le test réel.
- Pas de collecte ni d'enregistrement centralisé des saisies de formulaire.
- Les statuts affichés ne constituent pas une certification automatique.

## Ajout final séance 05 — 16 octobre 2026

Sept affiches intégrées après ajout de « Bases du prompt » à la méthode. Contrôle statique, trois tests ciblés, régénération autonome et build réussis. Tests navigateur : **3 passed (32.5s), code de sortie 0**. Autorisation explicite reçue pour Git, push et Pages ; résultats de publication à consigner après contrôle distant.

## Déploiement et tests distants réussis — 16 octobre 2026

Site vérifié : [https://elhisse-clprepas.github.io/atelier-seance-08-ln-ia/](https://elhisse-clprepas.github.io/atelier-seance-08-ln-ia/). Commit applicatif `ddadd17` ; [workflow](https://github.com/elhisse-CLPrepas/atelier-seance-08-ln-ia/actions/runs/38898887930) réussi (build et deploy). HTTP 200 et titre attendu. Playwright sur la version publiée : scénarios ordinateur/mobile réussis, aperçu autonome local également réussi ; **3 passed (36.9s), code de sortie 0**. Sept affiches et exports testés. Les réserves de non-publication des sections historiques sont levées. Limites restantes documentées dans JOURNAL-QUALITE.md.
