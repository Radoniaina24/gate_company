"use client";

import React, { JSX, useState } from "react";
import {
  User,
  Building2,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Zap,
  Star,
} from "lucide-react";
import Link from "next/link";

type RoleType = "candidat" | "recruteur";

interface CardData {
  role: RoleType;
  title: string;
  description: string;
  icon: JSX.Element;
  features: { icon: JSX.Element; text: string }[];
  gradient: string;
  hoverGradient: string;
  textColor: string;
  buttonText: string;
  url: string;
}

const CARDS: CardData[] = [
  {
    role: "candidat",
    title: "CANDIDAT",
    description:
      "Propulsez votre carrière vers l'international avec nos opportunités d'emploi exclusives et notre accompagnement personnalisé.",
    icon: <User className="w-8 h-8 text-white" />,
    features: [
      {
        icon: <Target className="w-4 h-4 text-blue-400" />,
        text: "Opportunités ciblées",
      },
      {
        icon: <Zap className="w-4 h-4 text-cyan-400" />,
        text: "Formation express",
      },
      {
        icon: <Users className="w-4 h-4 text-blue-400" />,
        text: "Suivi personnalisé",
      },
      {
        icon: <Star className="w-4 h-4 text-cyan-400" />,
        text: "Succès garanti",
      },
    ],
    gradient: "from-blue-500 to-cyan-600",
    hoverGradient: "hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700",
    textColor: "group-hover:text-blue-300",
    buttonText: "Commencer mon parcours",
    url: "/inscription/candidat",
  },
  {
    role: "recruteur",
    title: "RECRUTEUR",
    description:
      "Accédez aux meilleurs talents malgaches, pré-sélectionnés et formés selon vos besoins spécifiques pour votre entreprise.",
    icon: <Building2 className="w-8 h-8 text-white" />,
    features: [
      {
        icon: <Target className="w-4 h-4 text-orange-400" />,
        text: "Talents qualifiés",
      },
      {
        icon: <Zap className="w-4 h-4 text-red-400" />,
        text: "Processus rapide",
      },
      {
        icon: <Users className="w-4 h-4 text-orange-400" />,
        text: "Support complet",
      },
      {
        icon: <Star className="w-4 h-4 text-red-400" />,
        text: "Résultats prouvés",
      },
    ],
    gradient: "from-orange-500 to-red-600",
    hoverGradient:
      "hover:from-orange-600 hover:via-red-600 hover:to-orange-700",
    textColor: "group-hover:text-orange-300",
    buttonText: "Trouver des talents",
    url: "/inscription/recruteur",
  },
];

function ProfileCard({
  data,
  isSelected,
  onHover,
  onLeave,
}: {
  data: CardData;
  isSelected: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className={`group relative cursor-pointer transition-all duration-700 ${
        isSelected ? "scale-105" : ""
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${data.gradient} rounded-2xl blur-sm opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse`}
      ></div>

      <div
        className={`relative bg-gradient-to-br from-slate-800/80 to-${
          data.role === "candidat" ? "blue" : "orange"
        }-900/80 backdrop-blur-2xl border border-${
          data.role === "candidat" ? "blue" : "orange"
        }-300/20 rounded-2xl p-8 h-[450px] flex flex-col overflow-hidden shadow-xl`}
      >
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-6 relative inline-block">
            <div
              className={`relative w-16 h-16 bg-gradient-to-r ${data.gradient} rounded-xl flex items-center justify-center shadow-xl`}
            >
              {data.icon}
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2
                className={`text-3xl font-black text-white mb-3 ${data.textColor} transition-colors duration-300`}
              >
                {data.title}
              </h2>
              <div
                className={`w-16 h-1 bg-gradient-to-r ${data.gradient} rounded-full mb-4`}
              ></div>
            </div>

            <p className="text-base text-gray-200 leading-relaxed font-medium">
              {data.description}
            </p>

            <div className="grid grid-cols-2 gap-3 py-4">
              {data.features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  {feature.icon}
                  <span className="text-gray-300 font-medium text-sm">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href={data.url}
            className={`w-full bg-gradient-to-r ${data.gradient} ${data.hoverGradient} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl group-hover:animate-pulse`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-base">{data.buttonText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  const [selectedCard, setSelectedCard] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Background & Floating Elements */}
      <div className="absolute inset-0">
        {/* Blurs */}
        {[
          { top: "top-20", left: "left-10", color: "bg-blue-500/20" },
          { top: "top-40", right: "right-10", color: "bg-orange-500/20" },
          { bottom: "bottom-20", left: "left-20", color: "bg-purple-500/20" },
        ].map((style, idx) => (
          <div
            key={idx}
            className={`absolute w-48 h-48 rounded-full mix-blend-multiply filter blur-xl animate-pulse ${Object.entries(
              style
            )
              .map(([k, v]) => `${k}-${v}`)
              .join(" ")} ${style.color}`}
          ></div>
        ))}

        {/* Floating dots */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 mb-6 shadow-xl">
            <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-white font-bold text-sm">
              Carrefour de l&apos;Emploi 2025
            </span>
            <Sparkles className="w-4 h-4 text-yellow-400 ml-2" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white mb-3 drop-shadow-xl">
              Qui êtes-vous ?
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Découvrez un monde d&apos;opportunités adapté à votre profil
          </p>
        </div>

        {/* Cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {CARDS.map((card) => (
            <ProfileCard
              key={card.role}
              data={card}
              isSelected={selectedCard === card.role}
              onHover={() => setSelectedCard(card.role)}
              onLeave={() => setSelectedCard(null)}
            />
          ))}
        </div>

        {/* Footer note */}
        {/* <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-3 text-gray-400">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <span className="text-xs font-medium">
              Plus de 10,000 connexions réussies
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
