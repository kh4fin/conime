import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    let start = currentPage - 2;
    if (start < 1) start = 1;
    let end = start + 4;
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - 4;
      if (start < 1) start = 1;
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = totalPages > 0 ? getPageNumbers() : [];

  return (
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 mx-1 rounded transition-colors duration-200 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 mx-1 rounded transition-colors duration-200 ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 mx-1 rounded transition-colors duration-200 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
