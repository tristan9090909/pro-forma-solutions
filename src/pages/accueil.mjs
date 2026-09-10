import { html } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { complianceBanner, qualiopiLogo } from '../lib/brand.mjs';
import { contactBand, section } from '../templates/components.mjs';
import { site, company, training, compliance } from '../data/site.mjs';

const highlights = [
  {
    icon: 'compass',
    title: 'Donner un cap clair',
    text: 'Traduire une commande en objectifs compréhensibles et en plan d’action pour l’équipe.',
  },
  {
    icon: 'layers',
    title: 'Déléguer et organiser',
    text: 'Répartir missions et tâches selon les compétences, les capacités et les profils.',
  },
  {
    icon: 'chart',
    title: 'Piloter l’activité',
    text: 'Construire des tableaux de bord utiles et décider des actions correctives.',
  },
  {
    icon: 'chat',
    title: 'Conduire les entretiens',
    text: 'Adapter sa posture au motif de l’entretien : félicitation, recadrage, feedback.',
  },
  {
    icon: 'presentation',
    title: 'Animer les réunions',
    text: 'Faire du point d’équipe un temps utile, dont chacun ressort avec des décisions.',
  },
  {
    icon: 'target',
    title: 'Tenir sa ligne managériale',
    text: 'Choisir son registre face au conflit, à la décision difficile ou au changement.',
  },
];

export const accueil = {
  url: '/',
  file: 'index.html',
  title: 'Formation management d’équipe | Forma Pro Solutions',
  description:
    'Formation au management de proximité : 21 heures à distance, en visioconférence. Organisme de formation certifié Qualiopi.',
  build() {
    return html`
      <section class="hero">
        <div class="hero__bg" aria-hidden="true">
          <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" role="presentation">
            <defs>
              <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#12385c" />
                <stop offset="100%" stop-color="#0a1f34" />
              </linearGradient>
              <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#4a90c2" stop-opacity="0" />
                <stop offset="50%" stop-color="#4a90c2" stop-opacity="0.55" />
                <stop offset="100%" stop-color="#4a90c2" stop-opacity="0" />
              </linearGradient>
            </defs>
            <rect width="1200" height="700" fill="url(#heroGrad)" />
            <g stroke="url(#heroLine)" stroke-width="1" fill="none">
              <path d="M-50 560 C 250 470, 420 610, 700 470 S 1050 330, 1260 400" />
              <path d="M-50 620 C 260 540, 430 660, 720 530 S 1060 400, 1260 460" />
              <path d="M-50 500 C 240 400, 410 560, 690 410 S 1040 260, 1260 340" />
            </g>
            <g fill="none" stroke="#4a90c2" stroke-opacity="0.30" stroke-width="1">
              <circle cx="980" cy="200" r="120" />
              <circle cx="980" cy="200" r="190" />
              <circle cx="980" cy="200" r="260" />
            </g>
            <g fill="#4a90c2" fill-opacity="0.5">
              <circle cx="980" cy="200" r="5" />
              <circle cx="860" cy="200" r="3.5" />
              <circle cx="1041" cy="83" r="3.5" />
              <circle cx="1105" cy="300" r="3.5" />
            </g>
          </svg>
        </div>

        <div class="container hero__inner">
          <div class="hero__content">
            <div class="hero__trust">
              ${qualiopiLogo({ className: 'qualiopi-logo qualiopi-logo--hero' })}
              <p class="hero__trust-text">
                <strong>Certification Qualiopi N°${compliance.qualiopi.number}</strong><br />
                ${compliance.qualiopi.logoMention}
              </p>
            </div>

            <p class="eyebrow eyebrow--light">
              Management de proximité — formation à distance
            </p>
            <h1 class="hero__title">
              Le management d’équipe pour les professionnels qui gardent leur métier
            </h1>
            <p class="hero__lead">
              Prendre une équipe sans y avoir été préparé : une formation opérationnelle au
              management de proximité, animée à distance sur trois journées.
            </p>
            <div class="hero__actions">
              <a class="btn btn--primary" href="/formation/">
                Découvrir la formation ${icon('arrow', { className: 'icon icon--sm' })}
              </a>
              <a class="btn btn--outline-light" href="/contact/">Nous contacter</a>
            </div>
            <ul class="hero__facts">
              <li>${icon('clock', { className: 'icon icon--sm' })}21 heures — 3 journées</li>
              <li>${icon('screen', { className: 'icon icon--sm' })}À distance, en visioconférence</li>
              <li>${icon('users', { className: 'icon icon--sm' })}6 à 12 participants</li>
            </ul>
          </div>

          <aside class="hero__card" aria-label="Repères de la formation">
            <p class="hero__card-eyebrow">Formation professionnelle</p>
            <p class="hero__card-title">${training.title}</p>
            <dl class="hero__card-list">
              <div>
                <dt>Durée</dt>
                <dd>21 heures — 3 journées</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>${training.place}</dd>
              </div>
              <div>
                <dt>Tarif</dt>
                <dd>${training.price}</dd>
              </div>
            </dl>
            <a class="hero__card-link" href="/formation/">
              Programme et modalités ${icon('arrow', { className: 'icon icon--sm' })}
            </a>
          </aside>
        </div>

      </section>

      <section class="section section--intro">
        <div class="container">
          <div class="intro">
            <h2 class="intro__title">Un organisme de formation dédié au management de proximité</h2>
            <p class="intro__text">
              ${company.legalName} est un organisme de formation professionnelle certifié Qualiopi.
              Nous formons les professionnels qui encadrent une équipe tout en continuant d’exercer
              leur métier : chefs d’équipe, responsables de service, experts en prise de fonction
              managériale. Notre offre repose sur une formation dédiée,
              « ${training.title} », animée à distance par un formateur issu du terrain.
            </p>
          </div>
        </div>
      </section>

      ${section({
        id: 'au-programme',
        eyebrow: 'Au programme',
        title: 'Six thèmes travaillés en situation',
        lead: 'Un aperçu des sujets abordés au fil des six modules, du cadrage des objectifs à la conduite des situations managériales délicates.',
        body: html`
          <ul class="cards" role="list">
            ${highlights.map(
              (item) => html`<li class="card">
                <span class="card__icon">${icon(item.icon)}</span>
                <h3 class="card__title">${item.title}</h3>
                <p class="card__text">${item.text}</p>
              </li>`,
            )}
          </ul>
          <p class="section__footnote">
            Les six compétences travaillées sont détaillées sur la
            <a href="/formation/#objectifs">page de la formation</a>.
          </p>
        `,
      })}

      <section class="section section--feature" id="formation-phare">
        <div class="container feature">
          <div class="feature__body">
            <p class="eyebrow">Formation phare</p>
            <h2 class="feature__title">${training.title}</h2>
            <p class="feature__text">
              Trois journées de 7 heures en visioconférence synchrone, en groupe de 6 à 12
              participants, construites autour de mises en situation et d’outils directement
              réutilisables en poste.
            </p>
            <ul class="feature__list" role="list">
              <li>${icon('check', { className: 'icon icon--sm' })}6 modules de 3h30</li>
              <li>${icon('check', { className: 'icon icon--sm' })}${training.groupSize}</li>
              <li>
                ${icon('check', { className: 'icon icon--sm' })}Évaluation des acquis tout au long
                du parcours
              </li>
              <li>
                ${icon('check', { className: 'icon icon--sm' })}Attestation de fin de formation
              </li>
            </ul>
            <div class="feature__actions">
              <a class="btn btn--primary" href="/formation/">
                Voir le programme détaillé ${icon('arrow', { className: 'icon icon--sm' })}
              </a>
              <a class="btn btn--ghost" href="/contact/">Nous contacter</a>
            </div>
          </div>

          <div class="feature__aside">
            <div class="modules-preview">
              <p class="modules-preview__title">Les 6 modules</p>
              <ol class="modules-preview__list">
                ${training.modules.map(
                  (module) => html`<li>
                    <span class="modules-preview__num">${module.number}</span>
                    <span class="modules-preview__label">${module.title}</span>
                    <span class="modules-preview__duration">${module.duration}</span>
                  </li>`,
                )}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--compliance">
        <div class="container">${complianceBanner()}</div>
      </section>

      <section class="section section--trainer">
        <div class="container trainer">
          <div class="trainer__visual" aria-hidden="true">
            <svg viewBox="0 0 320 320" role="presentation">
              <rect width="320" height="320" rx="18" fill="#0f2f4d" />
              <g stroke="#4a90c2" stroke-opacity="0.45" stroke-width="1.2" fill="none">
                <path d="M40 240h240" />
                <path d="M40 180h180" />
                <path d="M40 120h120" />
                <path d="M40 60h60" />
              </g>
              <g fill="#5aa6d8" fill-opacity="0.85">
                <circle cx="60" cy="240" r="7" />
                <circle cx="130" cy="180" r="7" />
                <circle cx="200" cy="120" r="7" />
                <circle cx="270" cy="60" r="7" />
              </g>
              <path
                d="M60 240 130 180 200 120 270 60"
                stroke="#5aa6d8"
                stroke-width="1.6"
                fill="none"
                stroke-opacity="0.7"
              />
            </svg>
          </div>
          <div class="trainer__body">
            <p class="eyebrow">Le formateur</p>
            <h2 class="trainer__title">Kamel TREA</h2>
            <p class="trainer__text">
              Dirigeant et formateur de ${company.legalName}, Kamel TREA totalise plus de douze ans
              d’encadrement et de pilotage d’équipes, dont neuf ans comme responsable de gare à la
              RATP, puis superviseur d’une équipe de vingt personnes. Sa pédagogie s’appuie sur des
              situations réelles et des outils directement réutilisables en poste.
            </p>
            <a class="link-arrow" href="/a-propos/">
              En savoir plus sur l’organisme ${icon('arrow', { className: 'icon icon--sm' })}
            </a>
          </div>
        </div>
      </section>

      ${contactBand()}
    `;
  },
  jsonLd() {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        '@id': `${site.baseUrl}/#organisme`,
        name: company.legalName,
        legalName: company.legalName,
        url: site.baseUrl,
        email: company.email,
        telephone: company.phone,
        description: site.description,
        logo: `${site.baseUrl}/assets/img/logo.svg`,
        founder: { '@type': 'Person', name: company.director },
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address.street,
          postalCode: company.address.postalCode,
          addressLocality: company.address.city,
          addressCountry: 'FR',
        },
        identifier: [
          { '@type': 'PropertyValue', name: 'SIRET', value: company.siret },
          {
            '@type': 'PropertyValue',
            name: 'Numéro de déclaration d’activité',
            value: compliance.ndaNumber,
          },
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: `Certification Qualiopi N°${compliance.qualiopi.number}`,
          credentialCategory: 'Qualiopi — actions de formation',
          validFrom: '2026-05-04',
          validUntil: '2029-05-03',
          recognizedBy: { '@type': 'Organization', name: compliance.qualiopi.issuer },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${site.baseUrl}/#site`,
        url: site.baseUrl,
        name: site.name,
        inLanguage: 'fr-FR',
        publisher: { '@id': `${site.baseUrl}/#organisme` },
      },
    ];
  },
};
