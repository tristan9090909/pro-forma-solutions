/**
 * Serveur local de prévisualisation (développement uniquement).
 *
 *   node serve.mjs [port]
 *
 * Sert dist/ avec des URL propres et simule /contact.php (aucun e-mail n'est envoyé :
 * le contenu du formulaire est simplement affiché dans la console).
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const port = Number(process.argv[2] || process.env.PORT || 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const candidates = clean.endsWith('/')
    ? [path.join(root, clean, 'index.html')]
    : [path.join(root, clean), path.join(root, clean, 'index.html')];

  for (const candidate of candidates) {
    if (!candidate.startsWith(root)) continue;
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      /* fichier suivant */
    }
  }
  return null;
}

const server = createServer(async (request, response) => {
  // Simulation du point d'entrée PHP du formulaire.
  if (request.url.startsWith('/contact.php')) {
    if (request.method !== 'POST') {
      response.writeHead(405).end();
      return;
    }
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      console.log('\n[dev] Formulaire reçu (aucun e-mail envoyé) :');
      console.log(body.slice(0, 1500));
      const wantsJson = (request.headers.accept || '').includes('application/json');
      if (wantsJson) {
        response.writeHead(200, { 'Content-Type': 'application/json' }).end('{"ok":true}');
      } else {
        response.writeHead(303, { Location: '/contact/merci/' }).end();
      }
    });
    return;
  }

  const file = await resolveFile(request.url);

  if (!file) {
    const notFound = path.join(root, '404.html');
    try {
      const html = await readFile(notFound);
      response.writeHead(404, { 'Content-Type': MIME['.html'] }).end(html);
    } catch {
      response.writeHead(404).end('404');
    }
    return;
  }

  const type = MIME[path.extname(file)] || 'application/octet-stream';
  response.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  response.end(await readFile(file));
});

server.listen(port, () => {
  console.log(`\n  ▸ Prévisualisation : http://localhost:${port}\n`);
});
