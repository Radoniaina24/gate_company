import { UserCheck } from "lucide-react";
import { CSS_CLASSES, SpecialProgram } from "./About";

interface SpecialProgramCardProps {
  readonly program: SpecialProgram;
  readonly index: number;
}

export const SpecialProgramCard: React.FC<SpecialProgramCardProps> = ({
  program,
}) => (
  <div className={CSS_CLASSES.gradientCard}>
    <h3
      className={`text-2xl font-bold ${CSS_CLASSES.primaryText} mb-6 flex items-center`}
    >
      <UserCheck className="w-6 h-6 text-orange-400 mr-3" />
      {program.title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {program.items.map((item, itemIndex) => (
        <div
          key={itemIndex}
          className="flex items-start space-x-3 bg-white/5 rounded-xl p-4"
        >
          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
          <span className={CSS_CLASSES.secondaryText}>{item}</span>
        </div>
      ))}
    </div>
  </div>
);
