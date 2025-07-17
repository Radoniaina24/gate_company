"use client";
import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
type Feature = {
  icon: React.ElementType;
  number: string;
  title: string;
  description: string;
  highlight: string;
};
export default function UniqueFeatures() {
  const t = useTranslations("unique");
  const features: Feature[] = [
    {
      icon: Users,
      number: "01",
      title: t("features.0.title"),
      description: t("features.0.description"),
      highlight: t("features.0.highlight"),
    },
    {
      icon: BookOpen,
      number: "02",
      title: t("features.1.title"),
      description: t("features.1.description"),
      highlight: t("features.1.highlight"),
    },
    {
      icon: TrendingUp,
      number: "03",
      title: t("features.2.title"),
      description: t("features.2.description"),
      highlight: t("features.2.highlight"),
    },
    {
      icon: Award,
      number: "04",
      title: t("features.3.title"),
      description: t("features.3.description"),
      highlight: t("features.3.highlight"),
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Geometric background patterns */}
      <div className="absolute inset-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <polygon points="0,0 400,0 0,300" fill="url(#grad1)" />
          <polygon points="1000,1000 600,1000 1000,700" fill="url(#grad1)" />
        </svg>

        {/* Floating elements */}
        <div
          className="absolute top-20 right-20 w-32 h-32 border-2 border-blue-200 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-24 h-24 border-2 border-orange-200 rounded-full animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimalist Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-orange-50 px-6 py-2 rounded-full mb-8 border border-blue-100">
            <Star className="w-5 h-5 text-orange-500" />
            <span className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-4 tracking-tight leading-none">
            {t("title")}
          </h2>
          <div className="relative inline-block">
            <h3 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              {t("highlight")}
            </h3>
            {/* Underline effect */}
            <div
              className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-orange-600 rounded-full transform scale-x-0 animate-pulse"
              style={{ animation: "scaleX 2s ease-in-out infinite alternate" }}
            ></div>
          </div>
        </div>

        {/* Timeline-style layout */}
        <div className="space-y-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="relative">
                {/* Connecting line */}
                {index < features.length - 1 && (
                  <div className="absolute left-1/2 top-32 w-0.5 h-16 bg-gradient-to-b from-slate-200 to-transparent transform -translate-x-0.5 hidden lg:block"></div>
                )}

                <div
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content side */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="group">
                      {/* Number badge */}
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                          index === 0
                            ? "bg-gradient-to-br from-blue-500 to-blue-600"
                            : index === 1
                            ? "bg-gradient-to-br from-orange-500 to-orange-600"
                            : index === 2
                            ? "bg-gradient-to-br from-blue-600 to-blue-700"
                            : "bg-gradient-to-br from-orange-600 to-orange-700"
                        } shadow-xl transform group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-white font-bold text-xl">
                          {feature.number}
                        </span>
                      </div>

                      {/* Highlight badge */}
                      <div className="inline-block bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-2 rounded-full mb-4 border border-slate-200">
                        <span className="text-slate-600 font-medium text-sm">
                          {feature.highlight}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-lg leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Visual side */}
                  <div className="flex-1 flex justify-center">
                    <div className="relative">
                      {/* Main circle */}
                      <div
                        className={`w-80 h-80 rounded-full ${
                          index === 0
                            ? "bg-gradient-to-br from-blue-100 to-blue-200"
                            : index === 1
                            ? "bg-gradient-to-br from-orange-100 to-orange-200"
                            : index === 2
                            ? "bg-gradient-to-br from-blue-200 to-blue-300"
                            : "bg-gradient-to-br from-orange-200 to-orange-300"
                        } flex items-center justify-center shadow-2xl hover:shadow-3xl transition-shadow duration-500 group`}
                      >
                        {/* Inner circle with icon */}
                        <div
                          className={`w-40 h-40 rounded-full ${
                            index === 0
                              ? "bg-gradient-to-br from-blue-500 to-blue-600"
                              : index === 1
                              ? "bg-gradient-to-br from-orange-500 to-orange-600"
                              : index === 2
                              ? "bg-gradient-to-br from-blue-600 to-blue-700"
                              : "bg-gradient-to-br from-orange-600 to-orange-700"
                          } flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                        >
                          <IconComponent className="w-16 h-16 text-white" />
                        </div>

                        {/* Floating elements around the circle */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                          <Zap className="w-4 h-4 text-yellow-500" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full animate-pulse"></div>
                      </div>

                      {/* Orbiting elements */}
                      <div
                        className="absolute inset-0 animate-spin"
                        style={{ animationDuration: "15s" }}
                      >
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full transform -translate-x-1.5"></div>
                        <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-orange-400 rounded-full transform -translate-x-1.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <div className="inline-block bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-8 shadow-2xl border border-slate-200 max-w-2xl">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-200"></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse delay-400"></div>
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-2">
              {t("cta.title")}
            </h4>
            <p className="text-slate-600 mb-6">{t("cta.description")}</p>
            <Link
              href={"/inscription/recruteur"}
              className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center space-x-2"
            >
              <span>{t("cta.button")}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleX {
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}
