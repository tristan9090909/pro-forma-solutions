/**
 * Pages légales fournies par le client — intégrées telles quelles, sans modification.
 * Source : « Pages légales - Forma Pro Solutions » (4 documents Word).
 * Ne pas reformuler : le contenu de ce fichier est audité.
 */

export const mentionsLegales = {
  title: 'Mentions légales',
  slug: 'mentions-legales',
  metaTitle: 'Mentions légales | Forma Pro Solutions',
  metaDescription:
    'Mentions légales de Forma Pro Solutions : éditeur du site, activité de formation professionnelle, hébergement, propriété intellectuelle et données personnelles.',
  sections: [
    {
      heading: 'Éditeur du site',
      blocks: [
        {
          type: 'ul',
          items: [
            'Raison sociale : Forma Pro Solutions',
            'Forme juridique : société par actions simplifiée à associé unique (SASU)',
            'Capital social : 1 000 €',
            'Siège social : 14 Avenue du Général de Gaulle, 94160 Saint-Mandé',
            'SIREN : 999 412 877 — SIRET : 999 412 877 00014',
            'RCS : Créteil — Immatriculation : 07/01/2026',
            'Code APE/NAF : 8559A (Formation continue d’adultes)',
            'TVA : exonération de TVA en application de l’article 261-4-4°a du Code général des impôts',
            'Directeur de la publication : Kamel TREA, en qualité de Président',
            'Contact : contact@forma-pro-solutions.fr — 07 61 19 03 40',
          ],
        },
      ],
    },
    {
      heading: 'Activité de formation professionnelle',
      blocks: [
        {
          type: 'p',
          text: 'Déclaration d’activité enregistrée sous le numéro 11941401594 auprès du préfet de région Île-de-France.',
        },
        {
          type: 'p',
          text: 'Enregistré sous le numéro 11941401594. Cet enregistrement ne vaut pas agrément de l’État.',
        },
        {
          type: 'p',
          text: 'Certification Qualiopi N°26-042-04 délivrée au titre des actions de formation par Audit des Normes Internationales (ANI), organisme accrédité par le Cofrac sous le numéro 5-0674. Certificat valide du 04/05/2026 au 03/05/2029.',
        },
      ],
    },
    {
      // Hébergeur réel du site (art. 6-III de la loi n°2004-575 — LCEN).
      // À mettre à jour si l'hébergement est rebasculé chez Hostinger.
      heading: 'Hébergement',
      blocks: [
        {
          type: 'p',
          text: 'Le site est hébergé par Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — https://vercel.com.',
        },
        {
          type: 'p',
          text: 'Le nom de domaine forma-pro-solutions.fr est enregistré auprès de Hostinger International Ltd — 61 Lordou Vironos Street, 6023 Larnaca, Chypre — https://www.hostinger.fr.',
        },
      ],
    },
    {
      heading: 'Propriété intellectuelle',
      blocks: [
        {
          type: 'p',
          text: 'L’ensemble des contenus présents sur le site (textes, programmes de formation, éléments graphiques, logos, structure) est la propriété exclusive de Forma Pro Solutions, sauf mention contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable, est interdite et constitue une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.',
        },
      ],
    },
    {
      heading: 'Liens hypertextes',
      blocks: [
        {
          type: 'p',
          text: 'Le site peut contenir des liens vers des sites tiers (notamment France Compétences). Forma Pro Solutions n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.',
        },
      ],
    },
    {
      heading: 'Données personnelles',
      blocks: [
        {
          type: 'p',
          text: 'Le traitement des données personnelles est décrit dans la Politique de confidentialité du site.',
        },
      ],
    },
  ],
};

export const cgv = {
  title: 'Conditions générales de vente',
  slug: 'conditions-generales-de-vente',
  metaTitle: 'Conditions générales de vente | Forma Pro Solutions',
  metaDescription:
    'Conditions générales de vente de Forma Pro Solutions : objet, formation proposée, prérequis, modalités d’inscription, tarif, rétractation, évaluation et certification.',
  sections: [
    {
      heading: 'Article 1 — Objet',
      blocks: [
        {
          type: 'p',
          text: 'Les présentes conditions générales de vente (CGV) régissent les relations entre Forma Pro Solutions, organisme de formation, et toute personne physique ou morale souhaitant s’inscrire à une action de formation proposée par l’organisme. Toute inscription implique l’acceptation sans réserve des présentes CGV.',
        },
      ],
    },
    {
      heading: 'Article 2 — Formation proposée',
      blocks: [
        {
          type: 'p',
          text: 'Forma Pro Solutions propose la formation « Intégrer le management d’équipe dans son activité professionnelle », préparant à la certification enregistrée sous le numéro RS6931 au Répertoire Spécifique de France Compétences (certificateur : Manitude). La formation se déroule à distance, en visioconférence synchrone, sur une durée de 21 heures réparties en 3 journées, pour un effectif de 6 à 12 participants par session.',
        },
      ],
    },
    {
      heading: 'Article 3 — Prérequis et dossier d’admission',
      blocks: [
        {
          type: 'p',
          text: 'La participation requiert une expérience professionnelle de 2 ans dans son expertise métier nécessitant la maîtrise de compétences managériales. Ce prérequis est vérifié au travers d’un dossier d’admission préalable à toute inscription définitive.',
        },
      ],
    },
    {
      heading: 'Article 4 — Modalités d’inscription et délai d’accès',
      blocks: [
        {
          type: 'p',
          text: 'L’inscription est finalisée après validation du dossier d’admission. Conformément à l’article L.221-18 du Code de la consommation, l’inscription doit être finalisée au minimum 14 jours calendaires avant le début de la formation. Ce délai correspond au délai légal de rétractation.',
        },
      ],
    },
    {
      heading: 'Article 5 — Tarif et règlement',
      blocks: [
        {
          type: 'p',
          text: 'Le tarif de la formation est de 1 650 € TTC par participant (exonération de TVA en application de l’article 261-4-4°a du Code général des impôts). Ce tarif comprend l’animation des 3 journées, le support pédagogique et les outils remis, ainsi que l’évaluation certificative. Les modalités de règlement sont précisées lors de l’inscription.',
        },
      ],
    },
    {
      heading: 'Article 6 — Droit de rétractation',
      blocks: [
        {
          type: 'p',
          text: 'Le stagiaire dispose d’un délai de rétractation de 14 jours calendaires à compter de la conclusion du contrat, conformément aux articles L.221-18 et suivants du Code de la consommation. La rétractation s’exerce par écrit adressé à contact@forma-pro-solutions.fr.',
        },
      ],
    },
    {
      heading: 'Article 7 — Réalisation de la formation',
      blocks: [
        {
          type: 'p',
          text: 'La formation est dispensée intégralement à distance, en visioconférence synchrone (logiciel Zoom). Le lien de connexion est transmis à chaque participant avant chaque session. Les moyens techniques requis sont un ordinateur ou une tablette, une connexion internet stable, une webcam et un micro.',
        },
      ],
    },
    {
      heading: 'Article 8 — Évaluation et certification',
      blocks: [
        {
          type: 'p',
          text: 'L’évaluation certificative comprend une préparation écrite (E1) et une mise en situation sur un cas fictif de management (E2), devant un jury professionnel de 2 membres. L’organisation des épreuves est confiée au service Centre d’Examen du certificateur Manitude, qui prononce la décision finale et édite le certificat en cas de réussite.',
        },
      ],
    },
    {
      heading: 'Article 9 — Report, annulation',
      blocks: [
        {
          type: 'p',
          text: 'En cas d’effectif insuffisant ou de circonstance exceptionnelle, Forma Pro Solutions se réserve la possibilité de reporter une session. Les participants en sont informés dans les meilleurs délais et se voient proposer une nouvelle date ou le remboursement des sommes éventuellement versées.',
        },
      ],
    },
    {
      heading: 'Article 10 — Accessibilité aux personnes en situation de handicap',
      blocks: [
        {
          type: 'p',
          text: 'Forma Pro Solutions met en œuvre les conditions d’accueil, d’accompagnement et d’évaluation adaptées aux personnes en situation de handicap. Toute situation particulière est étudiée en amont par le référent handicap (Kamel TREA — contact@forma-pro-solutions.fr — 07 61 19 03 40).',
        },
      ],
    },
    {
      heading: 'Article 11 — Réclamation et médiation',
      blocks: [
        {
          type: 'p',
          text: 'Toute réclamation peut être adressée à contact@forma-pro-solutions.fr. Conformément aux articles L.612-1 et suivants du Code de la consommation, le client consommateur peut recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d’un litige.',
        },
      ],
    },
    {
      heading: 'Article 12 — Données personnelles',
      blocks: [
        {
          type: 'p',
          text: 'Les données personnelles collectées sont traitées conformément à la Politique de confidentialité du site et au Règlement général sur la protection des données (RGPD).',
        },
      ],
    },
    {
      heading: 'Article 13 — Droit applicable et litiges',
      blocks: [
        {
          type: 'p',
          text: 'Les présentes CGV sont soumises au droit français. À défaut de résolution amiable, tout litige relève de la compétence des tribunaux du ressort du siège social de Forma Pro Solutions.',
        },
      ],
    },
  ],
};

export const confidentialite = {
  title: 'Politique de confidentialité',
  slug: 'politique-de-confidentialite',
  metaTitle: 'Politique de confidentialité | Forma Pro Solutions',
  metaDescription:
    'Politique de confidentialité : responsable du traitement, données collectées, base légale, destinataires, durée de conservation, droits et cookies.',
  sections: [
    {
      heading: 'Responsable du traitement',
      blocks: [
        {
          type: 'p',
          text: 'Le responsable du traitement des données personnelles est Forma Pro Solutions, 14 Avenue du Général de Gaulle, 94160 Saint-Mandé, représenté par son Président, Kamel TREA. Contact : contact@forma-pro-solutions.fr.',
        },
      ],
    },
    {
      heading: 'Données collectées et finalités',
      blocks: [
        {
          type: 'p',
          text: 'Les données susceptibles d’être collectées via le site (formulaire de contact) ou dans le cadre d’une inscription sont : nom, prénom, adresse électronique, numéro de téléphone, et les informations communiquées dans le message ou le dossier d’admission. Elles sont utilisées pour :',
        },
        {
          type: 'ul',
          items: [
            'répondre aux demandes de contact et d’information ;',
            'instruire les dossiers d’admission et gérer les inscriptions ;',
            'assurer le suivi pédagogique et administratif de la formation ;',
            'répondre aux obligations légales de l’organisme de formation.',
          ],
        },
      ],
    },
    {
      heading: 'Base légale',
      blocks: [
        {
          type: 'p',
          text: 'Les traitements reposent sur le consentement de la personne (demande de contact), l’exécution de mesures précontractuelles et du contrat de formation, ainsi que le respect des obligations légales de l’organisme.',
        },
      ],
    },
    {
      heading: 'Destinataires',
      blocks: [
        {
          type: 'p',
          text: 'Les données sont destinées aux personnes habilitées de Forma Pro Solutions. Dans le cadre de l’évaluation certificative, certaines données sont transmises au certificateur Manitude. Aucune donnée n’est cédée ou vendue à des tiers à des fins commerciales.',
        },
      ],
    },
    {
      heading: 'Durée de conservation',
      blocks: [
        {
          type: 'p',
          text: 'Les données liées aux demandes de contact sont conservées le temps nécessaire à leur traitement, puis supprimées. Les données et pièces liées aux actions de formation sont conservées pendant la durée légale applicable aux organismes de formation, soit 5 ans.',
        },
      ],
    },
    {
      heading: 'Droits des personnes',
      blocks: [
        {
          type: 'p',
          text: 'Conformément au RGPD et à la loi Informatique et Libertés, toute personne dispose d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de ses données. Ces droits s’exercent auprès de contact@forma-pro-solutions.fr. En cas de difficulté, une réclamation peut être adressée à la CNIL (www.cnil.fr).',
        },
      ],
    },
    {
      heading: 'Cookies',
      blocks: [
        {
          type: 'p',
          text: 'Le site peut utiliser des cookies strictement nécessaires à son fonctionnement et, le cas échéant, des cookies de mesure d’audience. Le bandeau de consentement permet d’accepter ou de refuser les cookies non essentiels.',
        },
      ],
    },
  ],
};

export const reglementInterieur = {
  title: 'Règlement intérieur des stagiaires',
  slug: 'reglement-interieur',
  metaTitle: 'Règlement intérieur des stagiaires | Forma Pro Solutions',
  metaDescription:
    'Règlement intérieur applicable aux stagiaires de Forma Pro Solutions, établi en application des articles L.6352-3 à L.6352-5 et R.6352-1 à R.6352-15 du Code du travail.',
  intro:
    'Établi en application des articles L.6352-3 à L.6352-5 et R.6352-1 à R.6352-15 du Code du travail.',
  sections: [
    {
      heading: 'Article 1 — Champ d’application',
      blocks: [
        {
          type: 'p',
          text: 'Le présent règlement s’applique à tout stagiaire inscrit à une action de formation dispensée par Forma Pro Solutions, pour toute la durée de la formation suivie. Les formations étant réalisées à distance, les règles ci-dessous sont adaptées au contexte de la visioconférence.',
        },
      ],
    },
    {
      heading: 'Article 2 — Assiduité et comportement',
      blocks: [
        {
          type: 'p',
          text: 'Le stagiaire est tenu de suivre l’intégralité des séances aux horaires communiqués, caméra activée dans la mesure du possible. Il adopte un comportement respectueux envers le formateur et les autres participants. Toute absence ou retard doit être signalé au formateur.',
        },
      ],
    },
    {
      heading: 'Article 3 — Règles de santé et de sécurité',
      blocks: [
        {
          type: 'p',
          text: 'La formation étant réalisée à distance, chaque participant suit la session depuis un environnement de travail adapté et sous sa propre responsabilité. Il veille au respect des règles élémentaires d’ergonomie et de sécurité de son poste.',
        },
      ],
    },
    {
      heading: 'Article 4 — Confidentialité et propriété intellectuelle',
      blocks: [
        {
          type: 'p',
          text: 'Les supports pédagogiques et outils remis sont réservés à l’usage personnel du stagiaire et ne peuvent être reproduits ou diffusés sans autorisation. Les échanges tenus en séance sont confidentiels. L’enregistrement des sessions par les participants est interdit sauf accord exprès de l’organisme et des personnes concernées.',
        },
      ],
    },
    {
      heading: 'Article 5 — Discipline et sanctions',
      blocks: [
        {
          type: 'p',
          text: 'Tout manquement du stagiaire au présent règlement peut faire l’objet d’une sanction (avertissement, exclusion) prononcée dans le respect de la procédure prévue aux articles R.6352-3 et suivants du Code du travail : information du stagiaire des faits reprochés, possibilité de présenter ses explications, notification écrite et motivée de la sanction.',
        },
      ],
    },
    {
      heading: 'Article 6 — Droits de la défense du stagiaire',
      blocks: [
        {
          type: 'p',
          text: 'Aucune sanction ne peut être prononcée sans que le stagiaire ait été informé au préalable des griefs retenus contre lui et mis en mesure de s’expliquer, conformément à l’article R.6352-4 du Code du travail.',
        },
      ],
    },
    {
      heading: 'Article 7 — Réclamations',
      blocks: [
        {
          type: 'p',
          text: 'Toute réclamation relative au déroulement de la formation peut être adressée à contact@forma-pro-solutions.fr. Une réponse est apportée dans un délai raisonnable.',
        },
      ],
    },
    {
      heading: 'Article 8 — Accessibilité',
      blocks: [
        {
          type: 'p',
          text: 'Forma Pro Solutions met en œuvre les aménagements nécessaires pour les personnes en situation de handicap. Le référent handicap est Kamel TREA (contact@forma-pro-solutions.fr — 07 61 19 03 40).',
        },
      ],
    },
  ],
};

export const legalPages = [mentionsLegales, cgv, confidentialite, reglementInterieur];
