import { Edit, Eye, Trash2, User, Calendar, CalendarCheck } from "lucide-react";
import { Task } from "./types/task";
import StatusBadge from "./utils/StatusBadge";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const TaskCard = ({ task }: { task: Task }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-4 hover:shadow-xl transition-all duration-300 hover:border-red-100">
    {/* Header avec utilisateur */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="bg-red-50 p-2 rounded-full">
          <User className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {task?.user?.lastName} {task?.user?.firstName}
          </h3>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            {task?.user?.email}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-1">
        <button
          onClick={() => console.log("view")}
          className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-red-500 transition-all duration-200 group"
          title="Voir les détails"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={() => console.log("edit")}
          className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-red-500 transition-all duration-200 group"
          title="Modifier"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => console.log("delete")}
          className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-red-600 transition-all duration-200 group"
          title="Supprimer"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>

    {/* Dates avec icônes */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-red-50 rounded-lg p-3 border border-red-100">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="h-4 w-4 text-red-600" />
          <span className="text-xs font-medium text-red-700 uppercase tracking-wide">
            Date de début
          </span>
        </div>
        <div className="text-sm font-semibold text-gray-900">
          {formatDate(task.startDate)}
        </div>
      </div>

      <div className="bg-red-50 rounded-lg p-3 border border-red-100">
        <div className="flex items-center space-x-2 mb-2">
          <CalendarCheck className="h-4 w-4 text-red-600" />
          <span className="text-xs font-medium text-red-700 uppercase tracking-wide">
            Date de fin
          </span>
        </div>
        <div className="text-sm font-semibold text-gray-900">
          {formatDate(task.endDate)}
        </div>
      </div>
    </div>

    {/* Status Badge */}
    <div className="flex justify-end">
      <StatusBadge status={task.status} />
    </div>
  </div>
);
