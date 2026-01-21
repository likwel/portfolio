import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ServiceItemProps {
  icon: IconDefinition;
  title: string;
  description: string;
}

export default function ServiceItem({ icon, title, description }: ServiceItemProps) {
  return (
    <div className="experience-item">
      <FontAwesomeIcon icon={icon} className="text-blue-600 text-3xl mb-2" />
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
