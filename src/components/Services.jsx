import { faLaptopCode, faPlug, faCartShopping, faNetworkWired, faChartLine, faRobot, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ServiceItem from "./ServiceItem";
import { useLanguage } from '../contexts/LanguageContext';

/* Stack et réalisations : identiques dans les deux langues */
const GROUPS = [
  {
    key: 'servicesGroupDev',
    services: [
      { id: 'Web',  icon: faLaptopCode,   tech: ['React', 'Next.js', 'Node.js', 'Symfony'],     projects: ['Factura.mg', 'WorldFeeds', 'ItadImmo'] },
      { id: 'Api',  icon: faPlug,         tech: ['NestJS', 'Express', 'Spring Boot', 'PostgreSQL'], projects: ['MailFlow', 'Glink', 'GPS Tracking'] },
      { id: 'Shop', icon: faCartShopping, tech: ['Symfony', 'EasyAdmin'],                        projects: ['SmartShop'] },
    ],
  },
  {
    key: 'servicesGroupData',
    services: [
      { id: 'Etl',   icon: faNetworkWired, tech: ['Python', 'Airflow', 'Talend', 'SQL'] },
      { id: 'Bi',    icon: faChartLine,    tech: ['Power BI', 'Python', 'Pandas', 'Streamlit'],  projects: ['Sales Forecast 2.0'] },
      { id: 'Scrap', icon: faRobot,        tech: ['Python', 'Spring Boot', 'SQL'] },
    ],
  },
];

export default function Services({ onContact }) {
  const { t } = useLanguage();
  let index = 0;

  return (
    <>
      {GROUPS.map((group) => (
        <section key={group.key} className="service-group">
          <h3 className="group-title">{t(group.key)}</h3>
          <div className="services-grid stagger">
            {group.services.map((s) => (
              <ServiceItem
                key={s.id}
                index={index++}
                icon={s.icon}
                title={t(`svc${s.id}Title`)}
                description={t(`svc${s.id}Desc`)}
                points={t(`svc${s.id}Points`)}
                tech={s.tech}
                projects={s.projects}
                projectsLabel={t('servicesBuilt')}
              />
            ))}
          </div>
        </section>
      ))}

      {onContact && (
        <div className="services-cta">
          <div>
            <strong>{t('servicesCtaTitle')}</strong>
            <p>{t('servicesCtaText')}</p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={onContact}>
            {t('contactMe')}
            <FontAwesomeIcon icon={faArrowRight} className="icon-shift" />
          </button>
        </div>
      )}
    </>
  );
}
