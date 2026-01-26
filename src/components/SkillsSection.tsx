import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faJava, faNodeJs, faPython, faJsSquare, faGitAlt, faReact, faAngular, faBootstrap, faCss3Alt, faDocker } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faCode, faTasks, faServer, faChartLine} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Skill {
    icon: IconDefinition;
    title: string;
    desc: string;
    category: string;
}

const skills: Skill[] = [
    { icon: faJava, title: "Java & Spring Boot", desc: "Web scraping and backend development.", category: "Backend" },
    { icon: faNodeJs, title: "Node.js", desc: "Web development and server-side applications.", category: "Backend" },
     { icon: faCode, title: "Symfony", desc: "Web application development, backend architecture, and API integration.", category: "Backend" },
    { icon: faPython, title: "Python", desc: "Data processing, analysis, and automation with Pandas and NumPy.", category: "Data & Database" },
    { icon: faJsSquare, title: "JavaScript", desc: "UI management and front-end development.", category: "Frontend" },
    { icon: faDatabase, title: "SQL/T-SQL", desc: "Database management, queries, optimization, and relational modeling.", category: "Data & Database" },
    { icon: faCode, title: "API Development", desc: "Designing and integrating REST & GraphQL APIs.", category: "Backend" },
    { icon: faServer, title: "DevOps", desc: "CI/CD, deployment automation, and cloud infrastructure management.", category: "DevOps & Management" },
    { icon: faGitAlt, title: "Git", desc: "Version control, branching strategies, and collaborative development.", category: "DevOps & Management" },
    {
      icon: faDocker,
      title: "Docker",
      desc: "Containerization of applications to ensure consistent, portable, and scalable development environments.",
      category: "DevOps & Management"
    },

    { icon: faTasks, title: "Agile & Scrum", desc: "Project management methodologies for team collaboration.", category: "DevOps & Management" },
    { icon: faReact, title: "React / Next.js", desc: "Building interactive and performant web applications.", category: "Frontend" },
    { icon: faAngular, title: "Angular", desc: "Developing dynamic single-page applications.", category: "Frontend" },
    { icon: faBootstrap, title: "Bootstrap", desc: "Responsive web design and UI components.", category: "Frontend" },
    { icon: faCss3Alt, title: "Tailwind CSS", desc: "Modern utility-first styling for responsive layouts.", category: "Frontend" },
    { icon: faCode, title: "ETL & Data Pipelines", desc: "Building and managing ETL processes and automated data workflows.", category: "Data & Database" },
    { icon: faChartLine, title: "Data Visualization", desc: "Creating dashboards and reports using Power BI, Tableau, or Python libraries.", category: "Data & Database" },

];


export default function SkillsSection() {
    return (
  <main id="skills" className="bg-white py-10">
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">My Skills</h1>
      <p className="text-center text-gray-700 mb-8">Explore my areas of expertise:</p>

      {Object.entries(
        skills.reduce((acc, skill) => {
          (acc[skill.category] = acc[skill.category] || []).push(skill);
          return acc;
        }, {} as Record<string, Skill[]>)
      ).map(([category, categorySkills], idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 badge-skill">{category}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {categorySkills.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card p-5 border border-gray-200 rounded-lg hover:shadow-xl hover:border-blue-400 transition-all duration-300 bg-gray-50"
              >
                <div className="flex items-start gap-4 justify-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center justify-center">
                      <FontAwesomeIcon icon={skill.icon} className="text-5xl fgColorTheme" /> 
                      <span className="ml-3">{skill.title}</span>
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{skill.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </main>
);

}