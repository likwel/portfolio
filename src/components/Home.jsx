import { useState, useRef } from "react";
import elieImg from "../assets/images/elie.png";
import cv from "../assets/CV_ANDRIATSITOHAINA_ELIE.pdf";
import presentation_en from "../assets/presentation_en.mp3";
import presentation_fr from "../assets/presentation_fr.mp3";

import { faPlay, faPause, faCode, faDatabase, faCloud, faPhone, faMoon, faCircle, faDownload, faEnvelope, faBriefcase, faUserTie, faClock, faSmile, faStar } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import DuotoneIcon from "./DuotoneIcon";

// Play
export const PlayIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function Home({ setOpen }) {

  const [isPlaying, setIsPlaying] = useState(false);
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
    <section className="p-20px">

      {/* MAIN */}
      <div className="main" id="home">
        <div className="left-section">
          {/* <h2 className="my-name" onClick={() => setOpen(true)}>
            ANDRIATSITOHAINA ELIE FENOHASINA
            <span className="icon">›</span>
          </h2> */}
          <audio ref={audioRef} src={presentation_en}/>

          <h2 className="my-name flex items-center gap-4 cursor-pointer flex-list-task" onClick={toggleAudio}>
            ANDRIATSITOHAINA ELIE FENOHASINA

            <div className="icon flex flex-col items-center group">
              <div className="group-hover:scale-110 transition custom-play">
                <DuotoneIcon
                  icon={isPlaying ? faPause : faPlay}
                  size={'text-xl'}
                  className="mobile-icon"
                />
              </div>
              <span className="text-[10px] mt-1 group-hover:text-blue-600 truncate">
                Presentation
              </span>
            </div>
          </h2>

          <div className="title-portfolio p-3">
            <h1>Fullstack Developper & Data Engineer</h1>
            <p>I specialize in web development, software engineering, and data engineering.</p>
          </div>
          <div className="buttons">
            <button className="hireMe" onClick={() => setOpen(true)}>
              <DuotoneIcon
                icon={faEnvelope}
                size={'text-sm'}
                backActive={false}
                className="mobile-icon"
                fgColor={'text-white'}
              /> <span className="ml-3">Contact me</span>
            </button>

            <a
              className="button2 btn-download"
              href={cv}
              target="_blank"
              download
            >
              <DuotoneIcon icon={faDownload} size={'text-sm'} backActive={true} /> Download my CV
            </a>
          </div>

          <div className="experience">
            <div className="experience-item cursor-pointer">
              <h2><DuotoneIcon icon={faClock} size={'text-sm'} /> <strong>4 years</strong></h2>
              <p>Experiences</p>
            </div>

            <div className="experience-item cursor-pointer">
              <h2><DuotoneIcon icon={faCircle} size={'text-sm'} /> <strong>Open to work</strong></h2>
              <p>Availability</p>
            </div>

            <div className="experience-item cursor-pointer">
              <h2><DuotoneIcon icon={faStar} size={'text-sm'} /> <strong>98%</strong></h2>
              <p>Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="right-section">
          <img
            src={elieImg}
            alt="Elie Andriatsitohaina"
          />

          <div className="overlay left">
            <DuotoneIcon icon={faCircle} size={'text-sm'} /> Software Engineer
          </div>

          <div className="overlay bottom-left">
            <DuotoneIcon icon={faCircle} size={'text-sm'} /> Web Development
          </div>

          <div className="overlay center">
            <DuotoneIcon icon={faCircle} size={'text-sm'} /> Data Engineer
          </div>
        </div>
      </div>

    </section>
  );
}
