import React, { useState, useEffect, useRef } from "react";

type ChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Message = {
  text: string;
  sender: "user" | "ia";
  timestamp: Date;
};

// SVG Icons as components
const RobotIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2c.5 0 1 .19 1.41.59l.59.58V2h2v2h2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h2V2h2v1.17l.59-.58C11 2.19 11.5 2 12 2zM9 6c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1zm6 0c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1zm-3 6c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
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

export default function ContactChoiceModal({ isOpen, onClose }: ChatModalProps) {
  const [activeTab, setActiveTab] = useState("ia");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 📋 VOTRE CV COMPLET EN JSON
  const cvData = {
    "personal_info": {
      "full_name": "Elie Fenohasina Andriatsitohaina",
      "title": "Web Developer / Data Engineer",
      "portfolio": "https://elie-fenohasina.onrender.com",
      "github": "https://github.com/likwel"
    },
    "profile": "Passionate web developer with strong experience in backend, data analysis, data engineering, and web technologies.",
    "languages": [
      { "language": "French", "level": "Good" },
      { "language": "English", "level": "Intermediate" },
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
        "SQL Server"
      ],
      "data_and_ai": [
        "Python",
        "Machine Learning",
        "Data Analysis",
        "Data Engineering"
      ],
      "tools_and_methods": [
        "Git",
        "Agile Scrum",
        "SOLID principles",
        "REST APIs",
        "Web Scraping"
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
          "Data pipeline and automatisation"
        ]
      },
      {
        "company": "MGBI – Madagascar Business Intelligence",
        "position": "Data Analyst",
        "start_date": "May 2021",
        "end_date": "July 2022",
        "missions": [
          "PostgreSQL and SQL Server database administration",
          "ERP management (Odoo, EBP)",
          "Data analysis using Excel, Power BI, Power Query, SQL, and Python"
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
      "Football"
    ]
  };

  // 🤖 Créer le prompt système avec votre CV
  const getSystemPrompt = () => {
    return `You are an AI assistant representing ${cvData.personal_info.full_name}, a ${cvData.personal_info.title}.

COMPLETE CV INFORMATION:
${JSON.stringify(cvData, null, 2)}

IMPORTANT INSTRUCTIONS:
1. Answer questions about ${cvData.personal_info.full_name} using the CV data above
2. Be professional, friendly, and enthusiastic about his skills and experience
3. When asked about skills, highlight relevant backend (Symfony, NestJS, Spring Boot) and frontend (React, Next.js) technologies
4. Mention his current position at GEOMADAGASCAR where he works since August 2022
5. If asked about data analysis, mention his previous experience at MGBI and his Master's degree in Data and Modeling
6. Encourage visitors to:
   - View his portfolio: https://elie-fenohasina.onrender.com
   - Check his GitHub: https://github.com/likwel
   - Contact via WhatsApp: +261348523479
   - Send email: eliefenohasina@gmail.com
7. Respond in the user's language (French, English, or Malagasy)
8. Be concise but informative - aim for 2-4 sentences unless more detail is requested
9. If information is not in the CV, politely say so and suggest contacting him directly

KEY STRENGTHS TO HIGHLIGHT:
- Full-stack development (Symfony, NestJS, React, Next.js)
- Data analysis and machine learning expertise
- Database management (PostgreSQL, MySQL, SQL Server)
- 4+ years of professional experience
- Teaching experience (Machine Learning, Databases, Java)
- Bilingual: French and English

COMMON QUESTIONS YOU MIGHT RECEIVE:
- "What are his main skills?"
- "What is his experience?"
- "Has he worked with [technology]?"
- "What projects has he done?"
- "How can I contact him?"
- "Does he speak English/French?"
- "Where is he based?"

Be natural, engaging, and helpful!`;
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
    { id: "ia", label: "AgentIA", icon: <RobotIcon />, color: "blue" },
    { id: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon />, color: "green" },
    { id: "discord", label: "Discord", icon: <DiscordIcon />, color: "indigo" },
    { id: "mail", label: "Email", icon: <EmailIcon />, color: "red" },
  ];

  const callGroqAPI = async (userMessage: string) => {
    setIsTyping(true);
    setError("");

    try {
      const GROQ_API_KEY = import.meta.env.VITE_GROQ_TOKEN;
      
      // Construire l'historique de conversation
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
      const aiResponse = data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

      setChatHistory(prev => [...prev, {
        text: aiResponse,
        sender: "ia",
        timestamp: new Date()
      }]);
    } catch (err) {
      console.error("API Error:", err);
      setError("Connection error. Please check your API key.");
      
      setChatHistory(prev => [...prev, {
        text: "Sorry, I'm experiencing technical difficulties. Feel free to contact me directly via WhatsApp, Discord, or Email!",
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
      const newMessage: Message = {
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
        className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="border rounded-lg fixed bottom-5 right-20 md:right-20 z-50 w-[calc(100%-2.5rem)] md:w-96 bg-gray-600 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-slideIn chat-open max-h-60vh">
        
        {/* Header with gradient */}
        <div className={`bg-lightblue bg-gradient-to-r ${
          activeTab === 'ia' ? 'from-blue-500 to-blue-600' :
          activeTab === 'whatsapp' ? 'from-green-500 to-green-600' :
          activeTab === 'discord' ? 'from-indigo-500 to-indigo-600' :
          'from-red-500 to-red-600'
        } px-4 py-3 text-white`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg flex items-center gap-2 w-full text-gray-700">
              {currentTab?.icon}
              Contact me via
            </h3>
            <button 
              onClick={onClose} 
              className="hover:bg-white/20 rounded-xl transition-all mb-2 bg-red"
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
                className={`btn-tab w-full text-center flex flex-col items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-gray-800 shadow-md active-tab"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {tab.icon}
                <span className="inline sm:hidden">{tab.label}</span>
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
                  <div className="bg-blue-100 p-4 rounded-full mb-3">
                    <RobotIcon />
                  </div>
                  <p className="text-gray-600 font-medium">Hello! 👋</p>
                  <p className="text-gray-400 text-sm mt-1 px-4">
                    I'm Elie's AI assistant. Ask me about his skills, experience, or projects!
                  </p>
                  {/* <div className="mt-3 flex flex-wrap gap-2 justify-center px-4">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Symfony</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">React.js</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Data Analysis</span>
                  </div> */}
                </div>
              ) : (
                <>
                  {chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-200" : "text-gray-400"}`}>
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
              <div className={`${
                activeTab === 'whatsapp' ? 'bg-green-100' :
                activeTab === 'discord' ? 'bg-indigo-100' :
                'bg-red-100'
              } p-4 rounded-full mb-3`}>
                {currentTab?.icon}
              </div>
              <p className="text-gray-700 font-medium mb-2">
                Contact me via {currentTab?.label}
              </p>
              <p className="text-gray-500 text-sm">
                {activeTab === "whatsapp" && "Write your message and click the button to open WhatsApp"}
                {activeTab === "discord" && "Join our Discord server to chat in real-time"}
                {activeTab === "mail" && "Send us an email, we will reply promptly"}
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
              className="w-full flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder={activeTab === "ia" ? "Ask me anything..." : "Your message (optional)"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={activeTab === "ia" && !message.trim()}
              className={`${
                activeTab === "ia" 
                  ? "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300" 
                  : activeTab === "whatsapp"
                  ? "bg-green-600 hover:bg-green-700"
                  : activeTab === "discord"
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-red-600 hover:bg-red-700"
              } text-white p-2 rounded-full transition-all transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none shadow-md`}
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