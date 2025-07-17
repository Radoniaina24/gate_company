"use client";
/* eslint-disable */
import { useGetAllCandidateQuery } from "@/redux/api/candidateApi";
import { useGetAllRecruiterQuery } from "@/redux/api/recruiterApi";
import { useGetAllUserQuery } from "@/redux/api/userApi";
import { selectUser } from "@/redux/features/authSlice";
import { JSX } from "react";
import { FaUsers, FaTicketAlt } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { PiUsersThree, PiPackage } from "react-icons/pi";
import { useSelector } from "react-redux";

type StatsCardProps = {
  icon: JSX.Element;
  label: string;
  value: string | number;
  iconBgColor: string;
};

const StatsCard = ({ icon, label, value, iconBgColor }: StatsCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
    <div className={`rounded-full p-3 mr-4 ${iconBgColor}`}>{icon}</div>
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const StatsCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center animate-pulse">
    <div className="rounded-full bg-gray-200 dark:bg-gray-700 p-3 mr-4 w-10 h-10" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
    </div>
  </div>
);

export default function StatsCards() {
  const user: any = useSelector(selectUser);
  const role = user?.role || user?.user?.role;

  const { data: candidateData, isLoading: isLoadingCandidate } =
    useGetAllCandidateQuery("");
  const { data: recruiterData, isLoading: isLoadingRecruiter } =
    useGetAllRecruiterQuery("");
  const { data: userData, isLoading: isLoadingUser } = useGetAllUserQuery("");

  const isLoading = isLoadingCandidate || isLoadingRecruiter || isLoadingUser;

  // Configuration des statistiques selon le rôle
  const getStatsConfig = () => {
    const baseStats = {
      admin: [
        {
          icon: (
            <PiUsersThree className="text-pink-800 dark:text-blue-200 text-xl" />
          ),
          label: "Candidats inscrits",
          value: candidateData?.totalCandidates || 0,
          iconBgColor: "bg-pink-100 dark:bg-blue-900",
        },
        {
          icon: (
            <PiUsersThree className="text-blue-800 dark:text-blue-200 text-xl" />
          ),
          label: "Recruteurs inscrits",
          value: recruiterData?.totalRecruiters || 0,
          iconBgColor: "bg-blue-100 dark:bg-blue-900",
        },
        {
          icon: (
            <FaUsers className="text-yellow-600 dark:text-yellow-400 text-xl" />
          ),
          label: "Utilisateurs totaux",
          value: userData?.totalUsers || 0,
          iconBgColor: "bg-yellow-100 dark:bg-yellow-900",
        },
        // {
        //   icon: (
        //     <FaMoneyBillTrendUp className="text-green-600 dark:text-green-400 text-xl" />
        //   ),
        //   label: "Revenus",
        //   value: "130 000 Ar",
        //   iconBgColor: "bg-green-100 dark:bg-green-900",
        // },
      ],
      candidate: [
        {
          icon: (
            <FaTicketAlt className="text-blue-600 dark:text-blue-400 text-xl" />
          ),
          label: "Tickets achetés",
          value: user?.ticketsPurchased || user?.user?.ticketsPurchased || 0,
          iconBgColor: "bg-blue-100 dark:bg-blue-900",
        },
      ],
      recruiter: [
        {
          icon: (
            <PiPackage className="text-purple-600 dark:text-purple-400 text-xl" />
          ),
          label: "Packs achetés",
          value: user?.packsPurchased || user?.user?.packsPurchased || 0,
          iconBgColor: "bg-purple-100 dark:bg-purple-900",
        },
      ],
    };

    return baseStats[role as keyof typeof baseStats] || baseStats.admin;
  };

  const stats = getStatsConfig();

  return (
    <div
      className={`grid gap-4 mb-8 ${
        role === "candidate" || role === "recruiter"
          ? "grid-cols-1 max-w-sm"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {isLoading
        ? stats.map((_, index) => <StatsCardSkeleton key={index} />)
        : stats.map((stat, index) => <StatsCard key={index} {...stat} />)}
    </div>
  );
}
