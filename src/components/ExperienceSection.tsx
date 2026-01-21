import React from "react";
import { faCalendar, faBuilding, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Experience {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    desc: string;
}

const experiences: Experience[] = [
    {
        title: "Web Developer & Data Engineer",
        company: "Geomadagascar",
        startDate: "Jan 2022",
        endDate: "Present",
        desc: "Developing web applications and data management (Symfony, JavaScript, Spring Boot)",
    },
    {
        title: "Data Analyst",
        company: "MGBI",
        startDate: "Sep 2020",
        endDate: "Dec 2021",
        desc: "Data analysis, ERP management, and data integration with Python, SQL, Power BI, and Excel.",
    },
    {
        title: "Electronics & IT Technician",
        company: "Secutech",
        startDate: "Mar 2020",
        endDate: "Aug 2020",
        desc: "Installation and maintenance of electronic and IT equipment.",
    },
    {
        title: "Computer & Electronics Instructor",
        company: "ISITM",
        startDate: "Jan 2019",
        endDate: "Present",
        desc: "Teaching students in programming and applied electronics.",
    },
];

export default function ExperienceSection() {
    return (
        <main id="experience" className="bg-white py-10">
            <div className="mx-auto w-100">
                <h1 className="text-3xl font-bold mb-2 text-center">My Professional Experiences</h1>
                <p className="text-center text-gray-700 mb-6">Explore my experiences:</p>

                <div className="space-y-4">
                    {experiences.map((exp, index) => (
                        <div key={index} className="skill-card border rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-all duration-300  transition-colors shadow-sm p-4">
                            {/* Date et Titre sur la même ligne */}
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-2 text-sm bg-white px-3 py-1 rounded-full">
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <span className="font-medium">{exp.startDate} - {exp.endDate} : </span>
                                </div>
                                <h3 className="font-semibold text-lg text-gray-800 xp">{exp.title}</h3>
                            </div>

                            {/* Société */}
                            <div className="flex items-center gap-2 mb-3 ml-1">
                                <FontAwesomeIcon icon={faBuilding} className="text-gray-500" />
                                <p className="text-gray-600 font-medium">{exp.company}</p>
                            </div>

                            {/* Description avec icône */}
                            <div className="flex gap-2 ml-1">
                                <FontAwesomeIcon icon={faTasks} className="text-blue-600 mt-1" />
                                <p className="text-gray-700">{exp.desc}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}