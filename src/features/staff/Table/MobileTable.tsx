/* eslint-disable */
import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import {
  User,
  Mail,
  UserCheck,
  CreditCard,
  Search,
  Calendar,
  Badge,
  Users,
} from "lucide-react";
import { useStaffContext } from "../context/StaffContext";
import EditUserStaff from "../Actions/EditUserCandidate";
import DeleteUserStaff from "../Actions/DeleteUserCandidate";

export default function MobileTable() {
  const { visibleColumns, currentPage, data } = useStaffContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  dayjs.locale("en");

  const getStatusClass = (status: string) => {
    switch (status) {
      case "candidate":
        return "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border-orange-200";
      case "recruiter":
        return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getStatusPaid = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200";
      case "unpaid":
        return "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getRoleIcon = (role: string) => {
    return role === "candidate" ? (
      <Search className="w-4 h-4" />
    ) : (
      <Users className="w-4 h-4" />
    );
  };

  const users = data?.users;

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
              {/* Header avec nom */}
              {visibleColumns.nom && (
                <div className="bg-gradient-to-r from-blue-600 to-orange-500 px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {user.lastName} {user.firstName}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

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
                          Email
                        </p>
                        <p className="text-gray-900 font-medium">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rôle */}
                {visibleColumns.role && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-orange-400">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 rounded-full p-2">
                        {getRoleIcon(user.role)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Rôle
                        </p>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusClass(
                            user.role
                          )}`}
                        >
                          <Badge className="w-3 h-3 mr-1" />
                          {user.role === "candidate" ? "Candidat" : "Recruteur"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status */}
                {visibleColumns.status && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-green-400">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-full p-2">
                        <CreditCard className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Statut de paiement
                        </p>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusPaid(
                            user.status
                          )}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              user.status === "paid"
                                ? "bg-emerald-500"
                                : "bg-red-500"
                            }`}
                          />
                          {user.status === "paid" ? "Payé" : "Non payé"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {visibleColumns.actions && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-end space-x-3">
                      <EditUserStaff user={user} />
                      <DeleteUserStaff user={user} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="bg-gradient-to-br from-blue-100 to-orange-100 rounded-full p-6 mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun utilisateur trouvé
            </h3>
            <p className="text-gray-500 text-center max-w-sm">
              Il n'y a actuellement aucun utilisateur à afficher. Les nouveaux
              utilisateurs apparaîtront ici.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
