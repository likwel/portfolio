import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function CollapseSection({ 
  id, 
  title, 
  icon, 
  children, 
  isOpen, 
  onToggle 
}) {
  return (
    <div id={id} className="border rounded-xl overflow-hidden bg-white shadow border-1rem">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between space-between p-4 hover:bg-gray-50 transition collapse-menu"
      >
        <div className="flex items-center gap-3 fs-20px">
          <FontAwesomeIcon icon={icon} className="text-blue-600 text-lg" />
          <span className="ml-3 font-semibold">{title}</span>
        </div>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className={`transition-transform ${isOpen ? "rotate-180" : ""} text-primary`}
        />
      </button>

      {isOpen && (
        <div className="lg:p-4">
          {children}
        </div>
      )}
    </div>
  );
}