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
import { useState } from 'react';
import { faCode, faProjectDiagram, faUser, faGraduationCap, faLightbulb, faBriefcase } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [section, setSection] = useState('home');
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <Header setSection={setSection} setOpen={setOpen} />

      {/* Home visible par défaut */}
      {section === 'home' && <Home setOpen={setOpen} />}

      {/* Les autres dans un collapse */}
      <div className="mx-auto space-y-4 p-4">
          <CollapseSection title="Services" icon={faCode}>
            <Services />
          </CollapseSection>

          <CollapseSection title="Experiences" icon={faBriefcase}>
            <ExperienceSection />
          </CollapseSection>

          <CollapseSection title="Skills" icon={faLightbulb}>
            <SkillsSection />
          </CollapseSection>

          <CollapseSection title="Educations" icon={faGraduationCap}>
            <Education />
          </CollapseSection>

          <CollapseSection title="Projects" icon={faProjectDiagram}>
            <Projects />
          </CollapseSection>

        </div>

      {open && <Modal setOpen={setOpen} />}
    </div>
  );
}
