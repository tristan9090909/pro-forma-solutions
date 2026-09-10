/**
 * Forma Pro Solutions — script public.
 * Deux comportements : le menu mobile et la validation du formulaire de contact.
 * Le site reste entièrement utilisable sans JavaScript (le formulaire est postté
 * normalement vers /contact.php, qui redirige vers /contact/merci/).
 */
(function () {
  'use strict';

  /* --- Menu mobile ------------------------------------------------------ */
  var toggle = document.querySelector('[data-nav-toggle]');
  var menu = document.getElementById('menu-principal');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Referme le menu au retour en affichage large.
    var wide = window.matchMedia('(min-width: 62rem)');
    var closeOnWide = function (event) {
      if (event.matches) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    };
    if (wide.addEventListener) {
      wide.addEventListener('change', closeOnWide);
    } else if (wide.addListener) {
      wide.addListener(closeOnWide);
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* --- Consentement aux cookies (RGPD / CNIL) ---------------------------- */
  /*
   * Aucun traceur n'est chargé tant que le visiteur n'a pas donné son accord.
   * Pour brancher un traceur (mesure d'audience, pixel publicitaire) :
   *
   *   window.formaProConsent.onChange(function (choix) {
   *     if (choix.publicite) { ... charger le script ... }
   *   });
   *
   * Penser à autoriser le domaine du traceur dans la CSP (vercel.json et .htaccess).
   */
  (function initConsent() {
    var STORAGE_KEY = 'fps-consentement-v1';
    var banner = document.querySelector('[data-consent-banner]');
    var openButton = document.querySelector('[data-consent-open]');
    if (!banner) return;

    var prefs = banner.querySelector('[data-consent-prefs]');
    var options = Array.prototype.slice.call(banner.querySelectorAll('[data-consent-option]'));
    var listeners = [];
    var lastFocus = null;

    function lire() {
      try {
        var brut = window.localStorage.getItem(STORAGE_KEY);
        return brut ? JSON.parse(brut) : null;
      } catch (error) {
        return null;
      }
    }

    function ecrire(choix) {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...choix, date: new Date().toISOString() }),
        );
      } catch (error) {
        /* Stockage indisponible : le choix vaut pour la visite en cours. */
      }
    }

    function diffuser(choix) {
      listeners.forEach(function (callback) {
        try {
          callback(choix);
        } catch (error) {
          console.error(error);
        }
      });
      document.dispatchEvent(new CustomEvent('fps:consentement', { detail: choix }));
    }

    function ouvrir(afficherPrefs) {
      lastFocus = document.activeElement;
      var choix = lire();
      options.forEach(function (input) {
        input.checked = Boolean(choix && choix[input.dataset.consentOption]);
      });
      prefs.hidden = !afficherPrefs;
      banner.hidden = false;
      var cible = banner.querySelector('button');
      if (cible) cible.focus();
    }

    function fermer() {
      banner.hidden = true;
      prefs.hidden = true;
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    function enregistrer(choix) {
      ecrire(choix);
      diffuser(choix);
      fermer();
    }

    banner.addEventListener('click', function (event) {
      var action = event.target.closest('[data-consent]');
      if (!action) return;

      switch (action.dataset.consent) {
        case 'accept':
          enregistrer({ mesure: true, publicite: true });
          break;
        case 'refuse':
          enregistrer({ mesure: false, publicite: false });
          break;
        case 'settings':
          prefs.hidden = !prefs.hidden;
          action.setAttribute('aria-expanded', String(!prefs.hidden));
          if (!prefs.hidden) {
            var premier = prefs.querySelector('input:not([disabled])');
            if (premier) premier.focus();
          }
          break;
        case 'save':
          enregistrer(
            options.reduce(function (acc, input) {
              acc[input.dataset.consentOption] = input.checked;
              return acc;
            }, {}),
          );
          break;
        default:
          break;
      }
    });

    if (openButton) {
      openButton.hidden = false;
      openButton.addEventListener('click', function () {
        ouvrir(true);
      });
    }

    var choixEnregistre = lire();
    if (!choixEnregistre) {
      ouvrir(false);
    } else {
      diffuser(choixEnregistre);
    }

    window.formaProConsent = {
      get: function () {
        return lire() || { mesure: false, publicite: false };
      },
      onChange: function (callback) {
        listeners.push(callback);
        var actuel = lire();
        if (actuel) callback(actuel);
      },
      open: function () {
        ouvrir(true);
      },
    };
  })();

  /* --- Formulaire de contact -------------------------------------------- */
  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  var status = form.querySelector('[data-form-status]');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  var messages = {
    prenom: 'Merci d’indiquer votre prénom.',
    nom: 'Merci d’indiquer votre nom.',
    email: 'Merci d’indiquer une adresse e-mail valide.',
    telephone: 'Le numéro de téléphone saisi est incomplet.',
    message: 'Merci de préciser votre demande (20 caractères minimum).',
    consentement: 'Merci de cocher cette case pour que nous puissions traiter votre demande.',
  };

  function fieldError(name) {
    return form.querySelector('[data-error-for="' + name + '"]');
  }

  function showError(input, name) {
    var target = fieldError(name);
    if (target) {
      target.textContent = messages[name];
      target.hidden = false;
    }
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input, name) {
    var target = fieldError(name);
    if (target) {
      target.textContent = '';
      target.hidden = true;
    }
    input.removeAttribute('aria-invalid');
  }

  function validateField(input) {
    var name = input.name;
    var value = (input.value || '').trim();
    var valid = true;

    if (name === 'email') {
      valid = EMAIL_RE.test(value);
    } else if (name === 'telephone') {
      valid = value === '' || value.replace(/[^0-9]/g, '').length >= 9;
    } else if (name === 'message') {
      valid = value.length >= 20;
    } else if (name === 'consentement') {
      valid = input.checked;
    } else if (input.required) {
      valid = value.length > 0;
    }

    if (valid) {
      clearError(input, name);
    } else {
      showError(input, name);
    }
    return valid;
  }

  var fields = Array.prototype.slice.call(
    form.querySelectorAll('input[name], textarea[name]'),
  ).filter(function (input) {
    return Object.prototype.hasOwnProperty.call(messages, input.name);
  });

  fields.forEach(function (input) {
    input.addEventListener('blur', function () {
      validateField(input);
    });
    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid') === 'true') validateField(input);
    });
  });

  function setStatus(text, kind) {
    if (!status) return;
    status.textContent = text;
    status.className = 'form__status form__status--' + kind;
    status.hidden = false;
  }

  form.addEventListener('submit', function (event) {
    var firstInvalid = null;
    fields.forEach(function (input) {
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      event.preventDefault();
      setStatus('Certains champs doivent être corrigés avant l’envoi.', 'error');
      firstInvalid.focus();
      return;
    }

    // Envoi asynchrone quand le navigateur le permet : la page n'est pas rechargée.
    if (!window.fetch || !window.FormData) return;

    event.preventDefault();
    var button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.dataset.label = button.innerHTML;
      button.textContent = 'Envoi en cours…';
    }
    if (status) status.hidden = true;

    // Envoi en URL-encodé : lisible aussi bien par PHP ($_POST) que par une
    // fonction serverless, sans analyse de contenu multipart.
    fetch(form.action, {
      method: 'POST',
      body: new URLSearchParams(new FormData(form)).toString(),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })
      .then(function (response) {
        return response.json().catch(function () {
          return { ok: response.ok };
        });
      })
      .then(function (data) {
        if (data && data.ok) {
          form.reset();
          setStatus(
            'Votre message a bien été envoyé. Nous vous répondons sous 48 heures ouvrées.',
            'success',
          );
        } else {
          setStatus(
            (data && data.error) ||
              'L’envoi a échoué. Vous pouvez nous écrire directement à contact@forma-pro-solutions.fr.',
            'error',
          );
        }
      })
      .catch(function () {
        setStatus(
          'L’envoi a échoué. Vous pouvez nous écrire directement à contact@forma-pro-solutions.fr.',
          'error',
        );
      })
      .then(function () {
        if (button) {
          button.disabled = false;
          if (button.dataset.label) button.innerHTML = button.dataset.label;
        }
      });
  });
})();
