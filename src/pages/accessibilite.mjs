import { html } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { pageHero, section, noteBox } from '../templates/components.mjs';
import { site, company, accessibility } from '../data/site.mjs';

export const accessibilite = {
  url: '/accessibilite-handicap/',
  file: 'accessibilite-handicap/index.html',
  title: 'Accessibilité handicap | Forma Pro Solutions',
  description:
    'Accueil des personnes en situation de handicap : aménagements pédagogiques, matériels et organisationnels, coordonnées du référent handicap.',
  breadcrumb: [{ label: 'Accessibilité handicap', url: '/accessibilite-handicap/' }],
  build() {
    return html`
      ${pageHero({
        eyebrow: 'Accueil et accompagnement',
        title: 'Accessibilité handicap',
        lead: 'Toute situation particulière est étudiée en amont de la formation par notre référent handicap.',
      })}

      ${section({
        id: 'engagement',
        body: html`<div class="prose prose--narrow">
          <p>${accessibility.text}</p>
        </div>`,
      })}

      ${section({
        id: 'referent',
        variant: 'alt',
        eyebrow: 'Votre interlocuteur',
        title: 'Référent handicap',
        lead: 'Pour toute demande d’aménagement, contactez directement notre référent handicap avant le début de la formation.',
        body: html`<div class="contact-card">
          <p class="contact-card__name">
            ${icon('accessibility', { className: 'icon' })}${accessibility.referent}
          </p>
          <ul class="contact-card__list" role="list">
            <li>
              ${icon('mail', { className: 'icon icon--sm' })}
              <a href="mailto:${company.email}">${company.email}</a>
            </li>
            <li>
              ${icon('phone', { className: 'icon icon--sm' })}
              <a href="tel:${company.phoneLink}">${company.phone}</a>
            </li>
          </ul>
          <a class="btn btn--primary" href="/contact/">Formuler une demande</a>
        </div>`,
      })}

      ${section({
        id: 'demarche',
        eyebrow: 'Comment cela se passe',
        title: 'La démarche en trois temps',
        body: html`
          <ul class="steps" role="list">
            <li class="step">
              <span class="step__num">1</span>
              <div>
                <h3 class="step__title">Prise de contact</h3>
                <p class="step__text">
                  Vous signalez votre situation au référent handicap, par e-mail ou par téléphone,
                  en amont de l’inscription ou dès que possible avant le début de la formation.
                </p>
              </div>
            </li>
            <li class="step">
              <span class="step__num">2</span>
              <div>
                <h3 class="step__title">Analyse des besoins</h3>
                <p class="step__text">
                  Un échange permet d’identifier les aménagements nécessaires : adaptation des
                  supports, aménagement des rythmes, modalités pédagogiques alternatives ou
                  accompagnement individualisé.
                </p>
              </div>
            </li>
            <li class="step">
              <span class="step__num">3</span>
              <div>
                <h3 class="step__title">Mise en œuvre</h3>
                <p class="step__text">
                  Les aménagements retenus sont formalisés avant le démarrage. Si nécessaire,
                  l’organisme s’appuie sur des partenaires spécialisés (AGEFIPH, Cap emploi).
                </p>
              </div>
            </li>
          </ul>
          ${noteBox({
            title: 'Épreuves de certification',
            iconName: 'info',
            children: html`<p>
              Les demandes d’aménagement des épreuves d’évaluation certificative sont transmises au
              certificateur Manitude, qui organise les épreuves. Signalez votre situation le plus tôt
              possible afin que la demande puisse être instruite dans les délais.
            </p>`,
          })}
        `,
      })}
    `;
  },
  jsonLd() {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        url: `${site.baseUrl}/accessibilite-handicap/`,
        name: 'Accessibilité handicap',
        isPartOf: { '@id': `${site.baseUrl}/#site` },
        publisher: { '@id': `${site.baseUrl}/#organisme` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${site.baseUrl}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Accessibilité handicap',
            item: `${site.baseUrl}/accessibilite-handicap/`,
          },
        ],
      },
    ];
  },
};
