import { useState } from "react";
import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faJava, faNodeJs, faPython, faJsSquare } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faCode, faTasks } from "@fortawesome/free-solid-svg-icons";
// import DuotoneIcon from "./DuotoneIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Experience {
  title: string;
  company: string;
  desc: string;
}

interface Skill {
  icon: IconDefinition;
  title: string;
  desc: string;
}

const experiences: Experience[] = [
  {
    title: "Web Developer & Data Engineer",
    company: "Geomadagascar | Present (approximately 3 years)",
    desc: "Developing web applications and data management (Symfony, JavaScript, Spring Boot)",
  },
  {
    title: "Data Analyst",
    company: "MGBI | 1 year & 3 months",
    desc: "Data analysis, ERP management, and data integration with Python, SQL, Power BI, and Excel.",
  },
  {
    title: "Electronics & IT Technician",
    company: "Secutech | 6 months",
    desc: "Installation and maintenance of electronic and IT equipment.",
  },
  {
    title: "Computer & Electronics Instructor",
    company: "ISITM | part time",
    desc: "Teaching students in programming and applied electronics.",
  },
];

const skills: Skill[] = [
  { icon: faJava, title: "Java & Spring Boot", desc: "Web scraping and backend development." },
  { icon: faNodeJs, title: "Node.js", desc: "Web development and server-side applications." },
  { icon: faPython, title: "Python", desc: "Data analysis and data science." },
  { icon: faJsSquare, title: "JavaScript", desc: "UI management and front-end development." },
  { icon: faDatabase, title: "SQL", desc: "Database management (MySQL, PostgreSQL)." },
  { icon: faCode, title: "API Development", desc: "Designing and integrating REST & GraphQL APIs." },
  { icon: faTasks, title: "Agile & Scrum", desc: "Project management methodologies for team collaboration." },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<"experience" | "skills">("experience");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Tabs */}
      <nav className="flex justify-center space-x-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab("experience")}
          className={`pb-2 font-semibold ${activeTab === "experience" ? "border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          Professional Experience
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`pb-2 font-semibold ${activeTab === "skills" ? "border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          My Skills
        </button>
      </nav>

      {/* Experience */}
      {activeTab === "experience" && (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-lg">{exp.title}</h3>
              <p className="text-gray-500">{exp.company}</p>
              <p className="mt-1 text-gray-700">{exp.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {activeTab === "skills" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((skill, idx) => (
            <div key={idx} className="skill-card p-4 border rounded-lg flex items-center gap-4">
            <FontAwesomeIcon icon={skill.icon} className="text-4xl"/>
            <div>
                <h3 className="font-bold">{skill.title}</h3>
                <p className="text-gray-600">{skill.desc}</p>
            </div>
            </div>
        ))}
        </div>
      )}
    </div>
  );
}
