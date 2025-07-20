"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (values: string[]) => void;
  value?: string[];
  error?: boolean;
}

export default function MultiSelect({
  options,
  placeholder = "Sélectionner...",
  onChange,
  value,
  error = false,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const selectedValues = value ?? internalSelected;

  const isSelected = (val: string) => selectedValues.includes(val);

  const update = (updated: string[]) => {
    if (!value) {
      setInternalSelected(updated);
    }
    onChange?.(updated);
  };

  const toggleOption = (option: string) => {
    const updated = isSelected(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];
    update(updated);
  };

  const removeOption = (option: string) => {
    const updated = selectedValues.filter((v) => v !== option);
    update(updated);
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

  return (
    <div ref={containerRef} className="relative w-full min-w-sm">
      {/* Input area */}
      <div
        onClick={() => setOpen(!open)}
        className={`border rounded-lg p-3 flex items-center flex-wrap gap-1 min-h-[44px] cursor-pointer 
         shadow-sm hover:shadow-md transition-shadow duration-150
        ${error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
      >
        {selectedValues.length === 0 && (
          <span className="text-gray-400 text-sm">{placeholder}</span>
        )}

        {selectedValues.map((val) => {
          const opt = options.find((o) => o.value === val);
          if (!opt) return null;

          return (
            <span
              key={val}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1 text-xs shadow-sm"
            >
              {opt.label}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(val);
                }}
                className="hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          );
        })}

        <div className="ml-auto flex items-center">
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
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
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => toggleOption(option.value)}
            className={`px-4 py-2 cursor-pointer text-xs hover:bg-blue-50 transition-colors ${
              isSelected(option.value)
                ? "bg-blue-100 text-blue-800 font-medium"
                : ""
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
