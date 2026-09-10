/**
 * Génération du site statique.
 *
 *   node build.mjs            construit dist/
 *   node build.mjs --watch    reconstruit à chaque modification de src/ ou public/
 *
 * Sortie : HTML statique + assets, prêt à être déposé sur l'hébergement (Hostinger).
 * Aucune dépendance externe.
 */
import { mkdir, rm, cp, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { layout } from './src/templates/layout.mjs';
import { site } from './src/data/site.mjs';
import { accueil } from './src/pages/accueil.mjs';
import { formation } from './src/pages/formation.mjs';
import { aPropos } from './src/pages/a-propos.mjs';
import { accessibilite } from './src/pages/accessibilite.mjs';
import { contact, merci, notFound } from './src/pages/contact.mjs';
import { legalRoutes } from './src/pages/legal.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');

const pages = [
  accueil,
  formation,
  aPropos,
  accessibilite,
  contact,
  ...legalRoutes,
  merci,
  notFound,
];

/**
 * Contrôle automatique des formulations interdites (loi du 19 décembre 2022).
 * La CDC scanne les sites des organismes de formation : une seule occurrence
 * suffit à bloquer le référencement. Le build échoue si l'une d'elles apparaît.
 */
const FORBIDDEN = [
  'pris en charge',
  'prise en charge',
  'reste a charge',
  'gratuit',
  'gratuite',
  'gratuitement',
  'finance a 100',
  'financement',
  'financee',
  'financer',
  'formation offerte',
  'offert',
  'cadeau',
  'sans avancer',
  'sans debourser',
  'votre solde',
  'vos droits',
  'utiliser ses droits',
  'cpf',
  'compte personnel de formation',
  'opco',
  'pole emploi',
  'france travail',
  'edof',
  'caisse des depots',
  'subvention',
  'aide financiere',
  'dernieres places',
  'inscrivez-vous vite',
  'depechez-vous',
  'il ne reste que',
];

/**
 * Occurrences légitimes, imposées par les textes fournis par le client :
 * elles sont retirées avant le contrôle pour éviter les faux positifs.
 */
const ALLOWED_CONTEXTS = [
  // CGV art. 11 — mention obligatoire sur la médiation de la consommation.
  'recourir gratuitement a un mediateur',
];

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[‘’ʼ]/g, "'")
    .replace(/\s+/g, ' ');
}

/** Vérifie qu'aucune formulation interdite n'apparaît dans le HTML produit. */
function auditPage(html) {
  let haystack = normalize(html);
  for (const allowed of ALLOWED_CONTEXTS) {
    haystack = haystack.split(allowed).join(' ');
  }
  const hits = [];
  for (const term of FORBIDDEN) {
    const pattern = new RegExp(`(^|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`);
    if (pattern.test(haystack)) hits.push(term);
  }
  return hits;
}

function sitemap(urls) {
  const today = new Date().toISOString().slice(0, 10);
  const priority = (url) => (url === '/' ? '1.0' : url === '/formation/' ? '0.9' : '0.6');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${site.baseUrl}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority(url)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
}

function robots() {
  return `User-agent: *
Allow: /
Disallow: /contact/merci/

Sitemap: ${site.baseUrl}/sitemap.xml
`;
}

function webmanifest() {
  return JSON.stringify(
    {
      name: 'Forma Pro Solutions',
      short_name: 'Forma Pro',
      description: site.description,
      start_url: '/',
      display: 'browser',
      background_color: '#ffffff',
      theme_color: site.themeColor,
      lang: 'fr-FR',
      icons: [
        { src: '/assets/img/favicon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/img/favicon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    null,
    2,
  );
}

async function copyIfExists(from, to) {
  if (!existsSync(from)) return false;
  await cp(from, to, { recursive: true });
  return true;
}

async function build() {
  const started = Date.now();
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  // 1. Assets statiques : src/assets -> dist/assets, public/* -> dist/*
  await cp(path.join(root, 'src/assets'), path.join(dist, 'assets'), { recursive: true });
  await copyIfExists(path.join(root, 'public'), dist);

  // Sur Vercel, PHP n'est pas exécuté et Apache n'est pas utilisé : ces deux fichiers
  // seraient servis en clair. Le formulaire y passe par la fonction api/contact.js.
  if (process.env.VERCEL) {
    await rm(path.join(dist, 'contact.php'), { force: true });
    await rm(path.join(dist, '.htaccess'), { force: true });
    console.log('  ⓘ Build Vercel : contact.php et .htaccess exclus de la sortie.');
  }

  // 2. Favicon à la racine
  await cp(path.join(root, 'src/assets/img/favicon.svg'), path.join(dist, 'favicon.svg'));

  // 3. Pages
  const warnings = [];
  for (const page of pages) {
    const html = layout({
      title: page.title,
      description: page.description,
      url: page.url,
      breadcrumb: page.breadcrumb,
      noindex: page.noindex,
      jsonLd: page.jsonLd ? page.jsonLd() : [],
      body: page.build(),
    });

    const target = path.join(dist, page.file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');

    const hits = auditPage(html);
    if (hits.length) warnings.push({ url: page.url, hits });
    console.log(`  ✓ ${page.file.padEnd(44)} ${page.url}`);
  }

  // 4. Fichiers techniques
  const indexable = pages.filter((page) => !page.noindex).map((page) => page.url);
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap(indexable), 'utf8');
  await writeFile(path.join(dist, 'robots.txt'), robots(), 'utf8');
  await writeFile(path.join(dist, 'site.webmanifest'), webmanifest(), 'utf8');

  // 5. Contrôle de conformité (loi du 19 décembre 2022)
  console.log('');
  if (warnings.length) {
    console.log('  ⚠  Formulations à vérifier avant mise en ligne :');
    for (const warning of warnings) {
      console.log(`     ${warning.url} → ${warning.hits.join(', ')}`);
    }
    process.exitCode = 1;
  } else {
    console.log('  ✓ Contrôle conformité : aucune formulation interdite détectée.');
  }

  console.log(`  ✓ ${pages.length} pages générées dans dist/ en ${Date.now() - started} ms\n`);
}

async function watch() {
  const { watch: fsWatch } = await import('node:fs');
  let timer = null;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      build().catch((error) => console.error(error));
    }, 80);
  };
  for (const dir of ['src', 'public']) {
    const full = path.join(root, dir);
    if (existsSync(full)) fsWatch(full, { recursive: true }, rebuild);
  }
  console.log('  ⟳ Surveillance de src/ et public/ — Ctrl+C pour arrêter\n');
}

await build();
if (process.argv.includes('--watch')) await watch();

export { build, auditPage };
