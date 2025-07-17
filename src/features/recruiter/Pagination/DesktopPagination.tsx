import React from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRecruiterContext } from "../context/RecruiterContext";

export default function DesktopPagination() {
  const { setItemsPerPage, setCurrentPage, itemsPerPage, currentPage, data } =
    useRecruiterContext();
  const indexOfLastItem = currentPage * itemsPerPage;
  const results = data?.totalApplications;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = data?.totalPages;
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between ">
      <div>
        <p className="text-sm text-gray-700">
          Affichage de{" "}
          <span className="font-medium">{indexOfFirstItem + 1}</span> à{" "}
          <span className="font-medium">
            {" "}
            {indexOfLastItem > results ? results : indexOfLastItem}
          </span>{" "}
          sur <span className="font-medium"> {data?.totalApplications} </span>{" "}
          résultats
        </p>
      </div>
      <div>
        <div className="flex items-center">
          <span className="mr-3 text-sm text-gray-700">Lignes par page:</span>
          <select
            className="border border-gray-300 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <nav
        className="relative z-0 inline-flex  -space-x-px"
        aria-label="Pagination"
      >
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-sm font-medium transition-colors duration-200 ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-slate-600 text-white hover:bg-slate-700"
          }`}
        >
          <span className="sr-only">Précédent</span>
          <FaChevronLeft className="text-sm" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
          // Afficher seulement les pages proches de la page actuelle
          if (
            number === 1 ||
            number === totalPages ||
            (number >= currentPage - 1 && number <= currentPage + 1)
          ) {
            return (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200 mx-1 ${
                  currentPage === number
                    ? "z-10 bg-slate-800 text-white border border-transparent"
                    : "border border-slate-300 text-slate-600 hover:text-white hover:bg-slate-800"
                }`}
              >
                {number}
              </button>
            );
          } else if (
            (number === currentPage - 2 && currentPage > 3) ||
            (number === currentPage + 2 && currentPage < totalPages - 2)
          ) {
            return (
              <span
                key={number}
                className="relative inline-flex items-center px-3 py-1 rounded-full border-gray-300 bg-white text-sm font-medium text-gray-700"
              >
                ...
              </span>
            );
          }
          return null;
        })}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center justify-center w-8 h-8  rounded-full border border-gray-300 text-sm font-medium transition-colors duration-200 ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-slate-600 text-white hover:bg-slate-700"
          }`}
        >
          <span className="sr-only">Suivant</span>
          <FaChevronRight className="text-sm" />
        </button>
      </nav>
    </div>
  );
}
