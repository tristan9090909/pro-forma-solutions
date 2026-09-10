/**
 * Source unique de vérité du site Forma Pro Solutions.
 *
 * IMPORTANT (audit CDC / EDOF) :
 *  - Aucune mention de financement, de dispositif de prise en charge ou de gratuité
 *    ne doit apparaître dans ce fichier ni dans les gabarits (loi du 19 décembre 2022).
 *  - Le tarif et le programme ci-dessous doivent rester strictement identiques
 *    à ceux du PDF téléchargeable (public/documents/).
 *  - Les mentions NDA (art. L.6352-12 du Code du travail) sont reproduites mot pour mot.
 */

export const site = {
  name: 'Forma Pro Solutions',
  baseUrl: 'https://forma-pro-solutions.fr',
  lang: 'fr',
  locale: 'fr_FR',
  themeColor: '#0d2740',
  description:
    "Forma Pro Solutions, organisme de formation certifié Qualiopi, propose la formation « Intégrer le management d’équipe dans son activité professionnelle » (RS6931), à distance, en visioconférence.",
};

export const company = {
  legalName: 'Forma Pro Solutions',
  legalForm: 'Société par actions simplifiée à associé unique (SASU)',
  legalFormShort: 'SASU',
  capital: '1 000 €',
  siren: '999 412 877',
  siret: '999 412 877 00014',
  ape: '8559A',
  apeLabel: 'Formation continue d’adultes',
  vat: 'Exonération de TVA (article 261-4-4°a du CGI)',
  director: 'Kamel TREA',
  directorRole: 'Président',
  rcs: 'RCS Créteil',
  registrationDate: '07/01/2026',
  address: {
    street: '14 Avenue du Général de Gaulle',
    postalCode: '94160',
    city: 'Saint-Mandé',
    country: 'France',
    full: '14 Avenue du Général de Gaulle, 94160 Saint-Mandé',
  },
  email: 'contact@forma-pro-solutions.fr',
  phone: '07 61 19 03 40',
  phoneLink: '+33761190340',
  responseTime: '48 heures ouvrées',
};

/** Mentions réglementaires — à reproduire mot pour mot, sans reformulation. */
export const compliance = {
  ndaNumber: '11941401594',
  ndaAuthority: 'DRIEETS Île-de-France',
  ndaDate: '25/03/2026',
  /** Footer et pages du site (art. L.6352-12 du Code du travail). */
  ndaFooter:
    'Enregistré sous le numéro 11941401594. Cet enregistrement ne vaut pas agrément de l’État.',
  /** Conventions, contrats et factures. */
  ndaContract:
    'Déclaration d’activité enregistrée sous le numéro 11941401594 auprès du préfet de région Île-de-France.',
  qualiopi: {
    number: '26-042-04',
    category: 'actions de formation',
    issuer: 'Audit des Normes Internationales (ANI)',
    cofrac: '5-0674',
    obtained: '04/05/2026',
    validFrom: '04/05/2026',
    validTo: '03/05/2029',
    /**
     * Mention obligatoire accompagnant le logo officiel (marque Qualiopi) :
     * à reproduire telle quelle, sans reformulation, partout où le logo apparaît.
     */
    logoMention:
      'La certification qualité a été délivrée au titre de la catégorie d’action suivante : ACTIONS DE FORMATION.',
    footer:
      'Certification Qualiopi N°26-042-04 — Catégorie : actions de formation — Valide du 04/05/2026 au 03/05/2029.',
    full:
      'Certification Qualiopi N°26-042-04 délivrée au titre des actions de formation par Audit des Normes Internationales (ANI), organisme accrédité par le Cofrac sous le numéro 5-0674. Certificat valide du 04/05/2026 au 03/05/2029.',
  },
};

export const training = {
  title: 'Intégrer le management d’équipe dans son activité professionnelle',
  code: 'RS6931',
  repertoire: 'Répertoire Spécifique',
  certifier: 'Manitude',
  franceCompetencesUrl: 'https://www.francecompetences.fr/recherche/rs/6931',
  registeredOn: '28/11/2024',
  expiresOn: '28/11/2026',
  nsf: '310 — Spécialités plurivalentes des échanges et de la gestion (management opérationnel)',
  format: '100 % à distance, en visioconférence synchrone (Zoom) — aucune séquence e-learning',
  formatShort: 'À distance, en visioconférence synchrone (Zoom)',
  duration: '21 heures, réparties sur 3 journées de 7 heures',
  durationHours: 21,
  schedule: '9h00 – 12h30 et 14h00 – 17h30 (pause déjeuner 13h00 – 14h00)',
  groupSize: '6 à 12 participants par session',
  /**
   * Tarif affiché. L'exonération de TVA doit figurer dans la MÊME phrase que le montant
   * (guide CDC EDOF V4, p.22) : utiliser `price` partout où le tarif apparaît.
   */
  price: '1 650 € TTC par participant (exonération de TVA — article 261-4-4°a du CGI)',
  priceValue: 1650,
  priceNote: 'Exonération de TVA — article 261-4-4°a du CGI.',
  included: [
    'L’animation des 3 journées',
    'Le support pédagogique et les outils remis',
    'La présentation à la certification (frais d’inscription et de jury inclus)',
  ],
  includedNote:
    'Aucun frais supplémentaire n’est demandé au stagiaire pour l’examen.',
  place: 'À distance (visioconférence)',
  trainer: 'Kamel TREA',
  sessions: 'Sessions ouvertes sur demande',
  audience:
    'La certification s’adresse aux professionnels opérationnels qui ont besoin d’acquérir des compétences spécifiques leur permettant d’endosser un rôle managérial auprès d’une équipe tout en continuant à exercer leurs activités habituelles.',
  prerequisites:
    'Expérience professionnelle de 2 ans dans leur expertise métier nécessitant la maîtrise de compétences managériales. Ce prérequis sera validé au travers d’un dossier d’admission.',
  /** Objectifs pédagogiques — programme V2, section « Objectifs pédagogiques ». */
  objectivesIntro: 'À l’issue de la formation, le participant est capable de :',
  pedagogicalObjectives: [
    'fixer des objectifs d’équipe clairs et mesurables ;',
    'répartir et déléguer les missions selon les profils des collaborateurs ;',
    'piloter l’activité à l’aide de tableaux de bord ;',
    'conduire des entretiens individuels de suivi ;',
    'animer des réunions d’équipe ;',
    'adapter son style managérial aux différentes situations rencontrées.',
  ],
  /** Compétences visées — libellés de la certification, repris mot pour mot du programme V2. */
  competencesIntro:
    'La formation prépare aux six compétences attestées par la certification :',
  objectives: [
    'Définir les objectifs des membres de l’équipe en adéquation avec les besoins spécifiques du service, en tenant compte du contexte, de la stratégie globale et des valeurs de l’entreprise, afin de mobiliser l’équipe autour d’une vision commune de performance et permettre l’élaboration d’un plan d’action opérationnel.',
    'Attribuer les missions et tâches du service aux collaborateurs, en s’assurant que la délégation tienne compte de leurs compétences, leurs capacités et leurs profils (métiers, ancienneté, situation de handicap, etc.), afin d’organiser les activités du service et atteindre les objectifs fixés.',
    'Élaborer des outils de pilotage des activités de son service, en créant des tableaux de bord pour l’équipe et chacun des collaborateurs, afin de suivre l’atteinte des objectifs individuels et collectifs, rendre compte des résultats du service et mettre en place les éventuelles actions correctives nécessaires.',
    'Réaliser des entretiens individuels de suivi des collaborateurs du service, en adaptant sa communication, ses techniques managériales et sa posture en fonction de la nature de l’entretien (félicitation, recadrage, encouragement, feedback, etc.) et du comportement des collaborateurs, afin de s’assurer de l’avancement des missions, détecter les éventuelles difficultés et adapter ses actions en conséquence.',
    'Animer des réunions d’équipe, en favorisant l’implication et la collaboration active de chacun des collaborateurs, afin de s’assurer de l’engagement de l’équipe pour atteindre les objectifs fixés.',
    'Adapter son style managérial et sa communication face aux différentes situations managériales, difficiles ou non (annonce d’une bonne nouvelle, conflit, annonce de décision difficile, accompagnement au changement, gestion de crise interne/externe…), en tenant compte des collaborateurs, du service et de l’entreprise, afin de renforcer son rôle de manager et motiver ses collaborateurs.',
  ],
  /**
   * Modules du programme V2 : chaque module travaille une compétence de la certification
   * (C1 à C6) et dure 3h30. Les objectifs sont repris du programme officiel.
   */
  modules: [
    {
      number: 1,
      code: 'C1',
      title: 'Donner un cap : de la commande reçue à ce qu’on attend de chacun',
      duration: '3h30',
      slot: 'Jour 1 — 9h00 à 12h30',
      objectives:
        'Traduire une orientation en objectifs d’équipe clairs ; formuler des objectifs au format S.M.A.R.T ; obtenir l’adhésion de l’équipe et enclencher un plan d’action.',
    },
    {
      number: 2,
      code: 'C2',
      title: 'Faire tourner le service quand tout paraît urgent : qui prend quoi, et pourquoi lui',
      duration: '3h30',
      slot: 'Jour 1 — 14h00 à 17h30',
      objectives:
        'Distinguer l’urgent de l’important pour prioriser ; attribuer les missions selon les profils et les contraintes de chacun ; ajuster le niveau de délégation au degré d’autonomie du collaborateur.',
    },
    {
      number: 3,
      code: 'C3',
      title: 'Garder la main sur le travail réel : ce qu’on mesure, ce qu’on en fait',
      duration: '3h30',
      slot: 'Jour 2 — 9h00 à 12h30',
      objectives:
        'Construire un tableau de bord d’équipe réellement utile ; choisir des indicateurs de résultat pertinents ; décider et suivre des actions correctives.',
    },
    {
      number: 4,
      code: 'C4',
      title: 'Le tête-à-tête : reconnaître, remettre d’aplomb, débloquer',
      duration: '3h30',
      slot: 'Jour 2 — 14h00 à 17h30',
      objectives:
        'Préparer et mener un entretien individuel selon son objet ; s’appuyer sur des faits pour un retour constructif ; obtenir un engagement daté du collaborateur.',
    },
    {
      number: 5,
      code: 'C5',
      title: 'Le point d’équipe : une heure dont on sort avec quelque chose',
      duration: '3h30',
      slot: 'Jour 3 — 9h00 à 12h30',
      objectives:
        'Cadrer et lancer une réunion d’équipe ; faire participer activement chaque collaborateur ; clôturer sur des décisions et un relevé d’actions.',
    },
    {
      number: 6,
      code: 'C6',
      title: 'Le manager en situation : choisir son registre, tenir sa ligne',
      duration: '3h30',
      slot: 'Jour 3 — 14h00 à 17h30',
      objectives:
        'Identifier les quatre styles de management et son style dominant ; adapter son registre à la situation et à l’interlocuteur ; tenir sa ligne dans les situations difficiles.',
    },
  ],
  certification:
    'Évaluation certificative en deux épreuves : une préparation écrite (E1) et une mise en situation sur un cas fictif de management (E2). Le candidat est évalué par un jury professionnel de 2 membres, disposant de 3 ans d’expérience dans le domaine managérial, dans le respect des exigences d’impartialité, d’indépendance et de dissociation du parcours de formation. L’organisation et la réalisation des épreuves sont confiées au service Centre d’Examen du certificateur Manitude. La décision finale est prononcée par Manitude au cours d’un jury de délivrance ; en cas de réussite, un certificat de compétences est édité par Manitude. L’évaluation certificative est incluse dans le tarif.',
  accessDelay:
    'L’inscription doit être finalisée au minimum 14 jours calendaires avant le début de la formation, conformément à l’article L. 221-18 du Code de la consommation (délai légal de rétractation).',

  /** Évaluation à l'entrée — programme V2, section « Évaluation à l'entrée (positionnement) ». */
  positioningIntro: 'Avant l’inscription, un positionnement permet de :',
  positioning: [
    'vérifier les prérequis ;',
    's’assurer de l’existence et de l’adéquation du projet du candidat ;',
    'identifier ses pratiques managériales actuelles ;',
    'recueillir ses besoins particuliers, notamment en matière de handicap ;',
    'adapter l’accompagnement pédagogique sans modifier les compétences ni les critères de la certification.',
  ],

  /** Modalités pédagogiques — programme V2. */
  methods:
    'Pédagogie active fondée sur la mise en situation et le travail sur des cas réels apportés par les participants. Chaque module alterne apports structurants, ateliers de production et jeux de rôle, animés en visioconférence. Les participants repartent avec leurs propres livrables (attentes formulées, tableau de bord, trame de rendez-vous, plan de progrès).',
  technicalMeans:
    'La formation se déroule sur la plateforme de visioconférence Zoom (partage d’écran, tableau blanc, salles en sous-groupes). Chaque participant doit disposer d’un ordinateur ou d’une tablette, d’une connexion internet stable, d’une webcam et d’un micro. Le lien de connexion est transmis avant chaque session. Un support pédagogique et des outils réutilisables en poste sont remis à chaque participant.',
  support:
    'Un service d’assistance technique et pédagogique est mis à disposition des stagiaires pendant toute la durée du parcours, joignable par courriel (contact@forma-pro-solutions.fr) et par téléphone (07 61 19 03 40), avec une réponse sous 48 heures ouvrées.',
  formativeAssessment:
    'Les acquis sont évalués tout au long du parcours à travers les ateliers et les mises en situation. L’assiduité est suivie à chaque séance et tout risque de décrochage fait l’objet d’une relance. Une évaluation de la satisfaction est réalisée à chaud en fin de formation, puis à froid quelques semaines après, afin de mesurer la mise en application en poste.',

  /** Indicateurs de résultats — obligation Qualiopi, formulation du programme V2. */
  results:
    'La formation étant proposée pour la première fois, les indicateurs de résultats ne sont pas encore disponibles. Seront publiés dès la première session : le taux de satisfaction des stagiaires, le taux de réussite à la certification, le taux d’assiduité et le taux d’abandon.',

  /**
   * Programme officiel téléchargeable — version V2 (seule version publiée).
   * Le nom du fichier est versionné : une mise à jour du programme doit changer ce nom,
   * afin qu'aucun cache ne puisse servir l'ancienne version.
   */
  programPdf: '/documents/programme-de-formation-rs6931-forma-pro-solutions-v2.pdf',
  programUpdated: '30/07/2026',
};

export const accessibility = {
  referent: 'Kamel TREA',
  text:
    'Forma Pro Solutions met en œuvre les conditions d’accueil, d’accompagnement et d’évaluation adaptées aux personnes en situation de handicap. Toute situation particulière est étudiée en amont de la formation par notre référent handicap afin de définir les aménagements pédagogiques, matériels et organisationnels nécessaires : adaptation des supports, aménagement des rythmes, modalités pédagogiques alternatives, accompagnement individualisé. Si nécessaire, Forma Pro Solutions s’appuie sur des partenaires spécialisés (AGEFIPH, Cap emploi) pour garantir un accueil et un accompagnement adaptés, dans le respect des obligations réglementaires.',
};

export const trainerBio = [
  'Kamel TREA est dirigeant et formateur de Forma Pro Solutions. Il totalise plus de douze ans d’encadrement et de pilotage d’équipes : neuf ans comme responsable de gare à la RATP (organisation opérationnelle, hiérarchisation des priorités, pilotage d’objectifs, gestion d’imprévus et de situations sensibles), puis superviseur d’une équipe de vingt personnes.',
  'Il dirige par ailleurs l’organisme de formation Informa depuis 2021, où il assure le pilotage stratégique et pédagogique.',
  'Sa formation au management d’équipe s’appuie sur cette expérience de terrain : des situations réelles, des outils directement réutilisables en poste, et une pédagogie fondée sur la mise en situation.',
];

/** Navigation principale. */
export const nav = [
  { label: 'Accueil', url: '/' },
  { label: 'Formation', url: '/formation/' },
  { label: 'À propos', url: '/a-propos/' },
  { label: 'Accessibilité handicap', url: '/accessibilite-handicap/' },
  { label: 'Contact', url: '/contact/' },
];

/** Pages légales — liées dans le footer. */
export const legalNav = [
  { label: 'Mentions légales', url: '/mentions-legales/' },
  { label: 'Conditions générales de vente', url: '/conditions-generales-de-vente/' },
  { label: 'Politique de confidentialité', url: '/politique-de-confidentialite/' },
  { label: 'Règlement intérieur', url: '/reglement-interieur/' },
];
