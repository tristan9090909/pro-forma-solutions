/**
 * Traitement du formulaire de contact — équivalent de public/contact.php
 * pour un hébergement Vercel (fonction serverless Node, sans dépendance).
 *
 * Le formulaire poste vers /contact.php ; vercel.json réécrit cette URL vers
 * /api/contact. Le même code HTML fonctionne donc sur Hostinger (PHP) et sur Vercel.
 *
 * Envoi des e-mails : API HTTP Resend (https://resend.com).
 * Variables d'environnement à définir dans le projet Vercel :
 *   RESEND_API_KEY   clé API (obligatoire pour l'envoi)
 *   CONTACT_TO       destinataire        (défaut : contact@forma-pro-solutions.fr)
 *   CONTACT_FROM     expéditeur vérifié  (défaut : site@forma-pro-solutions.fr)
 */

const DESTINATAIRE = process.env.CONTACT_TO || 'contact@forma-pro-solutions.fr';
const EXPEDITEUR = process.env.CONTACT_FROM || 'site@forma-pro-solutions.fr';
const PAGE_MERCI = '/contact/merci/';
const PAGE_CONTACT = '/contact/';

const ERREUR_GENERIQUE =
  'L’envoi a échoué. Vous pouvez nous écrire directement à contact@forma-pro-solutions.fr.';

/** Le corps est en URL-encodé : on le lit tel quel si Vercel ne l'a pas déjà décodé. */
async function lireChamps(request) {
  if (request.body && typeof request.body === 'object') return request.body;

  const brut = await new Promise((resolve, reject) => {
    let data = '';
    request.on('data', (chunk) => {
      data += chunk;
      if (data.length > 100_000) reject(new Error('Corps de requête trop volumineux.'));
    });
    request.on('end', () => resolve(data));
    request.on('error', reject);
  });

  return Object.fromEntries(new URLSearchParams(brut));
}

function veutDuJson(request) {
  return String(request.headers.accept || '').includes('application/json');
}

function repondre(request, response, ok, message) {
  if (veutDuJson(request)) {
    response.status(ok ? 200 : 400).json({ ok, error: ok ? null : message });
    return;
  }
  response.writeHead(303, { Location: ok ? PAGE_MERCI : PAGE_CONTACT }).end();
}

/** Supprime les retours à la ligne : protection contre l'injection d'en-têtes. */
function assainirLigne(valeur, longueurMax) {
  return String(valeur ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, longueurMax);
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    repondre(request, response, false, 'Méthode non autorisée.');
    return;
  }

  let champs;
  try {
    champs = await lireChamps(request);
  } catch {
    repondre(request, response, false, ERREUR_GENERIQUE);
    return;
  }

  // Champ piège : rempli uniquement par les robots. Succès silencieux.
  if (String(champs.societe_site || '').trim() !== '') {
    repondre(request, response, true, '');
    return;
  }

  const prenom = assainirLigne(champs.prenom, 80);
  const nom = assainirLigne(champs.nom, 80);
  const email = assainirLigne(champs.email, 150);
  const telephone = assainirLigne(champs.telephone, 30);
  const message = String(champs.message ?? '').trim().slice(0, 4000);
  const consentement = champs.consentement !== undefined && champs.consentement !== '';

  const erreurs = [];
  if (prenom === '') erreurs.push('prénom');
  if (nom === '') erreurs.push('nom');
  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) erreurs.push('adresse e-mail');
  if (message.length < 20) erreurs.push('message');
  if (!consentement) erreurs.push('consentement');

  if (erreurs.length > 0) {
    repondre(
      request,
      response,
      false,
      `Merci de vérifier les champs suivants : ${erreurs.join(', ')}.`,
    );
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY absente : le message n’a pas pu être envoyé.');
    repondre(request, response, false, ERREUR_GENERIQUE);
    return;
  }

  const corps = [
    'Nouvelle demande envoyée depuis le site forma-pro-solutions.fr',
    '-'.repeat(58),
    '',
    `Prénom     : ${prenom}`,
    `Nom        : ${nom}`,
    `E-mail     : ${email}`,
    `Téléphone  : ${telephone !== '' ? telephone : 'non renseigné'}`,
    `Date       : ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`,
    '',
    'Message :',
    message,
    '',
    '-'.repeat(58),
    'Consentement à la politique de confidentialité : oui',
  ].join('\n');

  try {
    const envoi = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Site Forma Pro Solutions <${EXPEDITEUR}>`,
        to: [DESTINATAIRE],
        reply_to: email,
        subject: `[Site] Demande de contact — ${prenom} ${nom}`,
        text: corps,
      }),
    });

    if (!envoi.ok) {
      console.error('Erreur Resend :', envoi.status, await envoi.text());
      repondre(request, response, false, ERREUR_GENERIQUE);
      return;
    }
  } catch (error) {
    console.error('Échec de l’envoi :', error);
    repondre(request, response, false, ERREUR_GENERIQUE);
    return;
  }

  repondre(request, response, true, '');
}
