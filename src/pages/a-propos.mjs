import { html } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { complianceBanner } from '../lib/brand.mjs';
import { pageHero, section, contactBand } from '../templates/components.mjs';
import { site, company, compliance, training, trainerBio } from '../data/site.mjs';

const positioning = [
  {
    icon: 'target',
    title: 'Un seul domaine',
    text: 'Le management d’équipe et la prise de fonction managériale. Pas de catalogue généraliste : une formation, travaillée en profondeur.',
  },
  {
    icon: 'compass',
    title: 'Une pédagogie de terrain',
    text: 'Des situations réelles d’encadrement, des mises en situation et des outils de pilotage directement réutilisables en poste.',
  },
  {
    icon: 'screen',
    title: 'Un format à distance',
    text: 'Des sessions en visioconférence synchrone, en petit groupe, compatibles avec une activité professionnelle en cours.',
  },
];

export const aPropos = {
  url: '/a-propos/',
  file: 'a-propos/index.html',
  title: 'À propos — organisme de formation | Forma Pro Solutions',
  description:
    'Organisme de formation certifié Qualiopi, spécialisé dans le management de proximité. Mission, positionnement et présentation du formateur Kamel TREA.',
  breadcrumb: [{ label: 'À propos', url: '/a-propos/' }],
  build() {
    return html`
      ${pageHero({
        eyebrow: 'L’organisme',
        title: 'Un organisme de formation dédié au management d’équipe',
        lead: `${company.legalName} accompagne les professionnels qui encadrent une équipe tout en continuant d’exercer leur métier.`,
      })}

      ${section({
        id: 'mission',
        eyebrow: 'Notre mission',
        title: 'Former des managers de proximité opérationnels',
        body: html`
          <div class="prose prose--narrow">
            <p>
              De nombreux professionnels prennent la responsabilité d’une équipe sans avoir été
              préparés à l’encadrement : un expert métier devient référent, un collaborateur
              expérimenté se voit confier un service. La compétence technique est là ; les repères
              managériaux, eux, s’acquièrent rarement seuls.
            </p>
            <p>
              ${company.legalName} a été créé pour répondre à ce besoin précis. L’organisme propose
              une formation, « ${training.title} », qui donne aux
              professionnels les moyens d’endosser un rôle managérial : fixer des objectifs,
              déléguer, piloter l’activité, conduire les entretiens de suivi, animer les réunions
              d’équipe et adapter sa posture aux situations difficiles.
            </p>
            <p>
              L’organisme est enregistré comme prestataire de formation et certifié Qualiopi au
              titre des actions de formation. La formation est dispensée intégralement à distance,
              en visioconférence.
            </p>
          </div>
        `,
      })}

      ${section({
        id: 'positionnement',
        variant: 'alt',
        eyebrow: 'Positionnement',
        title: 'Trois partis pris',
        body: html`<ul class="cards cards--3" role="list">
          ${positioning.map(
            (item) => html`<li class="card">
              <span class="card__icon">${icon(item.icon)}</span>
              <h3 class="card__title">${item.title}</h3>
              <p class="card__text">${item.text}</p>
            </li>`,
          )}
        </ul>`,
      })}

      ${section({
        id: 'formateur',
        eyebrow: 'Le formateur',
        title: 'Kamel TREA',
        body: html`<div class="trainer trainer--profile">
          <div class="trainer__visual" aria-hidden="true">
            <svg viewBox="0 0 320 320" role="presentation">
              <rect width="320" height="320" rx="18" fill="#0f2f4d" />
              <g stroke="#4a90c2" stroke-opacity="0.4" stroke-width="1.2" fill="none">
                <circle cx="160" cy="160" r="52" />
                <circle cx="160" cy="160" r="96" />
                <circle cx="160" cy="160" r="140" />
              </g>
              <g fill="#5aa6d8" fill-opacity="0.85">
                <circle cx="160" cy="108" r="7" />
                <circle cx="228" cy="196" r="7" />
                <circle cx="92" cy="196" r="7" />
                <circle cx="160" cy="160" r="4" />
              </g>
              <path
                d="M160 108 228 196 92 196Z"
                stroke="#5aa6d8"
                stroke-opacity="0.6"
                stroke-width="1.4"
                fill="none"
              />
            </svg>
          </div>
          <div class="trainer__body">
            <p class="trainer__role">Dirigeant et formateur — ${company.legalName}</p>
            ${trainerBio.map((paragraph) => html`<p class="trainer__text">${paragraph}</p>`)}
            <a class="link-arrow" href="/formation/">
              Voir la formation animée par Kamel TREA
              ${icon('arrow', { className: 'icon icon--sm' })}
            </a>
          </div>
        </div>`,
      })}

      ${section({
        id: 'references',
        variant: 'alt',
        eyebrow: 'Références réglementaires',
        title: 'Certification qualité et enregistrement',
        body: html`
          ${complianceBanner()}
          <div class="table-wrap">
            <table class="data-table">
              <caption class="sr-only">
                Références administratives de ${company.legalName}
              </caption>
              <tbody>
                <tr>
                  <th scope="row"><span>Raison sociale</span></th>
                  <td>${company.legalName} — ${company.legalForm}</td>
                </tr>
                <tr>
                  <th scope="row"><span>SIRET</span></th>
                  <td>${company.siret}</td>
                </tr>
                <tr>
                  <th scope="row"><span>Code APE</span></th>
                  <td>${company.ape} — ${company.apeLabel}</td>
                </tr>
                <tr>
                  <th scope="row"><span>Déclaration d’activité</span></th>
                  <td>
                    Numéro ${compliance.ndaNumber}, ${compliance.ndaAuthority} —
                    ${compliance.ndaDate}
                    <span class="data-table__note">${compliance.ndaFooter}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span>Certification Qualiopi</span></th>
                  <td>${compliance.qualiopi.full}</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
      })}

      ${contactBand({
        title: 'Parler de votre besoin en management',
        text: `Contactez-nous pour étudier les modalités d’inscription adaptées à votre situation. Réponse sous ${company.responseTime}.`,
      })}
    `;
  },
  jsonLd() {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        url: `${site.baseUrl}/a-propos/`,
        name: 'À propos de Forma Pro Solutions',
        mainEntity: { '@id': `${site.baseUrl}/#organisme` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${site.baseUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'À propos', item: `${site.baseUrl}/a-propos/` },
        ],
      },
    ];
  },
};
