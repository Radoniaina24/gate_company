"use client";
import { useGetAllCandidateQuery } from "@/redux/api/candidateApi";
import React, { createContext, useContext, useEffect, useState } from "react";
/* eslint-disable */
const CandidateContext = createContext<any | null>(null);
function CandidateProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>("nom");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [visibleColumns, setVisibleColumns] = useState({
    photo: false,
    nom: true,
    prenom: true,
    email: true,
    dateInscription: true,
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
  const { data, isLoading, error, refetch } = useGetAllCandidateQuery({
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
    <CandidateContext.Provider
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
    </CandidateContext.Provider>
  );
}

function useCandidateContext() {
  const context = useContext(CandidateContext);
  if (context === undefined)
    throw new Error("CandidateContext was used outside the CandidateProvider");
  return context;
}
export { CandidateProvider, useCandidateContext };
