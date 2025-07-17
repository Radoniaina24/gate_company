"use client";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

export default function SectionPartenariat() {
  const t = useTranslations("hero.partnership");

  return (
    <section className="w-full mb-5 py-12 bg-white rounded-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Logo gauche */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-lg border-4 border-white">
              <Image
                src="https://res.cloudinary.com/dikefxjpd/image/upload/v1750673205/metefop_ndsapq.jpg"
                alt="Logo Ministère"
                className="w-full h-full object-cover"
                width={200}
                height={200}
              />
            </div>
          </div>

          {/* Contenu texte centré */}
          <div className="flex-1 max-w-2xl text-center">
            <div className="space-y-4">
              <p className="text-xl font-semibold text-gray-800 leading-relaxed">
                {t("ministrySupport")}
              </p>

              <div className="flex items-center justify-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              </div>

              <p className="text-xl font-semibold text-gray-800 leading-relaxed">
                {t("partnership")}
              </p>
            </div>
          </div>

          {/* Logo droit */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-lg border-4 border-white">
              <Image
                src="https://res.cloudinary.com/dikefxjpd/image/upload/v1750673205/dmr_r4csmq.jpg"
                alt="Logo Direction Migration"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
