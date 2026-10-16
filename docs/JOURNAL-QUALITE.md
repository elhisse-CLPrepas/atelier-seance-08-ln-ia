# Audit du dossier — 16 octobre 2026

> Historique : les constats ci-dessous décrivent le premier audit. La reprise de production et ses résultats actualisés figurent en fin de document.

## Périmètre

Lecture des cinq documents prioritaires, du HTML actif, du JavaScript, du CSS, du script de vérification, de la configuration Vite et du workflow Pages. Inventaire des archives originales, sans modification ni extraction exhaustive. Audit uniquement : aucune correction du site, aucun commit, aucune publication.

## Résultat

La structure pédagogique et technique est cohérente. Les neuf vues et les ressources requises passent le contrôle statique. L'identité LN-IA, l'attribution au Prof. Abderrahman EL HISSE, les mentions de démonstration fictive et la réserve de validation humaine sont présentes. Aucun appel réseau ni stockage navigateur n'a été repéré dans le code actif examiné. Ce constat ne constitue pas un audit exhaustif de confidentialité des archives.

## Écarts constatés à la lecture du code

1. **Fidélité des exports :** `val()` applique `trim()` à toutes les saisies (`main.js`, ligne 89). L'export V1 ne conserve donc pas exactement les espaces et sauts de ligne initiaux et finaux malgré sa mention « conserver à l'identique ». `safeMd()` transforme les titres Markdown en texte précédé d'un tiret long ; son application à V2 dans `buildTrace()` modifie le livrable. Préserver les valeurs brutes des productions et choisir des délimiteurs de blocs adaptés si elles contiennent déjà des triples accents graves.
2. **Contrôle incomplet de la complétude :** `status()` exige seulement un texte non vide pour le feedback ; une seule question suffit malgré les deux questions demandées. Le format et les limites ne sont pas exigés. Après réinitialisation, le format devient vide. Définir précisément les champs obligatoires, en autorisant une mention explicite « aucune limite identifiée » si nécessaire.
3. **Copie de secours :** `fallbackCopy()` annonce le succès même si `document.execCommand('copy')` renvoie `false`. Vérifier le résultat avant le message de réussite.
4. **Reproductibilité :** aucun `package-lock.json` fourni ; le workflow installe une plage de versions avec `npm install`. Fournir un verrou après installation réussie et envisager `npm ci` pour stabiliser les builds.
5. **Couverture limitée :** `verify-static.mjs` teste surtout la présence de chaînes et de ressources. Il ne valide ni les interactions, ni les contenus exportés, ni le responsive.

## Tests réellement exécutés pendant cet audit

- Node disponible : v24.12.0 ; npm : 11.6.2.
- `npm run verify` : réussi, neuf vues et ressources présentes ; `node --check main.js` inclus et réussi.
- Recherche de marqueurs de conflit dans index.html, main.js, src.css, docs, prompts, modeles, exemples et scripts : aucun résultat.
- `git status --short` : impossible, aucun dépôt Git à cet emplacement.
- `npm run build` : échec, commande Vite indisponible faute de dépendances installées.
- Tentative `npm install` : bloquée par la politique PowerShell pour npm.ps1 ; nouvel essai avec `npm.cmd install --no-audit --no-fund`, sans résultat après attente, interrompu. Aucune installation réussie ni compilation réussie annoncée.
- Un essai de vérification ciblée par `node -e` a échoué à cause des guillemets transmis par PowerShell ; aucun résultat fonctionnel n'en est déduit.
- Recherche indicative de secrets dans .github, .vscode, prompts, modeles et exemples : aucun secret évident repéré ; non exhaustive.

## Points non vérifiés

Navigation réelle, 18 diapositives, quatre démonstrations, flashcards, quiz, copie et téléchargements dans un navigateur ; rendu mobile ; accessibilité avec lecteur d'écran ; concordance exacte entre aperçu autonome et code Vite ; intégrité historique et données privées des ZIP ; audit des dépendances ; build final ; exécution GitHub Actions et site publié.

Les tests relatés dans CONTROLES-TECHNIQUES.md sont des déclarations antérieures du pack et n'ont pas été reproduits ici. Le workflow a été relu uniquement ; le base relatif Vite est cohérent avec un hébergement de projet, sans preuve de déploiement.

## Suite recommandée

Corriger en priorité la fidélité des exports, terminer l'installation des dépendances, relancer verify et build, puis effectuer les essais navigateur sur ordinateur et mobile. La validation pédagogique et la décision de publication restent humaines.

## Reprise de production demandée — 16 octobre 2026

### Diagnostic et plan

Prompt de pilotage relu et appliqué. Plan communiqué avant les changements : classer les six affiches, ajouter l'application liée, reprendre le thème, corriger les écarts d'export et de complétude, préparer les contrôles et le déploiement. Aucun dépôt Git local ; branche et diff Git indisponibles. Le dépôt distant `elhisse-CLPrepas/atelier-seance-08-ln-ia` est accessible et vide (`gh repo view`, `git ls-remote`). L'API Pages renvoie 404 : aucune configuration Pages constatée.

### Modifications et corrections

- `index.html` : affiche séance 08 à l'accueil et à la validation ; prérequis séance 07 dans les prompts ; séances 05–06 dans la méthode ; vue d'ensemble du module dans les ressources avec note sur la mention historique de semaine. Images entières et ouvrables. Application Landing Pages liée à l'accueil et dans les ressources, dans un nouvel onglet.
- `theme-ln-ia.css` : thème clair, blanc nuancé, bleu nuit, or et dégradés ; cible visuelle 50/25/15/10, variable selon les vues et l'écran. Reliefs, reflets lumineux lents et flashcard inclinée au retournement. Réduction des animations respectée. Le support projetable reste sombre pour la projection.
- `main.js` et `lib/quality.js` : V1 et V2 exportées sans suppression d'espaces ni transformation de leurs titres ; clôtures Markdown adaptées au contenu. Format, limites, deux lignes de feedback et attestation exigés avant « Prêt pour revue humaine ». Cette indication reste une complétude, sans certification. Format rétabli à la réinitialisation. Échec de copie de secours détecté.
- `scripts/prepare-posters.py` : copies WebP des six PNG, originaux inchangés. Les six copies totalisent environ 1,58 Mo ; les PNG d'origine totalisent environ 12,27 Mo (unités décimales).
- `scripts/build-standalone.mjs` : aperçu autonome reconstruit depuis les fichiers actifs, images intégrées et même logique que Vite.
- `package.json`, `package-lock.json`, tests et configuration Playwright : dépendances verrouillées, trois tests ciblés et trois scénarios navigateur reproductibles. Contrôle statique étendu aux six affiches et liens locaux.
- Workflow : `npm ci`, cache npm et tests ciblés avant le build. Documentation de déploiement renseignée avec le dépôt cible.
- `.gitignore` : archives historiques conservées localement et exclues du futur dépôt public, ainsi que les résultats de tests. Aucune suppression d'archive.
- Aperçus visuels du pack actualisés depuis les captures de contrôle (données fictives uniquement).

### Tests exécutés et résultats observés

- `npm.cmd install --no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000` : réussi. Installation de Playwright réussie également.
- `npm.cmd run verify` : réussi, neuf vues, ressources et syntaxe valides.
- `npm.cmd test` : trois tests réussis (complétude, absence de validation automatique, fidélité des blocs Markdown).
- `npm.cmd run standalone` : réussi.
- `npm.cmd run build` : réussi avec Vite 6.4.4 ; sortie `dist/`.
- `npm.cmd run test:browser` : trois scénarios ont affiché leur réussite mais le nettoyage du serveur est resté en attente sous Windows ; cette première exécution a été interrompue. Après lancement du serveur séparément et réutilisation par Playwright, `node node_modules/@playwright/test/cli.js test` : **3 passed (46.7s), code de sortie 0**.
- Parcours desktop : neuf vues, 18 diapositives, clavier gauche, quatre démonstrations, retournement de flashcard au clavier, navigation de cartes, quiz 5/5 et remise à zéro, copie des prompts, trois téléchargements Markdown, statut de dossier, réinitialisation annulée puis confirmée. Vérification des espaces, titres et clôtures imbriquées dans les exports téléchargés. Aucune erreur JavaScript ni réponse HTTP en échec pendant ce scénario.
- Mobile : neuf vues à 390 et 320 px, aucun débordement horizontal de page ; navigation horizontalement défilante prévue. Captures accueil et atelier ; réduction des animations contrôlée.
- Aperçu autonome ouvert depuis le fichier local, réseau bloqué : image, chargement du cas fictif et export testés sans erreur JavaScript.
- Chemin de déploiement reproduit localement : `/atelier-seance-08-ln-ia/` ; assets et navigation fonctionnent.
- `npm.cmd audit --json` : zéro vulnérabilité signalée à la date du contrôle ; cela ne vaut pas garantie de sécurité.
- Application liée : requête HTTP réussie, statut 200, titre « Atelier Landing Pages | LN-IA ».
- Captures desktop et mobile relues visuellement. Les archives originales n'ont pas été modifiées ; aucune donnée réelle de candidat n'a été ajoutée.

### Points non vérifiés et validation attendue

Pas de commit, push ou publication. GitHub Actions, configuration Pages et site distant de la séance 08 restent à vérifier après accord explicite, conformément aux étapes 8 et 9 du prompt de pilotage. L'application liée a été contrôlée par HTTP, pas par un parcours fonctionnel complet. Plein écran, lecteur d'écran, Safari/Firefox, téléphone physique et branche de copie de secours non retestés. Les pourcentages de couleur sont des objectifs de composition, pas une mesure pixel par pixel. Deux lignes de feedback sont contrôlées ; leur qualité et leur pertinence restent humaines.

### Prochaine action

Faire revoir l'aperçu local au formateur, puis demander l'accord pour initialiser Git, créer le commit, pousser vers le dépôt cible et activer GitHub Pages. Message de commit proposé : `feat: relancer l'atelier LN-IA séance 08 avec affiches et thème clair`.

## Ajout séance 05 et publication autorisée — 16 octobre 2026

Le formateur a explicitement autorisé Git, le commit, le push et Pages. Affiche « Bases du prompt » du 9 octobre 2026 ajoutée à la méthode, copie WebP intégrée et PNG original conservé. Sept affiches sont présentes ; la méthode affiche deux colonnes sur ordinateur et une sur mobile.

Après cet ajout : aperçu autonome régénéré, contrôle statique réussi, trois tests ciblés réussis et build Vite réussi. Scénarios Playwright : **3 passed (32.5s), code de sortie 0**, comprenant l'affiche séance 05, les exports et le mobile.

Git initialisé sur main ; exception de confiance limitée à ce projet nécessaire pour la différence de propriétaire Windows du dossier et du répertoire .git créé par l'environnement d'exécution. Archives originales, dépendances, build et résultats temporaires restent ignorés. PLAYWRIGHT_BASE_URL permet les mêmes contrôles sur le site distant.

## Publication réelle vérifiée — 16 octobre 2026

- Autorisation explicite du formateur reçue ; Git initialisé sur main, origine configurée et commit applicatif `ddadd17004ef2b7e0ba50646f514d0b132b79dc0` poussé. Contrôle des fichiers indexés : archives, node_modules, dist et résultats temporaires absents ; recherche indicative de clés privées et tokens sans résultat. Contrôle diff sans erreur sur le code actif ; espaces Markdown historiques conservés.
- GitHub Pages activé avec `build_type=workflow`.
- [Workflow 38898887930](https://github.com/elhisse-CLPrepas/atelier-seance-08-ln-ia/actions/runs/38898887930) : conclusion success, jobs build et deploy réussis. Installation verrouillée, contrôle statique, tests ciblés et build exécutés sur GitHub. Déploiement terminé à 12:12:44 UTC (13:12:44 Africa/Casablanca).
- [Site public](https://elhisse-clprepas.github.io/atelier-seance-08-ln-ia/) : réponse HTTP 200, titre LN-IA attendu.
- Tests Playwright avec PLAYWRIGHT_BASE_URL réglé sur le site public : **3 passed (36.9s), code de sortie 0**. Les deux scénarios ordinateur/mobile ciblent le site distant ; le troisième recontrôle l'aperçu autonome local sans réseau. Sept affiches, navigation, quiz, copies et exports testés. Aucun échec de chargement ni erreur JavaScript pendant le scénario desktop.
- Documentation actualisée dans un commit séparé, avec marqueur [skip ci] pour éviter un second déploiement identique : seuls des fichiers Markdown changent.
- Limites restantes : validation pédagogique humaine, lecteur d'écran, Safari/Firefox, appareil mobile physique, plein écran et copie de secours. L'application Landing Pages liée n'a fait l'objet que d'un contrôle HTTP. Aucun service IA n'a été ajouté ; aucune donnée réelle de candidat n'a été publiée.
