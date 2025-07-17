"use client";

import React, { useState, useCallback } from "react";
import {
  Briefcase,
  Globe,
  Users,
  Zap,
  Building,
  Utensils,
  Truck,
  Heart,
  Calculator,
  Headphones,
  Code,
  Camera,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectorCard } from "./SectorCard";
import { SpecialProgramCard } from "./SpecialProgramCard";
import { ProcessStepCard } from "./ProcessStepCard";
import { FeatureCardComponent } from "./FeatureCardComponent";
import LiveSection from "./LiveSection";
import { useTranslations } from "next-intl";

// Type pour les icônes Lucide
type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;
// Types et interfaces
export interface Sector {
  readonly id: string;
  readonly title: string;
  readonly icon: LucideIcon;
  readonly color: string;
  readonly description: string;
}
export interface SpecialProgram {
  readonly title: string;
  readonly items: readonly string[];
}
export interface ProcessStep {
  readonly step: number;
  readonly title: string;
  readonly description: string;
  readonly gradient: string;
}

export interface FeatureCard {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly gradient: string;
}

export const CSS_CLASSES = {
  container: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20",
  card: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500",
  gradientCard:
    "bg-gradient-to-r from-orange-500/10 to-blue-600/10 backdrop-blur-xl border border-orange-300/20 rounded-3xl p-8",
  primaryText: "text-white",
  secondaryText: "text-gray-300",
  accentText: "text-gray-400",
  gradientText:
    "bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent",
} as const;

// Composant principal
const AboutSection: React.FC = () => {
  const t = useTranslations("about");
  const PROCESS_STEPS: readonly ProcessStep[] = Array.from({ length: 4 }).map(
    (_, i) => ({
      step: i + 1,
      title: t(`process.steps.${i}.title`),
      description: t(`process.steps.${i}.description`),
      gradient: [
        "from-orange-400 to-orange-600",
        "from-blue-400 to-blue-600",
        "from-orange-500 to-blue-500",
        "from-blue-500 to-orange-500",
      ][i],
    })
  );

  const SECTORS: Sector[] = [
    {
      id: "btp",
      icon: Building,
      color: "from-orange-500 to-red-600",
      title: t("sectors.btp.title"),
      description: t("sectors.btp.description"),
    },
    {
      id: "tourism",
      icon: Utensils,
      color: "from-blue-500 to-cyan-600",
      title: t("sectors.tourism.title"),
      description: t("sectors.tourism.description"),
    },
    {
      id: "transport",
      icon: Truck,
      color: "from-green-500 to-emerald-600",
      title: t("sectors.transport.title"),
      description: t("sectors.transport.description"),
    },
    {
      id: "health",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
      title: t("sectors.health.title"),
      description: t("sectors.health.description"),
    },
    {
      id: "admin",
      icon: Calculator,
      color: "from-purple-500 to-violet-600",
      title: t("sectors.admin.title"),
      description: t("sectors.admin.description"),
    },
    {
      id: "support",
      icon: Headphones,
      color: "from-indigo-500 to-blue-600",
      title: t("sectors.support.title"),
      description: t("sectors.support.description"),
    },
    {
      id: "it",
      icon: Code,
      color: "from-cyan-500 to-teal-600",
      title: t("sectors.it.title"),
      description: t("sectors.it.description"),
    },
    {
      id: "events",
      icon: Camera,
      color: "from-yellow-500 to-orange-600",
      title: t("sectors.events.title"),
      description: t("sectors.events.description"),
    },
  ];
  const SPECIAL_PROGRAMS: readonly SpecialProgram[] = t.raw(
    "programs"
  ) as SpecialProgram[];
  const FEATURE_CARDS: readonly FeatureCard[] = [
    {
      title: t("features.international.title"),
      description: t("features.international.description"),
      icon: Globe,
      gradient: "from-orange-400 to-orange-600",
    },
    {
      title: t("features.talents.title"),
      description: t("features.talents.description"),
      icon: Users,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: t("features.efficient.title"),
      description: t("features.efficient.description"),
      icon: Zap,
      gradient: "from-orange-500 to-blue-500",
    },
  ] as const;
  const [expandedSector, setExpandedSector] = useState<string | null>(null);

  const handleSectorToggle = useCallback((sectorId: string) => {
    setExpandedSector((current) => (current === sectorId ? null : sectorId));
  }, []);

  return (
    <section className="relative min-h-screen py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-orange-900 overflow-hidden">
      {/* Fond animé */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-400/10 to-blue-400/10 rounded-full blur-2xl" />
      </div>

      <div className={CSS_CLASSES.container}>
        {/* En-tête principal */}
        <SectionHeader />

        {/* Grille de contenu principal */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          {/* Colonne gauche - Description principale */}
          <div className="lg:col-span-7 space-y-8">
            <div className={CSS_CLASSES.card}>
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2
                    className={`text-3xl sm:text-4xl font-bold ${CSS_CLASSES.primaryText} mb-4`}
                  >
                    {t("heading")}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full" />
                </div>
              </div>

              <p
                className={`text-xl ${CSS_CLASSES.secondaryText} leading-relaxed mb-6`}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: t
                      .raw("intro.paragraph")
                      .replace(
                        "<strong>",
                        '<span class="text-orange-400 font-semibold">'
                      )
                      .replace("</strong>", "</span>")
                      .replace(
                        "<highlight>",
                        '<span class="text-blue-400 font-semibold">'
                      )
                      .replace("</highlight>", "</span>"),
                  }}
                />
              </p>

              <div className={`flex items-center ${CSS_CLASSES.accentText}`}>
                <Zap className="w-5 h-5 text-orange-400 mr-2" />
                <span>{t("intro.tagline")}</span>
              </div>
            </div>

            {/* Bloc accompagnement */}
            <div className={CSS_CLASSES.gradientCard}>
              <h3
                className={`text-2xl font-bold ${CSS_CLASSES.primaryText} mb-6 flex items-center`}
              >
                <Users className="w-6 h-6 text-blue-400 mr-3" />
                {t("support.title")}
              </h3>
              <p
                className={`text-lg ${CSS_CLASSES.secondaryText} leading-relaxed mb-6`}
              >
                {t("support.paragraph")}
              </p>
            </div>
          </div>

          {/* Colonne droite - Étapes du processus */}
          <div className="lg:col-span-5">
            <div className={`${CSS_CLASSES.card} h-full`}>
              <h3
                className={`text-2xl font-bold ${CSS_CLASSES.primaryText} mb-8 text-center`}
              >
                {t("process.title")}
              </h3>

              <div className="space-y-6">
                {PROCESS_STEPS.map((step) => (
                  <ProcessStepCard key={step.step} step={step} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Vivier de talents */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2
              className={`text-4xl sm:text-5xl font-bold ${CSS_CLASSES.primaryText} mb-6`}
            >
              {/* Notre vivier de{" "}
              <span className={CSS_CLASSES.gradientText}>talents</span> */}
              {t.rich("sectors.title", {
                span: (chuncks) => (
                  <span className={CSS_CLASSES.gradientText}>{chuncks}</span>
                ),
              })}
            </h2>
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-500" />
              <Users className="w-8 h-8 text-orange-400" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-500" />
            </div>
          </div>

          {/* Grille des secteurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {SECTORS.map((sector) => (
              <SectorCard
                key={sector.id}
                sector={sector}
                isExpanded={expandedSector === sector.id}
                onToggle={handleSectorToggle}
              />
            ))}
          </div>

          {/* Programmes spéciaux */}
          <div className="space-y-8">
            {SPECIAL_PROGRAMS.map((program, index) => (
              <SpecialProgramCard key={index} program={program} index={index} />
            ))}
          </div>

          <LiveSection />
        </div>

        {/* Statistiques/Fonctionnalités en bas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURE_CARDS.map((feature, index) => (
            <FeatureCardComponent key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
