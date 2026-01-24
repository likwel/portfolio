import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DuotoneIcon({
  icon,
  // bgColor = "text-blue-200",
  // fgColor = "text-blue-600",
  bgColor = "bgColorTheme",
  fgColor = "fgColorTheme",
  size = "text-3xl",
  backActive = true,
}) {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* couche arrière */}
      {backActive && (
        <FontAwesomeIcon
          icon={icon}
          className={`${bgColor} text-2xl absolute opacity-10`}
        />
      )}

      {/* couche avant */}
      <FontAwesomeIcon
        icon={icon}
        className={`${fgColor} ${size} relative`}
      />
    </div>
  );
}
