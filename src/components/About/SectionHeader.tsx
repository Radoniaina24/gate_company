"use client";

import { Globe, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export const SectionHeader = () => {
  const t = useTranslations("about.sectionHeader");

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      {/* Hero Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-sm border border-orange-300/20 rounded-full px-6 py-3 mb-8">
          <Globe className="w-5 h-5 text-orange-400 mr-2" />
          <span className="text-orange-200 font-medium">{t("badge")}</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6">
          <span className="block text-white mb-2">{t("title1")}</span>
          <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500 bg-clip-text text-transparent">
            {t("title2")}
          </span>
        </h1>

        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-500"></div>
          <Star className="w-8 h-8 text-orange-400" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500"></div>
        </div>
      </div>
    </div>
  );
};
