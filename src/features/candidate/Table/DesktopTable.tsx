import React from "react";
import { useCandidateContext } from "../context/CandidateContext";
import {
  ChevronUp,
  ChevronDown,
  User,
  Mail,
  GraduationCap,
  BookOpen,
  Award,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Camera,
} from "lucide-react";
import dayjs from "dayjs";
import ViewCandidate from "../Actions/ViewCandidate";
import DeleteCandidate from "../Actions/DeleteCandidate";
import EditCandidate from "../Actions/EditCandidate";

/* eslint-disable */
export default function DesktopTable() {
  const { visibleColumns, handleSort, sortColumn, sortDirection, data } =
    useCandidateContext();

  dayjs.locale("en");

  const formatDate = (
    isoDate: string | number | Date | dayjs.Dayjs | null | undefined
  ) => {
    return dayjs(isoDate).format("DD MMMM YYYY");
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border border-emerald-200";
      case "unapproved":
        return "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200";
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "approved" ? (
      <CheckCircle className="w-4 h-4 text-emerald-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );
  };

  const getSortIcon = (column: string) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? (
        <ChevronUp className="w-4 h-4 text-blue-600" />
      ) : (
        <ChevronDown className="w-4 h-4 text-blue-600" />
      );
    }
    return (
      <ChevronDown className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    );
  };

  const users = data?.candidates;

  return (
    <div className="hidden md:block bg-white    overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* En-tête du tableau */}
          <thead className="bg-gradient-to-r from-blue-600 to-orange-500 sticky top-0 z-[95]">
            <tr>
              {visibleColumns.photo && (
                <th
                  scope="col"
                  className="group px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Camera className="w-4 h-4" />
                    <span>Photo</span>
                  </div>
                </th>
              )}

              {visibleColumns.nom && (
                <th
                  scope="col"
                  className="group px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("nom")}
                >
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Nom</span>
                    {getSortIcon("nom")}
                  </div>
                </th>
              )}

              {visibleColumns.prenom && (
                <th
                  scope="col"
                  className="group px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("prenom")}
                >
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Prénom</span>
                    {getSortIcon("prenom")}
                  </div>
                </th>
              )}

              {visibleColumns.email && (
                <th
                  scope="col"
                  className="group px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                    {getSortIcon("email")}
                  </div>
                </th>
              )}

              {visibleColumns.diplome && (
                <th
                  scope="col"
                  className="group px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("diplome")}
                >
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Diplôme</span>
                    {getSortIcon("diplome")}
                  </div>
                </th>
              )}

              {visibleColumns.niveau && (
                <th
                  scope="col"
                  className="group px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("niveau")}
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Niveau</span>
                    {getSortIcon("niveau")}
                  </div>
                </th>
              )}

              {visibleColumns.mention && (
                <th
                  scope="col"
                  className="group px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("mention")}
                >
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Mention</span>
                    {getSortIcon("mention")}
                  </div>
                </th>
              )}

              {visibleColumns.dateInscription && (
                <th
                  scope="col"
                  className="group px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("dateInscription")}
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Inscription</span>
                    {getSortIcon("dateInscription")}
                  </div>
                </th>
              )}

              {visibleColumns.status && (
                <th
                  scope="col"
                  className="group px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Statut</span>
                    {getSortIcon("status")}
                  </div>
                </th>
              )}

              {visibleColumns.actions && (
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Corps du tableau */}
          <tbody className="bg-white divide-y divide-gray-100">
            {users?.length > 0 ? (
              users.map((user: any, index: any) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gradient-to-r from-gray-50 to-blue-50/30"
                  } hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 transition-all duration-200 group`}
                >
                  {visibleColumns.photo && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full object-cover border-2 border-gradient-to-r from-blue-200 to-orange-200 shadow-md"
                            src={user.photo.url}
                            alt={`Photo de ${user.nom}`}
                          />
                        </div>
                      </div>
                    </td>
                  )}

                  {visibleColumns.nom && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-blue-100 to-orange-100 rounded-full p-2">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {user.lastName}
                        </div>
                      </div>
                    </td>
                  )}

                  {visibleColumns.prenom && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName}
                      </div>
                    </td>
                  )}

                  {visibleColumns.email && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <div className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                          {user.emailAddress}
                        </div>
                      </div>
                    </td>
                  )}

                  {visibleColumns.diplome && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-purple-500" />
                        <div className="text-sm font-medium text-gray-700">
                          {user.program}
                        </div>
                      </div>
                    </td>
                  )}

                  {visibleColumns.niveau && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-indigo-500" />
                        <div className="text-sm text-gray-600">
                          {user.studyPeriod}
                        </div>
                      </div>
                    </td>
                  )}

                  {visibleColumns.mention && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <div className="text-sm text-gray-600">
                          {user.funding}
                        </div>
                      </div>
                    </td>
                  )}

                  {visibleColumns.dateInscription && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-green-500" />
                        <div className="text-sm text-gray-600">
                          {formatDate(user.createdAt)}
                        </div>
                      </div>
                    </td>
                  )}

                  {visibleColumns.status && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                          user.status
                        )}`}
                      >
                        {getStatusIcon(user.status)}
                        <span className="ml-2">
                          {user.status === "unapproved"
                            ? "Non validé"
                            : "Validé"}
                        </span>
                      </span>
                    </td>
                  )}

                  {visibleColumns.actions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        {user.status === "unapproved" ? (
                          <>
                            <ViewCandidate user={user} />
                            <EditCandidate user={user} />
                            <DeleteCandidate user={user} />
                          </>
                        ) : (
                          <ViewCandidate user={user} />
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Object.values(visibleColumns).filter(Boolean).length}
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-gradient-to-br from-blue-100 to-orange-100 rounded-full p-6">
                      <GraduationCap className="w-12 h-12 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Aucun candidat trouvé
                      </h3>
                      <p className="text-gray-500">
                        Il n'y a actuellement aucun candidat à afficher.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
