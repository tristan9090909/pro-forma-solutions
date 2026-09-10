/**
 * Empreinte de contenu sur les assets.
 *
 * Les fichiers de /assets/ sont servis avec un cache d'un an (immutable) : sans
 * empreinte, remplacer une image ou la feuille de style laisserait les visiteurs
 * sur l'ancienne version pendant des mois. Chaque URL porte donc un condensé du
 * contenu (`?h=…`) qui change dès que le fichier change.
 */
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
const cache = new Map();

/** Emplacements possibles d'un chemin public, dans l'ordre de recherche. */
function sources(url) {
  const clean = url.split('?')[0];
  return [
    path.join(root, 'src', clean), // /assets/... -> src/assets/...
    path.join(root, 'public', clean), // /documents/... -> public/documents/...
    path.join(root, 'src/assets/img', path.basename(clean)), // /favicon.svg
  ];
}

/**
 * Retourne l'URL publique d'un asset, suffixée par l'empreinte de son contenu.
 * Si le fichier est introuvable, l'URL est renvoyée telle quelle (le contrôle
 * des liens dans scripts/check.mjs signalera l'anomalie).
 */
export function asset(url) {
  if (cache.has(url)) return cache.get(url);

  let resolved = url;
  for (const candidate of sources(url)) {
    try {
      const hash = createHash('sha1').update(readFileSync(candidate)).digest('hex').slice(0, 8);
      resolved = `${url}?h=${hash}`;
      break;
    } catch {
      /* emplacement suivant */
    }
  }

  cache.set(url, resolved);
  return resolved;
}
