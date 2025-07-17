import { Gift, Mail, Phone } from "lucide-react";
import React from "react";

export default function Contact() {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <Gift className="w-16 h-16 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl font-black mb-6">
            🔥 BONUS EXCLUSIF : Réservez maintenant !
          </h2>
          <p className="text-xl mb-8 opacity-90">
            + Formation gratuite d&apos;une valeur de 500€
            <br />
            + Accès VIP à notre réseau premium
            <br />+ Garantie satisfaction 100%
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-purple-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
              <Phone className="w-5 h-5" />
              Appeler maintenant
            </button>
            <button className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
              <Mail className="w-5 h-5" />
              Devis gratuit
            </button>
          </div>
          <p className="text-sm mt-4 opacity-75">
            📞 Réponse garantie sous 2h - Service client 7j/7
          </p>
        </div>
      </div>
    </div>
  );
}
