# Forma Pro Solutions — site vitrine

Site vitrine de l'organisme de formation **Forma Pro Solutions** (SASU, dirigée par Kamel TREA),
présentant la formation **Réussir sa prise de fonction de manager**.

> **⚠ Retrait temporaire de la certification RS6931.** À la demande du certificateur, toute mention
> de la certification RS6931 a été retirée du site tant que l'habilitation n'est pas validée.
> La version complète est conservée dans Git : voir la section « Remettre la certification RS6931 ».

Le site est un **générateur statique en JavaScript** (Node, aucune dépendance) : les contenus sont
centralisés dans des modules de données, les pages sont produites en HTML statique dans `dist/`,
prêt à être déposé sur l'hébergement Hostinger.

---

## 1. Démarrage

```bash
node build.mjs          # génère dist/
node build.mjs --watch  # régénère à chaque modification
node serve.mjs          # prévisualisation sur http://localhost:4173
node scripts/check.mjs  # contrôles avant mise en ligne
```

Ou via npm : `npm run build`, `npm run dev`, `npm start`, `npm run verify`.

Prérequis : Node 18 ou supérieur. Aucun `npm install` n'est nécessaire.

---

## 2. Organisation du projet

```
build.mjs                 génération du site + contrôle des formulations interdites
serve.mjs                 serveur local de prévisualisation (simule /contact.php)
scripts/check.mjs         contrôles SEO, accessibilité, mentions obligatoires, liens
src/
  data/site.mjs           SOURCE UNIQUE : société, conformité, formation, navigation
  data/legal.mjs          textes légaux fournis par le client (non modifiables)
  lib/                    utilitaires HTML, icônes SVG, éléments de marque
  templates/              gabarit de page (head, en-tête, pied de page) et composants
  pages/                  une page = un module
  assets/css|js|img       feuille de style, script public, images
public/                   fichiers copiés tels quels à la racine du site
  contact.php             traitement du formulaire (PHP 8)
  .htaccess               HTTPS, URL propres, en-têtes de sécurité, cache
dist/                     résultat du build (à déposer sur l'hébergement)
```

**Toute modification de contenu se fait dans `src/data/`**, jamais dans le HTML généré.

---

## 3. Conformité — points de vigilance

### 3.1 Aucune mention de financement

Conformément à la loi du 19 décembre 2022, le site ne mentionne **aucun dispositif ou mode de
financement**. Le build refuse de valider si une formulation interdite apparaît :

```
✓ Contrôle conformité : aucune formulation interdite détectée.
```

La liste des termes contrôlés est dans `build.mjs` (constante `FORBIDDEN`). Si un contenu est ajouté
plus tard, relancer `node build.mjs` : un code de sortie non nul signale un problème bloquant pour
l'audit CDC.

Seule exception déclarée (`ALLOWED_CONTEXTS`) : « recourir gratuitement à un médiateur » dans les
CGV, mention obligatoire au titre des articles L.612-1 et suivants du Code de la consommation.

### 3.2 Mentions reproduites mot pour mot

| Emplacement | Texte |
|---|---|
| Pied de page, toutes les pages | Enregistré sous le numéro 11941401594. Cet enregistrement ne vaut pas agrément de l'État. |
| Conventions / contrats / factures (hors site) | Déclaration d'activité enregistrée sous le numéro 11941401594 auprès du préfet de région Île-de-France. |

`scripts/check.mjs` vérifie la présence exacte de la mention NDA et de la mention Qualiopi sur
**chacune** des pages.

### 3.3 Cohérence site / PDF

Le tarif (1 650 € TTC), la durée (21 heures), les modules et les modalités affichés proviennent tous
de `src/data/site.mjs`. Tant que la certification est retirée, **aucun programme PDF n'est publié**
(`training.programPdf` vaut `null`) : le PDF en vigueur décrit la certification RS6931. À la
republication, remettre le fichier dans `public/documents/` et le chemin dans `programPdf` — les
deux doivent rester identiques.

### 3.4 Remettre la certification RS6931

La version du site antérieure au retrait est le tag Git `v1-avec-rs6931` :

```bash
git checkout v1-avec-rs6931 -- src public package.json scripts README.md
node build.mjs && node scripts/check.mjs
```

Les éléments retirés étaient : le code, le certificateur et le lien France Compétences
(`src/data/site.mjs`), le bloc « Modalités d'évaluation et certification » et le téléchargement du
programme (`src/pages/formation.mjs`), les repères de certification de l'accueil et de la page
à propos, l'encadré « Épreuves de certification » de la page accessibilité, les articles 2, 5 et 8
des CGV et le destinataire certificateur de la politique de confidentialité (`src/data/legal.mjs`),
le visuel Open Graph (`src/assets/img/og-image.svg` + `.png`) et le programme PDF.

---

## 4. À faire avant la mise en ligne

1. **Nom de domaine** — `forma-pro-solutions.fr` et `www.forma-pro-solutions.fr` sont rattachés au
   projet Vercel, mais les DNS pointent encore sur le parking Hostinger. Créer chez Hostinger :
   `A @ → 76.76.21.21` et `CNAME www → cname.vercel-dns.com` (ou basculer les serveurs de noms sur
   `ns1.vercel-dns.com` / `ns2.vercel-dns.com`). Le certificat HTTPS est ensuite émis
   automatiquement.
2. **Adresse e-mail** — créer la boîte `contact@forma-pro-solutions.fr` sur Hostinger, ainsi que
   l'expéditeur technique `site@forma-pro-solutions.fr` utilisé par `contact.php` (ou modifier la
   variable `$expediteur` dans ce fichier).
3. **Enregistrements DNS d'authentification** (indispensables pour que le formulaire n'arrive pas en
   spam) :
   - SPF : `v=spf1 include:_spf.mail.hostinger.com ~all`
   - DKIM : clé fournie par Hostinger dans la section E-mails
   - DMARC : `_dmarc` → `v=DMARC1; p=quarantine; rua=mailto:contact@forma-pro-solutions.fr`
4. **Test du formulaire** en conditions réelles après mise en ligne (avec et sans JavaScript).
5. **Google Search Console** : validation du domaine puis soumission de
   `https://forma-pro-solutions.fr/sitemap.xml`.

---

## 5. Hébergement Vercel (en ligne)

Le site est déployé sur Vercel : <https://pro-forma-solutions.vercel.app>

```bash
npx vercel deploy --prod   # nouveau déploiement en production
```

La configuration est dans [`vercel.json`](vercel.json) : commande de build `node build.mjs`, sortie
`dist/`, URL avec barre oblique finale, en-têtes de sécurité et cache des assets.

**Formulaire de contact.** Vercel n'exécute pas PHP : `public/contact.php` est exclu du build (le
fichier serait servi en clair) et remplacé par la fonction serverless [`api/contact.js`](api/contact.js).
La réécriture `/contact.php → /api/contact` permet au même formulaire de fonctionner sur les deux
hébergements.

L'envoi effectif des e-mails nécessite une variable d'environnement dans le projet Vercel :

```bash
npx vercel env add RESEND_API_KEY production   # clé API Resend
```

Sans cette clé, le formulaire valide les champs puis affiche un message invitant à écrire directement
à `contact@forma-pro-solutions.fr` — aucun message n'est perdu silencieusement. Le domaine
d'expédition doit être vérifié chez Resend (SPF + DKIM) pour que les messages ne soient pas rejetés.

Pour brancher le domaine définitif :

```bash
npx vercel domains add forma-pro-solutions.fr
```

puis créer chez Hostinger les enregistrements DNS indiqués par Vercel. Mettre alors `site.baseUrl`
(dans `src/data/site.mjs`) à jour si le domaine retenu diffère, et redéployer.

---

## 6. Mise en ligne alternative (Hostinger)

1. Vérifier qu'un hébergement est actif sur le compte Hostinger (le domaine y est déjà) ; le
   provisionner sinon. PHP 8 requis pour `contact.php`.
2. Faire pointer le domaine `forma-pro-solutions.fr` sur cet hébergement (les DNS pointent
   actuellement sur une page de parking) : utiliser les serveurs de noms Hostinger, ou créer les
   enregistrements `A` (`@` et `www`) vers l'IP de l'hébergement.
3. Générer le site : `node build.mjs`.
4. Déposer **le contenu de `dist/`** (et non le dossier lui-même) dans `public_html/`, via le
   gestionnaire de fichiers ou en FTP. Inclure les fichiers masqués (`.htaccess`).
5. Activer le certificat SSL gratuit (Let's Encrypt) depuis le panneau Hostinger. Le `.htaccess`
   force ensuite HTTPS et la version sans `www`.
6. Contrôler : page d'accueil, envoi du formulaire, page 404, rendu mobile.

Mise à jour ultérieure : modifier `src/data/`, relancer `node build.mjs` puis `node scripts/check.mjs`,
et redéposer le contenu de `dist/`.

---

## 7. Pages du site

| URL | Contenu |
|---|---|
| `/` | Hero, présentation, compétences, formation phare, bandeau Qualiopi + NDA, formateur |
| `/formation/` | Synthèse, public et prérequis, objectifs, programme, modalités, évaluation, délai d'accès |
| `/a-propos/` | Mission, positionnement, formateur, références réglementaires |
| `/accessibilite-handicap/` | Texte d'engagement, référent handicap, démarche |
| `/contact/` | Formulaire, coordonnées, délai de réponse |
| `/mentions-legales/` · `/conditions-generales-de-vente/` · `/politique-de-confidentialite/` · `/reglement-interieur/` | Documents fournis, intégrés sans modification |
| `/contact/merci/` · `/404.html` | Confirmation d'envoi (non indexée) et page d'erreur |

---

## 8. Technique

- **SEO** : `title` et `meta description` par page, URL propres, H1 unique, `sitemap.xml`,
  `robots.txt`, données structurées Schema.org (`EducationalOrganization`, `Course`,
  `BreadcrumbList`), attributs `alt`, image Open Graph.
- **Responsive** : conception mobile-first, testée à 390 px (aucun débordement horizontal).
- **Accessibilité** : lien d'évitement, navigation au clavier, contrastes conformes, libellés de
  formulaire associés, messages d'erreur reliés aux champs, `aria-current` sur la page active.
- **Performance** : une feuille de style, un script différé, aucune ressource externe (ni police, ni
  CDN, ni traceur), icônes SVG inline.
- **Sécurité** : en-têtes CSP, `X-Content-Type-Options`, `Referrer-Policy`, HSTS ; formulaire protégé
  par champ piège, validation serveur et neutralisation des injections d'en-têtes e-mail.
- **Cookies** : le site n'en dépose aucun. Si une mesure d'audience est ajoutée par la suite, un
  bandeau de consentement devra être mis en place (voir la politique de confidentialité).

---

## 9. Direction artistique

Palette bleu marine / gris, typographie sans-serif système (chargement instantané, aucun appel
externe), mise en page aérée, icônes outline, visuels abstraits en SVG — aucune photo stock.

Le logo Qualiopi officiel est en place (`src/assets/img/qualiopi.png`, couleurs et proportions non
modifiables). Il est toujours accompagné de la mention obligatoire « La certification qualité a été
délivrée au titre de la catégorie d'action suivante : ACTIONS DE FORMATION. », définie une seule fois
dans `compliance.qualiopi.logoMention`.

Logo créé pour le projet : `src/assets/img/logo.svg` (fond clair), `logo-dark.svg` (fond sombre),
`favicon.svg`, déclinaisons PNG 180/192/512 px. Le monogramme évoque le pilotage d'une activité :
trois niveaux alignés et un repère marquant le cap donné à l'équipe.

> Les textes des logos SVG utilisent une police système. Pour une version définitive destinée à
> l'impression, vectoriser les textes.
