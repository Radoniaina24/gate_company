import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  Pause,
  Play,
  Eye,
  X,
} from "lucide-react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface TaskData {
  _id: string;
  user: User;
  responsible: User[];
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status:
    | "not_started"
    | "in_progress"
    | "pending"
    | "under_review"
    | "postponed"
    | "completed"
    | "cancelled";
  remarks: string;
  createdAt: string;
  updatedAt: string;
}

function TaskCardView({ task }: { task: TaskData }) {
  // console.log(task);

  const statusOptions = [
    {
      value: "not_started",
      label: "Non commencé",
      color: "from-gray-500 to-gray-600",
      bg: "bg-gray-50",
      text: "text-gray-700",
      icon: Pause,
    },
    {
      value: "in_progress",
      label: "En cours",
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: Play,
    },
    {
      value: "pending",
      label: "En attente",
      color: "from-yellow-500 to-orange-500",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      icon: Clock,
    },
    {
      value: "under_review",
      label: "Révision",
      color: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
      text: "text-purple-700",
      icon: Eye,
    },
    {
      value: "postponed",
      label: "Reporté",
      color: "from-orange-500 to-red-500",
      bg: "bg-orange-50",
      text: "text-orange-700",
      icon: Pause,
    },
    {
      value: "completed",
      label: "Terminé",
      color: "from-green-500 to-emerald-600",
      bg: "bg-green-50",
      text: "text-green-700",
      icon: CheckCircle2,
    },
    {
      value: "cancelled",
      label: "Annulé",
      color: "from-red-500 to-red-600",
      bg: "bg-red-50",
      text: "text-red-700",
      icon: X,
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCurrentStatus = () => {
    return (
      statusOptions.find((option) => option.value === task.status) ||
      statusOptions[0]
    );
  };

  const getDaysRemaining = () => {
    const endDate = new Date(task.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressPercentage = () => {
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);
    const today = new Date();

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = today.getTime() - startDate.getTime();

    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  };

  const currentStatus = getCurrentStatus();
  const StatusIcon = currentStatus.icon;
  const daysRemaining = getDaysRemaining();
  const progress = getProgressPercentage();

  return (
    <div className="">
      <div className="">
        {/* Main Task Card - Design plus moderne */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
          {/* Header avec gradient dynamique */}
          <div
            className={`bg-gradient-to-r ${currentStatus.color} px-8 py-6 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {task.title}
                    </h2>
                    <p className="text-white/80 text-sm">
                      #{task._id.slice(-8)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badge avec animation */}
              <div
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30`}
              >
                <StatusIcon className="w-5 h-5 text-white animate-pulse" />
                <span className="text-white font-semibold">
                  {currentStatus.label}
                </span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          {/* Progress Bar */}
          {/* {task.status === "in_progress" && (
            <div className="px-8 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progression
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )} */}

          <div className="p-8">
            {/* Cards modernes avec hover effects */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Créateur Card */}
              <div className="group bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">Créateur</h3>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                    {task.user.firstName} {task.user.lastName}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{task.user.email}</span>
                  </div>
                </div>
              </div>

              {/* Dates Card */}
              <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">Échéances</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Début:</span>
                    <span className="font-semibold text-gray-900">
                      {formatDate(task.startDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Fin:</span>
                    <span className="font-semibold text-gray-900">
                      {formatDate(task.endDate)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-blue-200">
                    <span
                      className={`text-sm font-medium ${
                        daysRemaining > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {daysRemaining > 0
                        ? `${daysRemaining} jours restants`
                        : `En retard de ${Math.abs(daysRemaining)} jours`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="group bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">Équipe</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Responsables:</span>
                    <span className="font-semibold text-purple-600">
                      {task.responsible.length}
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {task.responsible.map((person, index) => (
                      <div
                        key={person._id}
                        className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-white"
                        title={`${person.firstName} ${person.lastName}`}
                      >
                        <span className="text-white font-semibold text-xs">
                          {person.firstName.charAt(0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description moderne */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-xl font-bold text-gray-900">Description</h3>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-100">
                <div
                  dangerouslySetInnerHTML={{ __html: task.description }}
                  className="text-gray-700 leading-relaxed"
                />
              </div>
            </div>

            {/* Responsables avec design amélioré */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Équipe Responsable
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {task.responsible.length} membres
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {task.responsible.map((person, index) => (
                  <div
                    key={person._id}
                    className="group bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                          <span className="text-white font-bold">
                            {person.firstName.charAt(0)}
                            {person.lastName.charAt(0)}
                          </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                          {person.firstName} {person.lastName}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{person.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remarques avec style moderne - Affichage conditionnel selon le statut */}
            {task.remarks &&
              ["pending", "under_review", "postponed", "cancelled"].includes(
                task.status
              ) && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Remarques
                  </h3>
                  <div
                    className={`p-6 rounded-r-2xl border-l-4 ${
                      task.status === "pending"
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400"
                        : task.status === "under_review"
                        ? "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-400"
                        : task.status === "postponed"
                        ? "bg-gradient-to-r from-orange-50 to-red-50 border-orange-400"
                        : task.status === "cancelled"
                        ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-400"
                        : "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          task.status === "pending"
                            ? "bg-yellow-400"
                            : task.status === "under_review"
                            ? "bg-purple-400"
                            : task.status === "postponed"
                            ? "bg-orange-400"
                            : task.status === "cancelled"
                            ? "bg-red-400"
                            : "bg-yellow-400"
                        }`}
                      >
                        <AlertCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-700 italic font-medium">
                          "{task.remarks}"
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Remarque liée au statut:{" "}
                          <span className="font-semibold">
                            {currentStatus.label}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* Métadonnées avec design moderne */}
            <div className="border-t border-gray-100 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>
                    <strong>Créé le:</strong> {formatDateTime(task.createdAt)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>
                    <strong>Modifié le:</strong>{" "}
                    {formatDateTime(task.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCardView;
