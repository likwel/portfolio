import React from "react";

interface Experience {
  title: string;
  company: string;
  desc: string;
}

const experiences: Experience[] = [
  {
    title: "Master's degree in Electronics and Computer Science",
    company: "Ecole Supérieure Polytechnique d'Antananarivo",
    desc: "Parcours : computer science, data and modelisation",
  },
  {
    title: "Bachelor's Degree in Electronics and Computer Science",
    company: "Ecole Supérieure Polytechnique d'Antananarivo",
    desc: "Parcours : computer science, network",
  },
];

export default function Education() {
  return (
    <div className="space-y-4 p-4" id="education">
      {experiences.map((exp, index) => (
        <div key={index} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
          <h3 className="font-semibold text-lg">{exp.title}</h3>
          <p className="text-gray-500">{exp.company}</p>
          <p className="mt-1 text-gray-700">{exp.desc}</p>
        </div>
      ))}
    </div>
  );
}