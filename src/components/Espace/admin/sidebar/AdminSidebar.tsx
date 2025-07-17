"use client";
/* eslint-disable */
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { JSX, useState } from "react";
import { FiChevronDown, FiChevronUp, FiX, FiMenu } from "react-icons/fi";
import Image from "next/image";
import { getMenuItems } from "./menu";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";

interface MenuItem {
  icon?: JSX.Element;
  label: string;
  href?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
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

  /** Composant récursif pour afficher le menu et ses sous-menus */
  const SidebarMenu = ({
    items,
    level = 0,
  }: {
    items: MenuItem[];
    level?: number;
  }) => (
    <ul
      className={`${level > 0 ? "ml-4 mt-2 space-y-1" : "space-y-1 px-3 mt-8"}`}
    >
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openSubmenus[item.label];
        const isActive = item.href ? pathname === item.href : false;

        return (
          <li key={item.label} className="text-sm">
            {hasChildren ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 
                    hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                    hover:shadow-sm group ${
                      sidebarOpen ? "justify-between" : "justify-center"
                    }`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-gray-500 group-hover:text-blue-600 transition-colors duration-200">
                      {item.icon}
                    </div>
                    {sidebarOpen && (
                      <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {sidebarOpen && (
                    <div className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200">
                      {isOpen ? (
                        <FiChevronUp size={16} />
                      ) : (
                        <FiChevronDown size={16} />
                      )}
                    </div>
                  )}
                </button>
                {isOpen && sidebarOpen && item.children && (
                  <div className="mt-1">
                    <SidebarMenu items={item.children} level={level + 1} />
                  </div>
                )}
              </>
            ) : item.href ? (
              <Link
                href={item.href}
                className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  sidebarOpen ? "justify-start gap-3" : "justify-center"
                } ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-gray-900 hover:shadow-sm"
                }`}
              >
                <div
                  className={`${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-blue-600"
                  } transition-colors duration-200`}
                >
                  {item.icon}
                </div>
                {sidebarOpen && (
                  <span
                    className={`font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-gray-700 group-hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            ) : (
              <div
                className={`flex items-center p-3 rounded-xl ${
                  sidebarOpen ? "justify-start gap-3" : "justify-center"
                } text-gray-600`}
              >
                <div className="text-gray-500">{item.icon}</div>
                {sidebarOpen && (
                  <span className="font-medium text-gray-700">
                    {item.label}
                  </span>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  // Overlay pour mobile
  const Overlay = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${
        sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setSidebarOpen(false)}
      style={{ zIndex: 98 }}
    />
  );

  return (
    <div className="hidden lg:block">
      <Overlay />
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 lg:w-16"
        } bg-white border-r border-gray-200 shadow-xl transition-all duration-300 fixed h-full overflow-hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ zIndex: 99 }}
      >
        <div className="h-full flex flex-col">
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
                {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-2">
            <SidebarMenu items={menuItems} />
          </nav>

          {/* Footer avec info utilisateur */}
          {/* {sidebarOpen && (
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.[0] || user?.user?.name?.[0] || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name || user?.user?.name || "Utilisateur"}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{role}</p>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </aside>
    </div>
  );
}
