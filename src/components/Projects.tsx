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

import { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
}

const personalProjects: Project[] = [
  {
    title: "WorldFeeds",
    description:
      "FullStack NextJS 15.5 - WorldFeeds est un agrégateur d'actualités internationales qui centralise en temps réel les flux RSS des plus grands médias mondiaux.",
    image: im5,
    link: "https://worldfeeds.vercel.app/",
  },
  {
    title: "Factura.mg",
    description:
      "Symfony 7.0 - Gestion commerciale – Suivi des ventes, clients et stocks, optimisation des processus commerciaux et amélioration de la performance de l’entreprise.",
    image: im1,
    link: "https://tsaratantana.alwaysdata.net/",
  },
  {
    title: "Commune Tsaratantana",
    description:
      "Node.js, Express.js - Gestion d’état civil – Enregistrement des données administratives des citoyens, création et la mise à jour des actes d’état civil pour une gestion centralisée.",
    image: im3,
    link: "https://commune-tsaratantana.onrender.com/",
  },
  {
    title: "Agile Kanban",
    description:
      "Node.js, Expres.js - Gestion de projet Agile (Kanban) – Planification et suivi des tâches en flux continu, priorisation des fonctionnalités, collaboration efficace des équipes et adaptation rapide aux changements.",
    image: im7,
  },
  {
    title: "GPS Tracking",
    description:
      "Java, Spring Boot - Gestion de flotte en temps réel et suivi des véhicules ou équipements en direct, avec visualisation des positions.",
    image: im8,
  },
  {
    title: "Prévision de Vente (PDV) 2.0",
    description:
      "Python/Streamlit – Prédiction et classification de valeurs à partir de données historiques, temporelles ou non.",
    image: im4,
  },
  {
    title: "SmartShop",
    description:
      "Symfony 7.3 avec EasyAdmin – E-commerce personnalisable avec une interface d’administration optimisée.",
    image: im2,
  },
  {
    title: "Talkio",
    description:
      "NestJS + NextJS – Platforme de messagerie et gestion de projet/tâche avancée.",
    image: im6,
  },
  {
    title: "Voir plus",
    description:
      "Plusieurs projet sont déjà dans mon répo git.",
    image: plus,
    link : 'https://github.com/likwel'
  },
  {
    title: "ConsoMyZone - Projet de société",
    description:
      "Symfony 6 / JavaScript - Data visualisation avec intégration de Map. Recherche avancé, FastAPI, NodeJS.",
    image: cmz,
    link: "https://consomyzone.com/",
  },
  {
    title: "Web Scrapper - Projet de société",
    description:
      "Java Spring Boot - Outil data scraping interne.",
    image: scrap,
  },
];

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage("");
  };

  return (
    <>
      <main id="projects" className="bg-white py-10">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">My personal Projets</h1>
          <p className="text-center text-gray-700 mb-6">Explore my project of expertise :</p>

          <div className="lg:p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 experience">
            {personalProjects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow hover:shadow-lg overflow-hidden project-card">
                <div 
                  className="h-48 overflow-hidden project-image"
                  onClick={() => handleImageClick(project.image)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg project-title">{project.title}</h3>
                  <p className="text-gray-600 mt-2 project-description">{project.description}</p>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition project-btn"
                    >
                      See the project
                    </a>
                  ) : (
                    <button
                      onClick={() => alert("Not deploy")}
                      className="inline-block mt-3 px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                    >
                      See the project
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* MODAL IMAGE EN GRAND */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              style={{ fontSize: '2rem' }}
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