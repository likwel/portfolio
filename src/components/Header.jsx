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
  faLightbulb
} from "@fortawesome/free-solid-svg-icons";
import DuotoneIcon from "./DuotoneIcon";

export default function Header({ setSection, setOpen }) {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <header className="nav-center">
      <ul className="navbar">
        {/* <li>
          <button 
            id="theme-toggleIcon" 
            onClick={toggleDarkMode}
            className="cursor-pointer"
            aria-label="Toggle dark mode"
          >
            <DuotoneIcon 
              icon={darkMode ? faSun : faMoon} 
              size={'text-sm'} 
            />
          </button>
        </li>
        <li className="ligne-vertical"></li> */}
        
        <li>
          <a href="#home">
            <DuotoneIcon icon={faUser} size={'text-sm'} className="mobile-icon" />
            <span className="nav-text">About</span>
          </a>
        </li>
        
        <li>
          <a href="#services">
            <DuotoneIcon icon={faBriefcase} size={'text-sm'} className="mobile-icon" />
            <span className="nav-text">Services</span>
          </a>
        </li>
        
        <li>
          <a href="#projects">
            <DuotoneIcon icon={faFolderOpen} size={'text-sm'} className="mobile-icon" />
            <span className="nav-text">Projects</span>
          </a>
        </li>

        <li>
          <a href="#education">
            <DuotoneIcon icon={faGraduationCap} size={'text-sm'} className="mobile-icon" />
            <span className="nav-text">Education</span>
          </a>
        </li>
        
        <li>
          <a href="#skills">
            <DuotoneIcon icon={faLightbulb} size={'text-sm'} className="mobile-icon" />
            <span className="nav-text">Skills</span>
          </a>
        </li>
        
        <li className="ligne-vertical"></li>
        
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
            />
            <span className="nav-text">Hire me</span>
          </button>
        </li>
      </ul>
    </header>
  );
}