import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import DOMPurify from "dompurify";
import { useLanguage } from '../contexts/LanguageContext';
import { CERTIFICATIONS } from '../data/certifications';

// SVG Icons as components (identiques)
const RobotIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2c.5 0 1 .19 1.41.59l.59.58V2h2v2h2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h2V2h2v1.17l.59-.58C11 2.19 11.5 2 12 2zM9 6c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1zm6 0c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1zm-3 6c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export default function ContactChoiceModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("ia");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Couleurs du thème
  const themeColor = '#17736a';

  // 📋 CV DATA - Traduit selon la langue
  // 📋 CV DATA - Traduit selon la langue
  const getCvData = () => {
    if (language === 'fr') {
      return {
        "personal_info": {
          "full_name": "Elie Fenohasina Andriatsitohaina",
          "title": "Développeur Fullstack / Ingénieur Data",
          "portfolio": "https://elie-fenohasina.onrender.com",
          "github": "https://github.com/likwel",
          "age": "sur demande uniquement",
          "isMarried": "vrai",
          "hasChild": "vrai",
          "childs_name": "informations complètes sur demande uniquement",
          "number_child": "sur demande uniquement",
          "father": "Gervais, informations complètes sur demande uniquement",
          "mother": "Jacqueline, informations complètes sur demande uniquement",
          "brother": "Faneva, Hervé",
          "Sister": "Hanitra, Fanilo, Notahiana",
          "married_name": "Sandy, informations complètes sur demande uniquement",
          "address_aproximativly": "Ankatso",
          "full_address": "informations complètes sur demande uniquement",
        },
        "profile": "Développeur web passionné avec une solide expérience en backend, analyse de données, ingénierie des données et technologies web.",
        "languages": [
          { "language": "Français", "level": "Bon" },
          { "language": "Anglais", "level": "Intermédiaire, professionnel, technique" },
          { "language": "Malgache", "level": "Très bon" }
        ],
        "technical_skills": {
          "backend": [
            "Symfony",
            "NestJS",
            "ExpressJS",
            "Java Spring Boot",
            "Flask"
          ],
          "frontend": [
            "Next.js",
            "React.js",
            "JavaScript",
            "HTML",
            "CSS",
            "jQuery"
          ],
          "databases": [
            "MySQL",
            "PostgreSQL",
            "SQL Server",
            "NoSQL"
          ],
          "data_and_ai": [
            "Python",
            "Machine Learning",
            "Analyse de Données",
            "Ingénierie des Données",
            "Business Intelligence",
            "Automatisation",
            "Web scraping",
            "Pipeline de données"
          ],
          "tools_and_methods": [
            "Git",
            "Docker",
            "Agile Scrum",
            "Principes SOLID",
            "APIs REST",
          ]
        },
        "experience": [
          {
            "company": "GEOMADAGASCAR",
            "position": "Développeur Web, Ingénieur Data",
            "start_date": "Août 2022",
            "end_date": "Présent",
            "missions": [
              "Développement web et microservices avec Symfony, NestJS et Python",
              "Gestion de bases de données avec PostgreSQL",
              "Développement d'outils de web scraping avec Java Spring Boot",
              "Pipeline de données et automatisation"
            ]
          },
          {
            "company": "MGBI – Madagascar Business Intelligence",
            "position": "Analyste de Données",
            "start_date": "Mai 2021",
            "end_date": "Juillet 2022",
            "missions": [
              "Administration de bases de données PostgreSQL et SQL Server",
              "Gestion et intégration d'ERP (Odoo, EBP)",
              "Analyse de données avec Excel, Power BI, Power Query, SQL, Talend et Python"
            ]
          },
          {
            "company": "SECUTECH",
            "position": "Technicien",
            "start_date": "Novembre 2020",
            "end_date": "Avril 2021",
            "missions": [
              "Installation de GPS et caméras IP",
              "Configuration et maintenance réseau"
            ]
          },
          {
            "company": "ISITM – Institut Supérieur",
            "position": "Instructeur en Informatique",
            "start_date": "Janvier 2020",
            "end_date": "Juillet 2022",
            "missions": [
              "Enseignement des bases de données, algorithmes, Java et Machine Learning"
            ]
          }
        ],
        "education": [
          {
            "degree": "Master II (Diplôme d'Ingénieur)",
            "institution": "École Supérieure Polytechnique d'Antananarivo",
            "period": "2018 – 2020",
            "specialization": "Informatique Appliquée – Data et Modélisation"
          },
          {
            "degree": "Licence",
            "institution": "École Supérieure Polytechnique d'Antananarivo",
            "period": "2014 – 2017",
            "specialization": "Informatique Appliquée – Réseaux Informatiques"
          }
        ],
        "soft_skills": [
          "Pensée logique et créative",
          "Travail d'équipe",
          "Esprit analytique",
          "Autonome",
          "Responsable",
          "Passionné",
          "Dynamique"
        ],
        "interests": [
          "Art",
          "Musique",
          "Jeux vidéo",
          "Marche",
          "Programmation",
          "Football",
          "Guitare"
        ]
      };
    } else {
      // Version anglaise
      return {
        "personal_info": {
          "full_name": "Elie Fenohasina Andriatsitohaina",
          "title": "Fullstack Developer / Data Engineer",
          "portfolio": "https://elie-fenohasina.onrender.com",
          "github": "https://github.com/likwel",
          "age": "on demand only",
          "isMarried": "true",
          "hasChild": "true",
          "childs_name": "complete info on demand only",
          "number_child": "on demand only",
          "father": "Gervais, complete info on demand only",
          "mother": "Jacqueline, complete info on demand only",
          "brother": "Faneva, Hervé",
          "Sister": "Hanitra, Fanilo, Notahiana",
          "married_name": "Sandy, complete info on demand only",
          "address_aproximativly": "Ankatso",
          "full_address": "complete info on demand only",
        },
        "profile": "Passionate web developer with strong experience in backend, data analysis, data engineering, and web technologies.",
        "languages": [
          { "language": "French", "level": "Good" },
          { "language": "English", "level": "Intermediate, professional, technical" },
          { "language": "Malagasy", "level": "Very good" }
        ],
        "technical_skills": {
          "backend": [
            "Symfony",
            "NestJS",
            "ExpressJS",
            "Java Spring Boot",
            "Flask"
          ],
          "frontend": [
            "Next.js",
            "React.js",
            "JavaScript",
            "HTML",
            "CSS",
            "jQuery"
          ],
          "databases": [
            "MySQL",
            "PostgreSQL",
            "SQL Server",
            "NoSQL"
          ],
          "data_and_ai": [
            "Python",
            "Machine Learning",
            "Data Analysis",
            "Data Engineering",
            "Business Intelligence",
            "Automation",
            "Web scraping",
            "Data pipeline"
          ],
          "tools_and_methods": [
            "Git",
            "Docker",
            "Agile Scrum",
            "SOLID principles",
            "REST APIs",
          ]
        },
        "experience": [
          {
            "company": "GEOMADAGASCAR",
            "position": "Web Developer, Data engineer",
            "start_date": "August 2022",
            "end_date": "Present",
            "missions": [
              "Web and microservices development using Symfony, NestJS, and Python",
              "Database management with PostgreSQL",
              "Web scraping tools development using Java Spring Boot",
              "Data pipeline and automation"
            ]
          },
          {
            "company": "MGBI – Madagascar Business Intelligence",
            "position": "Data Analyst",
            "start_date": "May 2021",
            "end_date": "July 2022",
            "missions": [
              "PostgreSQL and SQL Server database administration",
              "ERP management (Odoo, EBP) and integration",
              "Data analysis using Excel, Power BI, Power Query, SQL, Talend, and Python"
            ]
          },
          {
            "company": "SECUTECH",
            "position": "Technician",
            "start_date": "November 2020",
            "end_date": "April 2021",
            "missions": [
              "GPS and IP camera installation",
              "Network configuration and maintenance"
            ]
          },
          {
            "company": "ISITM – Institut Supérieur",
            "position": "Computer Science Instructor",
            "start_date": "January 2020",
            "end_date": "July 2022",
            "missions": [
              "Teaching databases, algorithms, Java, and Machine Learning"
            ]
          }
        ],
        "education": [
          {
            "degree": "Master II (Engineering Degree)",
            "institution": "Ecole Supérieure Polytechnique d'Antananarivo",
            "period": "2018 – 2020",
            "specialization": "Applied Computer Science – Data and Modeling"
          },
          {
            "degree": "Bachelor's Degree",
            "institution": "Ecole Supérieure Polytechnique d'Antananarivo",
            "period": "2014 – 2017",
            "specialization": "Applied Computer Science – Computer Networks"
          }
        ],
        "soft_skills": [
          "Logical and creative thinking",
          "Teamwork",
          "Analytical mindset",
          "Autonomous",
          "Responsible",
          "Passionate",
          "Dynamic"
        ],
        "interests": [
          "Art",
          "Music",
          "Video games",
          "Walking",
          "Programming",
          "Football",
          "Guitar"
        ]
      };
    }
  };

  // 🤖 System prompt adapté à la langue
  const getSystemPrompt = () => {
    // Certifications : même source que la section Formation
    const cvData = {
      ...getCvData(),
      certifications: CERTIFICATIONS.map(({ name, issuer, platform, date, url }) => ({ name, issuer, platform, date, url })),
    };

    if (language === 'fr') {
      return `Vous êtes un assistant IA représentant ${cvData.personal_info.full_name}, un ${cvData.personal_info.title}.

INFORMATIONS COMPLÈTES DU CV :
${JSON.stringify(cvData, null, 2)}

INSTRUCTIONS IMPORTANTES :
1. Répondez aux questions sur ${cvData.personal_info.full_name} en utilisant les données du CV ci-dessus
2. Soyez professionnel, amical et enthousiaste concernant ses compétences et son expérience
3. Répondez toujours en français
4. Lorsqu'on vous interroge sur les compétences, mettez en avant les technologies backend pertinentes (Symfony, NestJS, Spring Boot) et frontend (React, Next.js)
5. Il est ouvert à tous projets et opportunités. Ne mentionnez son poste actuel chez GEOMADAGASCAR que si l'utilisateur demande spécifiquement son emploi actuel
6. Si on vous interroge sur l'analyse de données, mentionnez son expérience précédente chez MGBI et son Master en Data et Modélisation
7. IMPORTANT - FORMAT DES LIENS : Utilisez toujours du HTML pour les liens, jamais de markdown (**), numéro whatsapp et adresse mail toujours affichés. Format obligatoire :
  - Portfolio : <a href="https://elie-fenohasina.onrender.com" style="color: #17736a; font-weight: bold; text-decoration: underline;">portfolio</a>
  - GitHub : <a href="https://github.com/likwel" style="color: #17736a; font-weight: bold; text-decoration: underline;">GitHub</a>
  - WhatsApp : <a href="https://wa.me/261348523479" style="color: #17736a; font-weight: bold; text-decoration: underline;">+261 34 85 234 79</a>
  - Email : <a href="mailto:eliefenohasina@gmail.com" style="color: #17736a; font-weight: bold; text-decoration: underline;">eliefenohasina@gmail.com</a>
  N'utilisez JAMAIS les symboles ** pour le gras. Utilisez uniquement le HTML.

8. Soyez concis mais informatif - visez 2-4 phrases sauf si plus de détails sont demandés
9. Si l'information n'est pas dans le CV, dites-le poliment et suggérez de le contacter directement

POINTS FORTS À METTRE EN AVANT :
- Développement full-stack (Symfony, NestJS, React, Next.js, Java Spring Boot)
- Expertise en analyse de données et machine learning
- Gestion de bases de données (PostgreSQL, MySQL, SQL Server)
- ETL et Pipeline de données
- Plus de 4 ans d'expérience professionnelle
- Expérience d'enseignement (Machine Learning, Bases de données, Java)
- Bilingue : Français et Anglais technique
- Ouvert à toutes opportunités et projets

EXEMPLE DE MESSAGE D'ACCUEIL (à utiliser au premier contact) :
Bonjour ! Je suis l'assistant IA représentant Elie Fenohasina Andriatsitohaina, un Développeur Fullstack et Ingénieur Data passionné et expérimenté. Je suis là pour vous aider à en savoir plus sur ses compétences, son expérience et ses réalisations. Vous pouvez visiter son <a href="https://elie-fenohasina.onrender.com" style="color: #17736a; font-weight: bold; text-decoration: underline;">portfolio</a> pour découvrir plus sur son travail. Vous pouvez également le suivre sur <a href="https://github.com/likwel" style="color: #17736a; font-weight: bold; text-decoration: underline;">GitHub</a> ou le contacter directement via <a href="https://wa.me/261348523479" style="color: #17736a; font-weight: bold; text-decoration: underline;">WhatsApp</a> ou <a href="mailto:eliefenohasina@gmail.com" style="color: #17736a; font-weight: bold; text-decoration: underline;">email</a>. N'hésitez pas à me poser vos questions !

Soyez naturel, engageant et utile !`;
    } else {
      return `You are an AI assistant representing ${cvData.personal_info.full_name}, a ${cvData.personal_info.title}.

COMPLETE CV INFORMATION:
${JSON.stringify(cvData, null, 2)}

IMPORTANT INSTRUCTIONS:
1. Answer questions about ${cvData.personal_info.full_name} using the CV data above
2. Be professional, friendly, and enthusiastic about his skills and experience
3. Always respond in English
4. When asked about skills, highlight relevant backend (Symfony, NestJS, Spring Boot) and frontend (React, Next.js) technologies
5. He is open to all projects and opportunities. Only mention his current position at GEOMADAGASCAR if the user specifically asks about his current job
6. If asked about data analysis, mention his previous experience at MGBI and his Master's degree in Data and Modeling
7. IMPORTANT - LINK FORMATTING: Always use HTML for links, never markdown (**), WhatsApp number and email address always displayed. Required format:
  - Portfolio: <a href="https://elie-fenohasina.onrender.com" style="color: #17736a; font-weight: bold; text-decoration: underline;">portfolio</a>
  - GitHub: <a href="https://github.com/likwel" style="color: #17736a; font-weight: bold; text-decoration: underline;">GitHub</a>
  - WhatsApp: <a href="https://wa.me/261348523479" style="color: #17736a; font-weight: bold; text-decoration: underline;">+261 34 85 234 79</a>
  - Email: <a href="mailto:eliefenohasina@gmail.com" style="color: #17736a; font-weight: bold; text-decoration: underline;">eliefenohasina@gmail.com</a>
  NEVER use ** symbols for bold. Only use HTML.

8. Be concise but informative - aim for 2-4 sentences unless more detail is requested
9. If information is not in the CV, politely say so and suggest contacting him directly

KEY STRENGTHS TO HIGHLIGHT:
- Full-stack development (Symfony, NestJS, React, Next.js, Java Spring Boot)
- Data analysis and machine learning expertise
- Database management (PostgreSQL, MySQL, SQL Server)
- ETL and Data pipeline
- 4+ years of professional experience
- Teaching experience (Machine Learning, Databases, Java)
- Bilingual: French and English technical
- Open to all opportunities and projects

WELCOME MESSAGE EXAMPLE (use on first contact):
Hello! I'm the AI assistant representing Elie Fenohasina Andriatsitohaina, a passionate and experienced Fullstack Developer and Data Engineer. I'm here to help you learn more about his skills, experience, and achievements. You can visit his <a href="https://elie-fenohasina.onrender.com" style="color: #17736a; font-weight: bold; text-decoration: underline;">portfolio</a> to discover more about his work. You can also follow him on <a href="https://github.com/likwel" style="color: #17736a; font-weight: bold; text-decoration: underline;">GitHub</a> or contact him directly via <a href="https://wa.me/261348523479" style="color: #17736a; font-weight: bold; text-decoration: underline;">WhatsApp</a> or <a href="mailto:eliefenohasina@gmail.com" style="color: #17736a; font-weight: bold; text-decoration: underline;">email</a>. Feel free to ask me any questions!

Be natural, engaging, and helpful!`;
    }
  };

  // ─── Interface ────────────────────────────────────────────────
  const [mounted, setMounted] = useState(isOpen);
  const [closing, setClosing] = useState(false);
  const [lastFailed, setLastFailed] = useState(null);
  const tabsRef = useRef(null);
  const [pill, setPill] = useState({ x: 0, w: 0 });

  /* Montage / démontage avec animation de sortie */
  useEffect(() => {
    if (isOpen) { setMounted(true); setClosing(false); return; }
    if (!mounted) return;
    setClosing(true);
    const id = setTimeout(() => { setMounted(false); setClosing(false); }, 260);
    return () => clearTimeout(id);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 280);
  }, [isOpen, activeTab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatHistory, isTyping]);

  /* Pastille qui glisse sous l'onglet actif */
  useLayoutEffect(() => {
    const btn = tabsRef.current?.querySelector(`[data-tab="${activeTab}"]`);
    if (btn) setPill({ x: btn.offsetLeft, w: btn.offsetWidth });
  }, [activeTab, mounted, language]);

  /* Zone de saisie qui s'agrandit avec le texte */
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [message, activeTab]);

  if (!mounted) return null;

  const tabs = [
    { id: "ia",       label: t('agentIA'), icon: <RobotIcon />,    color: "var(--primary)" },
    { id: "whatsapp", label: "WhatsApp",   icon: <WhatsAppIcon />, color: "#1FAF5A" },
    { id: "discord",  label: "Discord",    icon: <DiscordIcon />,  color: "#5865F2" },
    { id: "mail",     label: "Email",      icon: <EmailIcon />,    color: "var(--copper-deep)" },
  ];
  const currentTab = tabs.find((tab) => tab.id === activeTab);

  const callGroqAPI = async (userMessage, history) => {
    setIsTyping(true);
    setError("");
    setLastFailed(null);

    try {
      const GROQ_API_KEY = import.meta.env.VITE_GROQ_TOKEN;

      const conversationHistory = [
        { role: "system", content: getSystemPrompt() },
        ...history.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      ];

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: conversationHistory,
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || t('noResponse');
      setChatHistory((prev) => [...prev, { text: aiResponse, sender: "ia", timestamp: new Date() }]);
    } catch (err) {
      console.error("API Error:", err);
      setError(t('technicalDifficulties'));
      setLastFailed(history);
    } finally {
      setIsTyping(false);
    }
  };

  const askAI = (text) => {
    const content = text.trim();
    if (!content || isTyping) return;
    const history = [...chatHistory, { text: content, sender: "user", timestamp: new Date() }];
    setChatHistory(history);
    setMessage("");
    callGroqAPI(content, history);
  };

  const handleSend = () => {
    if (activeTab === "ia") { askAI(message); return; }

    const text = message.trim();
    if (activeTab === "whatsapp") {
      window.open(`https://wa.me/261348523479${text ? `?text=${encodeURIComponent(text)}` : ""}`, "_blank", "noopener");
    } else if (activeTab === "discord") {
      window.open("https://discord.com/channels/@me/1014430541589786664", "_blank", "noopener");
    } else if (activeTab === "mail") {
      window.location.href = `mailto:eliefenohasina@gmail.com?subject=Contact${text ? `&body=${encodeURIComponent(text)}` : ""}`;
    }
    setMessage("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setChatHistory([]);
    setError("");
    setLastFailed(null);
    inputRef.current?.focus();
  };

  const formatTime = (date) =>
    date.toLocaleTimeString(language === "fr" ? "fr-FR" : "en-GB", { hour: "2-digit", minute: "2-digit" });

  const suggestions = t('chatSuggestions');
  const channelCta = { whatsapp: t('openWhatsapp'), discord: t('openDiscord'), mail: t('openEmail') };
  const channelDesc = { whatsapp: t('whatsappDesc'), discord: t('discordDesc'), mail: t('emailDesc') };

  return (
    <>
      <div className={`chat-overlay ${closing ? "is-closing" : ""}`} onClick={onClose} />

      <section
        className={`chat-panel ${closing ? "is-closing" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={t('chatTitle')}
      >
        {/* ── En-tête ── */}
        <header className="chat-head">
          <div className="chat-identity">
            <span className="chat-avatar">
              <img src="/favicon.png" alt="" />
              <span className="chat-online" />
            </span>
            <span>
              <strong>{t('chatTitle')}</strong>
              <small>{activeTab === "ia" ? t('chatStatus') : `${t('contactMeVia')} ${currentTab.label}`}</small>
            </span>
          </div>
          <div className="chat-head-tools">
            {activeTab === "ia" && chatHistory.length > 0 && (
              <button className="chat-icon-btn" onClick={resetChat} aria-label={t('chatClear')} title={t('chatClear')}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
            )}
            <button className="chat-icon-btn" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          <div ref={tabsRef} className="chat-tabs" role="tablist">
            <span className="chat-tabs-pill" style={{ width: pill.w, transform: `translateX(${pill.x}px)` }} />
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-tab={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`chat-tab ${activeTab === tab.id ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </header>

        {/* ── Contenu ── */}
        <div className="chat-body">
          {activeTab === "ia" ? (
            <>
              {chatHistory.length === 0 && (
                <div className="chat-welcome">
                  <span className="chat-welcome-icon"><RobotIcon /></span>
                  <p className="chat-welcome-title">{t('chatWelcome')}</p>
                  <p className="chat-welcome-text">{t('chatDescription')}</p>
                  <div className="chat-suggestions">
                    {Array.isArray(suggestions) && suggestions.map((s, i) => (
                      <button key={s} className="chat-suggestion" style={{ "--i": i }} onClick={() => askAI(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <div key={i} className={`chat-row ${msg.sender === "user" ? "is-user" : "is-ai"}`}>
                  {msg.sender !== "user" && <img className="chat-row-avatar" src="/favicon.png" alt="" />}
                  <div className="chat-bubble">
                    <div
                      className="chat-text"
                      dangerouslySetInnerHTML={{ __html: renderMessage(msg.text) }}
                    />
                    <time>{formatTime(msg.timestamp)}</time>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chat-row is-ai">
                  <img className="chat-row-avatar" src="/favicon.png" alt="" />
                  <div className="chat-bubble chat-typing" aria-label="…">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              {error && (
                <div className="chat-error" role="alert">
                  <span>{error}</span>
                  {lastFailed && (
                    <button onClick={() => callGroqAPI(lastFailed[lastFailed.length - 1].text, lastFailed)}>
                      {t('chatRetry')}
                    </button>
                  )}
                </div>
              )}
              <div ref={chatEndRef} />
            </>
          ) : (
            <div className="chat-channel" style={{ "--brand": currentTab.color }} key={activeTab}>
              <span className="chat-channel-icon">{currentTab.icon}</span>
              <p className="chat-welcome-title">{t('contactMeVia')} {currentTab.label}</p>
              <p className="chat-welcome-text">{channelDesc[activeTab]}</p>
              <button className="chat-channel-btn" onClick={handleSend}>
                {channelCta[activeTab]}
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>
              </button>
            </div>
          )}
        </div>

        {/* ── Saisie ── */}
        <footer className="chat-foot">
          <div className="chat-input">
            <textarea
              ref={inputRef}
              rows={1}
              placeholder={activeTab === "ia" ? t('askAnything') : t('yourMessageOptional')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label={activeTab === "ia" ? t('askAnything') : t('yourMessageOptional')}
            />
            <button
              className="chat-send"
              onClick={handleSend}
              disabled={activeTab === "ia" && (!message.trim() || isTyping)}
              aria-label="Send"
              style={{ "--brand": currentTab.color }}
            >
              <SendIcon />
            </button>
          </div>
          <p className="chat-hint">{activeTab === "ia" ? t('chatDisclaimer') : t('chatInputHint')}</p>
        </footer>
      </section>
    </>
  );
}

/* Texte de l'IA : **gras**, liens ouverts dans un nouvel onglet, HTML nettoyé */
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A") {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
    node.removeAttribute("style");
  }
});

function renderMessage(text) {
  const html = String(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return DOMPurify.sanitize(html);
}
