import React from "react";
import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Rechercher...",
  className = "",
}) => {
  return (
    <div
      className={`relative rounded-lg shadow-sm w-full sm:w-auto ${className}`}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-2 placeholder:text-sm sm:py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
