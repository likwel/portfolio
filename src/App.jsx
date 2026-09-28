import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import Projects, { PROJECTS } from './components/Projects';
import SkillsSection, { SKILLS } from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import Education, { DEGREES } from './components/Education';
import { CERTIFICATIONS } from './data/certifications';
import Modal from './components/Modal';
import CollapseSection from './components/CollapseSection';
import FloatingActions from './components/FloatingActions';
import ContactChoiceModal from './components/ContactChoiceModal';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode, faProjectDiagram, faGraduationCap, faLightbulb, faBriefcase,
  faAnglesDown, faAnglesUp,
} from "@fortawesome/free-solid-svg-icons";
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { useScrollVars } from './hooks/motion';

const SECTION_KEYS = ['services', 'experiences', 'skills', 'education', 'projects'];

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

  useScrollVars();

  /* Appelé depuis le Header : ouvre la section visée sans refermer les autres,
     pour que sa position ne bouge pas pendant le défilement */
  const handleSectionFromHeader = (sectionName) => {
    if (sectionName === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setOpenSections(prev => ({ ...prev, [sectionName]: true }));

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => scrollToSection(sectionName), 50);
  };

  /* offsetTop ignore les transforms : la cible reste juste même si la carte
     est encore en train d'apparaître (animation reveal) */
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    let top = 0;
    for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
    const headerH = document.querySelector('.site-header')?.offsetHeight || 0;
    const target = top - headerH - 16;
    window.scrollTo({ top: target, behavior: 'smooth' });

    // Page encore trop courte (section en cours de dépliage) : on termine
    // le trajet une fois l'animation d'ouverture finie
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (target > maxScroll) {
      setTimeout(() => window.scrollTo({ top: target, behavior: 'smooth' }), 650);
    }
  };

  const toggleSection = (sectionName) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const allOpen = SECTION_KEYS.every(k => openSections[k]);
  const toggleAll = () => {
    setOpenSections(Object.fromEntries(SECTION_KEYS.map(k => [k, !allOpen])));
  };

  /* Badges calculés depuis les données : ils restent justes quand on ajoute un élément */
  const count = (key, n) => t(key).replace('{n}', n);
  const educationBadge = [
    count('educationBadge', DEGREES.length),
    CERTIFICATIONS.length > 0 && count('certCount', CERTIFICATIONS.length),
  ].filter(Boolean).join(' · ');

  const sections = [
    { id: 'services',    title: t('services'),    icon: faCode,           subtitle: t('servicesSubtitle'),    badge: t('servicesBadge'),    content: <Services onContact={() => setOpen(true)} /> },
    { id: 'experiences', title: t('experiences'), icon: faBriefcase,      subtitle: t('experiencesSubtitle'), badge: t('experiencesBadge'), content: <ExperienceSection /> },
    { id: 'skills',      title: t('skills'),      icon: faLightbulb,      subtitle: t('skillsSubtitle'),      badge: count('skillsBadge', SKILLS.length),      content: <SkillsSection /> },
    { id: 'education',   title: t('education'),   icon: faGraduationCap,  subtitle: t('educationSubtitle'),   badge: educationBadge,   content: <Education /> },
    { id: 'projects',    title: t('projects'),    icon: faProjectDiagram, subtitle: t('projectsSubtitle'),    badge: count('projectsBadge', PROJECTS.length),    content: <Projects /> },
  ];

  return (
    <>
      <Header setSection={handleSectionFromHeader} setOpen={setOpen} />

      <main>
        {/* ── HERO ── */}
        <Home setOpen={setOpen} />

        {/* ── SECTIONS ── */}
        <section className="container explore" aria-labelledby="explore-title">
          <Reveal className="explore-head">
            <div>
              <span className="overline">{t('exploreOverline')}</span>
              <h2 id="explore-title">{t('exploreTitle')}</h2>
              <p>{t('exploreSubtitle')}</p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={toggleAll}>
              <FontAwesomeIcon icon={allOpen ? faAnglesUp : faAnglesDown} />
              {allOpen ? t('collapseAll') : t('expandAll')}
            </button>
          </Reveal>

          <div className="collapse-list">
            {sections.map((s, i) => (
              <CollapseSection
                key={s.id}
                id={s.id}
                index={i}
                title={s.title}
                icon={s.icon}
                subtitle={s.subtitle}
                badge={s.badge}
                isOpen={openSections[s.id]}
                onToggle={() => toggleSection(s.id)}
              >
                {s.content}
              </CollapseSection>
            ))}
          </div>
        </section>
      </main>

      <Footer onContact={() => setOpen(true)} />

      <FloatingActions onMessageClick={() => setOpenMessage(true)} />

      <ContactChoiceModal
        isOpen={openMessage}
        onClose={() => setOpenMessage(false)}
      />

      {open && <Modal setOpen={setOpen} />}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
