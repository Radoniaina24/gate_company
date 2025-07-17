import React from "react";
import { useCandidateContext } from "../context/CandidateContext";

export default function MobilePagination() {
  const { setCurrentPage, currentPage, data } = useCandidateContext();
  const totalPages = data?.totalPages;
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div className="flex-1 flex justify-between sm:hidden">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`relative inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        } cursor-pointer whitespace-nowrap !rounded-button`}
      >
        Précédent
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`ml-3 relative inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        } cursor-pointer whitespace-nowrap !rounded-button`}
      >
        Suivant
      </button>
    </div>
  );
}
