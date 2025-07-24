"use client";
import React, { useEffect, useState } from "react";
import AddTask from "./Action/AddTask";
import SearchInput from "../Users/SearchInput";
import { useGetAllTasksQuery } from "@/redux/api/taskApi";
import { Task } from "./types/task";

import {
  CalendarRange,
  ChartNoAxesCombined,
  Edit,
  Eye,
  Logs,
  Search,
  Trash2Icon,
  UserCircle,
  Filter,
  SortAsc,
  MoreVertical,
} from "lucide-react";
import StatusBadge from "./utils/StatusBadge";
import Pagination from "../Users/Pagination";
import { TaskCard } from "./TaskCardMobile";
import MobilePagination from "../Users/MobilePagination";

export default function TaskUser() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data,
    error,
    isLoading: loading,
  } = useGetAllTasksQuery({
    search: searchTerm,
    page: currentPage,
    limit: itemsPerPage,
  });
  const tasks: Array<Task> = data?.tasks?.data;

  const itemsPerPageOptions = [5, 10, 15, 25, 50];

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateMobile = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Rendu pour mobile (< 640px)
  const MobileView = () => (
    <div className="space-y-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-500 border-t-transparent"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Chargement des tâches...
          </p>
        </div>
      ) : tasks?.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Aucune tâche trouvée
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      ) : (
        tasks?.map((task: Task) => (
          <div
            key={task._id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1 line-clamp-2">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {task?.user?.firstName} {task?.user?.lastName}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-3">
                <StatusBadge status={task.status} />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <CalendarRange className="h-4 w-4 mr-1" />
                  {formatDateMobile(task.startDate)}
                </span>
                <span>→</span>
                <span>{formatDateMobile(task.endDate)}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-1">
              <button className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <Eye className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <Trash2Icon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  // Rendu pour tablette (640px - 1024px)
  const TabletView = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <UserCircle className="h-4 w-4" />
                  <span>Utilisateur</span>
                </div>
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Logs className="h-4 w-4" />
                  <span>Tâche</span>
                </div>
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <CalendarRange className="h-4 w-4" />
                  <span>Période</span>
                </div>
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <ChartNoAxesCombined className="h-4 w-4" />
                  <span>Statut</span>
                </div>
              </th>
              <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-500 border-t-transparent"></div>
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Chargement des tâches...
                    </span>
                  </div>
                </td>
              </tr>
            ) : tasks?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Aucune tâche trouvée
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Essayez de modifier vos critères de recherche
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              tasks?.map((task: Task) => (
                <tr
                  key={task._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                        {task?.user?.firstName?.charAt(0)}
                        {task?.user?.lastName?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {task?.user?.firstName} {task?.user?.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                      {task.title}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div>{formatDate(task.startDate)}</div>
                      <div className="text-xs text-gray-500">
                        au {formatDate(task.endDate)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center space-x-1">
                      <button className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <Trash2Icon className="h-4 w-4" />
                      </button>
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

  // Rendu pour desktop (> 1024px)
  const DesktopView = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
            <tr>
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                  <UserCircle className="h-5 w-5" />
                  <span>Utilisateur</span>
                  <SortAsc className="h-4 w-4 opacity-50" />
                </div>
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Logs className="h-5 w-5" />
                  <span>Tâche</span>
                  <SortAsc className="h-4 w-4 opacity-50" />
                </div>
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                  <CalendarRange className="h-5 w-5" />
                  <span>Date de début</span>
                  <SortAsc className="h-4 w-4 opacity-50" />
                </div>
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                  <CalendarRange className="h-5 w-5" />
                  <span>Date de fin</span>
                  <SortAsc className="h-4 w-4 opacity-50" />
                </div>
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <ChartNoAxesCombined className="h-5 w-5" />
                  <span>Statut</span>
                </div>
              </th>
              <th className="px-6 py-5 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-500 border-t-transparent"></div>
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                      Chargement des tâches...
                    </span>
                  </div>
                </td>
              </tr>
            ) : tasks?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Search className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Aucune tâche trouvée
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                      Essayez de modifier vos critères de recherche ou créez une
                      nouvelle tâche
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              tasks?.map((task: Task) => (
                <tr
                  key={task._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-150 group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4 shadow-sm">
                        {task?.user?.firstName?.charAt(0)}
                        {task?.user?.lastName?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {task?.user?.lastName}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {task?.user?.firstName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs">
                      {task.title}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {formatDate(task.startDate)}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {formatDate(task.endDate)}
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center space-x-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 hover:scale-105"
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2.5 rounded-xl text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 hover:scale-105"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-105"
                        title="Supprimer"
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </button>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Gestion des tâches
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{data?.tasks?.total || 0} tâches trouvées</span>
              </span>
              {data?.tasks?.totalPages && (
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>
                    Page {currentPage} sur {data.tasks.totalPages}
                  </span>
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-3">
            <AddTask />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher de tache par nom..."
        />
      </div>

      {/* Table Content */}
      {isMobile ? <MobileView /> : isTablet ? <TabletView /> : <DesktopView />}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={data?.tasks?.totalPages}
          loading={loading}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
}
