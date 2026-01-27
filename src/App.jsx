import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import Education from './components/Education';
import Modal from './components/Modal';
import CollapseSection from './components/CollapseSection';
import FloatingActions from './components/FloatingActions';
import { useState, useRef } from 'react';
import { faCode, faProjectDiagram, faUser, faGraduationCap, faLightbulb, faBriefcase } from "@fortawesome/free-solid-svg-icons";

import ContactChoiceModal from "./components/ContactChoiceModal";
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const { t } = useLanguage();
  const [section, setSection] = useState('home');
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [openSections, setOpenSections] = useState({
    services: false,
    experiences: false,
    skills: false,
    education: false,
    projects: false
  });

  const scrollTimeoutRef = useRef(null);

  // Fonction appelée depuis le Header pour ouvrir une section
  const handleSectionFromHeader = (sectionName) => {
    setSection(sectionName);
    
    if (sectionName !== 'home') {
      // Ouvrir la section correspondante
      setOpenSections({
        services: sectionName === 'services',
        experiences: sectionName === 'experiences',
        skills: sectionName === 'skills',
        education: sectionName === 'education',
        projects: sectionName === 'projects'
      });

      // Scroll vers la section après un petit délai
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const element = document.getElementById(sectionName);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  // Toggle manuel du collapse (quand on clique directement sur le collapse)
  const toggleSection = (sectionName) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <Header 
        setSection={handleSectionFromHeader} 
        setOpen={setOpen} 
      />

      {/* Home visible par défaut */}
      <Home setOpen={setOpen} />

      {/* Les autres dans un collapse */}
      <div className="mx-auto space-y-4 p-4 px-20px">
        <CollapseSection 
          id="services"
          title={t('services')} 
          icon={faCode}
          isOpen={openSections.services}
          onToggle={() => toggleSection('services')}
        >
          <Services />
        </CollapseSection>

        <CollapseSection 
          id="experiences"
          title={t('experiences')} 
          icon={faBriefcase}
          isOpen={openSections.experiences}
          onToggle={() => toggleSection('experiences')}
        >
          <ExperienceSection />
        </CollapseSection>

        <CollapseSection 
          id="skills"
          title={t('skills')} 
          icon={faLightbulb}
          isOpen={openSections.skills}
          onToggle={() => toggleSection('skills')}
        >
          <SkillsSection />
        </CollapseSection>

        <CollapseSection 
          id="education"
          title={t('education')} 
          icon={faGraduationCap}
          isOpen={openSections.education}
          onToggle={() => toggleSection('education')}
        >
          <Education />
        </CollapseSection>

        <CollapseSection 
          id="projects"
          title={t('projects')} 
          icon={faProjectDiagram}
          isOpen={openSections.projects}
          onToggle={() => toggleSection('projects')}
        >
          <Projects />
        </CollapseSection>

        <FloatingActions onMessageClick={() => setOpenMessage(true)} />

        <ContactChoiceModal isOpen={openMessage} onClose={() => setOpenMessage(false)} />
      </div>

      {open && <Modal setOpen={setOpen} />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}