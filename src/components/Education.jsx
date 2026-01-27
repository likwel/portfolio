import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faBuilding, faTasks, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from '../contexts/LanguageContext';

export default function Education() {
  const { t } = useLanguage();

  const experiences = [
    {
      title: t('edu1Title'),
      company: t('edu1Company'),
      startDate: "2018",
      endDate: "2020",
      desc: [
        t('edu1Desc1'),
        t('edu1Desc2'),
        t('edu1Desc3'),
      ],
    },
    {
      title: t('edu2Title'),
      company: t('edu2Company'),
      startDate: "2015",
      endDate: "2018",
      desc: [
        t('edu2Desc1'),
        t('edu2Desc2'),
        t('edu2Desc3'),
      ],
    },
    {
      title: t('edu3Title'),
      company: t('edu3Company'),
      startDate: "2013",
      endDate: "2013",
      desc: [
        t('edu3Desc1'),
        t('edu3Desc2'),
        t('edu3Desc3'),
      ],
    },
  ];

  return (
    <main id="experience" className="bg-white pt-10 border-1rem">
      <div className="space-y-4 p-4 border-1rem">
        <h1 className="text-3xl font-bold text-center">
          {t('educationTitle')}
        </h1>
        <p className="text-center text-gray-700 mb-2rem">
          {t('educationSubtitle')}
        </p>

        {experiences.map((exp, index) => (
          <div key={index} className="skill-card border rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-all duration-300 transition-colors shadow-sm p-4">
            {/* Date et Titre sur la même ligne */}
            <div className="flex items-center gap-3 mb-2 flex-list-task">
              <div className="flex items-center gap-2 text-sm bg-white px-3 py-1 rounded-full date-badge">
                <FontAwesomeIcon icon={faCalendar} className="text-white px-2" />
                <span className="font-medium">{exp.startDate} - {exp.endDate} </span>
              </div>
              <h3 className="font-semibold text-lg text-gray-800 xp">{exp.title}</h3>
            </div>

            {/* Institution */}
            <div className="flex items-center gap-2 mb-3 ml-1 p-3">
              <FontAwesomeIcon icon={faBuilding} className="fgColorTheme text-xl" />
              <p className="text-gray-600 font-medium">{exp.company}</p>
            </div>

            {/* Études */}
            <div className="flex items-center gap-2 mb-3 ml-1 p-3">
              <FontAwesomeIcon icon={faClipboardList} className="fgColorTheme text-xl" />
              <p className="text-gray-600 font-medium">{t('studies')}</p>
            </div>

            {/* Description */}
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
    </main>
  );
}