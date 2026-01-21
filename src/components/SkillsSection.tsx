import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faJava, faNodeJs, faPython, faJsSquare } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faCode, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Skill {
    icon: IconDefinition;
    title: string;
    desc: string;
}

const skills: Skill[] = [
    { icon: faJava, title: "Java & Spring Boot", desc: "Web scraping and backend development." },
    { icon: faNodeJs, title: "Node.js", desc: "Web development and server-side applications." },
    { icon: faPython, title: "Python", desc: "Data analysis and data science." },
    { icon: faJsSquare, title: "JavaScript", desc: "UI management and front-end development." },
    { icon: faDatabase, title: "SQL", desc: "Database management (MySQL, PostgreSQL)." },
    { icon: faCode, title: "API Development", desc: "Designing and integrating REST & GraphQL APIs." },
    { icon: faTasks, title: "Agile & Scrum", desc: "Project management methodologies for team collaboration." },
];

export default function SkillsSection() {
    return (
        <main id="skills" className="bg-white py-10">
            <div className="mx-auto">
                <h1 className="text-3xl font-bold mb-2 text-center">My Skills</h1>
                <p className="text-center text-gray-700 mb-8">Explore my areas of expertise:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, idx) => (
                        <div 
                            key={idx} 
                            className="skill-card p-5 border border-gray-200 rounded-lg hover:shadow-xl hover:border-blue-400 transition-all duration-300 bg-gray-50"
                        >
                            <div className="flex items-start gap-4">
                                
                                {/* Contenu à droite */}
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                                        <FontAwesomeIcon 
                                        icon={skill.icon} 
                                        className="text-5xl text-blue-600" 
                                    /> <span className="ml-3">{skill.title}</span>
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {skill.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}