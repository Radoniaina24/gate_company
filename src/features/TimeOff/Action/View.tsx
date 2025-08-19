import Modal from "@/components/Form/Modal";
import { StatusBadgeTimeOff } from "@/features/task/utils/StatusBadge";
import { Calendar, Clock, Eye, User } from "lucide-react";
import React, { useState } from "react";
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

interface TimeOff {
  _id: string;
  type: TypeTimeOff;
  reason?: string;
  manager?: Manager[];
  startDate: string;
  endDate: string;
  status: string;
}

const TimeOffCard = ({ timeOff }: { timeOff: TimeOff }) => {
  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const duration = calculateDuration(timeOff.startDate, timeOff.endDate);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{timeOff.type.name}</h3>
            <p className="text-sm text-gray-500">
              Durée max: {timeOff.type.Maxduration} jours
            </p>
          </div>
        </div>
        <StatusBadgeTimeOff status={timeOff.status} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>
            {formatDate(timeOff.startDate)} - {formatDate(timeOff.endDate)}
          </span>
          <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs font-medium">
            {duration} jour{duration > 1 ? "s" : ""}
          </span>
        </div>

        {timeOff.reason && (
          <div className="text-sm text-gray-700">
            <span className="font-medium">Motif:</span> {timeOff.reason}
          </div>
        )}

        {timeOff.manager && timeOff.manager.length > 0 && (
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <span>Manager{timeOff.manager.length > 1 ? "s" : ""}: </span>
            <div className="ml-1 flex flex-wrap gap-1">
              {timeOff.manager.map((manager, index) => (
                <span key={manager._id} className="text-blue-600">
                  {manager.firstName} {manager.lastName}
                  {index < timeOff.manager!.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default function ViewTimeOff({ timeOff }: { timeOff: TimeOff }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      {" "}
      <button
        onClick={() => setOpen(true)}
        className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 hover:scale-105"
        title="Supprimer"
      >
        <Eye className="h-4 w-4" />
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        // title="Details du tâche"
        maxWidth=" sm:max-w-[80%] md:max-w-[50%] lg:md:max-w-[30%]"
        maxHeight="max-h-[97%]"
      >
        <TimeOffCard timeOff={timeOff} />
      </Modal>
    </div>
  );
}
