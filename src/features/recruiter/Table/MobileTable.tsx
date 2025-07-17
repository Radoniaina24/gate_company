import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import {
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  Briefcase,
  User,
} from "lucide-react";
import ViewCandidate from "../Actions/ViewCandidate";
import EditCandidate from "../Actions/EditCandidate";
import DeleteCandidate from "../Actions/DeleteCandidate";
import { useRecruiterContext } from "../context/RecruiterContext";

/* eslint-disable */
export default function MobileTable() {
  const { visibleColumns, currentPage, data } = useRecruiterContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  dayjs.locale("en");

  const formatDate = (
    isoDate: string | number | Date | dayjs.Dayjs | null | undefined
  ) => {
    return dayjs(isoDate).format("DD MMMM YYYY");
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200";
      case "unapproved":
        return "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200";
      default:
        return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "approved" ? (
      <CheckCircle className="w-4 h-4 text-emerald-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );
  };

  const users = data?.recruiters;

  return (
    <div className="md:hidden bg-gradient-to-br from-slate-50 to-gray-100 p-4">
      <div
        ref={scrollRef}
        className="space-y-4"
        style={{
          height: "calc(100vh - 300px)",
          minHeight: "400px",
          maxHeight: "800px",
          overflowY: "auto",
        }}
      >
        {users?.length > 0 ? (
          users.map((user: any) => (
            <div
              key={user._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Header avec nom et rôle */}
              <div className="bg-gradient-to-r from-blue-600 to-orange-500 px-6 py-4">
                <div className="flex items-center space-x-4">
                  {/* Avatar professionnel */}
                  <div className="relative">
                    <div className="bg-white/20 rounded-full p-3">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    {/* Statut badge */}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      {getStatusIcon(user.status)}
                    </div>
                  </div>

                  {/* Nom et titre */}
                  <div className="flex-1">
                    {visibleColumns.nom && (
                      <>
                        <h3 className="text-lg font-semibold text-white">
                          {user.lastName} {user.firstName}
                        </h3>
                        <p className="text-blue-100 text-sm flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          Recruteur professionnel
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Email */}
                {visibleColumns.email && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 rounded-full p-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Email professionnel
                        </p>
                        <p className="text-gray-900 font-medium break-all">
                          {user.emailAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Entreprise */}
                {visibleColumns.company && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-orange-400">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 rounded-full p-2">
                        <Building2 className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Entreprise
                        </p>
                        <p className="text-gray-900 font-medium">
                          {user.company}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Date d'inscription */}
                {visibleColumns.dateInscription && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-green-400">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-full p-2">
                        <Calendar className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Date d'inscription
                        </p>
                        <p className="text-gray-900 font-medium">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Statut */}
                {visibleColumns.status && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-purple-400">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 rounded-full p-2">
                        <Clock className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Statut de validation
                        </p>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusClass(
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
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {visibleColumns.actions && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-end space-x-3">
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
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="bg-gradient-to-br from-blue-100 to-orange-100 rounded-full p-6 mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun recruteur trouvé
            </h3>
            <p className="text-gray-500 text-center max-w-sm">
              Il n'y a actuellement aucun recruteur à afficher. Les nouveaux
              recruteurs apparaîtront ici une fois inscrits.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
