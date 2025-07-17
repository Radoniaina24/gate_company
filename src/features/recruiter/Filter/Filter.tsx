import React from "react";
import SearchBar from "./SearchBar";
import VisibleColumn from "./VisibleColumn";
import StatusFilter from "./StatusFilter";

export default function Filter() {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          Liste des recruteurs
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Barre de recherche */}
        <SearchBar />
        {/* Filtre par statut */}
        <StatusFilter />
        {/* Colonnes visibles */}
        <VisibleColumn />
      </div>
    </div>
  );
}
