import React from "react";
import { useStaffContext } from "../context/StaffContext";

interface StatusFilterProps {
  className?: string;
}
const PaidFilter: React.FC<StatusFilterProps> = ({ className = "" }) => {
  const { paidFilter, setPaidFilter } = useStaffContext();
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i className="fas fa-filter text-gray-400" />
      </div>
      <select
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
        value={paidFilter}
        onChange={(e) => setPaidFilter(e.target.value)}
      >
        <option value="all">Tous les statuts </option>
        <option value="paid">Payé</option>
        <option value="unpaid">Non payé</option>
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <i className="fas fa-chevron-down text-gray-400" />
      </div>
    </div>
  );
};

export default PaidFilter;
