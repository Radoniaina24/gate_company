"use client";
/* eslint-disable */
import { useGetAllUserQuery } from "@/redux/api/userApi";
import React, { createContext, useContext, useEffect, useState } from "react";
const StaffContext = createContext<any | null>(null);
function StaffProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [paidFilter, setPaidFilter] = useState<string>("all");

  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>("nom");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [visibleColumns, setVisibleColumns] = useState({
    nom: true,
    prenom: true,
    email: true,
    role: true,
    actions: true,
    status: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const handleColumnToggle = (column: keyof typeof visibleColumns) => {
    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column],
    });
  };
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  // Pagination
  const { data, isLoading, error, refetch } = useGetAllUserQuery({
    search: searchTerm,
    role: statusFilter,
    limit: itemsPerPage,
    page: currentPage,
    status: paidFilter,
  });
  // console.log(data);
  useEffect(() => {
    setCurrentPage(1);
    refetch();
  }, [searchTerm, statusFilter]);
  return (
    <StaffContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        isColumnMenuOpen,
        setIsColumnMenuOpen,
        visibleColumns,
        setVisibleColumns,
        handleColumnToggle,
        sortColumn,
        setSortColumn,
        sortDirection,
        setSortDirection,
        handleSort,
        isLoading,
        data,
        error,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paidFilter,
        setPaidFilter,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
}

function useStaffContext() {
  const context = useContext(StaffContext);
  if (context === undefined)
    throw new Error("StaffContext was used outside the CandidateProvider");
  return context;
}
export { StaffProvider, useStaffContext };
