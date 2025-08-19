"use client";
import React, { useEffect, useState } from "react";
import {
  useGetAllTypeTimeOffQuery,
  useGetLeaveRequestForManagerQuery,
} from "@/redux/api/timeoffApi";
import Pagination from "../Users/Pagination";
import {
  CalendarRange,
  ChartNoAxesCombined,
  Mail,
  Search,
  SortAsc,
  Timer,
  User,
  UserCircle,
} from "lucide-react";
import { StatusBadgeTimeOff } from "../task/utils/StatusBadge";
import EditTimeOff from "./Action/EditTimeOff";
import RemoveTimeOff from "./Action/RemoveTimeOff";
import ViewTimeOff from "./Action/View";

import TypeTimeOffFilter from "./Action/Filter/TypeTimeOffFilter";
import StatusFilter from "./Action/Filter/StatusFilter";
import LeaveInterfaceHeader from "./LeaveInterfaceHeader";
import { useleaveRequest } from "@/hooks/useLeaveRequests";
type TypeTimeOff = {
  _id: string;
  name: string;
  Maxduration: number;
};
type Manager = {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};
type User = {
  email: string;
  firstName?: string;
  lastName?: string;
};
export interface TimeOff {
  _id: string;
  type: TypeTimeOff;
  reason?: string;
  manager?: Manager[];
  startDate: string;
  endDate: string;
  status: string;
  userId: User;
}
export default function LeaveRequests() {
  const [typeTimeOff, setTypeTimeOff] = useState<string | null>("touts");
  const [status, setStatus] = useState<string>("tout");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPageOptions = [5, 10, 15, 25, 50];
  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    typeTimeOff: typeTimeOff,
    status: status,
  };
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
  }, [itemsPerPage, typeTimeOff]);
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
  const { data, isLoading: loading } =
    useGetLeaveRequestForManagerQuery(queryParams);
  useleaveRequest(queryParams);

  const { data: timeoff, isLoading: loadingTypeTimeOff } =
    useGetAllTypeTimeOffQuery("");
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
                  <Timer className="h-5 w-5" />
                  <span>Type Congé</span>
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
                      Chargement des congés...
                    </span>
                  </div>
                </td>
              </tr>
            ) : data.leaverequests?.data?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Search className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Aucune congé trouvée
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                      Essayez de modifier vos critères de recherche ou créez une
                      nouveau congé
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.leaverequests?.data?.map((timeOff: TimeOff) => (
                <tr
                  key={timeOff._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-150 group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4 shadow-sm">
                        {timeOff?.userId?.firstName?.charAt(0)}
                        {timeOff?.userId?.lastName?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {timeOff?.userId?.lastName}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {timeOff?.userId?.firstName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs">
                      {timeOff?.type?.name}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {formatDate(timeOff.startDate)}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {formatDate(timeOff.endDate)}
                  </td>
                  <td className="px-2 py-5">
                    <StatusBadgeTimeOff status={timeOff.status} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center items-center space-x-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <ViewTimeOff timeOff={timeOff} />
                      <EditTimeOff timeoff={timeOff} />
                      {/* <RemoveTimeOff id={timeOff._id} /> */}
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

  const MobileView = () => (
    <div className="space-y-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-500 border-t-transparent"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Chargement des congés...
          </p>
        </div>
      ) : data.leaverequests?.data?.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Aucune congé trouvée
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      ) : (
        data.leaverequests?.data?.map((timeOff: TimeOff) => (
          <div
            key={timeOff._id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4 shadow-sm">
                    {timeOff?.userId?.firstName?.charAt(0)}
                    {timeOff?.userId?.lastName?.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {timeOff?.userId?.lastName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {timeOff?.userId?.firstName}
                    </div>
                  </div>
                </div>
                <div className="text-sm mt-3 text-gray-600 dark:text-gray-300">
                  <span>{timeOff.type.name}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-3">
                <StatusBadgeTimeOff status={timeOff.status} />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <CalendarRange className="h-4 w-4 mr-1" />
                  {formatDateMobile(timeOff.startDate)}
                </span>
                <span>→</span>
                <span>{formatDateMobile(timeOff.endDate)}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-1">
              <ViewTimeOff timeOff={timeOff} />
              <EditTimeOff timeoff={timeOff} />
              {/* <RemoveTimeOff id={timeOff._id} /> */}
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
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                  <UserCircle className="h-5 w-5" />
                  <span>Utilisateur</span>
                  <SortAsc className="h-4 w-4 opacity-50" />
                </div>
              </th>
              <th className="px-6 py-5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Timer className="h-5 w-5" />
                  <span>Type Congé</span>
                  <SortAsc className="h-4 w-4 opacity-50" />
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
            ) : data.leaverequests?.data?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Aucune congé trouvée
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Essayez de modifier vos critères de recherche
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.leaverequests?.data?.map((timeOff: TimeOff) => (
                <tr
                  key={timeOff._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4 shadow-sm">
                        {timeOff?.userId?.firstName?.charAt(0)}
                        {timeOff?.userId?.lastName?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {timeOff?.userId?.lastName}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {timeOff?.userId?.firstName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs">
                      {timeOff?.type?.name}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <div>{formatDate(timeOff.startDate)}</div>
                      <div className="text-xs text-gray-500">
                        au {formatDate(timeOff.endDate)}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-xs">
                    <StatusBadgeTimeOff status={timeOff.status} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center space-x-1">
                      <ViewTimeOff timeOff={timeOff} />
                      <EditTimeOff timeoff={timeOff} />
                      {/* <RemoveTimeOff id={timeOff._id} /> */}
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
        <LeaveInterfaceHeader
          data={data}
          title="Demande des congés des employés"
          addLeaverequest={false}
        />
      </div>

      <div className="mb-6  bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-x-10">
          <TypeTimeOffFilter
            typeTimeOff={typeTimeOff}
            data={timeoff}
            loading={loadingTypeTimeOff}
            onChange={setTypeTimeOff}
          />
          <StatusFilter status={status} onChange={setStatus} />
        </div>
      </div>
      {isMobile ? <MobileView /> : isTablet ? <TabletView /> : <DesktopView />}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={data?.leaverequests?.totalPages}
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
