import React from "react";
import { faCalendar, faBuilding, faTasks, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Experience {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    desc: string[];
}
const experiences: Experience[] = [
  {
    title: "Web Developer & Data Engineer",
    company: "Geomadagascar",
    startDate: "Jan 2022",
    endDate: "Present",
    desc: [
      "Design and develop web applications and data pipelines",
      "Manage and optimize relational databases",
      "Implement scalable backend solutions using Symfony and Spring Boot",
      "Develop interactive features using JavaScript",
    ],
  },
  {
    title: "Data Analyst",
    company: "MGBI",
    startDate: "Sep 2020",
    endDate: "Dec 2021",
    desc: [
      "Analyze and interpret business data to support decision-making",
      "Manage and maintain ERP systems",
      "Integrate and process data using Python and SQL",
      "Create dashboards and reports with Power BI and Excel",
    ],
  },
  {
    title: "IT Technician",
    company: "Secutech",
    startDate: "Mar 2020",
    endDate: "Aug 2020",
    desc: [
      "Install and configure electronic and IT equipment",
      "Perform preventive and corrective maintenance",
      "Provide technical support and troubleshooting",
      "Ensure system reliability and security",
    ],
  },
  {
    title: "Programming Instructor",
    company: "ISITM",
    startDate: "Jan 2019",
    endDate: "Present",
    desc: [
      "Teach programming and applied electronics through hands-on projects",
      "Deliver courses in Java and Web Development",
      "Introduce Machine Learning fundamentals",
      "Supervise student projects and practical labs",
    ],
  },
];


export default function ExperienceSection() {
    return (
        <main id="experience" className="bg-white py-10">
            <div className="mx-auto w-100">
                <h1 className="text-3xl font-bold mb-2 text-center">My Professional Experiences</h1>
                <p className="text-center text-gray-700 mb-6">Explore my experiences:</p>

                <div className="space-y-4 p-4">
                    {experiences.map((exp, index) => (
                        <div key={index} className="skill-card border rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-all duration-300  transition-colors shadow-sm p-4">
                            {/* Date et Titre sur la même ligne */}
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-2 text-sm bg-white px-3 py-1 rounded-full date-badge">
                                    <FontAwesomeIcon icon={faCalendar} className="text-white px-2"/>
                                    <span className="font-medium">{exp.startDate} - {exp.endDate} </span>
                                </div>
                                <h3 className="font-semibold text-lg text-gray-800 xp">{exp.title}</h3>
                                {/* <FontAwesomeIcon icon={faBuilding} className="px-2 ml-auto"/> */}
                            </div>

                            {/* Société */}
                            <div className="flex items-center gap-2 mb-3 ml-1 p-3">
                                <FontAwesomeIcon icon={faBuilding} className="fgColorTheme text-xl" />
                                <p className="text-gray-600 font-medium">{exp.company}</p>
                            </div>

                            {/* Société */}
                            <div className="flex items-center gap-2 mb-3 ml-1 p-3">
                                <FontAwesomeIcon icon={faClipboardList} className="fgColorTheme text-xl" />
                                <p className="text-gray-600 font-medium">Responsibilities</p>
                            </div>

                            {/* Description avec icône */}
                            <div className="flex gap-2 mb-3 ml-1 p-3">
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-left self-start flex items-center justify-center gap-2">
                                    {exp.desc.map((item, i) => (
                                        <li key={i} className="text-gray-700 text-left border p-1">
                                        {item}
                                        </li>
                                    ))}
                                    </ul>
                                {/* <FontAwesomeIcon icon={faTasks} className="fgColorTheme mt-1" />
                                <p className="text-gray-700">{exp.desc}</p> */}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}