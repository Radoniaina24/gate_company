"use client";
/* eslint-disable */
import { ArrowRight, Clock, Crown, Users, Zap } from "lucide-react";
import { useState } from "react";

export interface Feature {
  text: string;
  icon: React.ReactNode;
  highlight?: boolean;
}
interface PackProps {
  title: string;
  price: string;
  originalPrice?: string;
  representatives: string;
  features: Feature[];
  isPremium?: boolean;
  note?: string;
  badge?: string;
  savings?: string;
}
export const PackCard: React.FC<PackProps> = ({
  title,
  price,
  originalPrice,
  representatives,
  features,
  isPremium,
  note,
  badge,
  savings,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl p-8 shadow-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-3xl hover:-rotate-1 ${
        isPremium
          ? "bg-gradient-to-br from-orange-50 via-white to-orange-100 border-3 border-orange-400 ring-4 ring-orange-200 ring-opacity-50"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100 border-3 border-blue-400 hover:border-blue-500"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges multiples */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 items-center">
        {isPremium && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl animate-pulse">
            <Crown className="w-4 h-4 fill-current" />
            MEILLEURE VALEUR
          </div>
        )}
        {badge && (
          <div
            className={`${
              isPremium
                ? "bg-gradient-to-r from-red-500 to-pink-500"
                : "bg-gradient-to-r from-green-500 to-emerald-500"
            } text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg`}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Savings indicator */}
      {savings && (
        <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-xs font-bold shadow-xl animate-bounce">
          {savings}
        </div>
      )}

      <div className="text-center mb-8 pt-6">
        <h3
          className={`text-3xl font-extrabold mb-3 ${
            isPremium ? "text-orange-800" : "text-blue-800"
          }`}
        >
          {title}
        </h3>

        {/* Prix avec effet de comparaison */}
        <div className="mb-3">
          {originalPrice && (
            <div className="text-lg text-gray-500 line-through mb-1">
              {originalPrice}
            </div>
          )}
          <div
            className={`text-5xl font-black mb-2 ${
              isPremium
                ? "bg-gradient-to-r from-orange-600 to-red-600"
                : "bg-gradient-to-r from-blue-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            {price}
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold shadow-lg ${
            isPremium
              ? "bg-gradient-to-r from-orange-200 to-orange-300 text-orange-900 border-2 border-orange-400"
              : "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900 border-2 border-blue-400"
          }`}
        >
          <Users className="w-5 h-5" />
          {representatives}
        </div>
      </div>

      {/* Features avec animations */}
      <div className="space-y-2 mb-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 group p-3 rounded-xl transition-all duration-300 ${
              feature.highlight
                ? "bg-yellow-50 border-l-4 border-yellow-400 shadow-sm"
                : "hover:bg-white hover:shadow-sm"
            }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-125 ${
                isPremium
                  ? "bg-gradient-to-r from-orange-500 to-red-500"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
              } shadow-lg`}
            >
              <div className="text-white w-5 h-5">{feature.icon}</div>
            </div>
            <span
              className={`leading-relaxed font-medium ${
                feature.highlight
                  ? "text-yellow-800 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {note && (
        <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl shadow-sm">
          <p className="text-sm text-amber-800 font-semibold">
            <strong>⚠️ Important :</strong> {note}
          </p>
        </div>
      )}

      {/* CTA avec urgence */}
      <div className="mt-8 space-y-3">
        <button
          className={`w-full py-4 px-6 rounded-2xl font-bold text-md transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 ${
            isPremium
              ? "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white shadow-xl"
              : "bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-xl"
          }`}
        >
          <Zap className="w-5 h-5" />
          RÉSERVER MAINTENANT
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium">
            <Clock className="w-4 h-4 inline mr-1" />
            Places limitées
          </p>
        </div>
      </div>
    </div>
  );
};
