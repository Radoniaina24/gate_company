// components/DropdownMenuWithComponents.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import React from "react";

interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenuWithComponents: React.FC<DropdownMenuProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Actions"
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>

      {open && (
        <div
          className=" z-[95] modal-container absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg  p-2 space-y-1"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );
};
export default DropdownMenuWithComponents;
