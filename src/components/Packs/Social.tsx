import React from "react";

export default function Social() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ⭐ Ils nous recommandent à 98%
        </h2>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Entreprises</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">15K+</div>
            <div className="text-sm text-gray-600">Candidats</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">92%</div>
            <div className="text-sm text-gray-600">Taux succès</div>
          </div>
        </div>
      </div>
    </div>
  );
}
