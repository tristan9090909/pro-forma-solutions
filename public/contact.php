<?php
/**
 * Traitement du formulaire de contact — Forma Pro Solutions.
 *
 * Fonctionne sur un hébergement mutualisé PHP (Hostinger).
 * Deux modes de réponse :
 *   - requête classique (sans JavaScript) : redirection vers /contact/merci/
 *   - requête fetch (Accept: application/json) : réponse JSON {ok:true}
 *
 * Configuration : ajuster $destinataire et $expediteur si besoin.
 * L'expéditeur doit appartenir au domaine du site pour passer SPF/DKIM/DMARC.
 */

declare(strict_types=1);

$destinataire = 'contact@forma-pro-solutions.fr';
$expediteur   = 'site@forma-pro-solutions.fr';
$pageMerci    = '/contact/merci/';
$pageContact  = '/contact/';

/* ------------------------------------------------------------------ outils */

function veutDuJson(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    $ajax   = $_SERVER['HTTP_X_REQUESTED_WITH'] ?? '';
    return str_contains($accept, 'application/json') || $ajax === 'XMLHttpRequest';
}

function repondre(bool $ok, string $message, string $redirection): void
{
    if (veutDuJson()) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 400);
        echo json_encode(['ok' => $ok, 'error' => $ok ? null : $message], JSON_UNESCAPED_UNICODE);
        exit;
    }

    header('Location: ' . $redirection, true, 303);
    exit;
}

/** Supprime les retours à la ligne : protection contre l'injection d'en-têtes. */
function assainirLigne(string $valeur): string
{
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', $valeur));
}

function champ(string $nom, int $longueurMax): string
{
    $valeur = (string) ($_POST[$nom] ?? '');
    return mb_substr(trim($valeur), 0, $longueurMax);
}

/* ---------------------------------------------------------------- contrôle */

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    repondre(false, 'Méthode non autorisée.', $pageContact);
}

// Champ piège : rempli uniquement par les robots.
if (trim((string) ($_POST['societe_site'] ?? '')) !== '') {
    // On renvoie un succès silencieux pour ne pas informer le robot.
    repondre(true, '', $pageMerci);
}

$prenom       = assainirLigne(champ('prenom', 80));
$nom          = assainirLigne(champ('nom', 80));
$email        = assainirLigne(champ('email', 150));
$telephone    = assainirLigne(champ('telephone', 30));
$message      = champ('message', 4000);
$consentement = isset($_POST['consentement']);

$erreurs = [];

if ($prenom === '')                                       { $erreurs[] = 'prénom'; }
if ($nom === '')                                          { $erreurs[] = 'nom'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL))           { $erreurs[] = 'adresse e-mail'; }
if (mb_strlen($message) < 20)                             { $erreurs[] = 'message'; }
if (!$consentement)                                       { $erreurs[] = 'consentement'; }

if ($erreurs !== []) {
    repondre(
        false,
        'Merci de vérifier les champs suivants : ' . implode(', ', $erreurs) . '.',
        $pageContact
    );
}

/* ------------------------------------------------------------------- envoi */

$sujet = sprintf('[Site] Demande de contact — %s %s', $prenom, $nom);

$corps = "Nouvelle demande envoyée depuis le site forma-pro-solutions.fr\n"
    . str_repeat('-', 58) . "\n\n"
    . "Prénom     : {$prenom}\n"
    . "Nom        : {$nom}\n"
    . "E-mail     : {$email}\n"
    . "Téléphone  : " . ($telephone !== '' ? $telephone : 'non renseigné') . "\n"
    . "Date       : " . date('d/m/Y H:i') . "\n\n"
    . "Message :\n{$message}\n\n"
    . str_repeat('-', 58) . "\n"
    . "Consentement à la politique de confidentialité : oui\n";

$entetes = [
    'From: Site Forma Pro Solutions <' . $expediteur . '>',
    'Reply-To: ' . $prenom . ' ' . $nom . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . phpversion(),
];

$envoye = @mail(
    $destinataire,
    '=?UTF-8?B?' . base64_encode($sujet) . '?=',
    $corps,
    implode("\r\n", $entetes),
    '-f' . $expediteur
);

if (!$envoye) {
    repondre(
        false,
        'L’envoi a échoué. Vous pouvez nous écrire directement à contact@forma-pro-solutions.fr.',
        $pageContact
    );
}

repondre(true, '', $pageMerci);
