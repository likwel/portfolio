import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faBuilding, faTasks, faClipboardList } from "@fortawesome/free-solid-svg-icons";

interface Experience {
  title: string;
  company: string;
  desc: string[];
  startDate: string;
  endDate: string;
}
const experiences: Experience[] = [
  {
    title: "Master's Degree in Electronics and Computer Science",
    company: "Ecole Supérieure Polytechnique d'Antananarivo",
    startDate: "2018",
    endDate: "2020",
    desc: [
      "Specialization: Computer Science, Data, and Modeling",
      "Completed advanced projects in data analysis and modeling",
      "Participated in collaborative research and applied computing projects"
    ],
  },
  {
    title: "Bachelor's Degree in Electronics and Computer Science",
    company: "Ecole Supérieure Polytechnique d'Antananarivo",
    startDate: "2015",
    endDate: "2018",
    desc: [
      "Specialization: Computer Science and Networks",
      "Learned networking, programming, and electronics fundamentals",
      "Worked on team projects and practical labs"
    ],
  },
  {
    title: "Baccalaureate in Scientific Studies",
    company: "Lycée d'enseignement général",
    startDate: "2013",
    endDate: "2013",
    desc: [
      "Specialization: Serie D",
      "Graduated with Honors: Mention Assez Bien",
      "Focus on mathematics, physics, and chemistry"
    ],
  },
];


export default function Education() {
  return (
    <div className="space-y-4 p-4">
      {experiences.map((exp, index) => (
        <div key={index} className="skill-card border rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-all duration-300  transition-colors shadow-sm p-4">
          {/* Date et Titre sur la même ligne */}
          <div className="flex items-center gap-3 mb-2 flex-list-task">
            <div className="flex items-center gap-2 text-sm bg-white px-3 py-1 rounded-full date-badge">
              <FontAwesomeIcon icon={faCalendar} className="text-white px-2" />
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
            <p className="text-gray-600 font-medium">Etudes</p>
          </div>

          {/* Description avec icône */}
          <div className="flex gap-2 mb-3 ml-1 p-3">
            <ul className="list-disc pl-5 mt-2 space-y-1 text-left self-start flex items-center justify-center gap-2 flex-list-task">
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
  );

}