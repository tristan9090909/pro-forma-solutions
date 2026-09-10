/**
 * Identité visuelle : marque (monogramme), logo complet et badge Qualiopi.
 * Le monogramme évoque le pilotage d'une activité : trois niveaux alignés sur un axe,
 * un repère haut = le cap donné à l'équipe.
 */
import { raw, html } from './html.mjs';
import { asset } from './assets.mjs';
import { compliance } from '../data/site.mjs';

/** Monogramme seul (carré). Hérite de la couleur du texte pour la version sombre. */
export function markSvg({ className = 'brand__mark' } = {}) {
  return raw(`<svg class="${className}" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
  <rect width="40" height="40" rx="9" class="brand__mark-bg"/>
  <path d="M12 13.5h16" class="brand__mark-line brand__mark-line--1"/>
  <path d="M12 20h11" class="brand__mark-line brand__mark-line--2"/>
  <path d="M12 26.5h6.5" class="brand__mark-line brand__mark-line--3"/>
  <circle cx="27.5" cy="26.5" r="2.6" class="brand__mark-dot"/>
</svg>`);
}

/** Logo complet : monogramme + nom, utilisé dans l'en-tête et le pied de page. */
export function logo({ href = '/', className = 'brand', label = 'Forma Pro Solutions — accueil' } = {}) {
  return html`<a class="${className}" href="${href}" aria-label="${label}">
    ${markSvg()}
    <span class="brand__text">
      <span class="brand__name">Forma Pro <strong>Solutions</strong></span>
      <span class="brand__tagline">Organisme de formation</span>
    </span>
  </a>`;
}

/**
 * Logo Qualiopi officiel (couleurs non modifiables).
 * Il doit toujours être accompagné de la mention de catégorie d'action :
 * voir `compliance.qualiopi.logoMention`, affichée à côté du logo.
 */
export function qualiopiLogo({ className = 'qualiopi-logo' } = {}) {
  return html`<img
    class="${className}"
    src="${asset('/assets/img/qualiopi.png')}"
    width="240"
    height="140"
    loading="lazy"
    decoding="async"
    alt="Logo Qualiopi — processus certifié — République française"
  />`;
}

/** Bandeau de réassurance : Qualiopi + NDA (sans aucune mention de financement). */
export function complianceBanner({ variant = 'light' } = {}) {
  const { qualiopi } = compliance;
  return html`<div class="compliance compliance--${variant}">
    <div class="compliance__logo">
      ${qualiopiLogo()}
      <p class="compliance__mention">${qualiopi.logoMention}</p>
    </div>
    <div class="compliance__body">
      <p class="compliance__title">Certification Qualiopi N°${qualiopi.number}</p>
      <p class="compliance__line">
        Valide du ${qualiopi.validFrom} au ${qualiopi.validTo}.
      </p>
      <p class="compliance__line">
        Délivrée par ${qualiopi.issuer}, organisme accrédité par le Cofrac sous le numéro
        ${qualiopi.cofrac}.
      </p>
      <p class="compliance__line compliance__line--nda">${compliance.ndaFooter}</p>
    </div>
  </div>`;
}
