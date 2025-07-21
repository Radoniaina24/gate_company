"use client";
import { useState, useEffect } from "react";
import { Search, Mail, Shield, Clock, Eye, UserCircle } from "lucide-react";
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
  _id: string; // Identifiant unique MongoDB
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
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
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
  // Détection de la taille de l'écran
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des Utilisateurs
          </h1>
          <p className="mt-1 sm:mt-2 text-sm text-gray-600 dark:text-gray-400">
            {data?.users?.meta?.total} utilisateurs trouvés
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex space-x-2 sm:space-x-3">
          <AddUser />
        </div>
      </div>

      <div className="mb-6">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher un utilisateur..."
        />
      </div>

      {/* Affichage mobile */}
      {isMobile ? (
        <div className="space-y-3">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
              <span className="ml-3 text-gray-500 dark:text-gray-400">
                Chargement...
              </span>
            </div>
          ) : users?.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Aucun utilisateur trouvé
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          ) : (
            users?.map((user: IUser) => <UserCard key={user._id} user={user} />)
          )}
        </div>
      ) : (
        /* Affichage desktop */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-300"
                  >
                    <div className="flex items-center">
                      <UserCircle className="h-5 w-5 mr-2" />
                      Nom Complet
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-300"
                  >
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Rôle
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-300"
                  >
                    {/* <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Statut
                    </div> */}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Mail
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-300"
                  >
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Date de création
                    </div>
                  </th>

                  <th scope="col" className="relative px-6 py-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
                        <span className="text-gray-500 dark:text-gray-400">
                          Chargement des utilisateurs...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : users?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                          Aucun utilisateur trouvé
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Essayez de modifier vos critères de recherche
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users?.map((user: IUser) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {/* <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.avatar}
                              alt=""
                            /> */}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.firstName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 ">
                          {user.roles.map((role) => (
                            <RoleBadge key={role} role={role} />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* <div className="flex items-center">
                          {getStatusIcon(user.status)}
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {user.status === "active"
                              ? "Actif"
                              : user.status === "inactive"
                              ? "Inactif"
                              : "Suspendu"}
                          </span>
                        </div> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {/* {user.lastLogin ? formatDate(user.lastLogin) : "Jamais"} */}
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-0.5">
                          <EditUser user={user} />
                          {/* <button
                            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                            title="Plus d'options"
                          >
                            <Eye className="h-6 w-6" />
                          </button> */}
                          <RemoveUser id={user._id} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
      )}

      <MobilePagination
        currentPage={currentPage}
        totalPages={totalPages}
        isMobile={isMobile}
        loading={loading}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
