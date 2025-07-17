import React from "react";
import { CreditCard, Phone, Building2, MapPin, Hash } from "lucide-react";

export default function Virement() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg">
      {/* Titre principal */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">
          NUMÉRO DU COMPTE POUR CHAQUE MODE DE PAIEMENT
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-1 gap-6">
        {/* Section MVOLA */}
        <div className="bg-white rounded-xl shadow-lg border-x-4 border-orange-500 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <Phone className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-orange-600">MVOLA</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-orange-700 text-center">
                034 57 777 01
              </p>
            </div>
            <div className="text-center">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                au nom de EMEDIA
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Section Banques */}
      <div className="bg-white rounded-xl shadow-lg border-x-4 mt-5 border-blue-500 p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-center  mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-blue-600">
            VERSEMENT BANCAIRE
          </h3>
        </div>

        <div className="text-sm text-center text-gray-600 mb-4">
          <p className="font-medium">ESPÈCE • CHÈQUE • VIREMENT</p>
        </div>
      </div>
      {/* Détails des banques */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {/* Société Générale */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-blue-700">
              Société Générale Madagascar (BRED)
            </h4>
          </div>

          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-lg font-mono font-bold text-blue-800">
                00008 00019 04506001603 39
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold text-gray-700">Agence</p>
                  <p className="text-blue-600">ANTANANARIVO - AMBANIDIA</p>
                </div>
              </div>

              <div className="flex items-center">
                <Hash className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold text-gray-700">Code banque</p>
                  <p className="text-blue-600 font-mono">00008</p>
                </div>
              </div>

              <div className="flex items-center">
                <Hash className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold text-gray-700">Code guichet</p>
                  <p className="text-blue-600 font-mono">00019</p>
                </div>
              </div>

              <div className="flex items-center">
                <Hash className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold text-gray-700">Clé RIB</p>
                  <p className="text-blue-600 font-mono">39</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-2 rounded">
              <p className="text-xs text-gray-600">
                N° de compte:{" "}
                <span className="font-mono font-semibold">04506001603</span>
              </p>
            </div>
          </div>
        </div>

        {/* BNI */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500">
          <div className="flex items-center mb-4">
            <div className="bg-orange-100 p-2 rounded-lg mr-3">
              <Building2 className="w-5 h-5 text-orange-600" />
            </div>
            <h4 className="font-bold text-orange-700">
              Banque Nationale d&apos;Investissement (BNI)
            </h4>
          </div>

          <div className="space-y-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-lg font-mono font-bold text-orange-800">
                00005 00065 72115220001 45
              </p>
            </div>

            <div className="text-center mb-3">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                Au nom de: Groupe e-media
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <Hash className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold text-gray-700">Code banque</p>
                  <p className="text-orange-600 font-mono">00005</p>
                </div>
              </div>

              <div className="flex items-center">
                <Hash className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold text-gray-700">Code guichet</p>
                  <p className="text-orange-600 font-mono">00065</p>
                </div>
              </div>

              <div className="flex items-center">
                <Hash className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold text-gray-700">Clé RIB</p>
                  <p className="text-orange-600 font-mono">45</p>
                </div>
              </div>

              <div className="flex items-center">
                <Hash className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold text-gray-700">N° de compte</p>
                  <p className="text-orange-600 font-mono">72115220001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-md">
          <CreditCard className="w-4 h-4 text-blue-500 mr-2" />
          <span className="text-sm text-gray-600 font-medium">
            Choisissez votre mode de paiement préféré
          </span>
        </div>
      </div>
    </div>
  );
}
