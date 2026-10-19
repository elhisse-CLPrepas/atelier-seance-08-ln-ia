import { dossierStatus, fencedMarkdown } from './lib/quality.js';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const LF = '\n';
const fields = ['Titre','Public','Besoin','Format','Prompt','V1','Sources','Corrections','V2','Limites','Feedback'];
const controlCriteria = [
  ['Fidélité à la demande', 'Le résultat répond-il au besoin réel ?'],
  ['Clarté', 'Le contenu est-il compréhensible par la cible ?'],
  ['Exactitude et vérifiabilité', 'Les faits essentiels ont-ils été vérifiés dans les sources ?'],
  ['Adaptation au public', 'Le ton et les mots sont-ils adaptés ?'],
  ['Respect du format', 'Le document est-il conforme au format demandé ?'],
  ['Confidentialité', 'Les données privées et sensibles sont-elles protégées ?'],
  ['Utilité', 'Le livrable peut-il réellement être utilisé ?'],
  ['Limites explicites', 'Les incertitudes et améliorations restantes sont-elles identifiées ?']
];
const methodCards = [
  ['1', 'Cadrer', 'Décrire le besoin réel et le public.', 'Ex. : une fiche pour accueillir des bénévoles.'],
  ['2', 'Produire V1', 'Utiliser un prompt structuré puis conserver la réponse brute.', 'Ne pas maquiller la réponse initiale.'],
  ['3', 'Contrôler', 'Vérifier huit critères et relever les écarts.', 'Classer les faits non vérifiés comme « non vérifié ».'],
  ['4', 'Corriger', 'Supprimer, compléter et reformuler avec justification.', 'Ex. : remplacer une promesse par une formule prudente.'],
  ['5', 'Valider humainement', 'Relire la V2 et décider du statut du livrable.', 'À revoir si une erreur importante subsiste.'],
  ['6', 'Documenter et prouver', 'Conserver V1, grille, corrections, V2 et preuves.', 'Documenter la date et le responsable de la décision.']
];
const slides = [
 {tag:'OUVERTURE',title:'Séance 08 — Contrôle, correction et validation',items:['Module 02 · Semaine 04 · Lundi 19 octobre 2026','Objectif : du brouillon au livrable présentable','Le prompt maître guide le travail ; l’humain garde la décision.'],note:'Demander aux participants d’apporter une production déjà commencée. Introduire le parcours de qualité.'},
 {tag:'CADRE',title:'Ce que vous savez déjà faire',items:['Séance 05 : formuler un besoin clair','Séance 06 : structurer le prompt','Séance 07 : définir un prompt maître personnel','Séance 08 : <strong>éprouver, corriger, justifier et documenter.</strong>'],note:'Rappeler la continuité des séances et le principe du module sur deux semaines.'},
 {tag:'OBJECTIF',title:'Ce que chacun doit obtenir',items:['Un livrable amélioré V2','Une grille de contrôle complétée','La trace des corrections humaines','Une mini-présentation de 3 à 5 minutes'],note:'Présenter le dossier final : plus important que le volume produit, la preuve de qualité.'},
 {tag:'PRINCIPE',title:'Une réponse IA n’est pas une preuve',items:['L’IA peut produire un texte convaincant et néanmoins inexact.','La réponse doit être comparée au besoin initial.','Les données importantes doivent être vérifiées.','La validation appartient au candidat et au formateur.'],note:'Faire reformuler par un candidat les quatre règles LN-IA.'},
 {tag:'PROCESSUS',title:'Le workflow LN-IA en 8 étapes',items:['Besoin réel → Cadrage → Prompt → Production','Contrôle humain → Correction → Documentation → Preuve','Une version V1 reste traçable avant création de V2.'],note:'Mettre en évidence les différences entre production, correction et preuve.'},
 {tag:'PROMPT MAÎTRE',title:'Un cadre stable, des missions variables',items:['Le prompt maître décrit profil, objectifs et règles de travail.','La mission de séance 08 décrit le livrable à contrôler.','Ne pas confondre <strong>cadre permanent</strong> et <strong>consigne ponctuelle</strong>.'],note:'Faire relire les sept rubriques du prompt maître personnel vu en séance 07.'},
 {tag:'GRILLE',title:'Huit critères pour contrôler',items:['Fidélité, clarté, exactitude, adaptation','Format, confidentialité, utilité, limites','Pour chaque point : Conforme / À corriger / Non vérifié.'],note:'Insister sur le sens de « non vérifié » : ne jamais le convertir par défaut en conforme.'},
 {tag:'DÉMONSTRATION 01',title:'Quand une fiche invente une règle',items:['Brouillon fictif : « Tous les nouveaux membres sont formés en deux heures. »','Problème : délai non établi par la source.','V2 : « La durée de formation est communiquée par le responsable. »'],note:'Faire identifier le fait invérifiable puis les modifications apportées.'},
 {tag:'DÉMONSTRATION 02',title:'Quand le message exagère le résultat',items:['Brouillon fictif : « L’IA garantit 100 % de réussite. »','Problème : promesse injustifiée et inadaptée.','V2 : « Cet atelier vous aide à pratiquer l’IA et à contrôler vos résultats. »'],note:'Demander quel critère de la grille détecte ce problème.'},
 {tag:'DÉMONSTRATION 03',title:'Quand la fiche projet reste floue',items:['Brouillon fictif : « Créer un site pour tout le monde ».','Problème : public, mission et preuve non définis.','V2 : préciser la cible, trois fonctionnalités, un test et une limite.'],note:'Faire observer la différence entre une idée et un livrable testable.'},
 {tag:'ATELIER',title:'Exercice 1 — Préparer le dossier',items:['Choisir un seul livrable réel.','Rappeler la cible et le besoin traité.','Coller la réponse IA V1 sans la modifier.','Identifier les données à protéger.'],note:'10 à 15 minutes, seul ou par binôme selon le groupe.'},
 {tag:'ATELIER',title:'Exercice 2 — Contrôler la V1',items:['Remplir la grille à huit critères.','Lister les faits contrôlés et les sources consultées.','Signaler les points non vérifiés et les limites.'],note:'Aucune génération réelle n’est effectuée par le site : utiliser l’outil IA choisi par le candidat.'},
 {tag:'ATELIER',title:'Exercice 3 — Corriger en V2',items:['Rédiger un prompt de correction ciblé.','Appliquer les modifications utiles.','Noter quelles décisions ont été prises par l’humain.','Relire la version finale en comparant avec V1.'],note:'La traçabilité est essentielle : ne pas écraser les anciennes versions.'},
 {tag:'TRACES',title:'La preuve n’est pas un slogan',items:['Conserver prompt et réponse V1','Conserver grille et sources réellement utilisées','Conserver journal de correction','Conserver V2 et conclusion de validation'],note:'Montrer le dossier 02-prompts et la preuve du portfolio.'},
 {tag:'FEEDBACK',title:'Présenter en moins de 5 minutes',items:['Quel était le besoin initial ?','Que vous a proposé l’IA ?','Qu’avez-vous contrôlé et corrigé ?','Quelle limite reste à traiter ?','Quel feedback attendez-vous ?'],note:'Donner 3 minutes à un volontaire, puis faire poser deux questions précises.'},
 {tag:'STATUTS',title:'VALIDÉ · À COMPLÉTER · À REVOIR',items:['VALIDÉ : preuves suffisantes et accord humain explicite.','À COMPLÉTER : une pièce ou correction manque.','À REVOIR : erreur majeure ou inadéquation au besoin.'],note:'Le site ne valide pas automatiquement le travail du candidat.'},
 {tag:'PUBLICATION',title:'VS Code → Codex → GitHub Pages',items:['Inspecter avant d’éditer, conserver les sources','Tester localement et documenter le résultat','Versionner via Git, pousser après accord','Publier avec GitHub Actions et vérifier le site'],note:'Les étapes de GitHub Actions doivent être validées sur le dépôt cible.'},
 {tag:'CLÔTURE',title:'L’IA propose. Le livrable prouve.',items:['Un candidat autonome sait expliquer ses choix.','Le contrôle humain protège la fiabilité de la production.','Répéter : cadrer → produire → contrôler → corriger → prouver.'],note:'Faire remplir la checklist de fin de module et proposer une prochaine action.'}
];
const demos = [
 {name:'Formation',theme:'Annonce d’un atelier IA',need:'Un formateur souhaite annoncer un atelier pour débutants.',v1:'Notre atelier IA garantit une maîtrise complète en une journée. Aucune préparation nécessaire. Places illimitées.',issues:['« garantit » : affirmation non démontrée','« maîtrise complète » : promesse excessive','« places illimitées » : capacité non vérifiée'],v2:'Découvrez un atelier d’initiation à l’IA conçu pour les débutants. Vous apprendrez à formuler une demande, tester une réponse et la contrôler. Les modalités et les places disponibles seront confirmées par l’organisateur.',proof:'Décision humaine fictive : les promesses ont été remplacées par des objectifs observables. Vérifier la date, le prix et la capacité avant publication.'},
 {name:'Association',theme:'Accueil des bénévoles',need:'Créer une fiche d’accueil pour de nouveaux bénévoles.',v1:'Chaque bénévole suit obligatoirement deux heures de formation. Il reçoit un accès complet à toutes les données des bénéficiaires.',issues:['Durée de formation inventée','Accès aux données : risque de confidentialité','Responsabilités non précisées'],v2:'La fiche présente la mission de l’association, le référent à contacter, les règles d’accueil et les consignes de confidentialité. Les modalités de formation sont communiquées par le coordinateur.',proof:'Décision humaine fictive : supprimer l’accès libre aux données, clarifier les responsabilités et réserver la validation au responsable.'},
 {name:'Entreprise',theme:'Fiche projet numérique',need:'Décrire un mini-outil de suivi interne.',v1:'Construire vite une application parfaite pour toute l’entreprise, qui ne fait aucune erreur et remplace le suivi manuel.',issues:['Public cible absent','Absence de critères de test','Garantie de perfection infondée'],v2:'Créer une maquette de suivi destinée à une petite équipe pilote. Fonctions : saisir une tâche, attribuer un responsable et signaler l’avancement. Vérifier trois scénarios d’usage et recueillir deux retours utilisateurs.',proof:'Décision humaine fictive : cibler un périmètre, décrire les fonctions, conserver une liste de limites.'},
 {name:'Enseignement',theme:'Fiche de révision',need:'Préparer un support de physique pour des étudiants.',v1:'Tous les circuits RC ont la même constante de temps et cette méthode s’applique toujours.',issues:['Généralisation scientifiquement inexacte','Hypothèses de modélisation absentes','Aucune démonstration ni contrôle des unités'],v2:'Pour un circuit RC série idéal en régime linéaire, préciser le schéma, les hypothèses et la constante τ = RC. Vérifier les unités, décrire le transitoire et proposer une question de compréhension.',proof:'Décision humaine fictive : restreindre le domaine de validité et exiger une vérification des équations.'}
];
const cards = [
 ['Qu’est-ce qu’un livrable vérifié ?', 'Un résultat relu, comparé au besoin, avec points importants contrôlés et limites signalées.'],
 ['Quelle différence entre V1 et V2 ?', 'V1 est la réponse initiale conservée. V2 intègre des corrections identifiées et justifiées.'],
 ['Quel est le rôle du prompt maître ?', 'Il fixe un cadre personnel réutilisable : profil, objectifs, règles et style de collaboration.'],
 ['Une réponse IA peut-elle valider ses propres faits ?', 'Non. Elle peut suggérer des vérifications ; l’humain doit consulter les sources pertinentes.'],
 ['Que veut dire « non vérifié » ?', 'L’information n’a pas encore été confirmée par une source fiable. Ne pas la présenter comme certaine.'],
 ['Que contient un journal de corrections ?', 'Les écarts relevés, les modifications, la justification et la personne qui a vérifié.'],
 ['Pourquoi conserver V1 ?', 'Pour comparer, comprendre les transformations et prouver le travail réalisé.'],
 ['Quels risques liés aux données ?', 'Divulgation d’informations privées ou sensibles, réutilisation non autorisée et diffusion excessive.'],
 ['Que présenter en 5 minutes ?', 'Le besoin, la cible, la V1, les contrôles, la V2, les limites et le feedback souhaité.'],
 ['À quoi sert la preuve LN-IA ?', 'Elle rend explicites les choix et les vérifications qui fondent la confiance dans le livrable.']
];
const quiz = [
 {q:'Que faire lorsqu’un chiffre n’a pas été vérifié ?',opts:['Le conserver car l’IA l’a écrit','Le signaler comme non vérifié','Le remplacer par un chiffre plus plausible'],good:1},
 {q:'Quelle trace conserver avant toute correction ?',opts:['La réponse V1','Seulement la version finale','Une capture du logo'],good:0},
 {q:'Qui valide une production dans LN-IA ?',opts:['Le modèle IA','Le site Vite','Une personne responsable après contrôle'],good:2},
 {q:'Quel est le meilleur usage du prompt maître ?',opts:['Remplacer toutes les vérifications','Fixer un cadre durable et guider une mission ciblée','Publier un document sans relecture'],good:1},
 {q:'Quelle preuve clôt un travail documenté ?',opts:['V1, grille, corrections, V2 et décision humaine','Le seul texte de l’IA','Une note de satisfaction non justifiée'],good:0}
];
const mainMaster = `Tu es mon assistant de production et de contrôle LN-IA pour le Challenge 100 Jours.\n\nPROFIL : [mon métier, mes compétences, mon contexte]\nOBJECTIF : [but réel et mes livrables prioritaires]\nMISSION DE LA SÉANCE 08 : examiner et améliorer UN livrable.\nPUBLIC CIBLE : [à qui il s'adresse]\nBESOIN : [problème concret à résoudre]\nENTRÉES : [prompt initial, réponse IA V1, documents autorisés]\n\nMÉTHODE OBLIGATOIRE :\n1. Reformuler le besoin et les critères de réussite.\n2. Évaluer la V1 selon huit critères : fidélité, clarté, exactitude, public, format, confidentialité, utilité, limites.\n3. Pour chaque affirmation factuelle, indiquer « vérifiée avec source », « non vérifiée » ou « à corriger ». Ne jamais inventer de référence.\n4. Proposer des corrections précises, numérotées, avec justification.\n5. Produire une proposition de V2, sans masquer les points incertains.\n6. Présenter un tableau V1 → correction → V2 → raison.\n7. Rédiger deux questions de feedback et un plan oral de 3 à 5 minutes.\n8. Lister les preuves nécessaires : V1, grille, corrections humaines, V2 et limites.\n\nRÈGLES : ne pas inventer de faits, ne pas divulguer de données sensibles, ne pas déclarer le livrable « validé » à la place de l'humain.\nFORMAT : synthèse, grille, corrections, V2 provisoire, vérifications restantes, prochaines actions.\nTermine par : « Décision de validation réservée au candidat et au formateur ».\n\nCOMMENCE par demander le besoin, le public et le brouillon V1 s'ils ne sont pas fournis.`;
const specializedPrompts = [
 ['Prompt maître de contrôle LN-IA','Cadre réutilisable pour guider le contrôle, la correction et la preuve.',mainMaster],
 ['Analyse des écarts','Comparer un besoin réel et une réponse IA.','Tu es relecteur qualité. Voici le besoin : [BESOIN]. Voici la réponse V1 : [V1]. Dresse un tableau : critère, constat, écart, gravité, action recommandée. Critères : fidélité, clarté, exactitude, public, format, confidentialité, utilité, limites. Ne prétends pas avoir vérifié les faits si aucune source n’est fournie.'],
 ['Nettoyage et correction','Améliorer une version sans inventer des informations.','Relis la version V1 suivante : [V1]. Supprime les doublons, corrige les formulations vagues et adapte le ton au public [PUBLIC]. Indique chaque modification et sa justification. Conserve les données incertaines sous la mention « à vérifier ». Propose une V2 provisoire.'],
 ['Contrôle des faits','Préparer une recherche ou une vérification humaine.','À partir du contenu suivant : [TEXTE], extrais les affirmations factuelles dans un tableau : affirmation, type de source appropriée, source effectivement fournie (si présente), statut de vérification, action humaine nécessaire. N’invente ni source ni vérification.'],
 ['Présentation de 5 minutes','Préparer l’oral et le feedback.','Voici mon livrable corrigé : [V2]. Prépare un plan oral de 3 à 5 minutes : besoin, public, production, apport IA, corrections humaines, preuves, limites, prochaine action. Propose deux questions de feedback concrètes.'],
 ['Synthèse de traçabilité','Conserver les preuves du travail réalisé.','Organise les éléments suivants : [PROMPT, V1, GRILLE, CORRECTIONS, V2, SOURCES]. Rédige un journal Markdown daté : problème, écarts, corrections humaines, faits vérifiés, points ouverts, décision humaine, prochaine action. N’attribue pas de validation à l’IA.']
];
function go(view){ $$('.view').forEach(el=>el.classList.toggle('active',el.id==='view-'+view));$$('.nav-btn').forEach(b=>{const on=b.dataset.view===view;b.classList.toggle('active',on);b.setAttribute('aria-current',on?'page':'false')});window.scrollTo({top:0,behavior:'smooth'});if(view==='atelier') updateStatus();$('#main').focus({preventScroll:true});}
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
$$('.nav-btn').forEach(b=>b.addEventListener('click',()=>go(b.dataset.view)));
let toastTimer;function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('shown');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('shown'),2900)}
function copy(text){if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(()=>toast('Texte copié.')).catch(()=>fallbackCopy(text));return}fallbackCopy(text)}
function fallbackCopy(text){const tmp=document.createElement('textarea');tmp.value=text;tmp.style.position='fixed';tmp.style.opacity='0';document.body.append(tmp);tmp.select();try{if(!document.execCommand('copy'))throw Error('Copie refusée');toast('Texte copié.')}catch{toast('Copie indisponible : sélectionner manuellement le texte.')}tmp.remove()}
function download(name,content){const file=new Blob([content],{type:'text/markdown;charset=utf-8'});const url=URL.createObjectURL(file);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Fichier téléchargé : '+name)}
let slideIndex=0;function renderSlide(){const s=slides[slideIndex];$('#slideCount').textContent=`Diapositive ${slideIndex+1} / ${slides.length}`;$('#slideTag').textContent=s.tag;$('#slideStage').innerHTML=`<span class="slide-kicker">${s.tag}</span><h3>${s.title}</h3><ul>${s.items.map(x=>'<li>'+x+'</li>').join('')}</ul><p class="slide-number">LN-IA · ${String(slideIndex+1).padStart(2,'0')} / 18</p>`;$('#slideNotes').textContent=s.note;$$('#slideDots button').forEach((b,i)=>b.classList.toggle('active',i===slideIndex));$('#slidePrev').disabled=slideIndex===0;$('#slideNext').disabled=slideIndex===slides.length-1}
$('#slideDots').innerHTML=slides.map((_,i)=>`<button type="button" aria-label="Diapositive ${i+1}" data-slide="${i}"></button>`).join('');$$('[data-slide]').forEach(b=>b.addEventListener('click',()=>{slideIndex=Number(b.dataset.slide);renderSlide()}));$('#slidePrev').onclick=()=>{slideIndex=Math.max(0,slideIndex-1);renderSlide()};$('#slideNext').onclick=()=>{slideIndex=Math.min(slides.length-1,slideIndex+1);renderSlide()};$('#fullscreen').onclick=()=>{const shell=$('.slides-shell');if(!document.fullscreenElement&&shell.requestFullscreen){shell.requestFullscreen().catch(()=>toast('Projection plein écran indisponible.'))}else if(document.exitFullscreen)document.exitFullscreen()};$('#presentQuick').onclick=()=>{go('presentation');$('#slideStage').focus()};document.addEventListener('keydown',e=>{if(!$('#view-presentation').classList.contains('active'))return;const tag=document.activeElement?.tagName;if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT')return;if(e.key==='ArrowRight'){e.preventDefault();$('#slideNext').click()}if(e.key==='ArrowLeft'){e.preventDefault();$('#slidePrev').click()}});renderSlide();
$('#methodGrid').innerHTML=methodCards.map(([n,t,descr,ex])=>`<article class="method-card"><span class="method-n">${n.padStart(2,'0')}</span><h3>${t}</h3><p>${descr}</p><div class="example">${ex}</div></article>`).join('');
let demoIndex=0;function demoRender(){const d=demos[demoIndex];$('#demoTabs').innerHTML=demos.map((x,i)=>`<button type="button" class="${i===demoIndex?'active':''}" data-demo="${i}">${x.name}</button>`).join('');$$('[data-demo]').forEach(b=>b.onclick=()=>{demoIndex=Number(b.dataset.demo);demoRender()});const node=$('#demoContent');node.replaceChildren();const outer=document.createElement('div');outer.className='demo-box';const title=document.createElement('h3');title.textContent=d.theme;const p=document.createElement('p');p.textContent=d.need;const grid=document.createElement('div');grid.className='demo-columns';for(const [heading,value,kind] of [['V1 — brouillon fictif',d.v1,'bad'],['V2 — correction fictive',d.v2,'good']]){const pane=document.createElement('div');pane.className='demo-pane '+kind;const h=document.createElement('h4');h.textContent=heading;pane.append(h,document.createTextNode(value));grid.append(pane)}const issues=document.createElement('p');issues.className='demo-note';issues.textContent='Écarts relevés : '+d.issues.join(' · ');const proof=document.createElement('p');proof.className='demo-note';proof.textContent=d.proof;outer.append(title,p,grid,issues,proof);node.append(outer)}demoRender();
$('#criteriaForm').innerHTML=controlCriteria.map(([name,desc],i)=>`<div class="criterion-row"><label for="c${i}">${i+1}. ${name}</label><p class="quiet" style="margin:0 0 7px">${desc}</p><select id="c${i}" data-criterion="${i}"><option value="non-verifie">Non vérifié / non évalué</option><option value="conforme">Conforme après contrôle humain</option><option value="corriger">À corriger</option></select></div>`).join('');
function raw(name){return $('#f'+name).value}
function val(name){return raw(name).trim()}
function chosenCriteria(){return $$('[data-criterion]').map((el,i)=>({name:controlCriteria[i][0],status:el.value}))}
function status(){return dossierStatus(Object.fromEntries(fields.map(n=>[n,raw(n)])),chosenCriteria(),$('#fAttest').checked)}
function updateStatus(){const [title,desc]=status();$('#statusTitle').textContent='État du dossier : '+title;$('#statusDesc').textContent=desc}
$$('#view-atelier input, #view-atelier textarea, #view-atelier select').forEach(el=>el.addEventListener('input',updateStatus));
function safeMd(s){return fencedMarkdown(s || 'Non renseigné')}
function buildTrace(){const date=new Date().toISOString().slice(0,10);const criteria=chosenCriteria().map(x=>`| ${x.name} | ${x.status==='conforme'?'Conforme après contrôle humain':x.status==='corriger'?'À corriger':'Non vérifié'} |`).join(LF);return `# Dossier de preuve — Séance 08 LN-IA\n\nDate d'export : ${date}\nStatut affiché : ${status()[0]} (indication de complétude, PAS une validation officielle)\n\n## 1. Besoin et cadrage\n\n**Titre :**\n\n${safeMd(val('Titre'))}\n\n**Public :**\n\n${safeMd(val('Public'))}\n\n**Besoin :**\n${safeMd(val('Besoin'))}\n\n**Format :**\n\n${safeMd(val('Format'))}\n\n## 2. Prompt utilisé\n\n${fencedMarkdown(raw('Prompt'))}\n\n## 3. Réponse IA / brouillon V1 (conserver à l'identique)\n\n${fencedMarkdown(raw('V1'))}\n\n## 4. Grille de contrôle\n\n| Critère | Évaluation humaine |\n| --- | --- |\n${criteria}\n\n## 5. Sources et vérifications réelles\n\n${safeMd(val('Sources'))}\n\n## 6. Corrections humaines et justifications\n\n${safeMd(val('Corrections'))}\n\n## 7. Réponse corrigée V2\n\n${fencedMarkdown(raw('V2'))}\n\n## 8. Limites et points à vérifier\n\n${safeMd(val('Limites'))}\n\n## 9. Questions de feedback\n\n${safeMd(val('Feedback'))}\n\n## 10. Décision finale\n\nResponsable humain : à renseigner\nValidation humaine relue par le candidat : ${$('#fAttest').checked?'Attestation cochée':'Non attestée'}\nStatut officiel : VALIDÉ / À COMPLÉTER / À REVOIR (à décider par le formateur)\nProchaine action : à renseigner\n\n---\nL'IA propose. L'humain contrôle. L'atelier organise. Le livrable prouve.\n`}
$('#downloadTrace').onclick=()=>download('grille-controle-reponses-ia.md',buildTrace());$('#downloadV2').onclick=()=>download('reponse-ia-corrigee-v2.md',`# ${val('Titre')||'Livrable corrigé'} — Version V2\n\nPublic : ${val('Public')}\n\n## Version corrigée\n\n${raw('V2')||'[Version V2 à compléter]'}\n\n## Corrections humaines\n\n${val('Corrections')||'[À documenter]'}\n\n## Limites\n\n${val('Limites')||'[À documenter]'}\n\nValidation finale humaine : À CONFIRMER\n`);$('#copyMaster').onclick=()=>copy(buildPersonalMaster());$('#loadDemo').onclick=()=>{if(fields.some(n=>n!=='Format'&&val(n))&&!window.confirm('Remplacer les champs actuels par un exemple fictif ?'))return;const demo={Titre:'Fiche d’accueil — association (exemple fictif)',Public:'Nouveaux bénévoles',Besoin:'Préparer une fiche d’accueil courte, sûre et compréhensible.',Format:'Fiche projet',Prompt:'Tu es assistant pédagogique. Prépare une fiche claire pour bénévoles. Signale les informations non vérifiées et protège les données.',V1:demos[1].v1,Sources:'Exemple fictif : aucune source réelle vérifiée. La durée de formation reste à confirmer.',Corrections:'Suppression de la durée inventée et de la mention d’accès aux données sensibles. Ajout du coordinateur comme référent.',V2:demos[1].v2,Limites:'Vérifier les modalités de formation auprès du coordinateur.',Feedback:'1. La fiche est-elle compréhensible ?\n2. Quelles informations complémentaires sont nécessaires ?'};fields.forEach(n=>$('#f'+n).value=demo[n]||'');$$('[data-criterion]').forEach((el,i)=>el.value=i===2?'non-verifie':'conforme');$('#fAttest').checked=false;updateStatus();toast('Exemple fictif chargé : aucun modèle d’IA interrogé.');};$('#resetForm').onclick=()=>{if(!window.confirm('Effacer les saisies de cette page ? Exportez d’abord vos preuves si nécessaire.'))return;fields.forEach(n=>$('#f'+n).value=n==='Format'?'Fiche projet':'');$$('[data-criterion]').forEach(el=>el.value='non-verifie');$('#fAttest').checked=false;updateStatus();toast('Formulaire réinitialisé.')};
function buildPersonalMaster(){return mainMaster.replace('[mon métier, mes compétences, mon contexte]',val('Public')||'[profil à compléter]').replace('[but réel et mes livrables prioritaires]',val('Besoin')||'[objectif à compléter]').replace('[à qui il s\'adresse]',val('Public')||'[public à compléter]').replace('[problème concret à résoudre]',val('Besoin')||'[besoin à compléter]')+'\n\nTITRE DE MON LIVRABLE : '+(val('Titre')||'[titre]')+'\nFORMAT : '+val('Format')+'\n\nPROMPT INITIAL :\n'+val('Prompt')+'\n\nV1 :\n'+val('V1')}
const cardsRoot=$('#promptCards');for(const [i,p] of specializedPrompts.entries()){const box=document.createElement('article');box.className='prompt-box-card';const h=document.createElement('h3');h.textContent=p[0];const descr=document.createElement('p');descr.textContent=p[1];const pre=document.createElement('pre');pre.textContent=p[2];const btn=document.createElement('button');btn.className='btn btn-gold';btn.type='button';btn.textContent='Copier le prompt';btn.onclick=()=>copy(p[2]);box.append(h,descr,pre,btn);cardsRoot.append(box)}
let cardIndex=0,flipped=false;function renderCard(){const [q,a]=cards[cardIndex];$('#flashCard').classList.toggle('flipped',flipped);$('#flashCard').setAttribute('aria-pressed',String(flipped));$('#flashText').textContent=flipped?a:q;$('#cardFaceLabel').textContent=flipped?'RÉPONSE':'QUESTION';$('#cardCount').textContent=`${cardIndex+1} / ${cards.length}`;}function flip(){flipped=!flipped;renderCard()}$('#flashCard').onclick=flip;$('#flashCard').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip()}};$('#cardPrev').onclick=()=>{cardIndex=(cardIndex+cards.length-1)%cards.length;flipped=false;renderCard()};$('#cardNext').onclick=()=>{cardIndex=(cardIndex+1)%cards.length;flipped=false;renderCard()};renderCard();
function renderQuiz(){const root=$('#quizRoot');root.replaceChildren();quiz.forEach((item,i)=>{const holder=document.createElement('div');holder.className='quiz-question';const prompt=document.createElement('p');prompt.textContent=`${i+1}. ${item.q}`;holder.append(prompt);item.opts.forEach((opt,j)=>{const label=document.createElement('label');const radio=document.createElement('input');radio.type='radio';radio.name='quiz-'+i;radio.value=String(j);radio.onchange=gradeQuiz;label.append(radio,document.createTextNode(opt));holder.append(label)});root.append(holder)});$('#quizResult').textContent='Sélectionnez une réponse par question.'}function gradeQuiz(){const vals=quiz.map((_,i)=>$(`input[name="quiz-${i}"]:checked`)?.value);const complete=vals.every(v=>v!==undefined);if(!complete){$('#quizResult').textContent=`${vals.filter(v=>v!==undefined).length}/${quiz.length} réponses renseignées.`;return}const score=vals.filter((v,i)=>Number(v)===quiz[i].good).length;$('#quizResult').textContent=`Résultat : ${score}/${quiz.length}. ${score===quiz.length?'Toutes les réponses sont correctes.':'Relisez les cartes puis recommencez.'} Auto-évaluation uniquement.`}$('#quizReset').onclick=renderQuiz;renderQuiz();
$('#validationCriteria').innerHTML=controlCriteria.map(([t,d],i)=>`<div class="validation-item"><b>${i+1}. ${t}</b><span>${d}</span></div>`).join('');const checklist=['Je peux expliquer le besoin et le public cible.','Mon prompt structuré et mon prompt maître existent.','La V1 est conservée sans réécriture.','La grille des huit critères est remplie.','Les faits importants ont été vérifiés ou signalés.','Les données sensibles sont protégées.','Les corrections humaines sont justifiées.','La V2 a été relue par moi-même.','La présentation de 3 à 5 minutes est prête.','Deux questions de feedback sont préparées.','La preuve de travail est classée dans le portfolio.'];const checkRoot=$('#checklistRoot');checklist.forEach((item,i)=>{const label=document.createElement('label');label.className='check-item';const input=document.createElement('input');input.type='checkbox';input.dataset.check=i;const span=document.createElement('span');span.textContent=item;label.append(input,span);checkRoot.append(label)});$('#downloadChecklist').onclick=()=>download('checklist-validation-seance-08.md','# Checklist de validation — LN-IA Séance 08\n\n'+checklist.map((line,i)=>`- [${$(`[data-check="${i}"]`).checked?'x':' '}] ${line}`).join('\n')+'\n\nDécision finale : à renseigner par une personne responsable.\n');
updateStatus();

const portfolioFiles = [
  {
    "label": "Exemple fictif · Association",
    "documents": [
      {
        "name": "cadrage-et-prompt.md",
        "sub": "02-prompts",
        "text": "# Cadrage et prompt — EXEMPLE FICTIF\nBesoin : créer une fiche d'accueil pour de nouveaux bénévoles.\nPublic : nouveaux bénévoles. Format : fiche pratique.\nPrompt initial reconstitué, non exécuté :\n> Propose une fiche d'accueil : formation, référent, règles d'accès.\nPrompt de contrôle proposé, non exécuté :\n> Contrôle les huit critères LN-IA, signale les informations non sourcées, justifie les corrections et propose une V2 provisoire. La validation reste humaine.\nLes prompts personnels des séances 05–07 ne sont pas fournis.\n"
      },
      {
        "name": "grille-controle-reponses-ia.md",
        "sub": "02-prompts",
        "text": "# Grille — EXEMPLE FICTIF\nAucune source interne réelle consultée.\n\n| Critère | Statut proposé | Constat |\n|---|---|---|\n| Fidélité | À corriger | Mission et référent absents |\n| Clarté | Conforme pour la formulation seule | Compréhensible ; exactitude non garantie |\n| Exactitude | Non vérifié | Durée et obligation sans source |\n| Public | À corriger | Contacts et consignes manquants |\n| Format | À corriger | Structurer une fiche |\n| Confidentialité | À corriger | Accès général non justifié |\n| Utilité | À corriger | Informations pratiques manquantes |\n| Limites | À corriger | Incertitudes non signalées |\n"
      },
      {
        "name": "journal-corrections-humaines.md",
        "sub": "02-prompts",
        "text": "# Corrections — EXEMPLE FICTIF\n19 octobre 2026. Décisions pédagogiques simulées ; aucun responsable réel de validation.\n\n| V1 | Correction | Justification |\n|---|---|---|\n| Deux heures obligatoires | Renvoyer aux modalités du coordinateur | Durée et obligation non établies |\n| Accès complet aux données | Supprimer cette autorisation générale | Confidentialité et droits non établis |\n| Accueil incomplet | Ajouter mission, référent et règles | Structure plus utile |\n\nSource : démonstration du site uniquement. Consulter les règles réelles de formation et d'habilitation. Supprimer une affirmation non sourcée ne vaut pas vérification.\n"
      },
      {
        "name": "reponse-ia-corrigee-v2.md",
        "sub": "02-prompts",
        "text": "# V2 — EXEMPLE FICTIF PROVISOIRE\nTexte du cas Association :\n\nLa fiche présente la mission de l’association, le référent à contacter, les règles d’accueil et les consignes de confidentialité. Les modalités de formation sont communiquées par le coordinateur.\n\nCette structure reste à compléter avec la mission, le référent et les règles autorisées. Confirmer le rôle du coordinateur et les modalités. Non diffusable en l'état.\nStatut proposé : À COMPLÉTER. Validation réelle non effectuée.\n"
      },
      {
        "name": "reponse-ia-v1.md",
        "sub": "02-prompts",
        "text": "# V1 — EXEMPLE FICTIF\nTexte préécrit dans le cas Association du site, sans appel IA réel :\n\nChaque bénévole suit obligatoirement deux heures de formation. Il reçoit un accès complet à toutes les données des bénéficiaires.\n\nConserver cette version sans modification.\n"
      },
      {
        "name": "preuves-module-02.md",
        "sub": "07-portfolio",
        "text": "# Portfolio Module 02 — EXEMPLE FICTIF ASSOCIATION\nLN-IA · Pilotage : Prof. Abderrahman EL HISSE.\nAucune personne ni association réelle ; aucune validation acquise.\n\n## Index des preuves\n- [cadrage-et-prompt.md](../02-prompts/cadrage-et-prompt.md)\n- [reponse-ia-v1.md](../02-prompts/reponse-ia-v1.md)\n- [grille-controle-reponses-ia.md](../02-prompts/grille-controle-reponses-ia.md)\n- [journal-corrections-humaines.md](../02-prompts/journal-corrections-humaines.md)\n- [reponse-ia-corrigee-v2.md](../02-prompts/reponse-ia-corrigee-v2.md)\n\n## Progression\nSéances 05–07 : productions personnelles non fournies ; prompt reconstitué.\nSéance 08 : comparaison V1/V2 et contrôles illustrés, sans vérification externe.\n\n## Oral de 3 à 5 minutes\nExposer besoin, V1, contrôles, corrections, V2 et limites.\nQuestions de feedback :\n1. Quelles informations manquent pour accueillir un bénévole ?\n2. Quelles preuves demander avant diffusion ?\n\nFeedback réel : non recueilli.\nDécision humaine réelle, responsable et date : non renseignés.\nStatut pédagogique proposé : À COMPLÉTER.\nProchaine action : obtenir les règles autorisées, compléter et faire relire.\n\nProvenance : démonstration Association de main.js. Le code atteste l'origine du cas, pas des règles d'une association.\n"
      }
    ]
  },
  {
    "label": "Modèle candidat · À compléter",
    "documents": [
      {
        "name": "cadrage-et-prompt.md",
        "sub": "02-prompts",
        "text": "# cadrage-et-prompt\n\nMODÈLE À COMPLÉTER — aucune vérification effectuée.\n\n[À renseigner : besoin, public, format, prompts séances 05–08]\n"
      },
      {
        "name": "grille-controle-reponses-ia.md",
        "sub": "02-prompts",
        "text": "# grille-controle-reponses-ia\n\nMODÈLE À COMPLÉTER — aucune vérification effectuée.\n\n[À renseigner : huit critères, statut Conforme / À corriger / Non vérifié et justification]\n"
      },
      {
        "name": "journal-corrections-humaines.md",
        "sub": "02-prompts",
        "text": "# journal-corrections-humaines\n\nMODÈLE À COMPLÉTER — aucune vérification effectuée.\n\n[À renseigner : passage V1, correction V2, justification, sources réellement consultées et date]\n"
      },
      {
        "name": "reponse-ia-corrigee-v2.md",
        "sub": "02-prompts",
        "text": "# reponse-ia-corrigee-v2\n\nMODÈLE À COMPLÉTER — aucune vérification effectuée.\n\n[À renseigner : V2 relue, limites et décision humaine]\n"
      },
      {
        "name": "reponse-ia-v1.md",
        "sub": "02-prompts",
        "text": "# reponse-ia-v1\n\nMODÈLE À COMPLÉTER — aucune vérification effectuée.\n\n[À renseigner : réponse réelle initiale sans modification]\n"
      },
      {
        "name": "preuves-module-02.md",
        "sub": "07-portfolio",
        "text": "# Portfolio Module 02 — MODÈLE À COMPLÉTER\nLN-IA · Pilotage : Prof. Abderrahman EL HISSE.\nAucune production ni validation effectuée.\n## Index\n- [cadrage-et-prompt.md](../02-prompts/cadrage-et-prompt.md)\n- [reponse-ia-v1.md](../02-prompts/reponse-ia-v1.md)\n- [grille-controle-reponses-ia.md](../02-prompts/grille-controle-reponses-ia.md)\n- [journal-corrections-humaines.md](../02-prompts/journal-corrections-humaines.md)\n- [reponse-ia-corrigee-v2.md](../02-prompts/reponse-ia-corrigee-v2.md)\n## Bilan\n- Preuves personnelles séances 05–07 : [à joindre]\n- Sources consultées et dates : [à compléter]\n- Corrections et apprentissages : [à compléter]\n- Limites : [à compléter]\n- Deux questions et feedback recueilli : [à compléter]\n- Décision humaine, responsable et date : non effectuée\n- Prochaine action : [à compléter]\n"
      }
    ]
  }
];

const portfolioRoot = $('#portfolioDocuments');
for (const group of portfolioFiles) {
 const heading=document.createElement('h3'); heading.textContent=group.label; heading.className='portfolio-group-title';
 const grid=document.createElement('div'); grid.className='portfolio-grid';
 for(const doc of group.documents){
  const card=document.createElement('article');card.className='soft-panel portfolio-document';
  const title=document.createElement('h4');title.textContent=doc.name==='preuves-module-02.md'?'Portfolio et preuves du module 02':doc.name.replace('.md','').replaceAll('-',' ');
  const location=document.createElement('p');location.className='portfolio-path';location.textContent=doc.sub+'/'+doc.name;
  const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Lire l’aperçu du document';
  const pre=document.createElement('pre');pre.textContent=doc.text;details.append(summary,pre);
  const btn=document.createElement('button');btn.type='button';btn.className='btn btn-outline';btn.textContent='↓ Télécharger .md';btn.onclick=()=>download(doc.name,doc.text);
  card.append(title,location,details,btn);grid.append(card);
 }
 portfolioRoot.append(heading,grid);
}
$('#portfolioLoad').onclick=()=>{go('atelier');$('#loadDemo').click();};
