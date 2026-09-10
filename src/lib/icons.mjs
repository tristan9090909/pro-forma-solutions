/**
 * Jeu d'icônes outline, cohérent (trait 1.5, grille 24).
 * Insérées en SVG inline : aucune requête réseau, couleur héritée du texte.
 */
import { raw } from './html.mjs';

const paths = {
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 1.8"/>',
  screen:
    '<rect x="3" y="4.5" width="18" height="12" rx="1.5"/><path d="M8.5 20h7M12 16.5V20"/>',
  users:
    '<path d="M15.5 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.9A3.4 3.4 0 0 0 3.5 18.4V20"/><circle cx="9.5" cy="8.2" r="3.2"/><path d="M20.5 20v-1.6a3.4 3.4 0 0 0-2.6-3.3M15.6 5.2a3.2 3.2 0 0 1 0 6.1"/>',
  tag: '<path d="M20 12.4 12.4 20a1.6 1.6 0 0 1-2.3 0l-6-6a1.6 1.6 0 0 1-.5-1.1V5.6A1.6 1.6 0 0 1 5.2 4h7.3c.4 0 .8.2 1.1.5l6.4 6.4a1.6 1.6 0 0 1 0 1.5Z"/><circle cx="8.4" cy="8.4" r="1.1"/>',
  target:
    '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1"/>',
  compass:
    '<circle cx="12" cy="12" r="8.5"/><path d="m15.4 8.6-2 4.8-4.8 2 2-4.8Z"/>',
  layers:
    '<path d="m12 3.5 8.5 4.3L12 12.1 3.5 7.8Z"/><path d="m3.5 12 8.5 4.3 8.5-4.3"/><path d="m3.5 16.2 8.5 4.3 8.5-4.3"/>',
  chart:
    '<path d="M4 20h16"/><rect x="6" y="12" width="3.2" height="5.5" rx="0.8"/><rect x="12" y="8" width="3.2" height="9.5" rx="0.8"/><rect x="17.5" y="4.5" width="3.2" height="13" rx="0.8"/>',
  chat:
    '<path d="M20 14.4a2.1 2.1 0 0 1-2.1 2.1H8.5L4.5 20V6.1A2.1 2.1 0 0 1 6.6 4h11.3A2.1 2.1 0 0 1 20 6.1Z"/>',
  presentation:
    '<path d="M3.5 4.5h17M4.8 4.5v8.9a1.6 1.6 0 0 0 1.6 1.6h11.2a1.6 1.6 0 0 0 1.6-1.6V4.5"/><path d="m9.5 19.5 2.5-4.5 2.5 4.5"/>',
  shield:
    '<path d="M12 3.5 5 6.2v5.3c0 4 2.9 7.4 7 8.5 4.1-1.1 7-4.5 7-8.5V6.2Z"/><path d="m9.2 12 2 2 3.6-3.9"/>',
  check: '<path d="m5 12.8 4.4 4.3L19 6.9"/>',
  download:
    '<path d="M12 4v10.5"/><path d="m7.8 10.6 4.2 4.2 4.2-4.2"/><path d="M4.5 19.5h15"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.8 6.5 7.2 5.6a1.6 1.6 0 0 0 2 0l7.2-5.6"/>',
  phone:
    '<path d="M20 16.4v2.3a1.6 1.6 0 0 1-1.8 1.6 15.6 15.6 0 0 1-6.8-2.4 15.4 15.4 0 0 1-4.7-4.7A15.6 15.6 0 0 1 4.3 6.3 1.6 1.6 0 0 1 5.9 4.5h2.3a1.6 1.6 0 0 1 1.6 1.4c.1.8.3 1.6.6 2.4a1.6 1.6 0 0 1-.4 1.7l-1 1a12.4 12.4 0 0 0 4.7 4.7l1-1a1.6 1.6 0 0 1 1.7-.4c.8.3 1.6.5 2.4.6a1.6 1.6 0 0 1 1.2 1.5Z"/>',
  pin: '<path d="M19 10.5c0 5-7 10-7 10s-7-5-7-10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10.3" r="2.6"/>',
  accessibility:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="7.4" r="1.2"/><path d="M7.8 10.1c2.7.8 5.7.8 8.4 0"/><path d="M12 10.4v3.3m0 0-2.3 4.2m2.3-4.2 2.3 4.2"/>',
  document:
    '<path d="M13.5 3.5H7.2a1.7 1.7 0 0 0-1.7 1.7v13.6a1.7 1.7 0 0 0 1.7 1.7h9.6a1.7 1.7 0 0 0 1.7-1.7V8.4Z"/><path d="M13.5 3.5v4.9h4.9"/><path d="M8.8 13h6.4M8.8 16.4h4.4"/>',
  award:
    '<circle cx="12" cy="9.2" r="5.2"/><path d="m8.6 13.6-1.4 6.4 4.8-2.6 4.8 2.6-1.4-6.4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.2"/><circle cx="12" cy="7.9" r="0.9" fill="currentColor" stroke="none"/>',
  arrow: '<path d="M4.5 12h14"/><path d="m13 6.5 5.5 5.5-5.5 5.5"/>',
  external: '<path d="M14 4.5h5.5V10"/><path d="M19.5 4.5 11 13"/><path d="M18 14.2v4.1a1.6 1.6 0 0 1-1.6 1.6H5.7a1.6 1.6 0 0 1-1.6-1.6V7.6A1.6 1.6 0 0 1 5.7 6h4.1"/>',
};

export function icon(name, { className = 'icon', title = '' } = {}) {
  const body = paths[name];
  if (!body) throw new Error(`Icône inconnue : ${name}`);
  const a11y = title
    ? `role="img" aria-label="${title}"`
    : 'aria-hidden="true" focusable="false"';
  return raw(
    `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${body}</svg>`,
  );
}
