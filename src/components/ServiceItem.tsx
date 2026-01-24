import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ServiceItemProps {
  icon: IconDefinition;
  title: string;
  description: string;
}

export default function ServiceItem({ icon, title, description }: ServiceItemProps) {
  return (
    <div className="bg-gray-50 hover:bg-gray-100 transition-all duration-300  transition-colors shadow-sm hover:shadow-lg experience-item">
      <FontAwesomeIcon icon={icon} className="fgColorTheme text-3xl mb-2" />
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
