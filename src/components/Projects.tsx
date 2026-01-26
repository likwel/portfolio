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

interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
}
const personalProjects: Project[] = [
  // Personal Projects
  {
    title: "WorldFeeds",
    description:
      "FullStack NextJS 15.5 - WorldFeeds is an international news aggregator that centralizes RSS feeds from the world's major media outlets in real time.",
    image: im5,
    link: "https://worldfeeds.vercel.app/",
    category: "Personal Projects",
  },
  {
    title: "Factura.mg",
    description:
      "Symfony 7.0 - Commercial management system: tracking sales, clients, and stock, optimizing business processes, and improving company performance.",
    image: im1,
    link: "https://tsaratantana.alwaysdata.net/",
    category: "Personal Projects",
  },
  {
    title: "Commune Tsaratantana",
    description:
      "Node.js, Express.js - Civil status management: recording administrative citizen data and creating/updating civil status documents for centralized management.",
    image: im3,
    link: "https://commune-tsaratantana.onrender.com/",
    category: "Personal Projects",
  },
  {
    title: "Agile Kanban",
    description:
      "Node.js, Express.js - Agile project management (Kanban): continuous task tracking, feature prioritization, team collaboration, and rapid adaptation to changes.",
    image: im7,
    category: "Personal Projects",
  },
  {
    title: "GPS Tracking",
    description:
      "Java, Spring Boot - Real-time fleet management and vehicle/equipment tracking with live position visualization.",
    image: im8,
    category: "Personal Projects",
  },
  {
    title: "Sales Forecast (PDV) 2.0",
    description:
      "Python / Streamlit – Predicting and classifying values from historical data, both time series and tabular datasets.",
    image: im4,
    category: "Personal Projects",
  },
  {
    title: "SmartShop",
    description:
      "Symfony 7.3 with EasyAdmin – Customizable e-commerce with optimized admin interface.",
    image: im2,
    category: "Personal Projects",
  },
  {
    title: "Talkio",
    description:
      "NestJS + NextJS – Messaging platform with advanced project/task management.",
    image: im6,
    category: "Personal Projects",
  },

  // Company Projects
  {
    title: "ConsoMyZone - Company Project",
    description:
      "Symfony 6 / JavaScript - Data visualization with map integration, advanced search, FastAPI, NodeJS.",
    image: cmz,
    link: "https://consomyzone.com/",
    category: "Company Projects",
  },
  {
    title: "Web Scraper - Company Project",
    description:
      "Java Spring Boot - Internal data scraping tool for company operations.",
    image: scrap,
    category: "Company Projects",
  },

  // See More
  {
    title: "See More",
    description: "Several projects are already in my GitHub repository.",
    image: plus,
    link: "https://github.com/likwel",
    category: "Personal Projects",
  },

  {
    title: "Company Website",
    description: "Corporate website presenting the company, its services, and its expertise.",
    image: geomada,
    link: "https://www.geomadagascar.com/",
    category: "Company Projects",
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
      <main id="projects" className="bg-white pt-10 border-1rem">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">
            Personal & Side Projects
          </h1>
          <p className="text-center text-gray-700 mb-6">
            A selection of projects showcasing my skills.
          </p>

          {Object.entries(
            personalProjects.reduce((acc, project) => {
              (acc[project.category] = acc[project.category] || []).push(project);
              return acc;
            }, {} as Record<string, Project[]>)
          ).map(([category, categoryProjects], idx) => (
            <div key={idx} className="mb-10">
              {/* Titre de catégorie */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 badge-skill">
                {category}
              </h2>

              {/* Grid des projets */}
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