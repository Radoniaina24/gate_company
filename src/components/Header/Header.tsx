"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // Assure-toi que ce composant existe

export const Header = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/fr/admin");
  const hiddenRoutes = ["/inscription", "/connexion"];
  const shouldHideHeader = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const renderHeader = () => {
    if (shouldHideHeader) return null;
    if (isAdminPage) {
      console.log("tafiditra admin");
      return;
    }
    return <Navbar />;
  };

  return <>{renderHeader()}</>;
};
