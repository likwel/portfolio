import { faCode, faLaptopCode, faDatabase, faNetworkWired, faSearch, faUsersCog, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ServiceItem from "./ServiceItem";
import { useLanguage } from '../contexts/LanguageContext';


export default function Services() {

  const { t } = useLanguage();

  const services = [
    {
      icon: faNetworkWired,
      title: t('dataEngineering'),
      description: t('dataEngineeringDesc'),
    },
    {
      icon: faDatabase,
      title: t('dataAnalysis'),
      description: t('dataAnalysisDesc'),
    },
    {
      icon: faSearch,
      title: t('webScraping'),
      description: t('webScrapingDesc'),
    },
    {
      icon: faCode,
      title: t('webDevelopmentService'),
      description: t('webDevelopmentDesc'),
    },
    {
      icon: faLaptopCode,
      title: t('softwareDevelopment'),
      description: t('softwareDevelopmentDesc'),
    },
    {
      icon: faShoppingCart,
      title: t('ecommerce'),
      description: t('ecommerceDesc'),
    }
  ];

  return (
    <main id="services" className="bg-white pt-10 border-1rem">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-center">{t('myServices')}</h1>
        <p className="text-center text-gray-700 mb-6">{t('servicesSubtitle')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 experience">
          {services.map((service, idx) => (
            <ServiceItem
              key={idx}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
