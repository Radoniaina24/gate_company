import React from "react";

type MobilePaginationProps = {
  currentPage: number;
  totalPages: number;
  isMobile: boolean;
  loading: boolean;
  onPageChange: (page: number) => void;
};

const MobilePagination: React.FC<MobilePaginationProps> = ({
  currentPage,
  totalPages,
  isMobile,
  loading,
  onPageChange,
}) => {
  if (!isMobile || loading || totalPages === 0) {
    return null;
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300"
      >
        Précédent
      </button>

      <span className="text-sm text-gray-700 dark:text-gray-300">
        Page {currentPage} sur {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300"
      >
        Suivant
      </button>
    </div>
  );
};

export default MobilePagination;
