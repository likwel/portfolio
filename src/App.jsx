import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import Projects from './components/Projects';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import Education from './components/Education';
import Modal from './components/Modal';
import CollapseSection from './components/CollapseSection';
import FloatingActions from './components/FloatingActions';
import ContactChoiceModal from './components/ContactChoiceModal';
import { useState, useRef } from 'react';
import {
  faCode, faProjectDiagram,
  faGraduationCap, faLightbulb, faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const { t } = useLanguage();
  const [open, setOpen]               = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [openSections, setOpenSections] = useState({
    services:    false,
    experiences: false,
    skills:      false,
    education:   false,
    projects:    false,
  });

  const scrollTimeoutRef = useRef(null);

  /* Appelé depuis le Header */
  const handleSectionFromHeader = (sectionName) => {
    if (sectionName === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setOpenSections({
      services:    sectionName === 'services',
      experiences: sectionName === 'experiences',
      skills:      sectionName === 'skills',
      education:   sectionName === 'education',
      projects:    sectionName === 'projects',
    });

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      const el = document.getElementById(sectionName);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  /* Toggle manuel du collapse */
  const toggleSection = (sectionName) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a" }}>

      <Header setSection={handleSectionFromHeader} setOpen={setOpen} />

      {/* ── HERO ── */}
      <Home setOpen={setOpen} />

      {/* ── COLLAPSE SECTIONS ── */}
      <style>{`
        @media (max-width: 768px) {
          #collapse-wrapper { padding: 12px 16px 48px !important; }
        }
      `}</style>

      <div
        id="collapse-wrapper"
        style={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: "16px 40px 60px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <CollapseSection
          id="services"
          title={t('services') || "Services"}
          icon={faCode}
          subtitle={t('servicesSubtitle') || "Ce que je propose"}
          badge={t('servicesBadge') || "6 services"}
          isOpen={openSections.services}
          onToggle={() => toggleSection('services')}
        >
          <Services />
        </CollapseSection>

        <CollapseSection
          id="experiences"
          title={t('experiences') || "Expériences"}
          icon={faBriefcase}
          subtitle={t('experiencesSubtitle') || "Parcours professionnel"}
          badge={t('experiencesBadge') || "4 ans"}
          isOpen={openSections.experiences}
          onToggle={() => toggleSection('experiences')}
        >
          <ExperienceSection />
        </CollapseSection>

        <CollapseSection
          id="skills"
          title={t('skills') || "Compétences"}
          icon={faLightbulb}
          subtitle={t('skillsSubtitle') || "Niveaux techniques"}
          badge={t('skillsBadge') || "10 compétences"}
          isOpen={openSections.skills}
          onToggle={() => toggleSection('skills')}
        >
          <SkillsSection />
        </CollapseSection>

        <CollapseSection
          id="education"
          title={t('education') || "Formation"}
          icon={faGraduationCap}
          subtitle={t('educationSubtitle') || "Diplômes & certifications"}
          badge={t('educationBadge') || "2 diplômes"}
          isOpen={openSections.education}
          onToggle={() => toggleSection('education')}
        >
          <Education />
        </CollapseSection>

        <CollapseSection
          id="projects"
          title={t('projects') || "Projets"}
          icon={faProjectDiagram}
          subtitle={t('projectsSubtitle') || "Réalisations récentes"}
          badge={t('projectsBadge') || "5 projets"}
          isOpen={openSections.projects}
          onToggle={() => toggleSection('projects')}
        >
          <Projects />
        </CollapseSection>

        <FloatingActions onMessageClick={() => setOpenMessage(true)} />

        <ContactChoiceModal
          isOpen={openMessage}
          onClose={() => setOpenMessage(false)}
        />
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