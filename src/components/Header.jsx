import { useState, useEffect } from "react";
import { 
  faCode, 
  faDatabase, 
  faCloud, 
  faPhone, 
  faMoon, 
  faSun,
  faHome, 
  faBriefcase, 
  faFolderOpen, 
  faUser, 
  faEnvelope,
  faGraduationCap,
  faLightbulb,
  faLanguage
} from "@fortawesome/free-solid-svg-icons";

import DuotoneIcon from "./DuotoneIcon";
import { useLanguage } from '../contexts/LanguageContext';

export default function Header({ setSection, setOpen }) {
  const [darkMode, setDarkMode] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  // Charger le thème au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Basculer le dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Fonction pour gérer le clic sur un menu
  const handleMenuClick = (sectionName) => {
    setSection(sectionName); // Appelle handleSectionFromHeader dans App.jsx
  };

  return (
    <header className="nav-center">
      <ul className="navbar flex-row">
        {/* Language Toggle */}
        <li>
          <a 
            id="language-toggle" 
            onClick={toggleLanguage}
            className="cursor-pointer flex items-center gap-2"
            aria-label="Toggle language"
          >
            {language === 'fr' ? (
              // Drapeau français
              <svg className="w-7 h-5" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                <rect fill="#ED2939" width="900" height="600"/>
                <rect fill="#fff" width="600" height="600"/>
                <rect fill="#002395" width="300" height="600"/>
              </svg>
            ) : (
              // Drapeau britannique
              <svg className="w-7 h-5" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="t">
                  <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                </clipPath>
                <path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6"/>
              </svg>
            )}
            <span className="text-sm font-semibold nav-text untile">
              {language === 'fr' ? 'FR' : 'EN'}
            </span>
          </a>
        </li>
        <li className="ligne-vertical"></li>
        
        {/* Navigation Menu Items */}
        <li>
          <a 
            href="#home" 
            onClick={(e) => { 
              e.preventDefault(); 
              handleMenuClick('home'); 
            }}
          >
            <DuotoneIcon icon={faUser} size={'text-sm'} className="mobile-icon" />
            <span className="nav-text">{t('home')}</span>
          </a>
        </li>
        
        <li>
          <a 
            href="#services" 
            onClick={(e) => { 
              e.preventDefault(); 
              handleMenuClick('services'); 
            }}
          >
            <DuotoneIcon icon={faBriefcase} size={'text-sm'} className="mobile-icon" />
            <span className="nav-text">{t('services')}</span>
          </a>
        </li>
        
        <li>
          <a 
            href="#projects" 
            onClick={(e) => { 
              e.preventDefault(); 
              handleMenuClick('projects'); 
            }}
          >
            <DuotoneIcon icon={faFolderOpen} size={'text-sm'} className="mobile-icon" />
            <span className="nav-text">{t('projects')}</span>
          </a>
        </li>

        <li>
          <a 
            href="#education" 
            onClick={(e) => { 
              e.preventDefault(); 
              handleMenuClick('education'); 
            }}
          >
            <DuotoneIcon icon={faGraduationCap} size={'text-sm'} className="mobile-icon" />
            <span className="nav-text">{t('education')}</span>
          </a>
        </li>
        
        <li>
          <a 
            href="#skills" 
            onClick={(e) => { 
              e.preventDefault(); 
              handleMenuClick('skills'); 
            }}
          >
            <DuotoneIcon icon={faLightbulb} size={'text-sm'} className="mobile-icon" />
            <span className="nav-text">{t('skills')}</span>
          </a>
        </li>
        
        <li className="ligne-vertical"></li>
        
        {/* Contact Button */}
        <li>
          <button 
            id="btn" 
            className="hireMe"
            onClick={() => setOpen && setOpen(true)}
          >
            <DuotoneIcon 
              icon={faEnvelope} 
              size={'text-sm'} 
              backActive={false} 
              className="mobile-icon" 
              fgColor={'text-white'}
            />
            <span className="nav-text untile">{t('contactMe')}</span>
          </button>
        </li>
      </ul>
    </header>
  );
}