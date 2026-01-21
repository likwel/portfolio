import { faCode, faLaptopCode, faDatabase, faNetworkWired, faSearch, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import ServiceItem from "./ServiceItem";

const services = [
  {
    icon: faCode,
    title: "Web Development",
    description: "Design and development of modern, responsive websites and web applications tailored to your business needs.",
  },
  {
    icon: faLaptopCode,
    title: "Software Development",
    description: "Custom software solutions built with cutting-edge technologies to streamline your business operations.",
  },
  {
    icon: faDatabase,
    title: "Data Analysis",
    description: "Transform raw data into actionable insights through advanced analytics and visualization techniques.",
  },
  {
    icon: faNetworkWired,
    title: "Data Engineering",
    description: "Build robust data pipelines, ETL processes, and scalable architectures for big data management.",
  },
  {
    icon: faSearch,
    title: "Web Scraping & Automation",
    description: "Automated data extraction and web scraping solutions to gather valuable information efficiently.",
  },
  {
    icon: faUsersCog,
    title: "Technical Consulting",
    description: "Expert guidance on software architecture, technology stack selection, and best development practices to optimize your digital projects.",
  },
];

export default function Services() {
  return (
    <main id="services" className="bg-white py-10 mt-4">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">My Services</h1>
        <p className="text-center text-gray-700 mb-6">Explore my areas of expertise:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 experience">
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
