import { html, autoLink } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { company, training } from '../data/site.mjs';

/** En-tête de page intérieure. */
export function pageHero({ eyebrow, title, lead, meta }) {
  return html`<section class="page-hero">
    <div class="container">
      ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
      <h1 class="page-hero__title">${title}</h1>
      ${lead ? html`<p class="page-hero__lead">${lead}</p>` : ''}
      ${meta
        ? html`<ul class="page-hero__meta">
            ${meta.map(
              (item) => html`<li>${icon(item.icon, { className: 'icon icon--sm' })}${item.label}</li>`,
            )}
          </ul>`
        : ''}
    </div>
  </section>`;
}

/** Section standard avec titre et contenu. */
export function section({ id, eyebrow, title, lead, body, variant = '', headingLevel = 2 }) {
  const Tag = `h${headingLevel}`;
  return html`<section class="section${variant ? ` section--${variant}` : ''}"${
    id ? html` id="${id}"` : ''
  }>
    <div class="container">
      ${title
        ? html`<div class="section__head">
            ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
            <${Tag} class="section__title">${title}</${Tag}>
            ${lead ? html`<p class="section__lead">${lead}</p>` : ''}
          </div>`
        : ''}
      ${body}
    </div>
  </section>`;
}

/** Bandeau d'appel au contact. Aucune mention de financement (loi du 19 décembre 2022). */
export function contactBand({
  title = 'Une question sur la formation ?',
  text = 'Contactez-nous pour étudier les modalités d’inscription adaptées à votre situation. Réponse sous ' +
    company.responseTime +
    '.',
} = {}) {
  return html`<section class="contact-band">
    <div class="container contact-band__inner">
      <div>
        <h2 class="contact-band__title">${title}</h2>
        <p class="contact-band__text">${text}</p>
      </div>
      <div class="contact-band__actions">
        <a class="btn btn--primary" href="/contact/">Nous contacter</a>
        <a class="btn btn--ghost" href="mailto:${company.email}">
          ${icon('mail', { className: 'icon icon--sm' })}${company.email}
        </a>
      </div>
    </div>
  </section>`;
}

/** Tableau de synthèse de la formation (identique au PDF du programme). */
export function trainingSummaryTable() {
  const rows = [
    { icon: 'clock', label: 'Durée', value: training.duration },
    { icon: 'screen', label: 'Format', value: training.format },
    { icon: 'pin', label: 'Lieu', value: training.place },
    { icon: 'tag', label: 'Tarif', value: training.price },
    { icon: 'users', label: 'Public visé', value: training.audience },
    { icon: 'shield', label: 'Prérequis', value: training.prerequisites },
    { icon: 'users', label: 'Effectif', value: training.groupSize },
    { icon: 'clock', label: 'Horaires', value: training.schedule },
    { icon: 'award', label: 'Certification', value: `${training.code} — certificateur ${training.certifier}` },
    { icon: 'presentation', label: 'Formateur', value: training.trainer },
    { icon: 'chat', label: 'Sessions', value: training.sessions },
  ];
  return html`<div class="table-wrap">
    <table class="data-table">
      <caption class="sr-only">
        Synthèse de la formation « ${training.title} »
      </caption>
      <tbody>
        ${rows.map(
          (row) => html`<tr>
            <th scope="row">
              ${icon(row.icon, { className: 'icon icon--sm' })}<span>${row.label}</span>
            </th>
            <td>
              ${row.value}${row.note ? html`<span class="data-table__note">${row.note}</span>` : ''}
            </td>
          </tr>`,
        )}
      </tbody>
    </table>
  </div>`;
}

/** Encadré d'information neutre. */
export function noteBox({ title, children, iconName = 'info', variant = '' }) {
  return html`<aside class="note${variant ? ` note--${variant}` : ''}">
    <span class="note__icon">${icon(iconName)}</span>
    <div class="note__body">
      ${title ? html`<p class="note__title">${title}</p>` : ''}
      ${children}
    </div>
  </aside>`;
}

/** Rendu d'une page légale fournie (contenu non modifié). */
export function legalContent(page) {
  return html`<div class="prose">
    ${page.intro ? html`<p class="prose__intro">${page.intro}</p>` : ''}
    ${page.sections.map(
      (block) => html`
        <h2>${block.heading}</h2>
        ${block.blocks.map((item) =>
          item.type === 'ul'
            ? html`<ul>
                ${item.items.map((li) => html`<li>${linkify(li)}</li>`)}
              </ul>`
            : html`<p>${linkify(item.text)}</p>`,
        )}
      `,
    )}
  </div>`;
}

/** Les pages légales citent des e-mails et des URL : on les rend cliquables sans toucher au texte. */
function linkify(text) {
  return autoLink(text);
}
