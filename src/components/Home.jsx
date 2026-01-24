import elieImg from "../assets/images/elie.png";
import cv from "../assets/CV_ANDRIATSITOHAINA_ELIE.pdf";
import { faCode, faDatabase, faCloud, faPhone, faMoon, faCircle, faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import DuotoneIcon from "./DuotoneIcon";

export default function Home({ setOpen }) {
  return (
    <section className="p-20px">

      {/* MAIN */}
      <div className="main" id="home">
        <div className="left-section">
          <h2 className="my-name" onClick={() => setOpen(true)}>
            ANDRIATSITOHAINA ELIE FENOHASINA
            <span className="icon">›</span>
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
              <DuotoneIcon icon={faDownload} size={'text-sm'} backActive={false}/> Download my CV
            </a>
          </div>

          <div className="experience">
            <div className="experience-item">
              <h2><strong>4 years</strong></h2>
              <p>Experiences</p>
            </div>

            <div className="experience-item">
              <h2><strong>Open to work</strong></h2>
              <p>Availability</p>
            </div>

            <div className="experience-item">
              <h2><strong>98%</strong></h2>
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
