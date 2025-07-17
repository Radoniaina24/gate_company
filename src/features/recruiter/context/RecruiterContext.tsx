"use client";
import { useGetAllRecruiterQuery } from "@/redux/api/recruiterApi";
import React, { createContext, useContext, useEffect, useState } from "react";
/* eslint-disable */
const RecruiterContext = createContext<any | null>(null);
function RecruiterProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>("nom");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [visibleColumns, setVisibleColumns] = useState({
    nom: true,
    prenom: true,
    email: true,
    actions: true,
    status: true,
    company: true,
    dateInscription: true,
    country: true,
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
  const { data, isLoading, error, refetch } = useGetAllRecruiterQuery({
    search: searchTerm,
    status: statusFilter,
    sort: sortDirection,
    limit: itemsPerPage,
    page: currentPage,
  });
  useEffect(() => {
    setCurrentPage(1);
    refetch();
  }, [searchTerm, statusFilter, refetch]);
  // console.log(data);
  return (
    <RecruiterContext.Provider
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
      }}
    >
      {children}
    </RecruiterContext.Provider>
  );
}

function useRecruiterContext() {
  const context = useContext(RecruiterContext);
  if (context === undefined)
    throw new Error("RecruiterContext was used outside the CandidateProvider");
  return context;
}
export { RecruiterProvider, useRecruiterContext };
