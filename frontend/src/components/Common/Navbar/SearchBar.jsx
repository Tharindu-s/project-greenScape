import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ setSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    setSearch(query);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-[400px] pr-2 mx-auto  transition-all duration-500 border border-transparent rounded-full parent sm:flex-row gap-y-4 sm:justify-between sm:pr-1 sm:bg-white group ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full px-6 py-3.5 text-base max-sm:text-center font-normal shadow-lg max-sm:bg-white text-gray-900 bg-transparent rounded-full placeholder-gray-400 leading-normal focus:ring-0 focus:outline-none"
        placeholder="Search for seeds, plants, tools, etc."
        required=""
      />

      <button
        onClick={handleSearch}
        className="py-3 px-6 max-sm:w-full rounded-full bg-accent text-white text-sm leading-4 font-medium whitespace-nowrap transition-all duration-300 hover:scale-105 sm:absolute top-1.5 right-3"
      >
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
