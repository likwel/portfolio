import React from "react";
import { faCalendar, faBuilding, faTasks, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from '../contexts/LanguageContext';

// interface Experience {
//     title: string;
//     company: string;
//     startDate: string;
//     endDate: string;
//     desc: string[];
// }

export default function ExperienceSection() {
    const { t } = useLanguage();

    const experiences = [
      {
        title: t('exp1Title'),
        company: "Geomadagascar",
        startDate: t('exp1Start'),
        endDate: t('exp1End'),
        desc: [
          t('exp1Desc1'),
          t('exp1Desc2'),
          t('exp1Desc3'),
          t('exp1Desc4'),
        ],
      },
      {
        title: t('exp2Title'),
        company: "MGBI (Madagascar Business Intelligente)",
        startDate: t('exp2Start'),
        endDate: t('exp2End'),
        desc: [
          t('exp2Desc1'),
          t('exp2Desc2'),
          t('exp2Desc3'),
          t('exp2Desc4'),
        ],
      },
      {
        title: t('exp3Title'),
        company: "Secutech",
        startDate: t('exp3Start'),
        endDate: t('exp3End'),
        desc: [
          t('exp3Desc1'),
          t('exp3Desc2'),
          t('exp3Desc3'),
          t('exp3Desc4'),
        ],
      },
      {
        title: t('exp4Title'),
        company: "ISITM (Institut Supérieur de l'Innovation Technologique et Management)",
        startDate: t('exp4Start'),
        endDate: t('exp4End'),
        desc: [
          t('exp4Desc1'),
          t('exp4Desc2'),
          t('exp4Desc3'),
          t('exp4Desc4'),
        ],
      },
    ];

    return (
        <main id="experience" className="bg-white pt-10 border-1rem">
            <div className="mx-auto w-100">
                <h1 className="text-3xl font-bold mb-2 text-center">{t('professionalExperience')}</h1>
                <p className="text-center text-gray-700 mb-1rem">{t('experienceSubtitle')}</p>

                <div className="space-y-4 p-4 mt-3">
                    {experiences.map((exp, index) => (
                        <div key={index} className="skill-card border rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-all duration-300  transition-colors shadow-sm p-4">
                            {/* Date et Titre sur la même ligne */}
                            <div className="flex items-center gap-3 mb-2 flex-list-task">
                                <div className="flex items-center gap-2 text-sm bg-white px-3 py-1 rounded-full date-badge">
                                    <FontAwesomeIcon icon={faCalendar} className="text-white px-2"/>
                                    <span className="font-medium">{exp.startDate} - {exp.endDate} </span>
                                </div>
                                <h3 className="font-semibold text-lg text-gray-800 xp">{exp.title}</h3>
                            </div>

                            {/* Société */}
                            <div className="flex items-center gap-2 mb-3 ml-1 p-3">
                                <FontAwesomeIcon icon={faBuilding} className="fgColorTheme text-xl" />
                                <p className="text-gray-600 font-medium">{exp.company}</p>
                            </div>

                            {/* Responsabilités */}
                            <div className="flex items-center gap-2 mb-3 ml-1 p-3">
                                <FontAwesomeIcon icon={faClipboardList} className="fgColorTheme text-xl" />
                                <p className="text-gray-600 font-medium">{t('responsibilities')}</p>
                            </div>

                            {/* Description avec icône */}
                            <div className="flex gap-2 mb-3 ml-1 p-3">
                                <ul className="list-disc flex items-stretch justify-center gap-2 flex-list-task">
                                    {exp.desc.map((item, i) => (
                                        <li key={i} className="text-gray-700 text-center border p-1">
                                        {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}