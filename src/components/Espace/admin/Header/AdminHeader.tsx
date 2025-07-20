import React, { useState, useRef, useEffect } from "react";
/* eslint-disable */
import {
  FaHome,
  FaUser,
  FaCog,
  FaChartBar,
  FaUsers,
  FaDatabase,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/api/authApi";

interface AdminHeaderProps {
  toggleSidebarMobile: () => void;
  toggleSidebar: () => void;
}

const quickActions = [
  { label: "Tableau de bord", href: "/admin/dashboard", icon: <MdDashboard /> },
  { label: "Utilisateurs", href: "/admin/users", icon: <FaUsers /> },
  { label: "Statistiques", href: "/admin/analytics", icon: <FaChartBar /> },
  { label: "Paramètres", href: "/admin/settings", icon: <FaCog /> },
];

const notifications = [
  {
    id: 1,
    message: "Nouveau utilisateur enregistré",
    time: "Il y a 2 minutes",
    type: "user",
  },
  {
    id: 2,
    message: "Sauvegarde système terminée",
    time: "Il y a 1 heure",
    type: "system",
  },
  {
    id: 3,
    message: "Rapport mensuel disponible",
    time: "Il y a 3 heures",
    type: "report",
  },
];

export default function AdminHeader({
  toggleSidebar,
  toggleSidebarMobile,
}: AdminHeaderProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const user: any = useSelector(selectUser);
  // console.log(user);
  const handleLogout = async () => {
    try {
      await logoutUser("").unwrap();
      dispatch(logout());
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-[97] backdrop-blur-sm">
      <div className="px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebarMobile}
            className="lg:hidden inline-flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <span className="sr-only">Menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-800">
                  {user?.user.firstName || user?.firstName}{" "}
                  {user?.user?.lastName || user?.lastName}
                </div>
                {/* <div className="text-xs text-gray-500"> {user?.user?.lastName || user?.lastName}</div> */}
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
              <IoIosArrowDown
                className={`text-gray-500 text-sm transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                {/* User Info */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <FaUser className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {user?.user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link
                    href="/admin/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaUser className="text-gray-500" />
                    <span>Mon profil</span>
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaCog className="text-gray-500" />
                    <span>Paramètres</span>
                  </Link>
                  <Link
                    href="/admin/activity"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaDatabase className="text-gray-500" />
                    <span>Activité</span>
                  </Link>
                  <Link
                    href="/admin/help"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaQuestionCircle className="text-gray-500" />
                    <span>Centre d'aide</span>
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaHome className="text-gray-500" />
                    <span>Retour au site</span>
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <BiLogOut className="text-red-500" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
