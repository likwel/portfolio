import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// On crée une interface pour typer les props
interface CollapseItemProps {
  title: string;
  icon: IconDefinition;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export default function CollapseItem({
  title,
  icon,
  children,
  isOpen,
  onToggle,
}: CollapseItemProps) {
  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={icon} className="text-blue-600 text-lg" />
          <span className="font-semibold">{title}</span>
        </div>

        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 p-4" : "max-h-0 opacity-0 p-0"
        } overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}
