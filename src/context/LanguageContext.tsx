"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
export type Language = {
  code: "fr" | "en" | "de";
  name: string;
  countryCode: string;
  flag?: string;
};

type LanguageContextType = {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
};

// Exemple de langue par défaut (Français)
const defaultLanguage: Language = {
  code: "fr",
  name: "Français",
  countryCode: "fr",
  flag: "🇫🇷",
};

// Création du contexte typé
const LanguageContext = createContext<LanguageContextType | null>(null);

// Provider du contexte
function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personnalisé
function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
}

export { LanguageProvider, useLanguageContext };
