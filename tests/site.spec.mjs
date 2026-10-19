import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const views = ['accueil','presentation','methode','demos','atelier','prompts','cartes','portfolio','validation','ressources'];
const application = 'https://elhisse-clprepas.github.io/Atelier-Landing-Pages-LN-IA/';
async function go(page, view) { await page.locator(`.nav-btn[data-view="${view}"]`).click(); }
async function noOverflow(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
async function capture(page, file) {
  await page.evaluate(() => { window.scrollTo({ top:0, behavior:'instant' }); document.querySelector('#toast').classList.remove('shown'); });
  await page.screenshot({ path:`test-results/${file}.png`, fullPage:true, animations:'disabled' });
}

test('parcours complet, copies, exports fidèles et affiches sous un chemin Pages', async ({ page, context }) => {
  const errors = [], failedRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failedRequests.push(response.url()); });
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('./');
  await expect(page.locator('.hero-poster img')).toBeVisible();
  await expect(page.locator(`.hero-actions a[href="${application}"]`)).toBeVisible();
  await capture(page, 'accueil-desktop');
  for (const view of views) {
    await go(page, view);
    await expect(page.locator('.view.active')).toHaveAttribute('id', 'view-' + view);
    await noOverflow(page);
    await page.locator('.view.active img').evaluateAll(async images => {
      await Promise.all(images.map(img => { img.loading = 'eager'; return img.decode(); }));
    });
  }
  await expect(page.locator('.poster-card')).toHaveCount(6);
  await expect(page.locator('#view-methode img[src$="seance-05-bases-prompt.webp"]')).toHaveCount(1);
  await go(page, 'presentation');
  for (let i = 1; i < 18; i++) await page.locator('#slideNext').click();
  await expect(page.locator('#slideCount')).toHaveText('Diapositive 18 / 18');
  await expect(page.locator('#slideNext')).toBeDisabled();
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('#slideCount')).toHaveText('Diapositive 17 / 18');
  await page.locator('[data-slide="0"]').click();
  await expect(page.locator('#slidePrev')).toBeDisabled();
  await capture(page, 'presentation-desktop');
  await go(page, 'demos');
  for (let i = 0; i < 4; i++) {
    await page.locator(`[data-demo="${i}"]`).click();
    await expect(page.locator('.demo-pane')).toHaveCount(2);
    await expect(page.locator('.demo-pane.bad h4')).toContainText('fictif');
  }
  await go(page, 'prompts');
  await page.locator('#promptCards button').first().click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('MISSION DE LA SÉANCE 08');
  await go(page, 'cartes');
  await page.locator('#flashCard').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#cardFaceLabel')).toHaveText('RÉPONSE');
  await expect(page.locator('#flashCard')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#cardNext').click();
  await expect(page.locator('#cardCount')).toHaveText('2 / 10');
  await page.locator('#cardPrev').click();
  await expect(page.locator('#cardCount')).toHaveText('1 / 10');
  for (const [i, answer] of [1,0,2,1,0].entries()) {
    await page.locator(`input[name="quiz-${i}"][value="${answer}"]`).check();
  }
  await expect(page.locator('#quizResult')).toContainText('5/5');
  await page.locator('#quizReset').click();
  await expect(page.locator('#quizResult')).toContainText('Sélectionnez');
  await go(page, 'atelier');
  await page.locator('#loadDemo').click();
  await expect(page.locator('#statusTitle')).toContainText('À revoir / compléter');
  await page.locator('#c2').selectOption('conforme');
  await page.locator('#fAttest').check();
  await expect(page.locator('#statusTitle')).toContainText('Prêt pour revue humaine');
  await page.locator('#fFeedback').fill('Une seule question ?');
  await expect(page.locator('#statusTitle')).toContainText('Contrôle à finaliser');
  await page.locator('#fFeedback').fill('1. Est-ce clair ?\n2. Que manque-t-il ?');
  const v1 = '  \n# Brouillon fictif\n```js\nconst exemple = 1;\n```\n  ';
  const v2 = '\n# Version corrigée fictive\n\nTexte **relu**.\n  ';
  await page.locator('#fV1').fill(v1);
  await page.locator('#fV2').fill(v2);
  const [trace] = await Promise.all([page.waitForEvent('download'), page.locator('#downloadTrace').click()]);
  expect(trace.suggestedFilename()).toBe('grille-controle-reponses-ia.md');
  const traceText = await fs.readFile(await trace.path(), 'utf8');
  expect(traceText).toContain('````text\n' + v1 + '\n````');
  expect(traceText).toContain(v2);
  expect(traceText).toContain('PAS une validation officielle');
  const [downloadV2] = await Promise.all([page.waitForEvent('download'), page.locator('#downloadV2').click()]);
  expect(downloadV2.suggestedFilename()).toBe('reponse-ia-corrigee-v2.md');
  expect(await fs.readFile(await downloadV2.path(), 'utf8')).toContain(v2);
  await page.locator('#copyMaster').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('association (exemple fictif)');
  await capture(page, 'atelier-desktop');
  page.once('dialog', dialog => dialog.dismiss());
  await page.locator('#resetForm').click();
  await expect(page.locator('#fV1')).toHaveValue(v1);
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#resetForm').click();
  await expect(page.locator('#fV1')).toHaveValue('');
  await expect(page.locator('#fFormat')).toHaveValue('Fiche projet');
  await expect(page.locator('#statusTitle')).toContainText('À compléter');
  await go(page, 'validation');
  await page.locator('[data-check="0"]').check();
  const [checklist] = await Promise.all([page.waitForEvent('download'), page.locator('#downloadChecklist').click()]);
  expect(await fs.readFile(await checklist.path(), 'utf8')).toContain('- [x] Je peux expliquer');
  await go(page, 'ressources');
  await expect(page.locator(`.application-banner a[href="${application}"]`)).toHaveAttribute('target', '_blank');
  expect(errors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

test('neuf vues mobiles, images entières et réduction des animations', async ({ page }) => {
  await page.setViewportSize({ width:390, height:844 });
  await page.emulateMedia({ reducedMotion:'reduce' });
  await page.goto('./');
  for (const view of views) {
    await go(page, view);
    await noOverflow(page);
    await expect(page.locator('.view.active')).toHaveAttribute('id', 'view-' + view);
  }
  await go(page, 'accueil');
  await expect(page.locator('.hero-poster img')).toBeVisible();
  expect(await page.locator('.hero-poster').evaluate(el => getComputedStyle(el, '::after').display)).toBe('none');
  await capture(page, 'accueil-mobile');
  await go(page, 'atelier');
  await page.locator('#loadDemo').click();
  await capture(page, 'atelier-mobile');
  await page.setViewportSize({ width:320, height:740 });
  for (const view of views) { await go(page, view); await noOverflow(page); }
});

test('aperçu autonome utilisable sans réseau depuis le fichier local', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('http**/*', route => route.abort());
  await page.goto(pathToFileURL(path.resolve('APERCU-AUTONOME-SEANCE-08.html')).href);
  await expect(page.locator('.hero-poster img')).toBeVisible();
  expect(await page.locator('.hero-poster img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await go(page, 'atelier');
  await page.locator('#loadDemo').click();
  await expect(page.locator('#fTitre')).toHaveValue(/exemple fictif/);
  const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#downloadTrace').click()]);
  expect(await fs.readFile(await download.path(), 'utf8')).toContain('Dossier de preuve');
  expect(errors).toEqual([]);
});
