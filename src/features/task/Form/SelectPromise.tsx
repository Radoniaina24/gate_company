"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, X, Search } from "lucide-react";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

interface SelectProps {
  data: any;
  placeholder?: string;
  searchPlaceholder?: string;
  onChange?: (selectedId: string | null) => void;
  value?: string | null;
  className?: string;
  loading?: boolean;
  error?: boolean;
}

export default function SelectPromis({
  data,
  placeholder = "Sélectionner un élément",
  searchPlaceholder = "Rechercher un élémént...",
  onChange,
  value,
  className = "",
  loading = false,
  error,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [internalSelected, setInternalSelected] = useState<string | null>(null);
  const selectedValue = value ?? internalSelected;

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((el: any) =>
      `${el.name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const update = (updated: string | null) => {
    if (value === undefined) {
      setInternalSelected(updated);
    }
    onChange?.(updated);
    setOpen(false); // fermer le menu dès qu'on sélectionne
  };

  const handleDropdownToggle = () => {
    if (loading) return;
    setOpen(!open);
    if (!open && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedUser = data?.find((u: any) => u._id === selectedValue);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input area */}
      <div
        onClick={handleDropdownToggle}
        className={`border ${
          error
            ? "border-red-500 ring-0 ring-red-500"
            : "border-gray-300 ring-1 ring-blue-500"
        } rounded-xl p-2 flex items-center min-h-[44px] cursor-pointer 
        bg-white shadow-sm hover:shadow-md transition-all duration-200
        ${open ? " border-blue-500" : ""} ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-xl">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}

        {!loading && !selectedUser && (
          <span className="pl-2.5 text-gray-600 text-sm">{placeholder}</span>
        )}

        {!loading && selectedUser && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1 text-xs shadow-sm">
            {`${selectedUser.name} - ${selectedUser.Maxduration} jours `}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                update(null);
              }}
              className="hover:text-red-600 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        )}

        <div className="ml-auto flex items-center">
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
          ) : (
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
      </div>

      {/* Dropdown */}
      <div
        className={`absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto 
        transition-all duration-200 origin-top transform
        ${
          open
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        {/* Search input */}
        <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              onClick={(e) => e.stopPropagation()}
              disabled={loading}
            />
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-sm text-gray-500">Chargement...</p>
          </div>
        )}

        {/* Users list */}
        {!loading && filteredUsers?.length > 0
          ? filteredUsers.map((el: any) => (
              <div
                key={el._id}
                onClick={() => update(el._id)}
                className={`px-4 py-2 cursor-pointer text-sm hover:bg-blue-50 transition-colors flex items-center ${
                  selectedValue === el._id
                    ? "bg-blue-100 text-blue-800 font-medium"
                    : ""
                }`}
              >
                <span>{`${el.name} - ${el.Maxduration} jours `}</span>
                {selectedValue === el._id && (
                  <span className="ml-auto text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>
            ))
          : !loading && (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {data.length === 0
                  ? "Pas type de congé disponibles"
                  : "Aucun type trouvé"}
              </div>
            )}
      </div>
    </div>
  );
}
