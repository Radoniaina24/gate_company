export type NavItem = {
  name: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: {
    name: string;
    href: string;
  }[];
};

export const navItemsByLanguage: Record<"fr" | "en", NavItem[]> = {
  fr: [
    { name: "Accueil", href: "/", hasDropdown: false },
    { name: "À propos", href: "/", hasDropdown: false },
    { name: "Programme", href: "/", hasDropdown: false },
    { name: "Contact", href: "/", hasDropdown: false },
    { name: "Pack & Tarifs", href: "/", hasDropdown: false },
  ],
  en: [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "About", href: "/", hasDropdown: false },
    { name: "Program", href: "/", hasDropdown: false },
    { name: "Contact", href: "/", hasDropdown: false },
    { name: "Packages & Pricing", href: "/", hasDropdown: false },
  ],
};
