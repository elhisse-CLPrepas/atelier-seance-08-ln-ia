# Analyse et conservation des sources reçues

## Archives inspectées

- `ATELIER-seance-08.zip` : site HTML existant, guide formateur, exemples, prompts Oria-Code/Codex, supports de collecte cPanel/PHP, exports et maquettes.
- `supports-seance-08.zip` : support candidat, affiche, version GitHub Pages statique et module de collecte.
- `semaine-03&04-v1.md` : document source du Module 02.

## Points confirmés par les supports

- Le Module 02 s'étend sur **les semaines 03 et 04**, soit **les séances 05 à 08**.
- La séance 08 met au premier plan **le contrôle et la correction des réponses IA** et la **finalisation d'un livrable présentable**.
- Le modèle de validation contient huit critères : conformité à la demande, clarté, vérifiabilité, ton, format, protection des données, caractère exploitable et signalement des limites.
- Le candidat conserve une trace entre le prompt, V1, les corrections et V2.
- Le support prévoit une présentation orale courte et des questions de feedback.

## Écarts et difficultés constatés

1. Le document de programme `semaine-03&04-v1.md` et certains HTML historiques comportent des marqueurs de conflit Git (`<<<<<<<`, `=======`, `>>>>>>>`) répétés. Ils sont **préservés intacts** dans les archives mais ne sont pas utilisés comme code actif du nouveau site.
2. Deux variations de l'objectif séance 08 coexistent : « contrôler les réponses IA » et « nettoyer et présenter un livrable ». La présente version les articule en séquence de qualité, sans prétendre que les sources sont identiques.
3. Les conventions de dossier mentionnent par endroits `01-PROMPTS/` et ailleurs `02-prompts/`. L'atelier utilise `02-prompts/` pour la progression candidat 2026, et conserve les deux formulations dans les archives.
4. Les supports comprennent une collecte centralisée optionnelle via PHP/cPanel. Le **nouveau site Vite ne déploie pas ce service** : aucun formulaire ne transmet de données. Les éléments historiques restent consultables dans les ZIP.

## Éléments de conception ajoutés au nouveau pack

- 18 diapositives projetables, quatre démonstrations fictives et dix flashcards.
- Grille interactive et exports Markdown.
- Prompt maître standard de contrôle et pilotage Codex.
- Déploiement automatique GitHub Pages par GitHub Actions.

Ces éléments sont des enrichissements de production pour l'atelier 08, et ne constituent pas des contenus préexistants dans la totalité des supports.
