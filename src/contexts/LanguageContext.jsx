import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const translations = {
  fr: {
    home: 'Accueil',
    services: 'Services',
    projects: 'Projets',
    education: 'Formation',
    skills: 'Compétences',
    experiences: 'Expériences',
    contactMe: 'Me contacter',
    // Ajoutez toutes vos traductions ici

    // Home
    presentation: 'Présentation',
    jobTitle: 'Développeur fullstack & Ingénieur Data',
    jobDescription: 'Je me spécialise dans le développement web multiplateforme, ainsi qu’en ingénierie et traitement des données',
    downloadCV: 'Télécharger mon CV',
    yearsExperience: 'années',
    experiencesLabel: 'Expériences',
    openToWork: 'Disponible',
    availability: 'Disponibilité',
    satisfaction: 'Satisfaction',
    softwareEngineer: 'Ingénieur Logiciel',
    webDevelopment: 'Développement Web',
    dataEngineer: 'Ingénieur Data',
    schedule: 'Planifier une réunion',
    projectDepenzoDesc : 'Application de gestion budgétaire destinée à un usage personnel, familial et professionnel (entreprise).',

    // Services
    myServices: 'Mes Services',
    servicesSubtitle: 'Du besoin métier à la mise en production.',
    servicesGroupDev:  'Développement web & logiciel',
    servicesGroupData: 'Data & automatisation',
    servicesBuilt:     'Réalisations',
    servicesCtaTitle:  'Un besoin qui ne rentre dans aucune case ?',
    servicesCtaText:   'Décrivez-moi votre projet, je vous propose la solution adaptée.',

    svcWebTitle:  'Applications web sur mesure',
    svcWebDesc:   'Plateformes SaaS, outils de gestion et portails métier, de la maquette à la mise en production.',
    svcWebPoints: [
      'Interfaces React / Next.js rapides et responsives',
      "Espaces d'administration, rôles et authentification",
      'Déploiement Docker et livraison continue',
    ],
    svcApiTitle:  'API & back-end robustes',
    svcApiDesc:   'Des API fiables pour connecter vos applications, vos partenaires et vos données.',
    svcApiPoints: [
      'API REST & GraphQL documentées',
      'Intégrations tierces : paiement, e-mail, cartographie',
      'Bases de données modélisées et optimisées',
    ],
    svcShopTitle:  'Boutiques e-commerce',
    svcShopDesc:   'Une boutique en ligne complète que vous gérez vous-même, du catalogue à la livraison.',
    svcShopPoints: [
      'Catalogue, stocks et commandes',
      'Paiement en ligne sécurisé',
      'Back-office simple à prendre en main',
    ],
    svcEtlTitle:  'Pipelines de données (ETL/ELT)',
    svcEtlDesc:   'Centralisez des données dispersées dans une source unique, fiable et mise à jour automatiquement.',
    svcEtlPoints: [
      'Collecte depuis fichiers, API et bases existantes',
      'Nettoyage, transformation et contrôle qualité',
      'Flux planifiés et supervisés',
    ],
    svcBiTitle:  'Tableaux de bord & analyse',
    svcBiDesc:   'Transformez vos données en indicateurs clairs pour piloter votre activité.',
    svcBiPoints: [
      'Tableaux de bord Power BI interactifs',
      'Rapports automatisés et KPI métier',
      'Prévisions à partir de vos historiques',
    ],
    svcScrapTitle:  'Web scraping & automatisation',
    svcScrapDesc:   'Récupérez automatiquement les données du web et supprimez les tâches répétitives.',
    svcScrapPoints: [
      'Robots de collecte planifiés',
      "Données structurées prêtes à l'analyse (CSV, Excel, base)",
      "Veille de prix, d'annonces ou de contenus",
    ],

    // Experiences
    responsibilities: 'Responsabilités',
    present: 'Présent',

    exp1Title: "Data Engineer & Développeur web",
    exp1Summary: "Chaîne de données, applications web et outils de collecte au service des équipes métier.",
    exp1Points: [
      "Conception et optimisation de pipelines de données (ETL/ELT)",
      "Automatisation des traitements avec Python et Airflow",
      "Traitement et analyse de données volumineuses",
      "Optimisation des performances des requêtes SQL (PostgreSQL)",
      "Développement d'applications web et de microservices (Symfony, NestJS)",
      "Outils de web scraping en Java Spring Boot",
    ],

    exp2Title: "Data Analyst",
    exp2Summary: "Intégration et analyse des données commerciales pour la prise de décision.",
    exp2Points: [
      "Mise en place de processus ETL avec Talend et SSIS",
      "Création de tableaux de bord et rapports Power BI",
      "Intégration de données dans PostgreSQL et SQL Server",
      "Administration et intégration des ERP Odoo et EBP",
    ],

    exp3Title: "Technicien informatique",
    exp3Summary: "Déploiement et maintenance d'équipements de géolocalisation, de vidéosurveillance et de réseaux.",
    exp3Points: [
      "Installation et maintenance de systèmes GPS et de caméras IP",
      "Configuration et maintenance des réseaux informatiques",
      "Support technique et dépannage",
    ],

    exp4Title: "Enseignant en informatique",
    exp4Summary: "Cours et encadrement d'étudiants en informatique, en parallèle de mon activité.",
    exp4Points: [
      "Cours d'algorithmique et de bases de données",
      "Enseignement de la programmation Java",
      "Initiation au Machine Learning",
      "Encadrement de projets étudiants et travaux pratiques",
    ],

    partTime: "Temps partiel",
    durYear: "an",
    durYears: "ans",
    durMonth: "mois",
    durMonths: "mois",

    // Skills
    skillsSubtitle: "Outils et technologies, classés par domaine.",

    skCatData: "Data Engineering",
    skCatBi: "Analyse & BI",
    skCatDb: "Bases de données",
    skCatBackend: "Backend & API",
    skCatFrontend: "Frontend",
    skCatDevops: "DevOps & méthodes",

    skEtlTitle: "ETL & orchestration",
    skAnalysisTitle: "Analyse exploratoire",
    skSqlTitle: "SQL avancé",
    skApiTitle: "Conception d'API",
    skUiTitle: "Intégration UI",

    skPythonDesc: "Traitement de données, scripts d'automatisation et API légères.",
    skEtlDesc: "Flux d'ingestion, de transformation et de chargement planifiés.",
    skBigdataDesc: "Traitement distribué de grands volumes de données.",
    skScrapingDesc: "Collecte automatisée et structuration de données web.",
    skPowerbiDesc: "Tableaux de bord interactifs et rapports d'aide à la décision.",
    skAnalysisDesc: "Nettoyage, exploration et visualisation de jeux de données.",
    skMlDesc: "Modèles de prédiction et de classification sur données historiques.",
    skSqlDesc: "Modélisation, requêtes complexes et optimisation des performances.",
    skNosqlDesc: "Stockage orienté documents pour données semi-structurées.",
    skNodeDesc: "API REST, temps réel et microservices en JavaScript/TypeScript.",
    skJavaDesc: "Services backend et outils de traitement de masse.",
    skSymfonyDesc: "Applications web structurées et back-offices d'administration.",
    skApiDesc: "Conception, documentation et intégration d'API tierces.",
    skReactDesc: "Interfaces rapides, tableaux de bord et applications SPA/SSR.",
    skTsDesc: "Code front-end moderne, typé et maintenable.",
    skAngularDesc: "Applications single-page pour la consultation de données.",
    skUiDesc: "Mises en page responsives et cohérentes.",
    skDockerDesc: "Conteneurisation pour des environnements reproductibles.",
    skGitDesc: "Versioning, branches et collaboration sur le code.",
    skCicdDesc: "Déploiement automatisé et hébergement cloud (GCP, AWS).",
    skAgileDesc: "Sprints, livraison itérative et coordination avec le métier.",

    // Projects
    projectsSubtitle: "Applications métier, plateformes et projets data.",
    seeProject: 'Voir le projet',

    prjCatBusiness: "Applications métier",
    prjCatPlatform: "Plateformes & outils",
    prjCatData: "Data & temps réel",
    prjFeatures: "Fonctionnalités clés",
    prjStatusLive: "En ligne",
    prjCompany: "Projet entreprise",
    prjEnrichTagline: "Enrichissement de données sans IA",
    prjEnrichDesc: "Pipeline Python qui devine et retrouve le site web officiel des restaurants en croisant des données ouvertes, sans IA ni API payante.",
    prjEnrichFeatures: [
      "Sources ouvertes : OpenStreetMap, Wikidata, Overture Maps, Foursquare OS Places",
      "Matching flou du nom et de la distance GPS (RapidFuzz)",
      "URL devinée puis vérifiée en dernier recours",
      "Score de confiance de 0 à 95 et revue manuelle des cas douteux",
      "Cache SQLite, reprise après interruption, écriture dans PostgreSQL",
    ],
    prjCmzTagline: "Carte interactive des lieux de proximité",
    prjCmzDesc: "Plateforme cartographique pour trouver restaurants, fermes, golfs, marchés et banques en France, avec recherche « Quoi / Où » et filtres par rubrique.",
    prjCmzFeatures: [
      "Carte MapLibre avec regroupement par département",
      "Recherche « Quoi / Où » et filtres avancés par rubrique",
      "Recherche plein texte rapide avec Meilisearch",
      "API de filtrage FastAPI sur PostgreSQL",
    ],
    prevImage: "Image précédente",
    nextImage: "Image suivante",

    prjWorldfeedsTagline: "Agrégateur d'actualités internationales",
    prjWorldfeedsDesc: "Centralise en temps réel les flux RSS des grands médias mondiaux dans une interface unique.",
    prjWorldfeedsFeatures: [
      "Flux RSS des grands médias en temps réel",
      "Filtre par catégorie",
      "Mentions j'aime et compteur de vues",
    ],
    prjFacturaTagline: "ERP de facturation et gestion commerciale",
    prjFacturaDesc: "Suivi des ventes, des clients et des stocks pour piloter l'activité d'une entreprise.",
    prjFacturaFeatures: [
      "Facturation, ventes et clients",
      "Gestion des stocks",
      "Tableau de bord de l'activité",
    ],
    prjTalkioTagline: "Messagerie d'équipe & gestion de projets",
    prjTalkioDesc: "Plateforme collaborative qui réunit messagerie en temps réel et suivi des projets et des tâches.",
    prjTalkioFeatures: [
      "Messagerie en temps réel",
      "Messages privés chiffrés de bout en bout",
      "Gestion de projets et de tâches",
    ],
    prjCommuneTagline: "Gestion de l'état civil communal",
    prjCommuneDesc: "Centralise les données administratives des citoyens et la production des actes d'état civil.",
    prjCommuneFeatures: [
      "Registre centralisé des citoyens",
      "Création et mise à jour des actes",
      "Statistiques de population",
    ],
    prjForecastTagline: "Prévision et classification de données",
    prjForecastDesc: "Prédit et classe des valeurs à partir d'historiques, de séries temporelles et de données tabulaires.",
    prjForecastFeatures: [
      "Prévision de séries temporelles",
      "Classification de données tabulaires",
      "Visualisation interactive des résultats",
    ],
    prjItadimmoTagline: "Plateforme immobilière malgache",
    prjItadimmoDesc: "Recherche de biens et d'agences immobilières à Madagascar.",
    prjItadimmoFeatures: [
      "Recherche de biens et d'agences",
      "Filtres avancés",
      "Gestion des annonces",
    ],
    prjDepenzoTagline: "Gestion des finances personnelles",
    prjDepenzoDesc: "Suivi du budget, des dépenses et des revenus avec des résumés visuels.",
    prjDepenzoFeatures: [
      "Budget, dépenses et revenus",
      "Résumés visuels",
      "Analyse des habitudes de consommation",
    ],
    prjCyberconnectTagline: "Gestion de cybercafés et parcs informatiques",
    prjCyberconnectDesc: "Supervision centralisée des postes, des sessions utilisateurs et du parc informatique.",
    prjCyberconnectFeatures: [
      "Suivi des postes et des sessions",
      "Monitoring du parc informatique",
      "Administration centralisée",
    ],
    prjGpsTagline: "Suivi de flotte en temps réel",
    prjGpsDesc: "Localisation en direct des véhicules et équipements sur carte pour la gestion de flotte.",
    prjGpsFeatures: [
      "Position en direct sur carte",
      "Suivi des véhicules et équipements",
      "Gestion de flotte",
    ],
    prjSmartshopTagline: "Boutique e-commerce personnalisable",
    prjSmartshopDesc: "Boutique en ligne configurable avec une interface d'administration optimisée.",
    prjSmartshopFeatures: [
      "Boutique personnalisable",
      "Back-office EasyAdmin",
      "Gestion du catalogue produits",
    ],
    prjMailflowTagline: "Service d'envoi d'e-mails par API",
    prjMailflowDesc: "Envoi d'e-mails transactionnels via une API, à partir de modèles réutilisables.",
    prjMailflowFeatures: [
      "API d'envoi d'e-mails",
      "Modèles réutilisables",
    ],
    prjGlinkTagline: "Raccourcisseur d'URL",
    prjGlinkDesc: "Transforme des liens longs en URL courtes et partageables.",
    prjGlinkFeatures: [
      "Liens courts partageables",
      "Suivi des clics",
      "Alias personnalisés",
    ],
    prjKanbanTagline: "Gestion de projet agile",
    prjKanbanDesc: "Tableau Kanban pour suivre les tâches, prioriser les fonctionnalités et collaborer en équipe.",
    prjKanbanFeatures: [
      "Tableau Kanban des tâches",
      "Priorisation des fonctionnalités",
      "Collaboration d'équipe",
    ],

    // Projets entreprise (désactivés)
    project9Title: 'ConsoMyZone - Projet Entreprise',
    project9Desc: 'Symfony 6 / JavaScript - Visualisation de données avec intégration cartographique, recherche avancée, FastAPI, NodeJS.',
    project10Title: 'Web Scraper - Projet Entreprise',
    project10Desc: 'Java Spring Boot - Outil interne de scraping de données pour les opérations de l\'entreprise.',

    seeMore: 'Voir Plus',
    seeMoreDesc: 'Plusieurs projets sont déjà dans mon dépôt GitHub.',
    companyWebsite: 'Site Web Entreprise',
    companyWebsiteDesc: 'Site web corporate présentant l\'entreprise, ses services et son expertise.',

    // Education
    educationSubtitle: "Diplômes et certifications.",
    studies: "Points forts",
    eduDegrees: "Diplômes",
    eduCerts: "Certifications",
    certIssued: "Délivrée en",
    certView: "Voir le certificat",
    certVia: "via",
    certNew: "Nouveau",
    certVerify: "Vérifier",
    certKindCertificate: "Certificat",
    certKindBadge: "Open Badge",
    certKindAchievement: "Succès Microsoft Learn",
    certDomainMeal: "Suivi-évaluation (MEAL)",
    certDomainData: "Data & BI",
    certDomainLanguage: "Langues",
    certCount: "{n} certifications",

    edu1Title: "Master II en Électronique & Informatique",
    edu1Chip: "Diplôme d'ingénieur",
    edu1Summary: "Parcours Informatique appliquée — spécialité Data et modélisation.",
    edu1Points: [
      "Projets avancés d'analyse et de modélisation de données",
      "Recherches collaboratives et projets informatiques appliqués",
    ],

    edu2Title: "Licence en Électronique & Informatique",
    edu2Summary: "Parcours Informatique appliquée — spécialité Réseaux informatiques.",
    edu2Points: [
      "Fondamentaux des réseaux, de la programmation et de l'électronique",
      "Projets d'équipe et travaux pratiques",
    ],

    // Modal Contact
    contactInfo: 'Informations de Contact',
    phoneNumbers: 'Numéros de Téléphone',
    socialNetworks: 'Réseaux Sociaux',
    sendMessage: 'Envoyer un Message',
    messageSent: 'Message envoyé avec succès !',
    yourEmail: 'Votre Email',
    emailPlaceholder: 'votre.email@exemple.com',
    subject: 'Sujet',
    subjectPlaceholder: 'De quoi s\'agit-il ?',
    message: 'Message',
    messagePlaceholder: 'Votre message ici...',
    sendMessageBtn: 'Envoyer le Message',
    chatTitle: "Assistant d'Elie",
    chatStatus: "IA · répond instantanément",
    chatSuggestions: ["Quelles sont ses compétences ?", "Parle-moi de ses projets", "Est-il disponible pour une mission ?", "Quelles certifications a-t-il ?"],
    chatClear: "Nouvelle conversation",
    chatDisclaimer: "Assistant IA : vérifiez les informations importantes auprès d'Elie.",
    chatRetry: "Réessayer",
    chatInputHint: "Message facultatif, il sera pré-rempli.",
    openWhatsapp: "Ouvrir WhatsApp",
    openDiscord: "Ouvrir Discord",
    openEmail: "Écrire un e-mail",
    copy: "Copier",
    copied: "Copié",
    localTime: "Il est {time} à Antananarivo",
    errRequired: "Ce champ est requis",
    errEmail: "Adresse e-mail invalide",
    errMessage: "Au moins 10 caractères",
    msgSentTitle: "Message envoyé !",
    msgSentText: "Merci {name}, je vous réponds dès que possible à",
    sendAnother: "Envoyer un autre message",
    close: "Fermer",
    optional: "(facultatif)",
    sendShortcut: "Astuce : Ctrl + Entrée pour envoyer",
    requestTypeLabel: "Type de demande",
    rtFreelance: "Mission freelance",
    rtJob: "Offre d'emploi",
    rtCollab: "Collaboration",
    rtOther: "Autre",

    // Chat Modal
    agentIA: "Agent IA",
    contactMeVia: 'Contactez-moi via',
    chatWelcome: 'Bonjour ! 👋',
    chatDescription: 'Je suis l\'assistant IA d\'Elie. Posez-moi des questions sur ses compétences, son expérience ou ses projets !',
    askAnything: 'Posez-moi n\'importe quoi...',
    yourMessageOptional: 'Votre message (optionnel)',
    whatsappDesc: "Écrivez votre message ci-dessous : il sera pré-rempli dans la conversation WhatsApp.",
    discordDesc: "Ouvrez une conversation privée avec Elie sur Discord.",
    emailDesc: "Votre messagerie s'ouvrira avec votre message déjà pré-rempli.",
    noResponse: 'Désolé, je n\'ai pas pu générer une réponse.',
    connectionError: 'Erreur de connexion. Veuillez vérifier votre clé API.',
    technicalDifficulties: 'Désolé, je rencontre des difficultés techniques. N\'hésitez pas à me contacter directement via WhatsApp, Discord ou Email !',

    yourName: 'Votre Nom',
    emailError: 'Erreur lors de l\'envoi. Veuillez réessayer.',
    sending: 'Envoi en cours...',

    experiencesSubtitle: "Parcours professionnel",
    experiencesBadge:    "+4 ans",
    skillsBadge:         "{n} compétences",
    educationBadge:      "{n} diplômes",
    projectsBadge:       "{n} projets",
    servicesBadge:       "6 services",

    // Refonte UI
    helloIAm:        'Bonjour, je suis',
    heroAvailable:   'Disponible pour missions',
    playing:         'En lecture…',
    statYears:       "ans d'expérience",
    statProjects:    'projets réalisés',
    statTech:        'technologies',
    exploreOverline: 'Portfolio',
    exploreTitle:    'Explorez mon parcours',
    exploreSubtitle: 'Ouvrez une section pour en découvrir le détail.',
    expandAll:       'Tout déplier',
    collapseAll:     'Tout replier',
    currentRole:     'En cours',
    all:             'Tout',
    preview:         'Aperçu',
    privateProject:  'Projet privé',
    lbProject:       'Projet',
    ctaScript:       'Un projet en tête ?',
    ctaTitle:        "Construisons ensemble quelque chose d'utile.",
    ctaText:         "Parlons de votre projet, d'une mission ou d'une opportunité.",
    allRightsReserved: 'Tous droits réservés.',
    chatWithMe:      'Discutons',
    backToTop:       'Retour en haut',
    contactScript:   'Parlons-en',

  },
  en: {
    yourName: 'Your Name',
    emailError: 'Failed to send email. Please try again.',
    sending: 'Sending...',

    home: 'Home',
    services: 'Services',
    projects: 'Projects',
    education: 'Education',
    skills: 'Skills',
    experiences: 'Experiences',
    contactMe: 'Contact me',
    // Ajoutez toutes vos traductions ici

    // Home
    presentation: 'Presentation',
    jobTitle: 'Fullstack Developer & Data Engineer',
    jobDescription: 'I specialize in cross-platform web development, as well as data engineering and processing.',
    downloadCV: 'Download my CV',
    yearsExperience: 'years',
    experiencesLabel: 'Experiences',
    openToWork: 'Open to work',
    availability: 'Availability',
    satisfaction: 'Satisfaction',
    softwareEngineer: 'Software Engineer',
    webDevelopment: 'Web Development',
    dataEngineer: 'Data Engineer',
    schedule: 'Schedule a meeting',
    projectDepenzoDesc : 'Budget management application for personal, family, and business use.',

    // Services
    myServices: 'My Services',
    servicesSubtitle: 'From business need to production.',
    servicesGroupDev:  'Web & software development',
    servicesGroupData: 'Data & automation',
    servicesBuilt:     'Built',
    servicesCtaTitle:  "Need something that doesn't fit a box?",
    servicesCtaText:   "Tell me about your project and I'll suggest the right solution.",

    svcWebTitle:  'Custom web applications',
    svcWebDesc:   'SaaS platforms, management tools and business portals, from mockup to production.',
    svcWebPoints: [
      'Fast, responsive React / Next.js interfaces',
      'Admin panels, roles and authentication',
      'Docker deployment and continuous delivery',
    ],
    svcApiTitle:  'Robust APIs & back-end',
    svcApiDesc:   'Reliable APIs that connect your apps, partners and data.',
    svcApiPoints: [
      'Documented REST & GraphQL APIs',
      'Third-party integrations: payments, email, maps',
      'Well-modeled, optimized databases',
    ],
    svcShopTitle:  'E-commerce stores',
    svcShopDesc:   'A complete online store you run yourself, from catalog to delivery.',
    svcShopPoints: [
      'Catalog, stock and orders',
      'Secure online payments',
      'Easy-to-use back office',
    ],
    svcEtlTitle:  'Data pipelines (ETL/ELT)',
    svcEtlDesc:   'Bring scattered data into a single, reliable, automatically updated source.',
    svcEtlPoints: [
      'Ingestion from files, APIs and existing databases',
      'Cleaning, transformation and quality checks',
      'Scheduled, monitored workflows',
    ],
    svcBiTitle:  'Dashboards & analytics',
    svcBiDesc:   'Turn your data into clear KPIs to steer your business.',
    svcBiPoints: [
      'Interactive Power BI dashboards',
      'Automated reports and business KPIs',
      'Forecasts from your historical data',
    ],
    svcScrapTitle:  'Web scraping & automation',
    svcScrapDesc:   'Automatically collect web data and get rid of repetitive tasks.',
    svcScrapPoints: [
      'Scheduled collection bots',
      'Structured, analysis-ready data (CSV, Excel, database)',
      'Price, listing and content monitoring',
    ],

    // Experiences
    responsibilities: 'Responsibilities',
    present: 'Present',

    exp1Title: "Data Engineer & Web Developer",
    exp1Summary: "Data pipelines, web applications and collection tools for business teams.",
    exp1Points: [
      "Designing and optimizing data pipelines (ETL/ELT)",
      "Automating data processing with Python and Airflow",
      "Processing and analyzing large datasets",
      "Tuning SQL query performance (PostgreSQL)",
      "Building web applications and microservices (Symfony, NestJS)",
      "Developing web scraping tools with Java Spring Boot",
    ],

    exp2Title: "Data Analyst",
    exp2Summary: "Integrating and analyzing sales data to support decision-making.",
    exp2Points: [
      "Set up ETL processes with Talend and SSIS",
      "Built Power BI dashboards and reports",
      "Integrated data into PostgreSQL and SQL Server",
      "Administered and integrated Odoo and EBP ERPs",
    ],

    exp3Title: "IT Technician",
    exp3Summary: "Deployment and maintenance of tracking, video surveillance and network equipment.",
    exp3Points: [
      "Installed and maintained GPS systems and IP cameras",
      "Configured and maintained computer networks",
      "Provided technical support and troubleshooting",
    ],

    exp4Title: "Computer Science Lecturer",
    exp4Summary: "Teaching and mentoring computer science students, alongside my main job.",
    exp4Points: [
      "Taught algorithms and databases",
      "Taught Java programming",
      "Introduced students to Machine Learning",
      "Supervised student projects and lab work",
    ],

    partTime: "Part-time",
    durYear: "yr",
    durYears: "yrs",
    durMonth: "mo",
    durMonths: "mos",

    // Skills
    skillsSubtitle: "Tools and technologies, grouped by domain.",

    skCatData: "Data Engineering",
    skCatBi: "Analytics & BI",
    skCatDb: "Databases",
    skCatBackend: "Backend & API",
    skCatFrontend: "Frontend",
    skCatDevops: "DevOps & methods",

    skEtlTitle: "ETL & orchestration",
    skAnalysisTitle: "Exploratory analysis",
    skSqlTitle: "Advanced SQL",
    skApiTitle: "API design",
    skUiTitle: "UI styling",

    skPythonDesc: "Data processing, automation scripts and lightweight APIs.",
    skEtlDesc: "Scheduled ingestion, transformation and loading workflows.",
    skBigdataDesc: "Distributed processing of large data volumes.",
    skScrapingDesc: "Automated collection and structuring of web data.",
    skPowerbiDesc: "Interactive dashboards and decision-support reports.",
    skAnalysisDesc: "Cleaning, exploring and visualizing datasets.",
    skMlDesc: "Prediction and classification models on historical data.",
    skSqlDesc: "Modeling, complex queries and performance tuning.",
    skNosqlDesc: "Document storage for semi-structured data.",
    skNodeDesc: "REST APIs, real-time services and microservices in JavaScript/TypeScript.",
    skJavaDesc: "Backend services and bulk-processing tools.",
    skSymfonyDesc: "Structured web apps and admin back offices.",
    skApiDesc: "Design, documentation and third-party API integration.",
    skReactDesc: "Fast interfaces, dashboards and SPA/SSR apps.",
    skTsDesc: "Modern, typed and maintainable front-end code.",
    skAngularDesc: "Single-page apps for data exploration.",
    skUiDesc: "Responsive, consistent layouts.",
    skDockerDesc: "Containerization for reproducible environments.",
    skGitDesc: "Versioning, branching and code collaboration.",
    skCicdDesc: "Automated deployment and cloud hosting (GCP, AWS).",
    skAgileDesc: "Sprints, iterative delivery and business coordination.",


    // Projects
    projectsSubtitle: "Business apps, platforms and data projects.",
    seeProject: 'See the project',

    prjCatBusiness: "Business apps",
    prjCatPlatform: "Platforms & tools",
    prjCatData: "Data & real-time",
    prjFeatures: "Key features",
    prjStatusLive: "Live",
    prjCompany: "Company project",
    prjEnrichTagline: "AI-free data enrichment",
    prjEnrichDesc: "Python pipeline that guesses and finds restaurants' official websites by cross-referencing open data, with no AI and no paid API.",
    prjEnrichFeatures: [
      "Open sources: OpenStreetMap, Wikidata, Overture Maps, Foursquare OS Places",
      "Fuzzy matching on name and GPS distance (RapidFuzz)",
      "Guessed then verified URLs as a last resort",
      "Confidence score from 0 to 95, with manual review of doubtful matches",
      "SQLite cache, resumable runs, PostgreSQL output",
    ],
    prjCmzTagline: "Interactive map of local places",
    prjCmzDesc: "Map-based platform to find restaurants, farms, golf courses, markets and banks in France, with “What / Where” search and per-category filters.",
    prjCmzFeatures: [
      "MapLibre map with clustering by department",
      "“What / Where” search and advanced category filters",
      "Fast full-text search with Meilisearch",
      "FastAPI filtering API on PostgreSQL",
    ],
    prevImage: "Previous image",
    nextImage: "Next image",

    prjWorldfeedsTagline: "International news aggregator",
    prjWorldfeedsDesc: "Brings RSS feeds from major world media together in real time, in a single interface.",
    prjWorldfeedsFeatures: [
      "Real-time RSS feeds from major outlets",
      "Category filters",
      "Likes and view counts",
    ],
    prjFacturaTagline: "Invoicing & business management ERP",
    prjFacturaDesc: "Tracks sales, customers and stock to help companies run their business.",
    prjFacturaFeatures: [
      "Invoicing, sales and customers",
      "Stock management",
      "Business dashboard",
    ],
    prjTalkioTagline: "Team messaging & project management",
    prjTalkioDesc: "Collaborative platform combining real-time messaging with project and task tracking.",
    prjTalkioFeatures: [
      "Real-time messaging",
      "End-to-end encrypted private messages",
      "Project and task management",
    ],
    prjCommuneTagline: "Municipal civil registry",
    prjCommuneDesc: "Centralizes citizens' administrative data and the production of civil status records.",
    prjCommuneFeatures: [
      "Centralized citizen registry",
      "Record creation and updates",
      "Population statistics",
    ],
    prjForecastTagline: "Forecasting & classification",
    prjForecastDesc: "Predicts and classifies values from historical, time-series and tabular data.",
    prjForecastFeatures: [
      "Time-series forecasting",
      "Tabular data classification",
      "Interactive result charts",
    ],
    prjItadimmoTagline: "Madagascar real estate platform",
    prjItadimmoDesc: "Search for properties and real estate agencies in Madagascar.",
    prjItadimmoFeatures: [
      "Property and agency search",
      "Advanced filters",
      "Listing management",
    ],
    prjDepenzoTagline: "Personal finance manager",
    prjDepenzoDesc: "Tracks budgets, expenses and income with visual summaries.",
    prjDepenzoFeatures: [
      "Budget, expenses and income",
      "Visual summaries",
      "Spending habit insights",
    ],
    prjCyberconnectTagline: "Cyber café & IT fleet management",
    prjCyberconnectDesc: "Centralized monitoring of workstations, user sessions and IT assets.",
    prjCyberconnectFeatures: [
      "Workstation and session tracking",
      "IT asset monitoring",
      "Centralized administration",
    ],
    prjGpsTagline: "Real-time fleet tracking",
    prjGpsDesc: "Live map tracking of vehicles and equipment for fleet management.",
    prjGpsFeatures: [
      "Live position on map",
      "Vehicle and equipment tracking",
      "Fleet management",
    ],
    prjSmartshopTagline: "Customizable e-commerce store",
    prjSmartshopDesc: "Configurable online store with a streamlined admin interface.",
    prjSmartshopFeatures: [
      "Customizable storefront",
      "EasyAdmin back office",
      "Product catalog management",
    ],
    prjMailflowTagline: "Email-sending API service",
    prjMailflowDesc: "Sends transactional emails through an API, based on reusable templates.",
    prjMailflowFeatures: [
      "Email-sending API",
      "Reusable templates",
    ],
    prjGlinkTagline: "URL shortener",
    prjGlinkDesc: "Turns long links into short, shareable URLs.",
    prjGlinkFeatures: [
      "Short, shareable links",
      "Click tracking",
      "Custom aliases",
    ],
    prjKanbanTagline: "Agile project management",
    prjKanbanDesc: "Kanban board to track tasks, prioritize features and collaborate as a team.",
    prjKanbanFeatures: [
      "Kanban task board",
      "Feature prioritization",
      "Team collaboration",
    ],

    // Projets entreprise (désactivés)
    project9Title: 'ConsoMyZone - Company Project',
    project9Desc: 'Symfony 6 / JavaScript - Data visualization with map integration, advanced search, FastAPI, NodeJS.',
    project10Title: 'Web Scraper - Company Project',
    project10Desc: 'Java Spring Boot - Internal data scraping tool for company operations.',

  seeMore: 'See More',
  seeMoreDesc: 'Several projects are already in my GitHub repository.',
  companyWebsite: 'Company Website',
  companyWebsiteDesc: 'Corporate website presenting the company, its services, and its expertise.',

    // Education
    educationSubtitle: "Degrees and certifications.",
    studies: "Highlights",
    eduDegrees: "Degrees",
    eduCerts: "Certifications",
    certIssued: "Issued",
    certView: "View credential",
    certVia: "via",
    certNew: "New",
    certVerify: "Verify",
    certKindCertificate: "Certificate",
    certKindBadge: "Open Badge",
    certKindAchievement: "Microsoft Learn achievement",
    certDomainMeal: "Monitoring & evaluation (MEAL)",
    certDomainData: "Data & BI",
    certDomainLanguage: "Languages",
    certCount: "{n} certifications",

    edu1Title: "Master's Degree (M2) in Electronics & Computer Science",
    edu1Chip: "Engineering degree",
    edu1Summary: "Applied Computer Science track — Data & Modeling specialization.",
    edu1Points: [
      "Advanced data analysis and modeling projects",
      "Collaborative research and applied computing projects",
    ],

    edu2Title: "Bachelor's Degree in Electronics & Computer Science",
    edu2Summary: "Applied Computer Science track — Computer Networks specialization.",
    edu2Points: [
      "Fundamentals of networking, programming and electronics",
      "Team projects and hands-on labs",
    ],


    // Modal Contact
    contactInfo: 'Contact Info',
    phoneNumbers: 'Phone Numbers',
    socialNetworks: 'Social Networks',
    sendMessage: 'Send Message',
    messageSent: 'Message sent successfully!',
    yourEmail: 'Your Email',
    emailPlaceholder: 'your.email@example.com',
    subject: 'Subject',
    subjectPlaceholder: 'What\'s this about?',
    message: 'Message',
    messagePlaceholder: 'Your message here...',
    sendMessageBtn: 'Send Message',
    chatTitle: "Elie's assistant",
    chatStatus: "AI · replies instantly",
    chatSuggestions: ["What are his skills?", "Tell me about his projects", "Is he available for a project?", "What certifications does he have?"],
    chatClear: "New conversation",
    chatDisclaimer: "AI assistant: double-check important details with Elie.",
    chatRetry: "Retry",
    chatInputHint: "Optional message, it will be pre-filled.",
    openWhatsapp: "Open WhatsApp",
    openDiscord: "Open Discord",
    openEmail: "Write an email",
    copy: "Copy",
    copied: "Copied",
    localTime: "It's {time} in Antananarivo",
    errRequired: "This field is required",
    errEmail: "Invalid email address",
    errMessage: "At least 10 characters",
    msgSentTitle: "Message sent!",
    msgSentText: "Thanks {name}, I'll get back to you as soon as possible at",
    sendAnother: "Send another message",
    close: "Close",
    optional: "(optional)",
    sendShortcut: "Tip: Ctrl + Enter to send",
    requestTypeLabel: "Request type",
    rtFreelance: "Freelance project",
    rtJob: "Job offer",
    rtCollab: "Collaboration",
    rtOther: "Other",

    // Chat Modal
    agentIA: "AI agent",
    contactMeVia: 'Contact me via',
    chatWelcome: 'Hello! 👋',
    chatDescription: 'I\'m Elie\'s AI assistant. Ask me about his skills, experience, or projects!',
    askAnything: 'Ask me anything...',
    yourMessageOptional: 'Your message (optional)',
    whatsappDesc: "Type your message below: it will be pre-filled in the WhatsApp chat.",
    discordDesc: "Start a private conversation with Elie on Discord.",
    emailDesc: "Your email app will open with your message already filled in.",
    noResponse: 'Sorry, I couldn\'t generate a response.',
    connectionError: 'Connection error. Please check your API key.',
    technicalDifficulties: 'Sorry, I\'m experiencing technical difficulties. Feel free to contact me directly via WhatsApp, Discord, or Email!',

    experiencesSubtitle: "Professional background",
    experiencesBadge:    "4 years",
    skillsBadge:         "{n} skills",
    educationBadge:      "{n} degrees",
    projectsBadge:       "{n} projects",
    servicesBadge:       "6 services",

    // UI redesign
    helloIAm:        "Hi, I'm",
    heroAvailable:   'Open to new projects',
    playing:         'Playing…',
    statYears:       'years of experience',
    statProjects:    'projects delivered',
    statTech:        'technologies',
    exploreOverline: 'Portfolio',
    exploreTitle:    'Explore my journey',
    exploreSubtitle: 'Open a section to dive into the details.',
    expandAll:       'Expand all',
    collapseAll:     'Collapse all',
    currentRole:     'Current',
    all:             'All',
    preview:         'Preview',
    privateProject:  'Private project',
    lbProject:       'Project',
    ctaScript:       'Got a project in mind?',
    ctaTitle:        "Let's build something useful together.",
    ctaText:         "Let's talk about your project, a mission or an opportunity.",
    allRightsReserved: 'All rights reserved.',
    chatWithMe:      "Let's chat",
    backToTop:       'Back to top',
    contactScript:   "Let's talk",

  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Vérifier localStorage en premier
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      return savedLanguage;
    }
    
    // Toujours retourner FR par défaut
    return 'fr';
  });

  // Sauvegarder dans localStorage au premier chargement si pas déjà fait
  useEffect(() => {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'fr');
    }
  }, []);

  // Garde <html lang> synchronisé (accessibilité, SEO)
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};