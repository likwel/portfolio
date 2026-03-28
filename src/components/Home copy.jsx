import { useState, useRef } from "react";
import elieImg from "../assets/images/elie.png";
import icon from "../assets/images/favicon.png";
import cv from "../assets/CV_ANDRIATSITOHAINA_ELIE.pdf";
import presentation_en from "../assets/presentation_en.mp3";
import presentation_fr from "../assets/presentation_fr.mp3";
import { PopupWidget, PopupModal } from "react-calendly";

import { faPlay, faPause, faCalendarDays, faCalendarPlus, faCalendarCheck, faCode, faDatabase, faCloud, faPhone, faMoon, faCircle, faDownload, faEnvelope, faBriefcase, faUserTie, faClock, faSmile, faStar } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import DuotoneIcon from "./DuotoneIcon";
import { useLanguage } from '../contexts/LanguageContext';

// Play
export const PlayIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function Home({ setOpen }) {

  const [isPlaying, setIsPlaying] = useState(false);
  const [openCalendly, setOpenCalendly] = useState(false);
  const { language, t } = useLanguage();

  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <section className="p-20px section-main">

      {/* MAIN */}
      <div className="main" id="home">
        <div className="left-section">
          {/* <h2 className="my-name" onClick={() => setOpen(true)}>
            ANDRIATSITOHAINA ELIE FENOHASINA
            <span className="icon">›</span>
          </h2> */}
          <audio ref={audioRef} src={language === 'fr' ? presentation_fr : presentation_en}/>

          <h2 className="my-name flex items-center gap-4 cursor-pointer flex-list-task" onClick={toggleAudio}>
            {/* <img className="favicon-img"
              src={icon}
              alt="Elie Andriatsitohaina"
            /> */}
            ANDRIATSITOHAINA Elie Fenohasina

            <div className="icon flex flex-col items-center group">
              <div className="group-hover:scale-110 transition custom-play">
                <DuotoneIcon
                  icon={isPlaying ? faPause : faPlay}
                  size={'text-xl'}
                  className="mobile-icon"
                />
              </div>
              <span className="text-[10px] mt-1 group-hover:text-blue-600 truncate">
                {t('presentation')}
              </span>
            </div>
          </h2>

          <div className="title-portfolio p-3">
            <h1>{t('jobTitle')}</h1>
            <p>{t('jobDescription')}</p>
          </div>
          <div className="buttons">
            <button className="flex gap-2 justify-center items-center hireMe"  onClick={() => setOpenCalendly(true)}>
              <DuotoneIcon
                icon={faCalendarDays}
                size={'text-xl'}
                className="mobile-icon"
                fgColor={'text-white'}
              /> <span className="">{t('schedule')}</span>
            </button>

            <a
              className="flex gap-2 justify-center items-center button2 btn-download"
              href={cv}
              target="_blank"
              download
            >
              <DuotoneIcon icon={faDownload} size={'text-sm'} backActive={true} /> <span>{t('downloadCV')}</span> 
            </a>
          </div>

          <div className="experience">
            <div className="experience-item cursor-pointer">
              <h2 className="flex items-center justify-center gap-2"><DuotoneIcon icon={faClock} size={'text-sm'} /> <strong>4 {t('yearsExperience')}</strong></h2>
              <p>{t('experiencesLabel')}</p>
            </div>

            <div className="experience-item cursor-pointer">
              <h2 className="flex items-center justify-center gap-2"><DuotoneIcon icon={faCircle} size={'text-sm'} /> <strong>{t('openToWork')}</strong></h2>
              <p>{t('availability')}</p>
            </div>

            <div className="experience-item cursor-pointer">
              <h2 className="flex items-center justify-center gap-2"><DuotoneIcon icon={faStar} size={'text-sm'} /> <strong>98%</strong></h2>
              <p>{t('satisfaction')}</p>
            </div>
          </div>
        </div>

        <div className="right-section">
          <img
            src={elieImg}
            alt="Elie Andriatsitohaina"
          />

          <div className="flex gap-2 overlay left">
            <DuotoneIcon icon={faCircle} size={'text-sm'} /> <div>{t('softwareEngineer')}</div>
          </div>

          <div className="flex gap-2 overlay bottom-left">
            <DuotoneIcon icon={faCircle} size={'text-sm'} /> <div>{t('webDevelopment')}</div>
          </div>

          <div className="flex gap-2 overlay center">
            <DuotoneIcon icon={faCircle} size={'text-sm'} /> <div>{t('dataEngineer')}</div>
          </div>
        </div>
      </div>

      {/* <PopupWidget
        url="https://calendly.com/eliefenohasina/30min"
        rootElement={document.getElementById("root")}
        text="Schedule a call"
        textColor="#ffffff"
        color="#007b8b"
      /> */}

      <PopupModal
        url="https://calendly.com/eliefenohasina/30min"
        rootElement={document.getElementById("root")}
        open={openCalendly}
        onModalClose={() => setOpenCalendly(false)}
      />

    </section>
  );
}
