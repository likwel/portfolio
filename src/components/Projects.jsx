import im1 from "../assets/projects/1.png";
import im2 from "../assets/projects/2.png";
import im3 from "../assets/projects/3.png";
import im4 from "../assets/projects/4.png";
import im5 from "../assets/projects/5.PNG";
import im6 from "../assets/projects/6.PNG";
import im7 from "../assets/projects/7.png";
import im8 from "../assets/projects/8.png";
import plus from "../assets/projects/plus.jpg";
import cmz from "../assets/projects/cmz.PNG";
import scrap from "../assets/projects/scap.jpeg";
import geomada from "../assets/projects/geomada.PNG";

import { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from '../contexts/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const personalProjects = [
    // Personal Projects
    {
      title: "WorldFeeds",
      description: t('project1Desc'),
      image: im5,
      link: "https://worldfeeds.vercel.app/",
      category: t('categoryPersonal'),
    },
    {
      title: "Factura.mg",
      description: t('project2Desc'),
      image: im1,
      link: "https://tsaratantana.alwaysdata.net/",
      category: t('categoryPersonal'),
    },
    {
      title: "Commune Tsaratantana",
      description: t('project3Desc'),
      image: im3,
      link: "https://commune-tsaratantana.onrender.com/",
      category: t('categoryPersonal'),
    },
    {
      title: "Agile Kanban",
      description: t('project4Desc'),
      image: im7,
      category: t('categoryPersonal'),
    },
    {
      title: "GPS Tracking",
      description: t('project5Desc'),
      image: im8,
      category: t('categoryPersonal'),
    },
    {
      title: "Sales Forecast (PDV) 2.0",
      description: t('project6Desc'),
      image: im4,
      category: t('categoryPersonal'),
    },
    {
      title: "SmartShop",
      description: t('project7Desc'),
      image: im2,
      category: t('categoryPersonal'),
    },
    {
      title: "Talkio",
      description: t('project8Desc'),
      image: im6,
      category: t('categoryPersonal'),
    },

    // Company Projects
    {
      title: t('project9Title'),
      description: t('project9Desc'),
      image: cmz,
      link: "https://consomyzone.com/",
      category: t('categoryCompany'),
    },
    {
      title: t('project10Title'),
      description: t('project10Desc'),
      image: scrap,
      category: t('categoryCompany'),
    },

    // See More
    {
      title: t('seeMore'),
      description: t('seeMoreDesc'),
      image: plus,
      link: "https://github.com/likwel",
      category: t('categoryPersonal'),
    },

    {
      title: t('companyWebsite'),
      description: t('companyWebsiteDesc'),
      image: geomada,
      link: "https://www.geomadagascar.com/",
      category: t('categoryCompany'),
    },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage("");
  };

  return (
    <>
      <main id="projects" className="bg-white pt-10 border-1rem">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">
            {t('projectsMainTitle')}
          </h1>
          <p className="text-center text-gray-700 mb-6">
            {t('projectsSubtitle')}
          </p>

          {Object.entries(
            personalProjects.reduce((acc, project) => {
              (acc[project.category] = acc[project.category] || []).push(project);
              return acc;
            }, {})
          ).map(([category, categoryProjects], idx) => (
            <div key={idx} className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 badge-skill">
                {category}
              </h2>

              <div className="lg:p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 experience">
                {categoryProjects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg shadow hover:shadow-lg overflow-hidden project-card"
                  >
                    <div
                      className="h-48 overflow-hidden project-image"
                      onClick={() => handleImageClick(project.image)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg project-title">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mt-2 project-description">
                        {project.description}
                      </p>

                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition project-btn"
                        >
                          {t('seeProject')}
                        </a>
                      ) : (
                        <button
                          onClick={() => alert(t('notDeployed'))}
                          className="inline-block mt-3 px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                        >
                          {t('seeProject')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL IMAGE */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              style={{ fontSize: "1rem" }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <img
              src={selectedImage}
              alt="Project preview"
              className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}