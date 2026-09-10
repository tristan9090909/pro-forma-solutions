/**
 * Micro-utilitaires de rendu HTML.
 * Les chaînes interpolées sont échappées par défaut ; les fragments produits par
 * html`` (ou par raw()) sont insérés tels quels.
 */

const RAW = Symbol('raw-html');

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function raw(value) {
  return { [RAW]: true, value: String(value) };
}

function render(value) {
  if (value === null || value === undefined || value === false) return '';
  if (Array.isArray(value)) return value.map(render).join('');
  if (typeof value === 'object' && value[RAW]) return value.value;
  return escapeHtml(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i += 1) {
    out += render(values[i]) + strings[i + 1];
  }
  return raw(out);
}

/** Rend un fragment en chaîne finale. */
export function toString(fragment) {
  return render(fragment);
}

/**
 * Transforme un texte brut en HTML sûr en activant :
 *  - les adresses e-mail (lien mailto)
 *  - les URL http(s) et les domaines type www.cnil.fr (lien externe)
 * Utilisé pour les pages légales, dont le texte ne doit pas être modifié.
 */
export function autoLink(text) {
  const escaped = escapeHtml(text);
  const pattern = /(https?:\/\/[^\s,)]+[^\s.,;:)]|www\.[a-z0-9-]+(?:\.[a-z0-9-]+)+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  return raw(
    escaped.replace(pattern, (match) => {
      if (match.includes('@')) {
        return `<a href="mailto:${match}">${match}</a>`;
      }
      const href = match.startsWith('http') ? match : `https://${match}`;
      return `<a href="${href}" rel="noopener noreferrer" target="_blank">${match}</a>`;
    }),
  );
}
