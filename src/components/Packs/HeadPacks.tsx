import { TrendingUp } from "lucide-react";
import React from "react";

export default function HeadPacks() {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-orange-100 px-6 py-2 rounded-full text-sm font-semibold text-gray-700 mb-6">
        <TrendingUp className="w-4 h-4" />
        Plus de 500 entreprises nous font confiance
      </div>
      <h1 className="text-5xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
        Boostez Votre <br />
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent animate-pulse">
          Recrutement
        </span>
      </h1>
      <p className="text-xl md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
        🚀 Découvrez nos solutions premium pour transformer votre stratégie RH
        et recruter les meilleurs talents.
      </p>
    </div>
  );
}
