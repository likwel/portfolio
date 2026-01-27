import React from "react";
import { faJava, faNodeJs, faPython, faJsSquare, faGitAlt, faReact, faAngular, faBootstrap, faCss3Alt, faDocker } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faCode, faTasks, faServer, faChartLine} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from '../contexts/LanguageContext';

export default function SkillsSection() {
    const { t } = useLanguage();

    const skills = [
        { icon: faJava, title: "Java & Spring Boot", desc: t('skillJavaDesc'), category: t('categoryBackend') },
        { icon: faNodeJs, title: "Node.js", desc: t('skillNodeDesc'), category: t('categoryBackend') },
        { icon: faCode, title: "Symfony", desc: t('skillSymfonyDesc'), category: t('categoryBackend') },
        { icon: faPython, title: "Python", desc: t('skillPythonDesc'), category: t('categoryData') },
        { icon: faJsSquare, title: "JavaScript", desc: t('skillJsDesc'), category: t('categoryFrontend') },
        { icon: faDatabase, title: "SQL/T-SQL", desc: t('skillSqlDesc'), category: t('categoryData') },
        { icon: faCode, title: t('apiDevelopment'), desc: t('skillApiDesc'), category: t('categoryBackend') },
        { icon: faServer, title: "DevOps", desc: t('skillDevOpsDesc'), category: t('categoryDevOps') },
        { icon: faGitAlt, title: "Git", desc: t('skillGitDesc'), category: t('categoryDevOps') },
        { icon: faDocker, title: "Docker", desc: t('skillDockerDesc'), category: t('categoryDevOps') },
        { icon: faTasks, title: "Agile & Scrum", desc: t('skillAgileDesc'), category: t('categoryDevOps') },
        { icon: faReact, title: "React / Next.js", desc: t('skillReactDesc'), category: t('categoryFrontend') },
        { icon: faAngular, title: "Angular", desc: t('skillAngularDesc'), category: t('categoryFrontend') },
        { icon: faBootstrap, title: "Bootstrap", desc: t('skillBootstrapDesc'), category: t('categoryFrontend') },
        { icon: faCss3Alt, title: "Tailwind CSS", desc: t('skillTailwindDesc'), category: t('categoryFrontend') },
        { icon: faCode, title: t('etlPipelines'), desc: t('skillEtlDesc'), category: t('categoryData') },
        { icon: faChartLine, title: t('dataVisualization'), desc: t('skillDataVizDesc'), category: t('categoryData') },
    ];

    return (
        <main id="skills" className="bg-white pt-10 border-1rem">
            <div className="mx-auto">
                <h1 className="text-3xl font-bold mb-2 text-center">{t('skillsExpertise')}</h1>
                <p className="text-center text-gray-700 mb-1rem">{t('skillsSubtitle')}</p>

                {Object.entries(
                    skills.reduce((acc, skill) => {
                        (acc[skill.category] = acc[skill.category] || []).push(skill);
                        return acc;
                    }, {})
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
                                                <FontAwesomeIcon icon={skill.icon} className="text-2xl fgColorTheme" /> 
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