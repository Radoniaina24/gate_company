import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Users,
  Eye,
} from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  totalItems?: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  loading,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
  totalItems = 0,
}) => {
  if (loading) return null;

  const handlePrev = () => onPageChange(Math.max(currentPage - 1, 1));
  const handleNext = () => onPageChange(Math.min(currentPage + 1, totalPages));

  // Calcul des éléments affichés
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const renderPageNumbers = () => {
    const maxPagesToShow = 7;
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      // Afficher toutes les pages si elles sont peu nombreuses
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logique pour les ellipses
      if (currentPage <= 4) {
        // Début: 1, 2, 3, 4, 5, ..., dernière
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Fin: 1, ..., n-4, n-3, n-2, n-1, n
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Milieu: 1, ..., current-1, current, current+1, ..., n
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === "ellipsis") {
        return (
          <div
            key={`ellipsis-${index}`}
            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            <MoreHorizontal className="h-4 w-4" />
          </div>
        );
      }

      const pageNum = page as number;
      const isActive = currentPage === pageNum;

      return (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            isActive
              ? "z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105 border-0"
              : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md"
          } first:rounded-l-lg last:rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
        >
          {pageNum}
        </button>
      );
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        {/* Informations sur les résultats */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          {/* Informations textuelles et sélecteur */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:items-center sm:space-x-6 space-y-3 sm:space-y-0">
            {/* Informations sur les éléments affichés */}
            {/* <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
                <Users className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">
                  {startItem}-{endItem}
                </span>
                <span className="mx-1">sur</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {totalItems}
                </span>
              </div>
            </div> */}

            {/* Sélecteur d'éléments par page */}
            <div className="flex  items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                Afficher:
              </label>
              <div className="relative">
                <select
                  value={itemsPerPage}
                  onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                  className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm pl-3 pr-10 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  {itemsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation de pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center lg:justify-end">
              {/* Version mobile simplifiée */}
              <div className="flex sm:hidden space-x-2">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Préc.
                </button>

                <div className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md">
                  {currentPage} / {totalPages}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Suiv.
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>

              {/* Version desktop complète */}
              <div className="hidden sm:flex items-center">
                <nav
                  className="relative z-0 inline-flex shadow-sm rounded-lg overflow-hidden"
                  aria-label="Pagination"
                >
                  {/* Bouton précédent */}
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 group"
                    title="Page précédente"
                  >
                    <ChevronLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">Précédent</span>
                  </button>

                  {/* Numéros de page */}
                  <div className="hidden md:flex">{renderPageNumbers()}</div>

                  {/* Version tablette simplifiée */}
                  <div className="flex md:hidden items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 border-y border-gray-300 dark:border-gray-600">
                    {currentPage} / {totalPages}
                  </div>

                  {/* Bouton suivant */}
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 group"
                    title="Page suivante"
                  >
                    <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">Suivant</span>
                  </button>
                </nav>

                {/* Raccourcis rapides */}
                {totalPages > 10 && (
                  <div className="ml-4 flex items-center space-x-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Aller à:
                    </span>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      placeholder="Page"
                      className="w-16 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const page = parseInt(e.currentTarget.value);
                          if (page >= 1 && page <= totalPages) {
                            onPageChange(page);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Barre de progression visuelle */}
        {totalPages > 1 && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
