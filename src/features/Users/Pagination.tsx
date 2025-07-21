import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  loading,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}) => {
  if (loading) return null;

  const handlePrev = () => onPageChange(Math.max(currentPage - 1, 1));
  const handleNext = () => onPageChange(Math.min(currentPage + 1, totalPages));

  const renderPageNumbers = () => {
    const maxPagesToShow = 5;

    return Array.from(
      { length: Math.min(maxPagesToShow, totalPages) },
      (_, i) => {
        let pageNum: number;

        if (totalPages <= maxPagesToShow) {
          pageNum = i + 1;
        } else if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageNum = totalPages - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
              currentPage === pageNum
                ? "z-10 bg-red-50 border-red-500 text-red-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {pageNum}
          </button>
        );
      }
    );
  };

  return (
    <div className="bg-white px-4 py-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      {/* Select items per page */}
      <div className="flex items-center mb-4 sm:mb-0">
        <label
          htmlFor="items-per-page"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
        >
          Items par page:
        </label>
        <div className="relative">
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-300"
          >
            {itemsPerPageOptions.map((option) => (
              <option
                key={option}
                value={option}
                className="text-gray-700 dark:text-gray-300"
              >
                {option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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

      {/* Mobile nav */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        >
          Précédent
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        >
          Suivant
        </button>
      </div>

      {/* Desktop nav */}
      <div className="hidden sm:flex sm:flex-1 gap-2 sm:items-center sm:justify-end">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            >
              <span className="sr-only">Précédent</span>
              <ChevronLeft className="h-5 w-5" />
            </button>

            {renderPageNumbers()}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                ...
              </span>
            )}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            >
              <span className="sr-only">Suivant</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
