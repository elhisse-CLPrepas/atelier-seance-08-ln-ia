// Ces règles mesurent la complétude ; elles ne valident aucun contenu.
export function feedbackCount(text) {
  return text.split(/\r?\n/).filter(line => line.trim()).length;
}

export function dossierStatus(data, criteria, attested) {
  const filled = name => Boolean(data[name]?.trim());
  if (!['Titre', 'Public', 'Besoin', 'Format', 'Prompt', 'V1'].every(filled)) {
    return ['À compléter', 'Précisez le besoin, le public, le format, le prompt et la réponse V1.'];
  }
  if (!['Corrections', 'V2'].every(filled)) {
    return ['Correction attendue', 'Rédigez votre journal humain des changements et collez la V2.'];
  }
  if (criteria.length !== 8 || criteria.some(item => item.status !== 'conforme')) {
    return ['À revoir / compléter', 'Certains critères restent à corriger ou non vérifiés. Documentez leurs conséquences avant validation.'];
  }
  if (!filled('Sources') || !filled('Limites') || feedbackCount(data.Feedback || '') < 2 || !attested) {
    return ['Contrôle à finaliser', 'Renseignez les contrôles humains, les limites (ou leur absence), deux questions de feedback sur deux lignes et l’attestation.'];
  }
  return ['Prêt pour revue humaine', 'Le dossier paraît renseigné. Le statut VALIDÉ doit encore être attribué par une personne habilitée.'];
}

export function fencedMarkdown(text) {
  const runs = String(text).match(/`+/g) || [];
  const fence = '`'.repeat(Math.max(3, ...runs.map(run => run.length + 1)));
  return `${fence}text\n${text}\n${fence}`;
}
