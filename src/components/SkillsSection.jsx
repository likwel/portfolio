import { useState } from "react";
import { faJava, faNodeJs, faPython, faJsSquare, faGitAlt, faReact, faAngular, faCss3Alt, faDocker, faPhp } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faChartLine, faNetworkWired, faServer, faRobot, faMagnifyingGlassChart, faBrain, faLayerGroup, faPlug, faRocket, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from '../contexts/LanguageContext';
import { trackPointer } from "../hooks/motion";

/* title : nom universel · titleKey : titre traduit · tools : outils cités dans le CV */
export const SKILLS = [
    { id: 'Python',   cat: 'skCatData',     icon: faPython,               title: "Python",               tools: ['Pandas', 'NumPy', 'FastAPI'] },
    { id: 'Etl',      cat: 'skCatData',     icon: faNetworkWired,         titleKey: 'skEtlTitle',        tools: ['Talend', 'SSIS', 'Apache Airflow'] },
    { id: 'Bigdata',  cat: 'skCatData',     icon: faServer,               title: "Big Data",             tools: ['Apache Spark'] },
    { id: 'Scraping', cat: 'skCatData',     icon: faRobot,                title: "Web scraping",         tools: ['BeautifulSoup', 'Spring Boot'] },

    { id: 'Powerbi',  cat: 'skCatBi',       icon: faChartLine,            title: "Power BI & reporting", tools: ['Power BI', 'Power Query', 'Excel'] },
    { id: 'Analysis', cat: 'skCatBi',       icon: faMagnifyingGlassChart, titleKey: 'skAnalysisTitle',   tools: ['Pandas', 'Matplotlib'] },
    { id: 'Ml',       cat: 'skCatBi',       icon: faBrain,                title: "Machine Learning",     tools: ['Scikit-Learn', 'Streamlit'] },

    { id: 'Sql',      cat: 'skCatDb',       icon: faDatabase,             titleKey: 'skSqlTitle',        tools: ['PostgreSQL', 'SQL Server', 'MySQL', 'T-SQL'] },
    { id: 'Nosql',    cat: 'skCatDb',       icon: faLayerGroup,           title: "NoSQL",                tools: ['MongoDB'] },

    { id: 'Node',     cat: 'skCatBackend',  icon: faNodeJs,               title: "Node.js",              tools: ['NestJS', 'Express', 'Socket.io', 'Prisma'] },
    { id: 'Java',     cat: 'skCatBackend',  icon: faJava,                 title: "Java & Spring Boot",   tools: ['Spring Boot'] },
    { id: 'Symfony',  cat: 'skCatBackend',  icon: faPhp,                  title: "PHP & Symfony",        tools: ['Symfony', 'EasyAdmin'] },
    { id: 'Api',      cat: 'skCatBackend',  icon: faPlug,                 titleKey: 'skApiTitle',        tools: ['REST', 'GraphQL'] },

    { id: 'React',    cat: 'skCatFrontend', icon: faReact,                title: "React / Next.js",      tools: ['React', 'Next.js'] },
    { id: 'Ts',       cat: 'skCatFrontend', icon: faJsSquare,             title: "JavaScript / TypeScript", tools: ['ES6+', 'TypeScript'] },
    { id: 'Angular',  cat: 'skCatFrontend', icon: faAngular,              title: "Angular",              tools: ['Angular'] },
    { id: 'Ui',       cat: 'skCatFrontend', icon: faCss3Alt,              titleKey: 'skUiTitle',         tools: ['Tailwind CSS', 'Bootstrap', 'CSS3'] },

    { id: 'Docker',   cat: 'skCatDevops',   icon: faDocker,               title: "Docker",               tools: ['Docker', 'Docker Compose'] },
    { id: 'Git',      cat: 'skCatDevops',   icon: faGitAlt,               title: "Git & GitHub",         tools: ['Git', 'GitHub'] },
    { id: 'Cicd',     cat: 'skCatDevops',   icon: faRocket,               title: "CI/CD & cloud",        tools: ['CI/CD', 'GCP', 'AWS'] },
    { id: 'Agile',    cat: 'skCatDevops',   icon: faListCheck,            title: "Agile & Scrum",        tools: ['Scrum', 'Kanban'] },
];

const CATEGORIES = ['skCatData', 'skCatBi', 'skCatDb', 'skCatBackend', 'skCatFrontend', 'skCatDevops'];

export default function SkillsSection() {
    const { t } = useLanguage();
    const [filter, setFilter] = useState("all");

    const filters = [
        { key: "all", label: t('all'), count: SKILLS.length },
        ...CATEGORIES.map((c) => ({ key: c, label: t(c), count: SKILLS.filter((s) => s.cat === c).length })),
    ];
    const visible = filter === "all" ? SKILLS : SKILLS.filter((s) => s.cat === filter);

    return (
        <>
            <div className="filter-bar" role="tablist" aria-label={t('skills')}>
                {filters.map((f) => (
                    <button
                        key={f.key}
                        role="tab"
                        aria-selected={filter === f.key}
                        className={`filter-chip ${filter === f.key ? "is-active" : ""}`}
                        onClick={() => setFilter(f.key)}
                    >
                        {f.label}
                        <span className="count">{f.count}</span>
                    </button>
                ))}
            </div>

            {/* key={filter} : la grille est recréée pour rejouer la cascade */}
            <div key={filter} className="skills-grid stagger" role="tabpanel">
                {visible.map((skill, index) => (
                    <div
                        key={skill.id}
                        className="skill-card"
                        style={{ "--i": index }}
                        onPointerMove={trackPointer}
                    >
                        <span className="icon-tile icon-tile-sm">
                            <FontAwesomeIcon icon={skill.icon} />
                        </span>
                        <div className="skill-body">
                            {filter === "all" && <span className="skill-cat">{t(skill.cat)}</span>}
                            <h3>{skill.titleKey ? t(skill.titleKey) : skill.title}</h3>
                            <p>{t(`sk${skill.id}Desc`)}</p>
                            <div className="tech-tags">
                                {skill.tools.map((tool) => <span key={tool} className="tech-tag">{tool}</span>)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
