import React from "react";
import { useRecruiterContext } from "../context/RecruiterContext";

interface StatusFilterProps {
  className?: string;
}
const StatusFilter: React.FC<StatusFilterProps> = ({ className = "" }) => {
  const { statusFilter, setStatusFilter } = useRecruiterContext();
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i className="fas fa-filter text-gray-400" />
      </div>
      <select
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">Tous les statuts</option>
        <option value="approved">Validé</option>
        <option value="unapproved">Non validé</option>
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <i className="fas fa-chevron-down text-gray-400" />
      </div>
    </div>
  );
};

export default StatusFilter;
