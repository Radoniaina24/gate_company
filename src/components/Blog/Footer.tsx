import { Globe } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-center text-center">
          <div className="max-w-4xl">
            <p className="text-gray-300 text-lg leading-relaxed">
              <span className="text-red-400 font-semibold">
                Gate Africa Group
              </span>{" "}
              - L&apos;un des pôles médias de référence, suivi par des millions
              de personnes à travers le monde, et principalement sur le
              continent africain.
            </p>
            <div className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600/20 to-white/20 rounded-full border border-red-500/30">
              <Globe className="w-5 h-5 text-red-400 mr-3" />
              <span className="text-red-200 font-medium">
                www.GateOfAfrica.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
