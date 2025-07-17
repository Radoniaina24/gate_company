"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Briefcase, Users, BarChart3, Mail, MapPin, Award } from "lucide-react";
import Link from "next/link";

const RecruiterComponent: React.FC = () => {
  // Hook de traduction avec namespace spécifique
  const t = useTranslations("recruiter");

  // Configuration des avantages avec traductions
  const benefits = [
    {
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
      key: "qualifiedTalents",
    },
    {
      icon: MapPin,
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
      key: "localInternational",
    },
    {
      icon: BarChart3,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
      key: "customPacks",
    },
    {
      icon: Award,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",
      key: "premiumService",
    },
  ];

  // Configuration des sections "Pourquoi participer"
  const whyParticipateItems = [
    {
      icon: Users,
      gradient: "from-blue-400 to-blue-500",
      key: "directAccess",
    },
    {
      icon: BarChart3,
      gradient: "from-green-400 to-green-500",
      key: "customSolutions",
    },
    {
      icon: Award,
      gradient: "from-orange-400 to-orange-500",
      key: "expertSupport",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section Recruteur */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-12 border border-blue-200 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t("hero.title")}
          </h2>
          <h3 className="text-2xl font-semibold text-blue-600 mb-8">
            {t("hero.subtitle")}
          </h3>

          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <p className="text-gray-700 text-xl leading-relaxed mb-6">
              {t.rich("hero.description", {
                tarifs: (chunks) => (
                  <span className="font-semibold text-blue-700">{chunks}</span>
                ),
                packs: (chunks) => (
                  <span className="font-semibold text-blue-700">{chunks}</span>
                ),
                recrutement: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>

            {/* Icônes des avantages */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div
                      className={`w-16 h-16 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${benefit.iconColor}`}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {t(`benefits.${benefit.key}`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-xl mb-4">
              {t("hero.cta")}
            </button>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-200 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                <Mail className="w-5 h-5" />
                {t("hero.sendEmail")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Section informative */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {t("whyParticipate.title")}
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {whyParticipateItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="text-center">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {t(`whyParticipate.${item.key}.title`)}
                </h4>
                <p className="text-gray-600">
                  {t(`whyParticipate.${item.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecruiterComponent;
