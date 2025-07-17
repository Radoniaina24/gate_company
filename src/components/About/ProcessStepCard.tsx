import { CheckCircle } from "lucide-react";
import { CSS_CLASSES, ProcessStep } from "./About";

interface ProcessStepCardProps {
  readonly step: ProcessStep;
}

export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({ step }) => (
  <div className="flex items-start space-x-4 group hover:bg-white/5 p-4 rounded-2xl transition-all duration-300">
    <div
      className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-xl flex items-center justify-center font-bold text-white shadow-lg`}
    >
      {step.step}
    </div>
    <div>
      <h4 className={`text-lg font-semibold ${CSS_CLASSES.primaryText} mb-2`}>
        {step.title}
      </h4>
      <p className={`${CSS_CLASSES.accentText} text-sm`}>{step.description}</p>
    </div>
    <CheckCircle className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
);
