"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Mail,
  Shield,
  Clock,
  UserCircle,
  User,
  Calendar,
  ChevronDown,
} from "lucide-react";
import AddUser from "./Action/AddUser";
import RemoveUser from "./Action/RemoveUser";
import { useGetAllUserQuery } from "@/redux/api/userApi";
import RoleBadge from "./utils/RoleBadge";
import EditUser from "./Action/EditUser";
import { UserCard } from "./UserCardMobile";
import MobilePagination from "./MobilePagination";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";

export type UserRole = "employee" | "manager" | "admin";
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
}
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  const {
    data,
    error,
    isLoading: loading,
  } = useGetAllUserQuery({
    search: searchTerm,
    page: currentPage,
    limit: itemsPerPage,
  });

  const users = data?.users?.data;
  const paginate: PaginationMeta = data?.users?.meta;
  const itemsPerPageOptions = [5, 10, 15, 25, 50];
  const totalPages = paginate?.totalPages;

  // Détection responsive améliorée
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-100 border-t-blue-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <span className="ml-3 text-gray-600 dark:text-gray-300 font-medium">
        Chargement...
      </span>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Aucun utilisateur trouvé
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
        Aucun utilisateur ne correspond à vos critères de recherche. Essayez de
        modifier votre recherche.
      </p>
    </div>
  );

  // Vue mobile améliorée
  const MobileUserCard = ({ user }: { user: IUser }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-base">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              {user.email}
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <EditUser user={user} />
          <RemoveUser id={user._id} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {user.roles.map((role) => (
            <RoleBadge key={role} role={role} />
          ))}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDateShort(user.createdAt)}
        </div>
      </div>
    </div>
  );

  // Vue tablette
  const TabletView = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                <div
                  className="flex items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => handleSort("firstName")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Utilisateur
                  <ChevronDown
                    className={`h-4 w-4 ml-1 transition-transform ${
                      sortField === "firstName" && sortOrder === "desc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Rôle
                </div>
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                <div
                  className="flex items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => handleSort("createdAt")}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Créé le
                  <ChevronDown
                    className={`h-4 w-4 ml-1 transition-transform ${
                      sortField === "createdAt" && sortOrder === "desc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              </th>
              <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : users?.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8">
                  <EmptyState />
                </td>
              </tr>
            ) : (
              users?.map((user: IUser) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <RoleBadge key={role} role={role} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {formatDateShort(user.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center space-x-1">
                      <EditUser user={user} />
                      <RemoveUser id={user._id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Vue desktop complète
  const DesktopView = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                <div
                  className="flex items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  onClick={() => handleSort("firstName")}
                >
                  <UserCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Utilisateur
                  <ChevronDown
                    className={`h-4 w-4 ml-2 transition-transform ${
                      sortField === "firstName" && sortOrder === "desc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Rôles
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                <div
                  className="flex items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  onClick={() => handleSort("createdAt")}
                >
                  <Clock className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Créé le
                  <ChevronDown
                    className={`h-4 w-4 ml-2 transition-transform ${
                      sortField === "createdAt" && sortOrder === "desc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : users?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8">
                  <EmptyState />
                </td>
              </tr>
            ) : (
              users?.map((user: IUser) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md group-hover:shadow-lg transition-shadow">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Utilisateur #{user._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {user.roles.map((role) => (
                        <RoleBadge key={role} role={role} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDate(user.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <EditUser user={user} />
                      <RemoveUser id={user._id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-4 sm:px-6 lg:px-8 py-6 ">
        {/* En-tête amélioré */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Gestion des Utilisateurs
              </h1>
              <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center mr-6">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {data?.users?.meta?.total || 0} utilisateurs
                </div>
                {/* <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Dernière mise à jour il y a 2 min
                </div> */}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <AddUser />
            </div>
          </div>
        </div>

        {/* Barre de recherche améliorée */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher par nom, email..."
          />
        </div>

        {/* Contenu adaptatif */}
        {screenSize === "mobile" ? (
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
                <LoadingSpinner />
              </div>
            ) : users?.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
                <EmptyState />
              </div>
            ) : (
              users?.map((user: IUser) => (
                <MobileUserCard key={user._id} user={user} />
              ))
            )}
          </div>
        ) : screenSize === "tablet" ? (
          <TabletView />
        ) : (
          <DesktopView />
        )}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            loading={loading}
            itemsPerPage={itemsPerPage}
            itemsPerPageOptions={itemsPerPageOptions}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};
