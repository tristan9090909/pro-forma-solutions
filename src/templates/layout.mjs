import { html, raw, toString } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { logo, qualiopiLogo } from '../lib/brand.mjs';
import { asset } from '../lib/assets.mjs';
import { site, company, compliance, nav, legalNav } from '../data/site.mjs';

function head({ title, description, url, noindex, jsonLd }) {
  const canonical = site.baseUrl + url;
  return html`<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    ${noindex ? html`<meta name="robots" content="noindex, follow" />` : html`<meta name="robots" content="index, follow" />`}
    <meta name="author" content="${company.legalName}" />
    <meta name="theme-color" content="${site.themeColor}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${site.name}" />
    <meta property="og:locale" content="${site.locale}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${site.baseUrl}${asset('/assets/img/og-image.png')}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="${asset('/favicon.svg')}" type="image/svg+xml" />
    <link
      rel="alternate icon"
      href="${asset('/assets/img/favicon-192.png')}"
      type="image/png"
      sizes="192x192"
    />
    <link rel="apple-touch-icon" href="${asset('/assets/img/apple-touch-icon.png')}" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="stylesheet" href="${asset('/assets/css/styles.css')}" />
    ${jsonLd.map((block) => html`<script type="application/ld+json">${jsonLdScript(block)}</script>`)}`;
}

function jsonLdScript(data) {
  // Les chevrons sont neutralisés pour ne pas fermer la balise script prématurément.
  return raw(JSON.stringify(data, null, 2).replace(/</g, '\\u003c'));
}

function header(currentUrl) {
  return html`<header class="site-header" id="haut">
    <div class="container site-header__inner">
      ${logo()}
      <button
        class="nav-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="menu-principal"
        data-nav-toggle
      >
        <span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
        <span class="nav-toggle__label">Menu</span>
      </button>
      <nav class="site-nav" id="menu-principal" aria-label="Navigation principale">
        <ul class="site-nav__list">
          ${nav.map(
            (item) => html`<li>
              <a
                class="site-nav__link${item.url === currentUrl ? ' is-current' : ''}"
                href="${item.url}"
                ${item.url === currentUrl ? aria('page') : ''}
                >${item.label}</a
              >
            </li>`,
          )}
          <li class="site-nav__cta">
            <a class="btn btn--primary btn--sm" href="/contact/">Nous contacter</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function aria(value) {
  return html`aria-current="${value}"`;
}

function footer() {
  const { qualiopi } = compliance;
  return html`<footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div class="site-footer__col site-footer__col--brand">
          ${logo({ className: 'brand brand--footer' })}
          <p class="site-footer__about">
            Organisme de formation professionnelle spécialisé dans le management d’équipe et la
            prise de fonction managériale.
          </p>
          <div class="site-footer__qualiopi">
            ${qualiopiLogo({ className: 'qualiopi-logo qualiopi-logo--footer' })}
            <p class="site-footer__qualiopi-text">${qualiopi.logoMention}</p>
            <p class="site-footer__qualiopi-text">${qualiopi.footer}</p>
          </div>
        </div>

        <div class="site-footer__col">
          <h2 class="site-footer__title">Navigation</h2>
          <ul class="site-footer__list">
            ${nav.map((item) => html`<li><a href="${item.url}">${item.label}</a></li>`)}
          </ul>
        </div>

        <div class="site-footer__col">
          <h2 class="site-footer__title">Informations légales</h2>
          <ul class="site-footer__list">
            ${legalNav.map((item) => html`<li><a href="${item.url}">${item.label}</a></li>`)}
            <li><a href="/accessibilite-handicap/">Accessibilité handicap</a></li>
            <li>
              <button class="site-footer__link-button" type="button" data-consent-open hidden>
                Gestion des cookies
              </button>
            </li>
          </ul>
        </div>

        <div class="site-footer__col">
          <h2 class="site-footer__title">Contact</h2>
          <ul class="site-footer__list site-footer__list--contact">
            <li>
              ${icon('mail', { className: 'icon icon--sm' })}
              <a href="mailto:${company.email}">${company.email}</a>
            </li>
            <li>
              ${icon('phone', { className: 'icon icon--sm' })}
              <a href="tel:${company.phoneLink}">${company.phone}</a>
            </li>
            <li>
              ${icon('pin', { className: 'icon icon--sm' })}
              <span>
                <span class="site-footer__label">Siège social</span>
                ${company.address.full}
              </span>
            </li>
            <li>
              ${icon('screen', { className: 'icon icon--sm' })}
              <span>Formation dispensée à distance</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="site-footer__legal">
        <p class="site-footer__nda">${compliance.ndaFooter}</p>
        <p class="site-footer__copyright">
          © ${company.legalName} 2026 — Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>`;
}

/**
 * Bandeau de consentement aux cookies (RGPD + délibération CNIL).
 * Le refus est aussi accessible que l'acceptation, et aucun traceur n'est déposé
 * tant que le visiteur n'a pas choisi. Le bandeau est masqué par défaut : il n'est
 * affiché que par le script, donc jamais présenté à un visiteur sans JavaScript
 * — auquel cas aucun cookie non essentiel ne peut de toute façon être déposé.
 */
function consentBanner() {
  return html`<div
    class="consent"
    id="bandeau-cookies"
    role="dialog"
    aria-labelledby="consent-title"
    aria-describedby="consent-text"
    data-consent-banner
    hidden
  >
    <div class="container consent__inner">
      <div class="consent__body">
        <p class="consent__title" id="consent-title">Gestion des cookies</p>
        <p class="consent__text" id="consent-text">
          Ce site dépose uniquement des cookies strictement nécessaires à son fonctionnement. Avec
          votre accord, nous utiliserions également des cookies de mesure d’audience et de
          publicité. Vous pouvez modifier votre choix à tout moment depuis le pied de page.
          <a href="/politique-de-confidentialite/">Politique de confidentialité</a>.
        </p>

        <div class="consent__prefs" data-consent-prefs hidden>
          <fieldset class="consent__fieldset">
            <legend class="sr-only">Choisir les cookies autorisés</legend>
            <div class="consent__option">
              <input type="checkbox" id="consent-necessaires" checked disabled />
              <label for="consent-necessaires">
                <span class="consent__option-title">Cookies strictement nécessaires</span>
                <span class="consent__option-text">
                  Indispensables au fonctionnement du site. Toujours actifs.
                </span>
              </label>
            </div>
            <div class="consent__option">
              <input type="checkbox" id="consent-mesure" data-consent-option="mesure" />
              <label for="consent-mesure">
                <span class="consent__option-title">Mesure d’audience</span>
                <span class="consent__option-text">
                  Statistiques de fréquentation, pour améliorer le site.
                </span>
              </label>
            </div>
            <div class="consent__option">
              <input type="checkbox" id="consent-publicite" data-consent-option="publicite" />
              <label for="consent-publicite">
                <span class="consent__option-title">Publicité</span>
                <span class="consent__option-text">
                  Mesure de l’efficacité de nos campagnes de communication.
                </span>
              </label>
            </div>
          </fieldset>
          <button class="btn btn--primary btn--sm" type="button" data-consent="save">
            Enregistrer mes choix
          </button>
        </div>
      </div>

      <div class="consent__actions">
        <button class="btn btn--ghost btn--sm" type="button" data-consent="refuse">
          Tout refuser
        </button>
        <button class="btn btn--ghost btn--sm" type="button" data-consent="settings">
          Personnaliser
        </button>
        <button class="btn btn--primary btn--sm" type="button" data-consent="accept">
          Tout accepter
        </button>
      </div>
    </div>
  </div>`;
}

/** Fil d'Ariane (masqué sur la page d'accueil). */
export function breadcrumb(items) {
  if (!items || items.length === 0) return '';
  return html`<nav class="breadcrumb" aria-label="Fil d’Ariane">
    <div class="container">
      <ol class="breadcrumb__list">
        <li><a href="/">Accueil</a></li>
        ${items.map(
          (item, index) =>
            html`<li>
              ${index === items.length - 1
                ? html`<span aria-current="page">${item.label}</span>`
                : html`<a href="${item.url}">${item.label}</a>`}
            </li>`,
        )}
      </ol>
    </div>
  </nav>`;
}

/**
 * Gabarit complet d'une page.
 * @param {{title:string, description:string, url:string, body:any, jsonLd?:object[], noindex?:boolean, bodyClass?:string}} page
 */
export function layout(page) {
  const jsonLd = page.jsonLd ?? [];
  return (
    '<!doctype html>\n' +
    toString(html`<html lang="${site.lang}">
      <head>
        ${head({
          title: page.title,
          description: page.description,
          url: page.url,
          noindex: page.noindex,
          jsonLd,
        })}
      </head>
      <body class="${page.bodyClass ?? ''}">
        <a class="skip-link" href="#contenu">Aller au contenu principal</a>
        ${header(page.url)} ${breadcrumb(page.breadcrumb)}
        <main id="contenu">${page.body}</main>
        ${footer()} ${consentBanner()}
        <script src="${asset('/assets/js/main.js')}" defer></script>
      </body>
    </html>`)
  );
}
