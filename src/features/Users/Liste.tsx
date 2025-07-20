"use client";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  User,
  Mail,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  PauseCircle,
  Eye,
  UserCircle,
} from "lucide-react";
import AddUser from "./Action/AddUser";
import RemoveUser from "./Action/RemoveUser";
import { useGetAllUserQuery } from "@/redux/api/userApi";
import RoleBadge from "./utils/RoleBadge";
import FormSelect from "@/components/Form/FormSelect";
import MultiSelect from "@/components/Form/SelectMultiple";

interface User {
  lastName: string;
  firstName: string;
  id: string;
  email: string;
  role: string;
  createdAt: string;
  status: "active" | "inactive" | "suspended";
  lastLogin?: string;
  avatar?: string;
}

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

type SortConfig = {
  key: keyof User;
  direction: "ascending" | "descending";
};

export const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [role, setRole] = useState<string[]>([]);
  console.log(role);
  const {
    data,
    error,
    isLoading: loading,
  } = useGetAllUserQuery({ search: searchTerm, roles: role });
  // console.log(data?.users?.meta?.total);
  const users = data?.users?.data;
  // console.log(role);
  const OPTIONS = [
    { label: "Manager", value: "manager" },
    { label: "Admin", value: "admin" },
    { label: "Employee", value: "employee" },
  ];

  //////////////////////////////////////////////////////
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  // const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8); // Modifiable maintenant
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Options pour le nombre d'éléments par page
  const itemsPerPageOptions = [5, 8, 15, 25, 50];

  // Détection de la taille de l'écran
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const requestSort = (key: keyof User) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig) return 0;

    const key = sortConfig.key;
    const direction = sortConfig.direction;

    const aValue = a[key];
    const bValue = b[key];

    // Gestion des undefined/null
    if (aValue == null || bValue == null) return 0;

    if (aValue < bValue) return direction === "ascending" ? -1 : 1;
    if (aValue > bValue) return direction === "ascending" ? 1 : -1;
    return 0;
  });
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  // Fonctions d'action
  const handleEdit = (user: IUser) => {};

  const handleDelete = (userId: string) => {};

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Réinitialiser à la première page quand on change le nombre d'éléments par page
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Version mobile - Carte utilisateur
  const UserCard = ({ user }: { user: IUser }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-3 dark:bg-gray-700">
      <div className="flex items-start space-x-4">
        {/* <img
          className="h-12 w-12 rounded-full object-cover"
          src={user.avatar}
          alt=""
        /> */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user.lastName} {user.firstName}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="p-1 text-gray-500 hover:text-red-600"
                title="Éditer"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="p-1 text-gray-500 hover:text-red-600"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="p-1 text-gray-500 hover:text-red-600"
                title="Supprimer"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {/* <div className="flex items-center">
              {getRoleIcon(user.role)}
              <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">
                {user.role}
              </span>
            </div>
            <div className="flex items-center">
              {getStatusIcon(user.status)}
              <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">
                {user.status === "active"
                  ? "Actif"
                  : user.status === "inactive"
                  ? "Inactif"
                  : "Suspendu"}
              </span>
            </div> */}
            <div className="text-gray-500 dark:text-gray-400">
              <div className="text-xs">Créé le</div>
              <div>{formatDate(user.createdAt)}</div>
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              <div className="text-xs">Dernière connexion</div>
              <div>
                {user.createdAt ? formatDate(user.createdAt) : "Jamais"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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

      {/* Barre de recherche */}
      <div className="mb-6 flex gap-5 flex-wrap justify-between">
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            className="block w-full pl-10 pr-3 py-2 placeholder:text-sm sm:py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <MultiSelect
            options={OPTIONS}
            placeholder="Role"
            value={role}
            onChange={(vals) => setRole(vals)}
          />
        </div>
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
          ) : currentItems.length === 0 ? (
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
            users.map((user: IUser) => <UserCard key={user._id} user={user} />)
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
                    onClick={() => requestSort("email")}
                  >
                    <div className="flex items-center">
                      <UserCircle className="h-5 w-5 mr-2" />
                      Nom Complet
                      {sortConfig?.key === "email" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-300"
                    onClick={() => requestSort("role")}
                  >
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Rôle
                      {sortConfig?.key === "role" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-300"
                    onClick={() => requestSort("status")}
                  >
                    {/* <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Statut
                      {sortConfig?.key === "status" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
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
                    onClick={() => requestSort("createdAt")}
                  >
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Date de création
                      {sortConfig?.key === "createdAt" &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
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
                ) : users.length === 0 ? (
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
                  users.map((user: IUser) => (
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
                        <div className="flex justify-end space-x-0.5">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                            title="Éditer"
                          >
                            <Edit className="h-5 w-5" />
                          </button>

                          <button
                            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                            title="Plus d'options"
                          >
                            <Eye className="h-6 w-6" />
                          </button>
                          <RemoveUser />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && (
            <div className="bg-white px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              {/* Sélecteur d'éléments par page */}
              <div className="mb-3 sm:mb-0 flex items-center">
                <span className="text-sm text-gray-700 dark:text-gray-400 mr-2">
                  Afficher
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) =>
                    handleItemsPerPageChange(Number(e.target.value))
                  }
                  className="block w-20 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent rounded-lg sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  {itemsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-700 dark:text-gray-400 ml-2">
                  par page{" "}
                </span>
              </div>

              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  Précédent
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  Suivant
                </button>
              </div>

              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {" "}
                    Affichage{" "}
                    <span className="font-medium">
                      {indexOfFirstItem + 1}
                    </span>{" "}
                    à{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredUsers.length)}
                    </span>{" "}
                    sur{" "}
                    <span className="font-medium">{filteredUsers.length}</span>{" "}
                    utilisateurs
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    >
                      <span className="sr-only">Précédent</span>
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNum
                              ? "z-10 bg-red-50 border-red-500 text-red-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                        ...
                      </span>
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    >
                      <span className="sr-only">Suivant</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pagination mobile */}
      {isMobile && !isLoading && currentItems.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300"
          >
            Précédent
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};
