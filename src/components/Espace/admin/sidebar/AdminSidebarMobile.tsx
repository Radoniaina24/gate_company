"use client";
/* eslint-disable */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, JSX, SetStateAction, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";
import { getMenuItems } from "./menu";

interface MenuItem {
  icon?: JSX.Element;
  label: string;
  href?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const user: any = useSelector(selectUser);
  const role = user?.role || user?.user?.role || "guest";
  const menuItems = getMenuItems(role);

  const SidebarMenu = ({
    items,
    level = 0,
  }: {
    items: MenuItem[];
    level?: number;
  }) => (
    <ul
      className={`${
        level > 0 ? "ml-4 mt-2 space-y-1" : "space-y-1 px-4 mt-8 text-sm"
      }`}
    >
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openSubmenus[item.label];
        const isActive = item.href ? pathname === item.href : false;

        return (
          <li key={item.label}>
            {hasChildren ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className="flex items-center w-full p-3 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 justify-between text-left group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span
                    className={`text-gray-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <FiChevronDown />
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.children && (
                    <SidebarMenu items={item.children} level={level + 1} />
                  )}
                </div>
              </>
            ) : item.href ? (
              <Link
                href={item.href}
                className={`flex items-center p-3 rounded-xl transition-all duration-200 gap-3 group ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ) : (
              <div className="flex items-center p-3 rounded-xl text-gray-600 gap-3">
                <span className="text-gray-500">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Overlay avec transition */}
      <div
        className={`lg:hidden fixed inset-0 z-[150] transition-opacity duration-300 ease-in-out ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ zIndex: 151 }}
        >
          {/* Header avec logo et bouton fermer */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Image
                      src="https://res.cloudinary.com/dbpoyo4gw/image/upload/v1749549435/logo_gate_group_pktaw2.jpg"
                      width={24}
                      height={24}
                      alt="logo"
                      className=" rounded-md"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">
                      Gate Group
                    </h1>
                    <p className="text-xs text-gray-500">Admin Panel</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 ${
                  sidebarOpen ? "text-gray-600" : "text-gray-500 mx-auto"
                }`}
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <div className="h-full pb-6">
              <SidebarMenu items={menuItems} />
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
