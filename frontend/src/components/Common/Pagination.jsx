import React from "react";

const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);

  const onClick = (newPage) => {
    setPage(newPage + 1);
  };

  return (
    <div className="text-center">
      {totalPages > 0 &&
        [...Array(totalPages)].map((_, index) => (
          <button
            onClick={() => onClick(index)}
            className={`${
              page === index + 1
                ? "bg-accent text-white"
                : "bg-gray-100 hover:bg-gray-300"
            } px-4 py-2 mx-1 rounded-lg mb-6`}
            key={index}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
