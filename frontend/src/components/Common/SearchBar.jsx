import React from "react";

const SearchBar = ({ setSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for products and services..."
        onChange={(e) => setSearch(e.target.value)}
        className="block w-96 px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px] mx-2"
      />
    </div>
  );
};

export default SearchBar;
