"use client";
import React from "react";
import {
  Check,
  Hotel,
  Coffee,
  Car,
  PartyPopper,
  FileText,
  User,
  Globe,
  Camera,
  Megaphone,
  Shield,
  GraduationCap,
  Headphones,
} from "lucide-react";

import HeadPacks from "./HeadPacks";
import { Feature, PackCard } from "./PackCard";

const PricingPacks: React.FC = () => {
  const standardFeatures: Feature[] = [
    {
      text: "🏨 Séjour de 2 nuits au Carlton Hotel 5 étoiles, chambre double + petit-déjeuner VIP",
      icon: <Hotel className="w-5 h-5" />,
      highlight: true,
    },
    {
      text: "☕ Pause café premium et déjeuner buffet gastronomique (22-23)",
      icon: <Coffee className="w-5 h-5" />,
    },
    {
      text: "🚗 Transferts VIP & restauration complète incluse",
      icon: <Car className="w-5 h-5" />,
    },
    {
      text: "🏢 Stand professionnel équipé + visibilité garantie",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      text: "🎉 Soirée de gala VIP exclusive (réseau premium)",
      icon: <PartyPopper className="w-5 h-5" />,
      highlight: true,
    },
    {
      text: "📋 CVs pré-filtrés selon vos critères spécifiques",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      text: "🎯 Coaching express des meilleurs candidats",
      icon: <GraduationCap className="w-5 h-5" />,
    },
  ];

  const premiumFeatures: Feature[] = [
    {
      text: "✅ TOUS les avantages du pack Standard inclus",
      icon: <Check className="w-5 h-5" />,
      highlight: true,
    },
    {
      text: "👤 Assistant personnel dédié 24h/24 (concierge)",
      icon: <User className="w-5 h-5" />,
      highlight: true,
    },
    {
      text: "🌍 Interprète professionnel multilingue",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      text: "📺 Couverture média professionnelle + relations presse",
      icon: <Camera className="w-5 h-5" />,
      highlight: true,
    },
    {
      text: "📢 Mise en avant prioritaire sur toutes nos plateformes",
      icon: <Megaphone className="w-5 h-5" />,
    },
    {
      text: "🛡️ Service administratif complet (visa, passeport, certificats)",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      text: "🎓 Formation approfondie + suivi RH personnalisé (3 mois)",
      icon: <Headphones className="w-5 h-5" />,
      highlight: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header avec impact */}
        <HeadPacks />
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-16">
          <PackCard
            title="Pack Standard"
            price="1 200 €"
            originalPrice="1 500 €"
            representatives="2 représentants"
            features={standardFeatures}
            note="Démarches administratives non incluses"
            badge="ÉCONOMIE 300€"
            savings="20% OFF"
          />

          <PackCard
            title="Pack Premium"
            price="2 000 €"
            originalPrice="2 800 €"
            representatives="2 représentants"
            features={premiumFeatures}
            isPremium={true}
            badge="SERVICE COMPLET"
            savings="28% OFF"
          />
        </div>

        {/* Social proof */}
        {/* <Social /> */}

        {/* CTA Final avec urgence */}
        {/* <Contact /> */}
      </div>
    </div>
  );
};

export default PricingPacks;
