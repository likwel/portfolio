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
    categoryData: 'Data & Base de données',
    categoryDevOps: 'DevOps & Gestion',

    // Skills descriptions
    skillJavaDesc: 'Web scraping et développement backend.',
    skillNodeDesc: 'Développement web et applications côté serveur.',
    skillSymfonyDesc: 'Développement d\'applications web, architecture backend et intégration d\'API.',
    skillPythonDesc: 'Traitement, analyse et automatisation de données avec Pandas et NumPy.',
    skillJsDesc: 'Gestion de l\'interface utilisateur et développement front-end.',
    skillSqlDesc: 'Gestion de bases de données, requêtes, optimisation et modélisation relationnelle.',
    apiDevelopment: 'Développement d\'API',
    skillApiDesc: 'Conception et intégration d\'API REST & GraphQL.',
    skillDevOpsDesc: 'CI/CD, automatisation des déploiements et gestion de l\'infrastructure cloud.',
    skillGitDesc: 'Contrôle de version, stratégies de branches et développement collaboratif.',
    skillDockerDesc: 'Conteneurisation d\'applications pour garantir des environnements de développement cohérents, portables et évolutifs.',
    skillAgileDesc: 'Méthodologies de gestion de projet pour la collaboration d\'équipe.',
    skillReactDesc: 'Création d\'applications web interactives et performantes.',
    skillAngularDesc: 'Développement d\'applications dynamiques single-page.',
    skillBootstrapDesc: 'Design web responsive et composants UI.',
    skillTailwindDesc: 'Style moderne utility-first pour des mises en page responsive.',
    etlPipelines: 'ETL & Pipelines de Données',
    skillEtlDesc: 'Construction et gestion de processus ETL et flux de travail de données automatisés.',
    dataVisualization: 'Visualisation de Données',
    skillDataVizDesc: 'Création de tableaux de bord et rapports avec Power BI, Tableau ou bibliothèques Python.',


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
    projectMailDesc: 'Fullstack NodeJS/ReactJS - Service d’envoi d’emails via API et templates',
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
    categoryData: 'Data & Database',
    categoryDevOps: 'DevOps & Management',

    // Skills descriptions
    skillJavaDesc: 'Web scraping and backend development.',
    skillNodeDesc: 'Web development and server-side applications.',
    skillSymfonyDesc: 'Web application development, backend architecture, and API integration.',
    skillPythonDesc: 'Data processing, analysis, and automation with Pandas and NumPy.',
    skillJsDesc: 'UI management and front-end development.',
    skillSqlDesc: 'Database management, queries, optimization, and relational modeling.',
    apiDevelopment: 'API Development',
    skillApiDesc: 'Designing and integrating REST & GraphQL APIs.',
    skillDevOpsDesc: 'CI/CD, deployment automation, and cloud infrastructure management.',
    skillGitDesc: 'Version control, branching strategies, and collaborative development.',
    skillDockerDesc: 'Containerization of applications to ensure consistent, portable, and scalable development environments.',
    skillAgileDesc: 'Project management methodologies for team collaboration.',
    skillReactDesc: 'Building interactive and performant web applications.',
    skillAngularDesc: 'Developing dynamic single-page applications.',
    skillBootstrapDesc: 'Responsive web design and UI components.',
    skillTailwindDesc: 'Modern utility-first styling for responsive layouts.',
    etlPipelines: 'ETL & Data Pipelines',
    skillEtlDesc: 'Building and managing ETL processes and automated data workflows.',
    dataVisualization: 'Data Visualization',
    skillDataVizDesc: 'Creating dashboards and reports using Power BI, Tableau, or Python libraries.',


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
    projectMailDesc: 'Fullstack NodeJS/ReactJS - Email sending service via API and templates',
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