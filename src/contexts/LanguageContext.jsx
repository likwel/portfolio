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
    jobTitle: 'Ingénieur Data & Développeur fullstack',
    jobDescription: 'Je me spécialise dans l\'ingénierie et traitement des données, ainsi qu’en développement web multiplateforme.',
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

    // Services
    myServices: 'Mes Services',
    servicesSubtitle: 'Découvrez les services et solutions que je propose.',
    webDevelopmentService: 'Développement Web',
    webDevelopmentDesc: 'Conception et développement de sites web et d\'applications web modernes et responsives adaptés aux besoins de votre entreprise.',
    softwareDevelopment: 'Développement Logiciel',
    softwareDevelopmentDesc: 'Solutions logicielles personnalisées construites avec des technologies de pointe pour optimiser vos opérations commerciales.',
    dataAnalysis: 'Analyse de Données',
    dataAnalysisDesc: 'Transformez les données brutes en informations exploitables grâce à des techniques d\'analyse et de visualisation avancées.',
    dataEngineering: 'Ingénierie des Données',
    dataEngineeringDesc: 'Construction de pipelines de données robustes, processus ETL et architectures évolutives pour la gestion du Big Data.',
    webScraping: 'Web Scraping & Automatisation',
    webScrapingDesc: 'Solutions d\'extraction automatisée de données et de web scraping pour collecter efficacement des informations précieuses.',
    ecommerce: 'E-commerce',
    ecommerceDesc: 'Création de boutiques en ligne complètes avec gestion des produits, paiements sécurisés, et intégration de systèmes de livraison pour optimiser vos ventes en ligne.',

    // Experiences
    professionalExperience: 'Expérience Professionnelle',
    experienceSubtitle: 'Découvrez mon parcours professionnel.',
    responsibilities: 'Responsabilités',
    present: 'Présent',

    // Experience 1 - Geomadagascar
    exp1Title: 'Développeur Web & Ingénieur Data',
    exp1Start: 'Jan 2022',
    exp1End: 'Présent',
    exp1Desc1: 'Concevoir et développer des applications web et des pipelines de données',
    exp1Desc2: 'Gérer et optimiser les bases de données relationnelles',
    exp1Desc3: 'Implémenter des solutions backend évolutives avec Symfony et Spring Boot',
    exp1Desc4: 'Développer des fonctionnalités interactives en JavaScript',

    // Experience 2 - MGBI
    exp2Title: 'Analyste de Données',
    exp2Start: 'Sep 2020',
    exp2End: 'Déc 2021',
    exp2Desc1: 'Analyser et interpréter les données commerciales pour soutenir la prise de décision',
    exp2Desc2: 'Gérer et maintenir les systèmes ERP',
    exp2Desc3: 'Intégrer et traiter les données avec Python et SQL',
    exp2Desc4: 'Créer des tableaux de bord et rapports avec Power BI et Excel',

    // Experience 3 - Secutech
    exp3Title: 'Technicien Informatique',
    exp3Start: 'Mar 2020',
    exp3End: 'Aoû 2020',
    exp3Desc1: 'Installer et configurer les équipements électroniques et informatiques',
    exp3Desc2: 'Effectuer la maintenance préventive et corrective',
    exp3Desc3: 'Fournir un support technique et dépannage',
    exp3Desc4: 'Assurer la fiabilité et la sécurité des systèmes',

    // Experience 4 - ISITM
    exp4Title: 'Instructeur en Programmation',
    exp4Start: 'Jan 2019',
    exp4End: 'Présent',
    exp4Desc1: 'Enseigner la programmation et l\'électronique appliquée à travers des projets pratiques',
    exp4Desc2: 'Dispenser des cours en Java et Développement Web',
    exp4Desc3: 'Introduire les fondamentaux du Machine Learning',
    exp4Desc4: 'Superviser les projets étudiants et travaux pratiques',

    // Skills
    skillsExpertise: 'Compétences & Expertise',
    skillsSubtitle: 'Un aperçu détaillé de mes domaines d\'expertise.',

    // Categories
    categoryBackend: 'Backend',
    categoryFrontend: 'Frontend',
    categoryData: 'Ingénierie & Analyse de Données',
    categoryDevOps: 'DevOps & Gestion',

    // Skills descriptions
    skillJavaDesc: 'Collecte de données web (scraping) et services backend orientés traitement de masse.',
    skillNodeDesc: 'APIs REST légères et services temps réel pour l\'exposition et le transfert de données.',
    skillSymfonyDesc: 'Applications web structurées avec intégration d\'APIs et gestion de flux de données.',
    skillPythonDesc: 'Pipelines de données, orchestration de workflows et automatisation avec Pandas, NumPy et Airflow, FastAPI.',
    skillJsDesc: 'Interfaces front-end dynamiques pour la consultation et la visualisation de données.',
    skillSqlDesc: 'Requêtes complexes, optimisation de performances et modélisation de bases de données.',

    apiDevelopment: 'Développement d\'API',
    skillApiDesc: 'Exposition et consommation de données via des APIs REST & GraphQL robustes.',
    skillDevOpsDesc: 'CI/CD, déploiement automatisé de pipelines et gestion d\'infrastructure cloud (GCP, AWS).',
    skillGitDesc: 'Versioning de code, gestion de branches et collaboration sur des projets data.',
    skillDockerDesc: 'Conteneurisation des pipelines et services pour des environnements reproductibles et scalables.',
    skillAgileDesc: 'Sprints, livraison itérative et coordination entre équipes data et métier.',
    skillReactDesc: 'Développement de dashboards et interfaces de monitoring de données.',
    skillAngularDesc: 'Applications single-page pour la consultation et l\'exploration de données.',
    skillBootstrapDesc: 'Prototypage rapide d\'interfaces de reporting responsive.',
    skillTailwindDesc: 'Mise en page moderne et cohérente pour outils internes et dashboards.',

    etlPipelines: 'ETL & Data Pipelines',
    skillEtlDesc: 'Conception de flux ETL/ELT pour l\'ingestion, la transformation et le chargement de données.',

    dataVisualization: 'Data Viz',
    skillDataVizDesc: 'Dashboards interactifs et rapports métier avec Power BI, Tableau et Excel avancé.',

    // Projects
    projectsMainTitle: 'Projets Personnels & Side Projects',
    projectsSubtitle: 'Une sélection de projets démontrant mes compétences.',
    categoryPersonal: 'Projets Personnels',
    categoryCompany: 'Projets Entreprise',
    seeProject: 'Voir le projet',
    notDeployed: 'Non déployé',

    // Projects descriptions
    project1Desc: 'FullStack NextJS 15.5 - WorldFeeds est un agrégateur de nouvelles internationales qui centralise les flux RSS des principaux médias mondiaux en temps réel.',
    project2Desc: 'Symfony 7.0 - Système de gestion commerciale : suivi des ventes, clients et stock, optimisation des processus métier et amélioration des performances de l\'entreprise.',
    project3Desc: 'Node.js, Express.js - Gestion de l\'état civil : enregistrement des données administratives des citoyens et création/mise à jour des documents d\'état civil pour une gestion centralisée.',
    project4Desc: 'Node.js, Express.js - Gestion de projet Agile (Kanban) : suivi continu des tâches, priorisation des fonctionnalités, collaboration d\'équipe et adaptation rapide aux changements.',
    project5Desc: 'Java, Spring Boot - Gestion de flotte en temps réel et suivi des véhicules/équipements avec visualisation de position en direct.',
    project6Desc: 'Python / Streamlit – Prédiction et classification de valeurs à partir de données historiques, séries temporelles et ensembles de données tabulaires.',
    project7Desc: 'Symfony 7.3 avec EasyAdmin – E-commerce personnalisable avec interface d\'administration optimisée.',
    project8Desc: 'NestJS + NextJS – Plateforme de messagerie avec gestion avancée de projets/tâches.',
    project9Title: 'ConsoMyZone - Projet Entreprise',
    project9Desc: 'Symfony 6 / JavaScript - Visualisation de données avec intégration cartographique, recherche avancée, FastAPI, NodeJS.',
    project10Title: 'Web Scraper - Projet Entreprise',
    project10Desc: 'Java Spring Boot - Outil interne de scraping de données pour les opérations de l\'entreprise.',
    projectMailDesc: 'Fullstack NodeJS/ReactJS - Service d\'envoi d\'emails via API et templates.',

    // ── Nouveaux projets perso ───────────────────────────────
    depenzoTitle: 'Depenzo',
    depenzoDesc: 'Application de gestion financière personnelle : suivi du budget, des dépenses et des revenus avec résumés visuels et analyses des habitudes de consommation.',

    glinkTitle: 'Glink',
    glinkDesc: 'Service de raccourcissement d\'URL : transformez vos liens longs en URLs courtes et partageables, avec suivi des clics et alias personnalisés.',

    itadImmoTitle: 'ItadImmo',
    itadImmoDesc: 'Plateforme immobilière malgache pour la recherche de biens et d\'agences, avec filtres avancés et gestion des annonces.',

    seeMore: 'Voir Plus',
    seeMoreDesc: 'Plusieurs projets sont déjà dans mon dépôt GitHub.',
    companyWebsite: 'Site Web Entreprise',
    companyWebsiteDesc: 'Site web corporate présentant l\'entreprise, ses services et son expertise.',

    // Education
    educationTitle: 'Formation & Qualifications',
    educationSubtitle: 'Découvrez mon parcours académique et mes certifications.',
    studies: 'Études',

    // Education 1 - Master
    edu1Title: 'Master en Électronique et Informatique',
    edu1Company: 'École Supérieure Polytechnique d\'Antananarivo',
    edu1Desc1: 'Spécialisation : Informatique, Data et Modélisation',
    edu1Desc2: 'Réalisation de projets avancés en analyse et modélisation de données',
    edu1Desc3: 'Participation à des recherches collaboratives et projets informatiques appliqués',

    // Education 2 - Bachelor
    edu2Title: 'Licence en Électronique et Informatique',
    edu2Company: 'École Supérieure Polytechnique d\'Antananarivo',
    edu2Desc1: 'Spécialisation : Informatique et Réseaux',
    edu2Desc2: 'Apprentissage des fondamentaux des réseaux, de la programmation et de l\'électronique',
    edu2Desc3: 'Travail sur des projets d\'équipe et travaux pratiques',

    // Education 3 - Baccalaureate
    edu3Title: 'Baccalauréat en Études Scientifiques',
    edu3Company: 'Lycée d\'enseignement général',
    edu3Desc1: 'Spécialisation : Série D',
    edu3Desc2: 'Diplômé avec Mention',
    edu3Desc3: 'Focus sur les mathématiques, la physique et la chimie',

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

    // Chat Modal
    agentIA: 'AgentIA',
    contactMeVia: 'Contactez-moi via',
    chatWelcome: 'Bonjour ! 👋',
    chatDescription: 'Je suis l\'assistant IA d\'Elie. Posez-moi des questions sur ses compétences, son expérience ou ses projets !',
    askAnything: 'Posez-moi n\'importe quoi...',
    yourMessageOptional: 'Votre message (optionnel)',
    whatsappDesc: 'Écrivez votre message et cliquez sur le bouton pour ouvrir WhatsApp',
    discordDesc: 'Rejoignez notre serveur Discord pour discuter en temps réel',
    emailDesc: 'Envoyez-nous un email, nous vous répondrons rapidement',
    noResponse: 'Désolé, je n\'ai pas pu générer une réponse.',
    connectionError: 'Erreur de connexion. Veuillez vérifier votre clé API.',
    technicalDifficulties: 'Désolé, je rencontre des difficultés techniques. N\'hésitez pas à me contacter directement via WhatsApp, Discord ou Email !',

    yourName: 'Votre Nom',
    emailError: 'Erreur lors de l\'envoi. Veuillez réessayer.',
    sending: 'Envoi en cours...',

    experiencesSubtitle: "Parcours professionnel",
    experiencesBadge:    "+4 ans",
    skillsBadge:         "+15 compétences",
    educationBadge:      "2 diplômes",
    projectsBadge:       "+10 projets",
    servicesBadge:       "+5 services",

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
    jobTitle: 'Data Engineer & Fullstack Developper ',
    jobDescription: 'I specialize in data engineering and data processing, as well as cross-platform web development.',
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

    // Services
    myServices: 'My Services',
    servicesSubtitle: 'Discover the services and solutions I provide.',
    webDevelopmentService: 'Web Development',
    webDevelopmentDesc: 'Design and development of modern, responsive websites and web applications tailored to your business needs.',
    softwareDevelopment: 'Software Development',
    softwareDevelopmentDesc: 'Custom software solutions built with cutting-edge technologies to streamline your business operations.',
    dataAnalysis: 'Data Analysis',
    dataAnalysisDesc: 'Transform raw data into actionable insights through advanced analytics and visualization techniques.',
    dataEngineering: 'Data Engineering',
    dataEngineeringDesc: 'Build robust data pipelines, ETL processes, and scalable architectures for big data management.',
    webScraping: 'Web Scraping & Automation',
    webScrapingDesc: 'Automated data extraction and web scraping solutions to gather valuable information efficiently.',
    ecommerce: 'E-commerce',
    ecommerceDesc: 'Development of complete online stores with product management, secure payments, and shipping system integration to optimize your online sales.',

    // Experiences
    professionalExperience: 'Professional Experience',
    experienceSubtitle: 'Discover my professional background.',
    responsibilities: 'Responsibilities',
    present: 'Present',

    // Experience 1 - Geomadagascar
    exp1Title: 'Web Developer & Data Engineer',
    exp1Start: 'Jan 2022',
    exp1End: 'Present',
    exp1Desc1: 'Design and develop web applications and data pipelines',
    exp1Desc2: 'Manage and optimize relational databases',
    exp1Desc3: 'Implement scalable backend solutions using Symfony and Spring Boot',
    exp1Desc4: 'Develop interactive features using JavaScript',

    // Experience 2 - MGBI
    exp2Title: 'Data Analyst',
    exp2Start: 'Sep 2020',
    exp2End: 'Dec 2021',
    exp2Desc1: 'Analyze and interpret business data to support decision-making',
    exp2Desc2: 'Manage and maintain ERP systems',
    exp2Desc3: 'Integrate and process data using Python and SQL',
    exp2Desc4: 'Create dashboards and reports with Power BI and Excel',

    // Experience 3 - Secutech
    exp3Title: 'IT Technician',
    exp3Start: 'Mar 2020',
    exp3End: 'Aug 2020',
    exp3Desc1: 'Install and configure electronic and IT equipment',
    exp3Desc2: 'Perform preventive and corrective maintenance',
    exp3Desc3: 'Provide technical support and troubleshooting',
    exp3Desc4: 'Ensure system reliability and security',

    // Experience 4 - ISITM
    exp4Title: 'Programming Instructor',
    exp4Start: 'Jan 2019',
    exp4End: 'Present',
    exp4Desc1: 'Teach programming and applied electronics through hands-on projects',
    exp4Desc2: 'Deliver courses in Java and Web Development',
    exp4Desc3: 'Introduce Machine Learning fundamentals',
    exp4Desc4: 'Supervise student projects and practical labs',

    // Skills
    skillsExpertise: 'Skills & Expertise',
    skillsSubtitle: 'A closer look at what I do best.',

    // Categories
    categoryBackend: 'Backend',
    categoryFrontend: 'Frontend',
    categoryData: 'Data Engineering & Analysis',
    categoryDevOps: 'DevOps & Management',

    // Skills descriptions
    skillJavaDesc:     'Web scraping and backend services for large-scale data processing.',
    skillNodeDesc:     'Lightweight REST APIs and real-time services for data transfer and exposure.',
    skillSymfonyDesc:  'Structured backend applications with API integration and data flow management.',
    skillPythonDesc:   'Data pipelines, workflow orchestration and automation with Pandas, NumPy, Airflow & FastAPI.',
    skillJsDesc:       'Dynamic front-end interfaces for data consultation and visualization.',
    skillSqlDesc:      'Complex queries, performance optimization and database modeling.',

    apiDevelopment:    'API Development',
    skillApiDesc:      'Design and integration of robust REST & GraphQL APIs for data exposure and exchange.',
    skillDevOpsDesc:   'CI/CD, automated pipeline deployment and cloud infrastructure management (GCP, AWS).',
    skillGitDesc:      'Code versioning, branch management and collaboration on data projects.',
    skillDockerDesc:   'Pipeline containerization for reproducible and scalable environments.',
    skillAgileDesc:    'Iterative project delivery and coordination between data and business teams.',
    skillReactDesc:    'Interactive dashboards and data monitoring interfaces.',
    skillAngularDesc:  'Single-page applications for data exploration and consultation.',
    skillBootstrapDesc:'Rapid prototyping of responsive reporting interfaces.',
    skillTailwindDesc: 'Modern, consistent styling for internal tools and dashboards.',

    etlPipelines:      'ETL & Data Pipelines',
    skillEtlDesc:      'Design and management of ETL/ELT workflows for data ingestion, transformation and loading.',

    dataVisualization: 'Data Visualization',
    skillDataVizDesc:  'Interactive dashboards and business reports with Power BI, Tableau and advanced Excel.',


    // Projects
    projectsMainTitle: 'Personal & Side Projects',
    projectsSubtitle: 'A selection of projects showcasing my skills.',
    categoryPersonal: 'Personal Projects',
    categoryCompany: 'Company Projects',
    seeProject: 'See the project',
    notDeployed: 'Not deployed',

  // Projects descriptions
  project1Desc: 'FullStack NextJS 15.5 - WorldFeeds is an international news aggregator that centralizes RSS feeds from the world\'s major media outlets in real time.',
  project2Desc: 'Symfony 7.0 - Commercial management system: tracking sales, clients, and stock, optimizing business processes, and improving company performance.',
  project3Desc: 'Node.js, Express.js - Civil status management: recording administrative citizen data and creating/updating civil status documents for centralized management.',
  project4Desc: 'Node.js, Express.js - Agile project management (Kanban): continuous task tracking, feature prioritization, team collaboration, and rapid adaptation to changes.',
  project5Desc: 'Java, Spring Boot - Real-time fleet management and vehicle/equipment tracking with live position visualization.',
  project6Desc: 'Python / Streamlit – Predicting and classifying values from historical data, both time series and tabular datasets.',
  project7Desc: 'Symfony 7.3 with EasyAdmin – Customizable e-commerce with optimized admin interface.',
  project8Desc: 'NestJS + NextJS – Messaging platform with advanced project/task management.',
  project9Title: 'ConsoMyZone - Company Project',
  project9Desc: 'Symfony 6 / JavaScript - Data visualization with map integration, advanced search, FastAPI, NodeJS.',
  project10Title: 'Web Scraper - Company Project',
  project10Desc: 'Java Spring Boot - Internal data scraping tool for company operations.',
  projectMailDesc: 'Fullstack NodeJS/ReactJS - Email sending service via API and templates.',

  // ── Nouveaux projets perso ───────────────────────────────
  depenzoTitle: 'Depenzo',
  depenzoDesc: 'Personal finance app for tracking budgets, expenses and income — with visual summaries and spending insights.',

  glinkTitle: 'Glink',
  glinkDesc: 'URL shortener service: convert long links into short, shareable URLs with click tracking and custom aliases.',

  itadImmoTitle: 'ItadImmo',
  itadImmoDesc: 'Madagascar real estate platform for searching properties and agencies — with advanced filtering and listing management.',

  seeMore: 'See More',
  seeMoreDesc: 'Several projects are already in my GitHub repository.',
  companyWebsite: 'Company Website',
  companyWebsiteDesc: 'Corporate website presenting the company, its services, and its expertise.',

    // Education
    educationTitle: 'Education & Qualifications',
    educationSubtitle: 'Discover my academic background and certifications.',
    studies: 'Studies',

    // Education 1 - Master
    edu1Title: 'Master\'s Degree in Electronics and Computer Science',
    edu1Company: 'Ecole Supérieure Polytechnique d\'Antananarivo',
    edu1Desc1: 'Specialization: Computer Science, Data, and Modeling',
    edu1Desc2: 'Completed advanced projects in data analysis and modeling',
    edu1Desc3: 'Participated in collaborative research and applied computing projects',

    // Education 2 - Bachelor
    edu2Title: 'Bachelor\'s Degree in Electronics and Computer Science',
    edu2Company: 'Ecole Supérieure Polytechnique d\'Antananarivo',
    edu2Desc1: 'Specialization: Computer Science and Networks',
    edu2Desc2: 'Learned networking, programming, and electronics fundamentals',
    edu2Desc3: 'Worked on team projects and practical labs',

    // Education 3 - Baccalaureate
    edu3Title: 'Baccalaureate in Scientific Studies',
    edu3Company: 'Lycée d\'enseignement général',
    edu3Desc1: 'Specialization: Serie D',
    edu3Desc2: 'Graduated with Honors',
    edu3Desc3: 'Focus on mathematics, physics, and chemistry',


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

    // Chat Modal
    agentIA: 'AgentIA',
    contactMeVia: 'Contact me via',
    chatWelcome: 'Hello! 👋',
    chatDescription: 'I\'m Elie\'s AI assistant. Ask me about his skills, experience, or projects!',
    askAnything: 'Ask me anything...',
    yourMessageOptional: 'Your message (optional)',
    whatsappDesc: 'Write your message and click the button to open WhatsApp',
    discordDesc: 'Join our Discord server to chat in real-time',
    emailDesc: 'Send us an email, we will reply promptly',
    noResponse: 'Sorry, I couldn\'t generate a response.',
    connectionError: 'Connection error. Please check your API key.',
    technicalDifficulties: 'Sorry, I\'m experiencing technical difficulties. Feel free to contact me directly via WhatsApp, Discord, or Email!',

    experiencesSubtitle: "Professional background",
    experiencesBadge:    "4 years",
    skillsBadge:         "+15 skills",
    educationBadge:      "2 degrees",
    projectsBadge:       "+10 projects",
    servicesBadge:       "+5 services",

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