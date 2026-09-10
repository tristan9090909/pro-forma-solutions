import { html } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import {
  pageHero,
  section,
  contactBand,
  trainingSummaryTable,
  noteBox,
} from '../templates/components.mjs';
import { site, company, training } from '../data/site.mjs';

export const formation = {
  url: '/formation/',
  file: 'formation/index.html',
  title: 'Formation RS6931 — management d’équipe | Forma Pro Solutions',
  description:
    'Intégrer le management d’équipe dans son activité professionnelle (RS6931) : 21 heures à distance, 6 modules, programme, évaluation et tarif.',
  breadcrumb: [{ label: 'Formation', url: '/formation/' }],
  build() {
    return html`
      ${pageHero({
        eyebrow: `${training.code} — ${training.repertoire} — certificateur ${training.certifier}`,
        title: training.title,
        lead: 'Une formation opérationnelle au management de proximité, destinée aux professionnels qui encadrent une équipe tout en continuant d’exercer leur métier.',
        meta: [
          { icon: 'clock', label: '21 heures — 3 journées de 7 heures' },
          { icon: 'screen', label: 'À distance, en visioconférence' },
          { icon: 'users', label: '6 à 12 participants' },
          { icon: 'tag', label: training.price },
        ],
      })}

      ${section({
        id: 'synthese',
        eyebrow: 'Fiche formation',
        title: 'Synthèse',
        lead: 'Les informations ci-dessous sont identiques à celles du programme officiel téléchargeable.',
        body: html`
          ${trainingSummaryTable()}
          <div class="included">
            <h3 class="included__title">Le tarif comprend</h3>
            <ul class="included__list" role="list">
              ${training.included.map(
                (item) => html`<li>${icon('check', { className: 'icon icon--sm' })}${item}</li>`,
              )}
            </ul>
            <p class="included__note">${training.includedNote} ${training.priceNote}</p>
          </div>
          <div class="certif-links">
            <a
              class="link-arrow"
              href="${training.franceCompetencesUrl}"
              rel="noopener noreferrer"
              target="_blank"
            >
              Fiche ${training.code} sur France Compétences
              ${icon('external', { className: 'icon icon--sm' })}
            </a>
            <p class="certif-links__note">
              Certification enregistrée le ${training.registeredOn} — échéance le
              ${training.expiresOn}. Domaine NSF : ${training.nsf}.
            </p>
          </div>
        `,
      })}

      ${section({
        id: 'public',
        variant: 'alt',
        eyebrow: 'À qui s’adresse la formation',
        title: 'Public visé, prérequis et positionnement',
        body: html`
          <div class="split">
            <div class="split__col">
              <h3 class="split__title">
                ${icon('users', { className: 'icon icon--sm' })}Public visé
              </h3>
              <p>${training.audience}</p>
            </div>
            <div class="split__col">
              <h3 class="split__title">
                ${icon('shield', { className: 'icon icon--sm' })}Prérequis
              </h3>
              <p>${training.prerequisites}</p>
            </div>
          </div>
          <div class="positioning">
            <h3 class="split__title">
              ${icon('document', { className: 'icon icon--sm' })}Évaluation à l’entrée
              (positionnement)
            </h3>
            <p>${training.positioningIntro}</p>
            <ul class="check-list" role="list">
              ${training.positioning.map(
                (item) => html`<li>${icon('check', { className: 'icon icon--sm' })}${item}</li>`,
              )}
            </ul>
          </div>
        `,
      })}

      ${section({
        id: 'objectifs',
        eyebrow: 'Objectifs pédagogiques',
        title: 'Ce que le participant sera capable de faire',
        lead: training.objectivesIntro,
        body: html`
          <ul class="check-list check-list--cols" role="list">
            ${training.pedagogicalObjectives.map(
              (item) => html`<li>${icon('check', { className: 'icon icon--sm' })}${item}</li>`,
            )}
          </ul>

          <div class="competences">
            <h3 class="competences__title">Compétences visées</h3>
            <p class="competences__lead">${training.competencesIntro}</p>
            <ol class="objectives" role="list">
              ${training.objectives.map(
                (objective, index) => html`<li class="objective">
                  <span class="objective__num" aria-hidden="true">C${index + 1}</span>
                  <p class="objective__text">${objective}</p>
                </li>`,
              )}
            </ol>
          </div>
        `,
      })}

      ${section({
        id: 'programme',
        variant: 'alt',
        eyebrow: 'Programme détaillé',
        title: 'Six modules de 3h30',
        lead: 'Le programme officiel complet est téléchargeable au format PDF, sans modification.',
        body: html`
          <ol class="modules" role="list">
            ${training.modules.map(
              (module) => html`<li class="module">
                <div class="module__head">
                  <span class="module__num">Module ${module.number} · ${module.code}</span>
                  <span class="module__duration">
                    ${icon('clock', { className: 'icon icon--sm' })}${module.duration}
                  </span>
                </div>
                <h3 class="module__title">${module.title}</h3>
                <p class="module__slot">${module.slot}</p>
                <p class="module__objectives">${module.objectives}</p>
              </li>`,
            )}
          </ol>

          <p class="modules__note">
            Chaque heure de formation est rattachée à un module ; les épreuves de certification se
            déroulent en dehors de ce temps de formation.
          </p>

          <div class="download">
            <span class="download__icon">${icon('document')}</span>
            <div class="download__body">
              <p class="download__title">Programme de formation ${training.code} (PDF)</p>
              <p class="download__text">
                Document officiel : objectifs, contenu détaillé des modules, méthodes pédagogiques et
                modalités d’évaluation. Programme mis à jour le ${training.programUpdated}.
              </p>
            </div>
            <a class="btn btn--primary" href="${training.programPdf}" download>
              ${icon('download', { className: 'icon icon--sm' })}Télécharger le programme
            </a>
          </div>
        `,
      })}

      ${section({
        id: 'modalites',
        eyebrow: 'Déroulement',
        title: 'Modalités pédagogiques et techniques',
        body: html`<div class="split">
          <div class="split__col">
            <h3 class="split__title">
              ${icon('screen', { className: 'icon icon--sm' })}Format et rythme
            </h3>
            <p>
              ${training.format}. La formation se déroule sur ${training.duration.toLowerCase()},
              aux horaires suivants : ${training.schedule}.
            </p>
            <p>${training.technicalMeans}</p>
          </div>
          <div class="split__col">
            <h3 class="split__title">
              ${icon('presentation', { className: 'icon icon--sm' })}Méthodes mobilisées
            </h3>
            <p>${training.methods}</p>
            <p>
              Sessions ouvertes sur demande, en groupe de ${training.groupSize.toLowerCase()}.
              Formateur : ${training.trainer}.
            </p>
          </div>
          <div class="split__col">
            <h3 class="split__title">
              ${icon('chat', { className: 'icon icon--sm' })}Assistance technique et pédagogique
            </h3>
            <p>${training.support}</p>
          </div>
        </div>`,
      })}

      ${section({
        id: 'certification',
        variant: 'alt',
        eyebrow: 'Évaluation',
        title: 'Modalités d’évaluation et certification',
        body: html`
          <div class="prose prose--narrow">
            <p>${training.certification}</p>
          </div>
          <ul class="steps" role="list">
            <li class="step">
              <span class="step__num">E1</span>
              <div>
                <h3 class="step__title">Préparation écrite</h3>
                <p class="step__text">
                  Première épreuve de l’évaluation certificative, organisée par le service Centre
                  d’Examen du certificateur ${training.certifier}.
                </p>
              </div>
            </li>
            <li class="step">
              <span class="step__num">E2</span>
              <div>
                <h3 class="step__title">Mise en situation</h3>
                <p class="step__text">
                  Mise en situation sur un cas fictif de management, devant un jury professionnel de
                  2 membres disposant de 3 ans d’expérience dans le domaine managérial.
                </p>
              </div>
            </li>
            <li class="step">
              <span class="step__num">${icon('award', { className: 'icon icon--sm' })}</span>
              <div>
                <h3 class="step__title">Jury de délivrance</h3>
                <p class="step__text">
                  La décision finale est prononcée par ${training.certifier} ; en cas de réussite, un
                  certificat de compétences est édité par le certificateur.
                </p>
              </div>
            </li>
          </ul>

          <div class="split split--top">
            <div class="split__col">
              <h3 class="split__title">
                ${icon('chart', { className: 'icon icon--sm' })}Évaluation formative et suivi
              </h3>
              <p>${training.formativeAssessment}</p>
            </div>
            <div class="split__col">
              <h3 class="split__title">
                ${icon('target', { className: 'icon icon--sm' })}Indicateurs de résultats
              </h3>
              <p>${training.results}</p>
            </div>
          </div>
        `,
      })}

      ${section({
        id: 'acces',
        eyebrow: 'Accès à la formation',
        title: 'Inscription et accessibilité',
        body: html`
          <div class="split">
            <div class="split__col">
              <h3 class="split__title">
                ${icon('document', { className: 'icon icon--sm' })}Modalités d’inscription
              </h3>
              <p>
                L’inscription est finalisée après validation du dossier d’admission, qui permet de
                vérifier le prérequis d’expérience professionnelle. Contactez-nous pour étudier les
                modalités d’inscription adaptées à votre situation.
              </p>
              <a class="btn btn--primary" href="/contact/">Nous contacter</a>
            </div>
            <div class="split__col">
              <h3 class="split__title">
                ${icon('accessibility', { className: 'icon icon--sm' })}Situation de handicap
              </h3>
              <p>
                Les conditions d’accueil, d’accompagnement et d’évaluation sont adaptées aux
                personnes en situation de handicap. Notre référent handicap étudie chaque situation
                particulière en amont de la formation.
              </p>
              <a class="link-arrow" href="/accessibilite-handicap/">
                Accessibilité handicap ${icon('arrow', { className: 'icon icon--sm' })}
              </a>
            </div>
          </div>
          ${noteBox({
            title: 'Délai d’accès',
            iconName: 'clock',
            children: html`<p>${training.accessDelay}</p>`,
          })}
        `,
      })}

      ${contactBand({
        title: 'Échanger sur votre projet de formation',
        text: `Une question sur le programme, les prérequis ou l’organisation des sessions ? Réponse sous ${company.responseTime}.`,
      })}
    `;
  },
  jsonLd() {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        '@id': `${site.baseUrl}/formation/#course`,
        name: training.title,
        description:
          'Formation certifiante au management d’équipe et à la prise de fonction managériale : cadrage des objectifs, délégation, pilotage d’activité, entretiens de suivi, animation de réunion et adaptation du style managérial.',
        url: `${site.baseUrl}/formation/`,
        inLanguage: 'fr-FR',
        courseCode: training.code,
        educationalCredentialAwarded: {
          '@type': 'EducationalOccupationalCredential',
          name: `${training.code} — ${training.title}`,
          credentialCategory: 'Certification enregistrée au Répertoire Spécifique',
          recognizedBy: { '@type': 'Organization', name: training.certifier },
          url: training.franceCompetencesUrl,
        },
        provider: { '@id': `${site.baseUrl}/#organisme` },
        coursePrerequisites: training.prerequisites,
        audience: { '@type': 'Audience', audienceType: 'Professionnels encadrant une équipe' },
        teaches: training.objectives,
        offers: {
          '@type': 'Offer',
          price: training.priceValue,
          priceCurrency: 'EUR',
          category: 'Formation professionnelle',
          url: `${site.baseUrl}/formation/`,
          availability: 'https://schema.org/InStock',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT21H',
          maximumAttendeeCapacity: 12,
          inLanguage: 'fr-FR',
          instructor: { '@type': 'Person', name: training.trainer },
          location: {
            '@type': 'VirtualLocation',
            name: 'Visioconférence (Zoom)',
          },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${site.baseUrl}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Formation',
            item: `${site.baseUrl}/formation/`,
          },
        ],
      },
    ];
  },
};
