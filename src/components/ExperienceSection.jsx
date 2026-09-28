import Timeline from "./Timeline";
import { useLanguage } from '../contexts/LanguageContext';

/* Dates alignées sur le CV (mise à jour d'avril 2026) — end: null = poste en cours */
const EXPERIENCES = [
  {
    key: 'exp1',
    company: "Géomadagascar",
    start: '2022-08', end: null,
    tech: ['Python', 'Airflow', 'PostgreSQL', 'Symfony', 'NestJS', 'Spring Boot'],
  },
  {
    key: 'exp2',
    company: "MGBI — Madagascar Business Intelligence",
    start: '2021-05', end: '2022-07',
    tech: ['Talend', 'SSIS', 'Power BI', 'SQL Server', 'PostgreSQL', 'Odoo'],
  },
  {
    key: 'exp3',
    company: "Secutech",
    start: '2020-11', end: '2021-04',
  },
  {
    key: 'exp4',
    company: "ISITM — Institut Supérieur de l'Innovation Technologique et Management",
    start: '2020-01', end: '2022-07',
    partTime: true,
    tech: ['Java', 'SQL', 'Machine Learning'],
  },
];

export default function ExperienceSection() {
    const { t } = useLanguage();

    const items = EXPERIENCES.map((exp) => ({
      ...exp,
      title: t(`${exp.key}Title`),
      summary: t(`${exp.key}Summary`),
      points: t(`${exp.key}Points`),
      chip: exp.partTime ? t('partTime') : null,
      showDuration: true,
    }));

    return <Timeline items={items} pointsLabel={t('responsibilities')} />;
}
