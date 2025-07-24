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
} from "lucide-react";
import StatusBadge from "./utils/StatusBadge";
import Pagination from "../Users/Pagination";

export default function TaskUser() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
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
  // console.log(data);

  const itemsPerPageOptions = [5, 10, 15, 25, 50];
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des tâches
          </h1>
          <p className="mt-1 sm:mt-2 text-sm text-gray-600 dark:text-gray-400">
            {data?.tasks?.total} tâches trouvés
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex space-x-2 sm:space-x-3">
          <AddTask />
        </div>
      </div>

      <div className="mb-6">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher un tâche..."
        />
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
              <span className="ml-3 text-gray-500 dark:text-gray-400">
                Chargement...
              </span>
            </div>
          ) : (
            ""
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
                      {" "}
                      <Logs className="h-5 w-5 mr-2" />
                      Tâche
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-300"
                  >
                    <div className="flex items-center">
                      {" "}
                      <CalendarRange className="h-5 w-5 mr-2" />
                      Début{" "}
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-300"
                  >
                    <div className="flex items-center">
                      {" "}
                      <CalendarRange className="h-5 w-5 mr-2" />
                      Fin{" "}
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-300"
                  >
                    <div className="flex items-center">
                      <ChartNoAxesCombined className="h-5 w-5 mr-2" />
                      Statut{" "}
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
                    <td colSpan={5} className="px-6 py-8 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
                        <span className="text-gray-500 dark:text-gray-400">
                          Chargement des tâches...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : tasks?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                          Aucun tâche trouvé
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
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {task?.user?.lastName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {task?.user?.firstName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {task.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {/* {user.lastLogin ? formatDate(user.lastLogin) : "Jamais"} */}
                        {formatDate(task.startDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {/* {user.lastLogin ? formatDate(user.lastLogin) : "Jamais"} */}
                        {formatDate(task.endDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 ">
                          <StatusBadge status={task.status} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-0.5">
                          <button
                            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                            title="Plus d'options"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                            title="Plus d'options"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                            title="Plus d'options"
                          >
                            <Trash2Icon className="h-5 w-5" />
                          </button>
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
            totalPages={data?.tasks?.totalPages}
            loading={loading}
            itemsPerPage={itemsPerPage}
            itemsPerPageOptions={itemsPerPageOptions}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      )}

      {/* <MobilePagination
              currentPage={currentPage}
              totalPages={totalPages}
              isMobile={isMobile}
              loading={loading}
              onPageChange={setCurrentPage}
            /> */}
    </div>
  );
}
