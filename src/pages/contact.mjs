import { html } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { pageHero, section } from '../templates/components.mjs';
import { site, company, training } from '../data/site.mjs';

export const contact = {
  url: '/contact/',
  file: 'contact/index.html',
  title: 'Contact | Forma Pro Solutions',
  description:
    'Contactez Forma Pro Solutions pour toute question sur la formation au management d’équipe (RS6931) : formulaire, e-mail et téléphone. Réponse sous 48 heures ouvrées.',
  breadcrumb: [{ label: 'Contact', url: '/contact/' }],
  build() {
    return html`
      ${pageHero({
        eyebrow: 'Nous écrire',
        title: 'Contact',
        lead: `Une question sur la formation, le programme ou les modalités d’inscription ? Écrivez-nous : nous répondons sous ${company.responseTime}.`,
      })}

      ${section({
        id: 'formulaire',
        body: html`<div class="contact-layout">
          <div class="contact-layout__form">
            <h2 class="contact-layout__title">Formulaire de contact</h2>
            <form
              class="form"
              action="/contact.php"
              method="post"
              novalidate
              data-contact-form
              aria-describedby="form-intro"
            >
              <p class="form__intro" id="form-intro">
                Les champs suivis d’un astérisque (*) sont obligatoires.
              </p>

              <div class="form__row">
                <div class="field">
                  <label class="field__label" for="prenom">Prénom *</label>
                  <input
                    class="field__input"
                    type="text"
                    id="prenom"
                    name="prenom"
                    autocomplete="given-name"
                    required
                    maxlength="80"
                  />
                  <p class="field__error" data-error-for="prenom" hidden></p>
                </div>
                <div class="field">
                  <label class="field__label" for="nom">Nom *</label>
                  <input
                    class="field__input"
                    type="text"
                    id="nom"
                    name="nom"
                    autocomplete="family-name"
                    required
                    maxlength="80"
                  />
                  <p class="field__error" data-error-for="nom" hidden></p>
                </div>
              </div>

              <div class="form__row">
                <div class="field">
                  <label class="field__label" for="email">Adresse e-mail *</label>
                  <input
                    class="field__input"
                    type="email"
                    id="email"
                    name="email"
                    autocomplete="email"
                    required
                    maxlength="150"
                  />
                  <p class="field__error" data-error-for="email" hidden></p>
                </div>
                <div class="field">
                  <label class="field__label" for="telephone">Téléphone</label>
                  <input
                    class="field__input"
                    type="tel"
                    id="telephone"
                    name="telephone"
                    autocomplete="tel"
                    maxlength="30"
                  />
                  <p class="field__error" data-error-for="telephone" hidden></p>
                </div>
              </div>

              <div class="field">
                <label class="field__label" for="message">Message *</label>
                <textarea
                  class="field__input field__input--textarea"
                  id="message"
                  name="message"
                  rows="7"
                  required
                  maxlength="4000"
                ></textarea>
                <p class="field__error" data-error-for="message" hidden></p>
              </div>

              <div class="field field--check">
                <input class="field__check" type="checkbox" id="consentement" name="consentement" required />
                <label class="field__check-label" for="consentement">
                  J’accepte que les informations transmises soient utilisées pour traiter ma demande,
                  conformément à la
                  <a href="/politique-de-confidentialite/">politique de confidentialité</a>. *
                </label>
                <p class="field__error" data-error-for="consentement" hidden></p>
              </div>

              <!-- Champ anti-robot : laissé vide par les visiteurs. -->
              <div class="form__honeypot" aria-hidden="true">
                <label for="societe_site">Ne pas remplir ce champ</label>
                <input type="text" id="societe_site" name="societe_site" tabindex="-1" autocomplete="off" />
              </div>

              <button class="btn btn--primary btn--block" type="submit">
                Envoyer le message ${icon('arrow', { className: 'icon icon--sm' })}
              </button>

              <p class="form__status" data-form-status role="status" aria-live="polite" hidden></p>

              <p class="form__legal">
                Les données transmises sont utilisées uniquement pour répondre à votre demande. Vous
                disposez d’un droit d’accès, de rectification et d’effacement de vos données, à
                exercer auprès de <a href="mailto:${company.email}">${company.email}</a>.
              </p>
            </form>
          </div>

          <aside class="contact-layout__aside" aria-label="Coordonnées">
            <div class="contact-card contact-card--aside">
              <h2 class="contact-card__title">Coordonnées</h2>
              <ul class="contact-card__list" role="list">
                <li>
                  ${icon('mail', { className: 'icon icon--sm' })}
                  <span>
                    <span class="contact-card__label">E-mail</span>
                    <a href="mailto:${company.email}">${company.email}</a>
                  </span>
                </li>
                <li>
                  ${icon('phone', { className: 'icon icon--sm' })}
                  <span>
                    <span class="contact-card__label">Téléphone</span>
                    <a href="tel:${company.phoneLink}">${company.phone}</a>
                  </span>
                </li>
                <li>
                  ${icon('screen', { className: 'icon icon--sm' })}
                  <span>
                    <span class="contact-card__label">Modalité</span>
                    Formation dispensée à distance
                  </span>
                </li>
                <li>
                  ${icon('pin', { className: 'icon icon--sm' })}
                  <span>
                    <span class="contact-card__label">Siège social</span>
                    ${company.address.full}
                  </span>
                </li>
                <li>
                  ${icon('clock', { className: 'icon icon--sm' })}
                  <span>
                    <span class="contact-card__label">Délai de réponse</span>
                    Sous ${company.responseTime}
                  </span>
                </li>
              </ul>
            </div>

            <div class="contact-card contact-card--muted">
              <h2 class="contact-card__title">Avant de nous écrire</h2>
              <p>
                Le programme officiel de la formation ${training.code}, les objectifs, les prérequis
                et le tarif sont détaillés sur la page dédiée.
              </p>
              <a class="link-arrow" href="/formation/">
                Consulter la formation ${icon('arrow', { className: 'icon icon--sm' })}
              </a>
            </div>
          </aside>
        </div>`,
      })}
    `;
  },
  jsonLd() {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        url: `${site.baseUrl}/contact/`,
        name: 'Contact — Forma Pro Solutions',
        isPartOf: { '@id': `${site.baseUrl}/#site` },
        publisher: { '@id': `${site.baseUrl}/#organisme` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${site.baseUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${site.baseUrl}/contact/` },
        ],
      },
    ];
  },
};

export const merci = {
  url: '/contact/merci/',
  file: 'contact/merci/index.html',
  title: 'Message envoyé | Forma Pro Solutions',
  description: 'Votre message a bien été transmis à Forma Pro Solutions.',
  noindex: true,
  breadcrumb: [
    { label: 'Contact', url: '/contact/' },
    { label: 'Message envoyé', url: '/contact/merci/' },
  ],
  build() {
    return html`${section({
      body: html`<div class="confirmation">
        <span class="confirmation__icon">${icon('check')}</span>
        <h1 class="confirmation__title">Votre message a bien été envoyé</h1>
        <p class="confirmation__text">
          Merci pour votre demande. Nous y répondons sous ${company.responseTime} à l’adresse
          e-mail que vous nous avez indiquée.
        </p>
        <div class="confirmation__actions">
          <a class="btn btn--primary" href="/">Retour à l’accueil</a>
          <a class="btn btn--ghost" href="/formation/">Voir la formation</a>
        </div>
      </div>`,
    })}`;
  },
  jsonLd() {
    return [];
  },
};

export const notFound = {
  url: '/404.html',
  file: '404.html',
  title: 'Page introuvable | Forma Pro Solutions',
  description: 'La page demandée n’existe pas ou a été déplacée.',
  noindex: true,
  build() {
    return html`${section({
      body: html`<div class="confirmation">
        <p class="confirmation__code">404</p>
        <h1 class="confirmation__title">Page introuvable</h1>
        <p class="confirmation__text">
          La page que vous cherchez n’existe pas ou a été déplacée.
        </p>
        <div class="confirmation__actions">
          <a class="btn btn--primary" href="/">Retour à l’accueil</a>
          <a class="btn btn--ghost" href="/contact/">Nous contacter</a>
        </div>
      </div>`,
    })}`;
  },
  jsonLd() {
    return [];
  },
};
