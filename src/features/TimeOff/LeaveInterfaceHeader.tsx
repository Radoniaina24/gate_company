import React from "react";
import { Calendar, Users, Clock, CheckCircle } from "lucide-react";
import { StatCard } from "./StatCard";
import AddTimeOff from "./Action/AddTimeOff";

interface LeaveInterfaceHeaderProps {
  data: any;
  title?: string;

  addLeaverequest?: boolean;
}
export default function LeaveInterfaceHeader({
  data,
  title = "Gestion des Congés",
  addLeaverequest = true,
}: LeaveInterfaceHeaderProps) {
  const leaveRequest = data?.leaverequests || data?.data.leaverequests;
  const stats = [
    {
      title: "Total",
      value: leaveRequest?.allLeaveRequests || 0,
      color: "blue",
      icon: <Calendar className="text-white" size={20} />,
    },
    {
      title: "En attente",
      value: leaveRequest?.allLeaveRequestsPending || 0,
      color: "amber",
      icon: <Clock className="text-white" size={20} />,
    },
    {
      title: "Approuvés",
      value: leaveRequest?.allLeaveRequestsApproved || 0,
      color: "green",
      icon: <CheckCircle className="text-white" size={20} />,
    },
    {
      title: "Rejetés",
      value: leaveRequest?.allLeaveRequestsRejected || 0,
      color: "red",
      icon: <Users className="text-white" size={20} />,
    },
  ];
  return (
    <div className="">
      {/* Header Principal */}
      <div className="bg-white border  rounded-3xl  p-8 mb-5">
        {/* Section Titre et Métriques */}

        <div className="flex justify-between items-center">
          <div className="">
            <div>
              <h1 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {title}
              </h1>
            </div>
          </div>
          {addLeaverequest && <AddTimeOff />}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
