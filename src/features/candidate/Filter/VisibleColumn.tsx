import React, { useEffect, useRef } from "react";
import { useCandidateContext } from "../context/CandidateContext";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

const columnLabels: Record<string, string> = {
  nom: "Nom",
  email: "Email",
  statut: "Statut",
  role: "Rôle",
  dateInscription: "Date d'inscription",
  actions: "Actions",
};

export default function VisibleColumn() {
  const {
    setIsColumnMenuOpen,
    isColumnMenuOpen,
    visibleColumns,
    handleColumnToggle,
  } = useCandidateContext();

  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsColumnMenuOpen(false);
      }
    }

    if (isColumnMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Nettoyage à la désactivation
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isColumnMenuOpen, setIsColumnMenuOpen]);

  return (
    <div ref={menuRef} className="relative z-[96]">
      <button
        className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer whitespace-nowrap !rounded-button"
        onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
      >
        <span>Colonnes visibles</span>
        {isColumnMenuOpen ? (
          <FaChevronCircleUp className="ml-2" />
        ) : (
          <FaChevronCircleDown className="ml-2" />
        )}
      </button>

      {isColumnMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-md shadow-lg bg-white ring- ring-gray-200  ring-opacity-5 max-h-60 overflow-y-auto z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {Object.entries(visibleColumns).map(([column, isVisible]) => (
              <label
                key={column}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-blue-600  border-gray-300 rounded focus:ring-blue-500"
                  checked={isVisible as boolean}
                  onChange={() =>
                    handleColumnToggle(column as keyof typeof visibleColumns)
                  }
                />
                <span>{columnLabels[column] || column}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
