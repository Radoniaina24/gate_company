import { useCallback } from "react";
import { CSS_CLASSES, Sector } from "./About";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SectorCardProps {
  readonly sector: Sector;
  readonly isExpanded: boolean;
  readonly onToggle: (sectorId: string) => void;
}

export const SectorCard: React.FC<SectorCardProps> = ({
  sector,
  isExpanded,
  onToggle,
}) => {
  const { icon: IconComponent, id, title, color, description } = sector;

  const handleClick = useCallback(() => {
    onToggle(id);
  }, [id, onToggle]);

  return (
    <div
      className={`${CSS_CLASSES.card} cursor-pointer`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-expanded={isExpanded}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div
            className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg`}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <h3 className={`text-lg font-bold ${CSS_CLASSES.primaryText}`}>
            {title}
          </h3>
        </div>
        {isExpanded ? (
          <ChevronUp className={`w-5 h-5 ${CSS_CLASSES.accentText} mt-1`} />
        ) : (
          <ChevronDown className={`w-5 h-5 ${CSS_CLASSES.accentText} mt-1`} />
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className={`${CSS_CLASSES.secondaryText} leading-relaxed`}>
            {description}
          </p>
        </div>
      )}
    </div>
  );
};
