/**
 * Contrôles avant mise en ligne, exécutés sur les fichiers de dist/.
 *
 *   node scripts/check.mjs
 *
 * Vérifie : balises SEO, unicité du H1, attributs alt, liens internes valides,
 * présence des mentions obligatoires (NDA mot pour mot, Qualiopi) sur toutes les pages.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compliance, company, training } from '../src/data/site.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');

const errors = [];
const notices = [];

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function count(html, pattern) {
  return (html.match(pattern) || []).length;
}

/**
 * Le PDF publié doit correspondre exactement à `training.programPdf` : deux PDF en ligne,
 * c'est le risque qu'un ancien programme reste téléchargeable et contredise le contenu du
 * site. `programPdf: null` signifie qu'aucun programme n'est publié : aucun PDF ne doit
 * alors subsister dans dist/.
 */
async function pdfFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await pdfFiles(full)));
    else if (entry.name.toLowerCase().endsWith('.pdf')) out.push('/' + path.relative(dist, full));
  }
  return out;
}

const pdfs = await pdfFiles(dist);
const expectedPdfs = training.programPdf ? [training.programPdf] : [];
if (pdfs.length !== expectedPdfs.length) {
  errors.push(
    `${pdfs.length} PDF publié(s), ${expectedPdfs.length} attendu(s) : ${pdfs.join(', ') || '—'}`,
  );
} else if (pdfs[0] && pdfs[0] !== training.programPdf) {
  errors.push(`PDF publié (${pdfs[0]}) différent du lien de téléchargement (${training.programPdf})`);
}

const files = await htmlFiles(dist);

for (const file of files) {
  const rel = '/' + path.relative(dist, file);
  const html = await readFile(file, 'utf8');

  // --- SEO -----------------------------------------------------------------
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  if (!title) errors.push(`${rel} : balise <title> absente`);
  else if (title.length > 75) notices.push(`${rel} : title de ${title.length} caractères (>75)`);

  const description = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!description) errors.push(`${rel} : meta description absente`);
  else if (description.length > 175)
    notices.push(`${rel} : meta description de ${description.length} caractères (>175)`);

  if (!/<link rel="canonical"/.test(html)) errors.push(`${rel} : URL canonique absente`);
  if (!/<html lang="fr">/.test(html)) errors.push(`${rel} : attribut lang absent`);

  const h1 = count(html, /<h1[\s>]/g);
  if (h1 !== 1) errors.push(`${rel} : ${h1} balise(s) H1 (une seule attendue)`);

  // --- Accessibilité -------------------------------------------------------
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt="/.test(img)) errors.push(`${rel} : <img> sans attribut alt`);
  }

  // --- Mentions obligatoires (audit CDC) -----------------------------------
  if (!html.includes(compliance.ndaFooter)) {
    errors.push(`${rel} : mention NDA absente ou modifiée`);
  }
  if (!html.includes(`Certification Qualiopi N°${compliance.qualiopi.number}`)) {
    errors.push(`${rel} : mention Qualiopi absente`);
  }
  if (!html.includes(company.email)) errors.push(`${rel} : adresse e-mail de contact absente`);

  // Le montant doit toujours être suivi de l'exonération de TVA, dans la même phrase
  // (guide CDC EDOF V4, p.22).
  for (const match of html.matchAll(/1\s*650\s*€/g)) {
    const suite = html.slice(match.index, match.index + 220);
    if (!suite.includes('exonération de TVA')) {
      errors.push(`${rel} : tarif affiché sans la mention d’exonération de TVA dans la même phrase`);
    }
  }
  if (/[a-zA-Z0-9._%+-]+@gmail\.com/.test(html)) errors.push(`${rel} : adresse Gmail présente`);

  // --- Liens et ressources internes ----------------------------------------
  // L'empreinte de contenu (?h=…) est retirée avant vérification sur le disque.
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) {
    const target = match[1].split('?')[0];
    if (target === '') continue;
    const candidates = target.endsWith('/')
      ? [path.join(dist, target, 'index.html')]
      : [path.join(dist, target)];
    const exists = await Promise.all(
      candidates.map((candidate) =>
        readFile(candidate)
          .then(() => true)
          .catch(() => false),
      ),
    );
    if (!exists.includes(true)) errors.push(`${rel} : lien interne cassé → ${target}`);
  }
}

console.log(`\n  ${files.length} pages analysées\n`);

if (notices.length) {
  console.log('  Remarques :');
  for (const notice of notices) console.log(`   • ${notice}`);
  console.log('');
}

if (errors.length) {
  console.log('  Erreurs :');
  for (const error of [...new Set(errors)]) console.log(`   ✗ ${error}`);
  console.log('');
  process.exit(1);
}

console.log('  ✓ Tous les contrôles sont passés.\n');
