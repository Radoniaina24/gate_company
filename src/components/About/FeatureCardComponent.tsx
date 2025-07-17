import { CSS_CLASSES, FeatureCard } from "./About";

interface FeatureCardComponentProps {
  readonly feature: FeatureCard;
}

export const FeatureCardComponent: React.FC<FeatureCardComponentProps> = ({
  feature,
}) => {
  const { title, description, icon: Icon, gradient } = feature;

  return (
    <div className={`text-center ${CSS_CLASSES.card}`}>
      <div
        className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mx-auto mb-4`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className={`text-2xl font-bold ${CSS_CLASSES.primaryText} mb-2`}>
        {title}
      </h3>
      <p className={CSS_CLASSES.accentText}>{description}</p>
    </div>
  );
};
