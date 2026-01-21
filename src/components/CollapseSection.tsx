import { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface CollapseSectionProps {
  title: string;
  icon: IconDefinition;
  children: ReactNode;
}

export default function CollapseSection({ title, icon, children }: CollapseSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow">
      {/* Titre toujours visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between space-between p-4 hover:bg-gray-50 transition collapse-menu"
      >
        <div className="flex items-center gap-3  fs-20px">
          <FontAwesomeIcon icon={icon} className="text-blue-600 text-lg" />
          <span className="ml-3 font-semibold">{title}</span>
        </div>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp :faChevronDown}
          className={`transition-transform ${isOpen ? "rotate-180" : ""} text-primary`}
        />
      </button>

      {/* Contenu hidden par défaut */}
      {isOpen && (
        <div className="lg:p-4">
          {children}
        </div>
      )}
    </div>
  );
}
