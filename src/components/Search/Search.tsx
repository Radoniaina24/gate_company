import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const handleSearch = () => {};
  return (
    <div className="flex-1 max-w-md mx-8">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            // ref={searchRef}

            type="text"
            placeholder="Rechercher utilisateurs, logs, paramètres..."
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
          />
        </div>
      </form>
    </div>
  );
}
