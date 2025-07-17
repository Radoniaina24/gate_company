import React from "react";
import { Camera, Headphones, Music, Users, LucideIcon } from "lucide-react";
import { CSS_CLASSES } from "./About";
import { useTranslations } from "next-intl";

type LiveCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  gradientClass: string;
  borderClass: string;
  iconClass: string;
};

const LiveCard: React.FC<LiveCardProps> = ({
  icon: Icon,
  title,
  description,
  gradientClass,
  borderClass,
  iconClass,
}) => (
  <div
    className={`${gradientClass} ${borderClass} backdrop-blur-xl rounded-2xl p-6`}
  >
    <div className="flex items-start space-x-4">
      <Icon className={`w-6 h-6 mt-1 flex-shrink-0 ${iconClass}`} />
      <div>
        <h4 className={`text-lg font-semibold ${CSS_CLASSES.primaryText} mb-2`}>
          {title}
        </h4>
        <p className={CSS_CLASSES.secondaryText}>{description}</p>
      </div>
    </div>
  </div>
);

export default function LiveSection() {
  const t = useTranslations("about.live");

  const cards: LiveCardProps[] = [
    {
      icon: Camera,
      title: t("cards.0.title"),
      description: t("cards.0.description"),
      gradientClass: "bg-gradient-to-r from-purple-600/10 to-pink-600/10",
      borderClass: "border border-purple-300/20",
      iconClass: "text-purple-400",
    },
    {
      icon: Music,
      title: t("cards.1.title"),
      description: t("cards.1.description"),
      gradientClass: "bg-gradient-to-r from-emerald-500/10 to-teal-500/10",
      borderClass: "border border-emerald-300/20",
      iconClass: "text-emerald-400",
    },
    {
      icon: Headphones,
      title: t("cards.2.title"),
      description: t("cards.2.description"),
      gradientClass: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10",
      borderClass: "border border-blue-300/20",
      iconClass: "text-blue-400",
    },
    {
      icon: Users,
      title: t("cards.3.title"),
      description: t("cards.3.description"),
      gradientClass: "bg-gradient-to-r from-rose-500/10 to-pink-500/10",
      borderClass: "border border-rose-300/20",
      iconClass: "text-rose-400",
    },
  ];

  return (
    <div className="mt-8 space-y-6">
      {cards.map((card, index) => (
        <LiveCard key={index} {...card} />
      ))}
    </div>
  );
}
