"use client";

import { ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React, { useState, useRef, useEffect } from "react";

export type Language = {
  code: "fr" | "en" | "de";
  name: string;
  countryCode: string;
};

const LANGUAGES: Language[] = [
  { code: "fr", name: "Français", countryCode: "fr" },
  // { code: "en", name: "English", countryCode: "us" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  const LOCALES = ["fr", "en", "de"] as const;
  type Locale = (typeof LOCALES)[number];

  const getPathWithoutLocale = () => {
    const segments = pathname.split("/");

    if (LOCALES.includes(segments[1] as Locale)) {
      return "/" + segments.slice(2).join("/");
    }
    return pathname;
  };

  const handleLanguageChange = (langCode: string) => {
    setIsDropdownOpen(false);
    const newPath = `/${langCode}${getPathWithoutLocale()}`;
    router.replace(newPath, { scroll: false });
  };

  const buttonStyle = `flex items-center space-x-2 px-3 py-2 rounded-lg border-2 border-transparent hover:border-blue-200 transition-all duration-200 font-medium ${
    pathname !== "/"
      ? "text-blue-700 bg-blue-50/50"
      : "text-white bg-white/10 backdrop-blur-sm"
  } hover:bg-blue-50`;

  // 👇 Hook pour fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton principal */}
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className={buttonStyle}
      >
        <Image
          width={20}
          height={20}
          src={`https://flagcdn.com/w40/${currentLanguage.countryCode}.png`}
          alt={currentLanguage.code}
          className="w-5 h-4 object-cover rounded-sm shadow-sm"
        />
        <span className="text-sm hidden sm:inline">
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menu déroulant */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="flex items-center space-x-2 text-gray-500">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Langue
              </span>
            </div>
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-blue-50 ${
                lang.code === currentLanguage.code
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                  : "text-gray-700"
              }`}
            >
              <Image
                width={10}
                height={10}
                src={`https://flagcdn.com/w40/${lang.countryCode}.png`}
                alt={lang.name}
                className="w-6 h-4 object-cover rounded-sm shadow-sm"
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{lang.name}</div>
                <div className="text-xs text-gray-400 uppercase">
                  {lang.code}
                </div>
              </div>
              {lang.code === currentLanguage.code && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
