import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BorderBeam } from "../magicui/border-beam";
import { useRouter } from "next/navigation";

const SearchBarHero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to the search results page with the search query
      router.push(`greenscape/search?query=${searchTerm}`);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center max-w-xl pr-2 mx-auto mb-5 transition-all duration-500 border border-transparent rounded-full parent sm:flex-row gap-y-4 sm:justify-between sm:pr-1 sm:bg-white group ">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full px-6 py-3.5 text-base max-sm:text-center font-normal shadow-xl max-sm:bg-white text-gray-900 bg-transparent rounded-full placeholder-gray-400 leading-normal focus:ring-0 focus:outline-none"
        placeholder="Search for seeds, plants, etc."
        required=""
      />
      <BorderBeam size={250} duration={12} delay={9} />

      <button
        onClick={handleSearch}
        className="py-3 px-6 max-sm:w-full rounded-full bg-accent text-white text-sm leading-4 font-medium whitespace-nowrap transition-all duration-300 hover:scale-105 sm:absolute top-1.5 right-3"
      >
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchBarHero;
