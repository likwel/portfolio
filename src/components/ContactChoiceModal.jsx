import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import { useLanguage } from '../contexts/LanguageContext';

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
  const themeColor = '#007b8b';

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
            "end_date": "Mars 2020",
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
            "end_date": "March 2020",
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
    const cvData = getCvData();

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
  - Portfolio : <a href="https://elie-fenohasina.onrender.com" style="color: #007b8b; font-weight: bold; text-decoration: underline;">portfolio</a>
  - GitHub : <a href="https://github.com/likwel" style="color: #007b8b; font-weight: bold; text-decoration: underline;">GitHub</a>
  - WhatsApp : <a href="https://wa.me/261348523479" style="color: #007b8b; font-weight: bold; text-decoration: underline;">+261 34 85 234 79</a>
  - Email : <a href="mailto:eliefenohasina@gmail.com" style="color: #007b8b; font-weight: bold; text-decoration: underline;">eliefenohasina@gmail.com</a>
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
Bonjour ! Je suis l'assistant IA représentant Elie Fenohasina Andriatsitohaina, un Développeur Fullstack et Ingénieur Data passionné et expérimenté. Je suis là pour vous aider à en savoir plus sur ses compétences, son expérience et ses réalisations. Vous pouvez visiter son <a href="https://elie-fenohasina.onrender.com" style="color: #007b8b; font-weight: bold; text-decoration: underline;">portfolio</a> pour découvrir plus sur son travail. Vous pouvez également le suivre sur <a href="https://github.com/likwel" style="color: #007b8b; font-weight: bold; text-decoration: underline;">GitHub</a> ou le contacter directement via <a href="https://wa.me/261348523479" style="color: #007b8b; font-weight: bold; text-decoration: underline;">WhatsApp</a> ou <a href="mailto:eliefenohasina@gmail.com" style="color: #007b8b; font-weight: bold; text-decoration: underline;">email</a>. N'hésitez pas à me poser vos questions !

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
  - Portfolio: <a href="https://elie-fenohasina.onrender.com" style="color: #007b8b; font-weight: bold; text-decoration: underline;">portfolio</a>
  - GitHub: <a href="https://github.com/likwel" style="color: #007b8b; font-weight: bold; text-decoration: underline;">GitHub</a>
  - WhatsApp: <a href="https://wa.me/261348523479" style="color: #007b8b; font-weight: bold; text-decoration: underline;">+261 34 85 234 79</a>
  - Email: <a href="mailto:eliefenohasina@gmail.com" style="color: #007b8b; font-weight: bold; text-decoration: underline;">eliefenohasina@gmail.com</a>
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
Hello! I'm the AI assistant representing Elie Fenohasina Andriatsitohaina, a passionate and experienced Fullstack Developer and Data Engineer. I'm here to help you learn more about his skills, experience, and achievements. You can visit his <a href="https://elie-fenohasina.onrender.com" style="color: #007b8b; font-weight: bold; text-decoration: underline;">portfolio</a> to discover more about his work. You can also follow him on <a href="https://github.com/likwel" style="color: #007b8b; font-weight: bold; text-decoration: underline;">GitHub</a> or contact him directly via <a href="https://wa.me/261348523479" style="color: #007b8b; font-weight: bold; text-decoration: underline;">WhatsApp</a> or <a href="mailto:eliefenohasina@gmail.com" style="color: #007b8b; font-weight: bold; text-decoration: underline;">email</a>. Feel free to ask me any questions!

Be natural, engaging, and helpful!`;
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === "ia") {
      inputRef.current?.focus();
    }
  }, [isOpen, activeTab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  if (!isOpen) return null;

  const tabs = [
    { id: "ia", label: t('agentIA'), icon: <RobotIcon /> },
    { id: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon /> },
    { id: "discord", label: "Discord", icon: <DiscordIcon /> },
    { id: "mail", label: "Email", icon: <EmailIcon /> },
  ];

  const callGroqAPI = async (userMessage) => {
    setIsTyping(true);
    setError("");

    try {
      const GROQ_API_KEY = import.meta.env.VITE_GROQ_TOKEN;

      const conversationHistory = [
        {
          role: "system",
          content: getSystemPrompt()
        },
        ...chatHistory.map(msg => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text
        })),
        {
          role: "user",
          content: userMessage
        }
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

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || t('noResponse');

      setChatHistory(prev => [...prev, {
        text: aiResponse,
        sender: "ia",
        timestamp: new Date()
      }]);
    } catch (err) {
      console.error("API Error:", err);
      setError(t('connectionError'));

      setChatHistory(prev => [...prev, {
        text: t('technicalDifficulties'),
        sender: "ia",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;

    if (activeTab === "ia") {
      const newMessage = {
        text: message,
        sender: "user",
        timestamp: new Date()
      };
      setChatHistory([...chatHistory, newMessage]);
      callGroqAPI(message);
    } else if (activeTab === "whatsapp") {
      window.open(`https://wa.me/261348523479?text=${encodeURIComponent(message)}`, "_blank");
    } else if (activeTab === "discord") {
      window.open("https://discord.com/channels/@me/1014430541589786664", "_blank");
    } else if (activeTab === "mail") {
      window.location.href = `mailto:eliefenohasina@gmail.com?subject=Contact&body=${encodeURIComponent(message)}`;
    }

    setMessage("");
  };

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm transition-opacity mt-0"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="border rounded-lg fixed bottom-5 right-20 md:right-20 z-50 w-[calc(100%-2.5rem)] md:w-96 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-slideIn chat-open max-h-60vh"
        style={{ backgroundColor: themeColor }}
      >

        {/* Header */}
        <div className="px-4 py-3 text-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg flex items-center gap-2 w-full text-white">
              {currentTab?.icon}
              {t('contactMeVia')}
            </h3>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded-xl transition-all p-1"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide justify-between items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn-tab w-full text-center flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                    ? "bg-white shadow-md active-tab"
                    : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                style={activeTab === tab.id ? { color: themeColor } : {}}
              >
                <div className={activeTab === tab.id ? '' : 'text-white'}>
                  {tab.icon}
                </div>
                <span className="text-xs">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-3 h-80">
          {activeTab === "ia" ? (
            <>
              {chatHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="p-4 rounded-full mb-3" style={{ backgroundColor: `${themeColor}20` }}>
                    <div style={{ color: themeColor }}>
                      <RobotIcon />
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium">{t('chatWelcome')}</p>
                  <p className="text-gray-400 text-sm mt-1 px-4">
                    {t('chatDescription')}
                  </p>
                </div>
              ) : (
                <>
                  {chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.sender === "user"
                            ? "text-white rounded-br-sm"
                            : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
                          }`}
                        style={msg.sender === "user" ? { backgroundColor: themeColor } : {}}
                      >
                        <p
                          className="text-sm whitespace-pre-wrap py-1"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(msg.text),
                          }}
                        />
                        <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-white opacity-70" : "text-gray-400"}`}>
                          {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start animate-fadeIn">
                      <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                      {error}
                    </div>
                  )}
                </>
              )}
              <div ref={chatEndRef} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div
                className="p-4 rounded-full mb-3"
                style={{ backgroundColor: `${themeColor}20` }}
              >
                <div style={{ color: themeColor }}>
                  {currentTab?.icon}
                </div>
              </div>
              <p className="text-gray-700 font-medium mb-2">
                {t('contactMeVia')} {currentTab?.label}
              </p>
              <p className="text-gray-500 text-sm">
                {activeTab === "whatsapp" && t('whatsappDesc')}
                {activeTab === "discord" && t('discordDesc')}
                {activeTab === "mail" && t('emailDesc')}
              </p>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t bg-white p-3">
          <div className="flex gap-2 items-center justify-between">
            <input
              ref={inputRef}
              type="text"
              className="w-full flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 transition-all"
              style={{
                focusRingColor: themeColor,
              }}
              placeholder={activeTab === "ia" ? t('askAnything') : t('yourMessageOptional')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={activeTab === "ia" && !message.trim()}
              className="text-white p-2 rounded-full transition-all transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none shadow-md disabled:opacity-50"
              style={{ backgroundColor: themeColor }}
              aria-label="Send"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}