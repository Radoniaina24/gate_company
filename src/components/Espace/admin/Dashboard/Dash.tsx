"use client";
/* eslint-disable */
import React, { useState } from "react";
import {
  FaUsers,
  FaCalendarAlt,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaPlus,
  FaSearch,
  FaBuilding,
  FaMoneyBillWave,
  FaUserCheck,
  FaShieldAlt,
  FaTasks,
  FaAward,
  FaGraduationCap,
  FaUserPlus,
} from "react-icons/fa";
import {
  MdTrendingUp,
  MdTrendingDown,
  MdMoreVert,
  MdAnalytics,
} from "react-icons/md";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// 🔷 Types

type Stat = {
  totalUsers: number;
  activeUsers: number;
  pendingRequests: number;
  avgResponseTime: string;
  totalBudget: number;
  pendingBudget: number;
  satisfactionRate: number;
  activeProjects: number;
  completedTasks: number;
  overdueRequests: number;
  newHires: number;
  turnoverRate: number;
};

type UserGrowth = {
  month: string;
  users: number;
  active: number;
  newHires: number;
  departures: number;
};

type LeaveStatus = {
  name: string;
  value: number;
  color: string;
};

type Department = {
  dept: string;
  employees: number;
  leaves: number;
  budget: number;
  satisfaction: number;
};

type RequestStatus = "pending" | "approved" | "rejected" | "cancelled";
type UserStatus = "online" | "offline" | "away" | "busy";
type Priority = "low" | "medium" | "high" | "urgent";

type RecentRequest = {
  id: number;
  user: string;
  type: string;
  period: string;
  status: RequestStatus;
  department: string;
  priority: Priority;
  submittedDate: string;
  daysLeft: number;
};

type RecentUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: UserStatus;
  department: string;
  avatar: string;
  joinDate: string;
  completedTasks: number;
};

type TrendDirection = "up" | "down";

type Performance = {
  month: string;
  productivity: number;
  satisfaction: number;
  attendance: number;
};

type LeaveType = {
  type: string;
  count: number;
  percentage: number;
  color: string;
};

type TopPerformer = {
  id: number;
  name: string;
  department: string;
  score: number;
  avatar: string;
  badges: string[];
};

type UpcomingEvent = {
  id: number;
  title: string;
  date: string;
  type: "meeting" | "deadline" | "holiday" | "training";
  participants: number;
};

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: TrendDirection;
  icon: React.ReactNode;
  color?: string;
  subtitle?: string;
  showProgress?: boolean;
  progressValue?: number;
  size?: "small" | "medium" | "large";
}

interface StatusBadgeProps {
  status: RequestStatus | UserStatus;
}

interface PriorityBadgeProps {
  priority: Priority;
}

// 🔷 Sous-composants

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<string, string> = {
    pending:
      "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-200",
    approved:
      "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-200",
    rejected:
      "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200",
    cancelled:
      "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200",
    online:
      "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-200",
    offline:
      "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200",
    away: "bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-orange-200",
    busy: "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200",
  };

  const labels: Record<string, string> = {
    pending: "En attente",
    approved: "Approuvé",
    rejected: "Refusé",
    cancelled: "Annulé",
    online: "En ligne",
    offline: "Hors ligne",
    away: "Absent",
    busy: "Occupé",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const styles: Record<Priority, string> = {
    low: "bg-blue-50 text-blue-700 border-blue-200",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    high: "bg-orange-50 text-orange-700 border-orange-200",
    urgent: "bg-red-50 text-red-700 border-red-200",
  };

  const labels: Record<Priority, string> = {
    low: "Faible",
    medium: "Moyen",
    high: "Élevé",
    urgent: "Urgent",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[priority]}`}
    >
      {labels[priority]}
    </span>
  );
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  color = "blue",
  subtitle,
  showProgress = false,
  progressValue = 0,
  size = "medium",
}) => {
  const sizeClasses = {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${sizeClasses[size]} hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br from-${color}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {title}
              </p>
              {change && (
                <div className="flex items-center gap-1">
                  {trend === "up" ? (
                    <MdTrendingUp className="text-emerald-500 text-sm" />
                  ) : (
                    <MdTrendingDown className="text-red-500 text-sm" />
                  )}
                  <span
                    className={`text-xs font-bold ${
                      trend === "up" ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {change}
                  </span>
                </div>
              )}
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            {showProgress && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r from-${color}-500 to-${color}-600 h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(progressValue, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {progressValue}% de l'objectif
                </p>
              </div>
            )}
          </div>
          <div
            className={`w-16 h-16 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
          >
            <span className="text-white text-2xl">{icon}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserCard: React.FC<{ user: RecentUser }> = ({ user }) => (
  <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
        {user.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div
        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
          user.status === "online"
            ? "bg-green-500"
            : user.status === "away"
            ? "bg-yellow-500"
            : user.status === "busy"
            ? "bg-red-500"
            : "bg-gray-400"
        }`}
      ></div>
    </div>
    <div className="ml-4 flex-1">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold text-gray-900">{user.name}</h4>
        <span className="text-xs text-gray-500">•</span>
        <span className="text-sm text-gray-600">{user.role}</span>
      </div>
      <p className="text-sm text-gray-500">{user.department}</p>
      <p className="text-xs text-gray-400">
        Dernière connexion: {user.lastLogin}
      </p>
    </div>
    <div className="text-right">
      <div className="text-sm font-semibold text-gray-900">
        {user.completedTasks}
      </div>
      <div className="text-xs text-gray-500">Tâches</div>
    </div>
  </div>
);

// 🔷 Données enrichies

const stats: Stat = {
  totalUsers: 1247,
  activeUsers: 892,
  pendingRequests: 23,
  avgResponseTime: "2.3h",
  totalBudget: 2450000,
  pendingBudget: 340000,
  satisfactionRate: 87,
  activeProjects: 15,
  completedTasks: 1834,
  overdueRequests: 5,
  newHires: 28,
  turnoverRate: 3.2,
};

const userGrowthData: UserGrowth[] = [
  { month: "Jan", users: 800, active: 600, newHires: 15, departures: 8 },
  { month: "Fév", users: 950, active: 720, newHires: 25, departures: 12 },
  { month: "Mar", users: 1100, active: 850, newHires: 30, departures: 15 },
  { month: "Avr", users: 1180, active: 880, newHires: 28, departures: 18 },
  { month: "Mai", users: 1220, active: 890, newHires: 22, departures: 16 },
  { month: "Jun", users: 1247, active: 892, newHires: 27, departures: 14 },
];

const leaveStatusData: LeaveStatus[] = [
  { name: "Approuvés", value: 45, color: "#10B981" },
  { name: "En attente", value: 23, color: "#F59E0B" },
  { name: "Refusés", value: 12, color: "#EF4444" },
  { name: "Annulés", value: 8, color: "#6B7280" },
];

const departmentData: Department[] = [
  { dept: "IT", employees: 45, leaves: 8, budget: 450000, satisfaction: 92 },
  { dept: "RH", employees: 23, leaves: 5, budget: 230000, satisfaction: 89 },
  {
    dept: "Finance",
    employees: 34,
    leaves: 7,
    budget: 340000,
    satisfaction: 85,
  },
  {
    dept: "Marketing",
    employees: 28,
    leaves: 4,
    budget: 280000,
    satisfaction: 91,
  },
  {
    dept: "Ventes",
    employees: 52,
    leaves: 12,
    budget: 520000,
    satisfaction: 88,
  },
  {
    dept: "Support",
    employees: 38,
    leaves: 9,
    budget: 380000,
    satisfaction: 87,
  },
];

const performanceData: Performance[] = [
  { month: "Jan", productivity: 85, satisfaction: 78, attendance: 94 },
  { month: "Fév", productivity: 88, satisfaction: 82, attendance: 96 },
  { month: "Mar", productivity: 92, satisfaction: 85, attendance: 93 },
  { month: "Avr", productivity: 90, satisfaction: 87, attendance: 95 },
  { month: "Mai", productivity: 94, satisfaction: 89, attendance: 97 },
  { month: "Jun", productivity: 91, satisfaction: 87, attendance: 94 },
];

const leaveTypes: LeaveType[] = [
  { type: "Congé payé", count: 45, percentage: 51, color: "#3B82F6" },
  { type: "Congé maladie", count: 23, percentage: 26, color: "#EF4444" },
  { type: "RTT", count: 12, percentage: 14, color: "#10B981" },
  { type: "Formation", count: 8, percentage: 9, color: "#F59E0B" },
];

const topPerformers: TopPerformer[] = [
  {
    id: 1,
    name: "Alice Johnson",
    department: "IT",
    score: 98,
    avatar: "AJ",
    badges: ["★", "🏆", "🎯"],
  },
  {
    id: 2,
    name: "Bob Smith",
    department: "Marketing",
    score: 95,
    avatar: "BS",
    badges: ["★", "🏆"],
  },
  {
    id: 3,
    name: "Carol Williams",
    department: "Finance",
    score: 92,
    avatar: "CW",
    badges: ["★", "🎯"],
  },
  {
    id: 4,
    name: "David Brown",
    department: "RH",
    score: 89,
    avatar: "DB",
    badges: ["★"],
  },
];

const upcomingEvents: UpcomingEvent[] = [
  {
    id: 1,
    title: "Réunion équipe IT",
    date: "2025-07-15",
    type: "meeting",
    participants: 8,
  },
  {
    id: 2,
    title: "Formation sécurité",
    date: "2025-07-16",
    type: "training",
    participants: 25,
  },
  {
    id: 3,
    title: "Deadline projet Alpha",
    date: "2025-07-18",
    type: "deadline",
    participants: 12,
  },
  {
    id: 4,
    title: "Jour férié",
    date: "2025-07-21",
    type: "holiday",
    participants: 0,
  },
];

const recentRequests: RecentRequest[] = [
  {
    id: 1,
    user: "Marie Dubois",
    type: "Congé payé",
    period: "15-20 Mars",
    status: "pending",
    department: "IT",
    priority: "medium",
    submittedDate: "2025-03-10",
    daysLeft: 5,
  },
  {
    id: 2,
    user: "Jean Martin",
    type: "Congé maladie",
    period: "10-12 Mars",
    status: "approved",
    department: "RH",
    priority: "high",
    submittedDate: "2025-03-08",
    daysLeft: 0,
  },
  {
    id: 3,
    user: "Sophie Laurent",
    type: "RTT",
    period: "8 Mars",
    status: "pending",
    department: "Finance",
    priority: "low",
    submittedDate: "2025-03-06",
    daysLeft: 2,
  },
  {
    id: 4,
    user: "Pierre Durand",
    type: "Formation",
    period: "22-29 Mars",
    status: "approved",
    department: "Marketing",
    priority: "medium",
    submittedDate: "2025-03-05",
    daysLeft: 0,
  },
  {
    id: 5,
    user: "Emma Thomas",
    type: "Congé sans solde",
    period: "1-15 Avril",
    status: "rejected",
    department: "IT",
    priority: "urgent",
    submittedDate: "2025-03-01",
    daysLeft: 0,
  },
];

const recentUsers: RecentUser[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@company.com",
    role: "Manager",
    lastLogin: "2h ago",
    status: "online",
    department: "IT",
    avatar: "AJ",
    joinDate: "2022-01-15",
    completedTasks: 847,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@company.com",
    role: "Developer",
    lastLogin: "5h ago",
    status: "offline",
    department: "IT",
    avatar: "BS",
    joinDate: "2021-08-22",
    completedTasks: 623,
  },
  {
    id: 3,
    name: "Carol Williams",
    email: "carol@company.com",
    role: "Designer",
    lastLogin: "1h ago",
    status: "online",
    department: "Marketing",
    avatar: "CW",
    joinDate: "2022-03-10",
    completedTasks: 589,
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@company.com",
    role: "Analyst",
    lastLogin: "3h ago",
    status: "away",
    department: "Finance",
    avatar: "DB",
    joinDate: "2023-01-05",
    completedTasks: 421,
  },
];

// 🔷 Composant principal

const Dash: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"7d" | "30d" | "90d">(
    "7d"
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "analytics" | "reports"
  >("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Utilisateurs"
            value={stats.totalUsers.toLocaleString()}
            change="+12%"
            trend="up"
            icon={<FaUsers />}
            subtitle="Depuis le mois dernier"
            showProgress={true}
            progressValue={85}
          />
          <StatCard
            title="Utilisateurs Actifs"
            value={stats.activeUsers.toLocaleString()}
            change="+8%"
            trend="up"
            icon={<FaUserCheck />}
            color="emerald"
            subtitle="Connectés récemment"
            showProgress={true}
            progressValue={72}
          />
          <StatCard
            title="Taux de Satisfaction"
            value={`${stats.satisfactionRate}%`}
            change="+3%"
            trend="up"
            icon={<FaAward />}
            color="amber"
            subtitle="Enquête employés"
            showProgress={true}
            progressValue={stats.satisfactionRate}
          />
          <StatCard
            title="Budget Alloué"
            value={`${(stats.totalBudget / 1000000).toFixed(1)}M€`}
            change="+15%"
            trend="up"
            icon={<FaMoneyBillWave />}
            color="purple"
            subtitle="Budget total RH"
            showProgress={true}
            progressValue={78}
          />
        </div>

        {/* Statistiques secondaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Demandes en Attente"
            value={stats.pendingRequests}
            change="-5%"
            trend="down"
            icon={<FaClock />}
            color="orange"
            size="small"
          />
          <StatCard
            title="Projets Actifs"
            value={stats.activeProjects}
            change="+2"
            trend="up"
            icon={<FaTasks />}
            color="blue"
            size="small"
          />
          <StatCard
            title="Tâches Terminées"
            value={stats.completedTasks.toLocaleString()}
            change="+127"
            trend="up"
            icon={<FaCheckCircle />}
            color="green"
            size="small"
          />
          <StatCard
            title="Nouvelles Embauches"
            value={stats.newHires}
            change="+18%"
            trend="up"
            icon={<FaUserPlus />}
            color="indigo"
            size="small"
          />
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Croissance des utilisateurs */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Évolution des Effectifs
                </h3>
                <p className="text-sm text-gray-600">
                  Croissance et mouvements de personnel
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                  6M
                </button>
                <button className="px-3 py-1 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">
                  1A
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fill="url(#colorUsers)"
                  name="Total Utilisateurs"
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  stroke="#10B981"
                  strokeWidth={3}
                  fill="url(#colorActive)"
                  name="Utilisateurs Actifs"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Statut des congés */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Statut des Congés
                </h3>
                <p className="text-sm text-gray-600">
                  Répartition des demandes
                </p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                <MdMoreVert />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={leaveStatusData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {leaveStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {leaveStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="text-sm text-gray-600">{item.name}</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance et types de congés */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Performance Globale
                </h3>
                <p className="text-sm text-gray-600">
                  Indicateurs clés de performance
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  name="Productivité"
                />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="#10B981"
                  strokeWidth={3}
                  name="Satisfaction"
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  name="Présence"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Types de Congés
                </h3>
                <p className="text-sm text-gray-600">
                  Répartition par catégorie
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {leaveTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: type.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">
                      {type.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${type.percentage}%`,
                          backgroundColor: type.color,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-8">
                      {type.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top performers et événements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Top Performers
                </h3>
                <p className="text-sm text-gray-600">
                  Meilleurs employés du mois
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100">
                Voir tous
              </button>
            </div>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div
                  key={performer.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {performer.avatar}
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {performer.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {performer.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {performer.badges.map((badge, idx) => (
                        <span key={idx} className="text-lg">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {performer.score}
                      </div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Événements à Venir
                </h3>
                <p className="text-sm text-gray-600">Prochaines échéances</p>
              </div>
              <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100">
                Calendrier
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      event.type === "meeting"
                        ? "bg-blue-100 text-blue-600"
                        : event.type === "training"
                        ? "bg-green-100 text-green-600"
                        : event.type === "deadline"
                        ? "bg-red-100 text-red-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {event.type === "meeting" && <FaUsers />}
                    {event.type === "training" && <FaGraduationCap />}
                    {event.type === "deadline" && <FaClock />}
                    {event.type === "holiday" && <FaCalendarAlt />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                  {event.participants > 0 && (
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {event.participants}
                      </div>
                      <div className="text-xs text-gray-500">participants</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Aperçu par département */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Aperçu par Département
              </h3>
              <p className="text-sm text-gray-600">
                Performance et budget par équipe
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100">
                Exporter
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                Filtrer
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dept" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="employees"
                fill="#3B82F6"
                name="Employés"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="leaves"
                fill="#F59E0B"
                name="Congés"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tableaux détaillés */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Demandes récentes */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Demandes Récentes
                  </h3>
                  <p className="text-sm text-gray-600">
                    Dernières demandes de congés
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                    <FaSearch />
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
                    <FaPlus className="text-xs" />
                    Nouvelle demande
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type & Période
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {request.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {request.user}
                            </div>
                            <div className="text-sm text-gray-500">
                              {request.department}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.type}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.period}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <PriorityBadge priority={request.priority} />
                          {request.daysLeft > 0 && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                              {request.daysLeft}j restants
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={request.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                            <FaEye />
                          </button>
                          <button className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors">
                            <FaCheckCircle />
                          </button>
                          <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors">
                            <FaTimesCircle />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Utilisateurs récents */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Utilisateurs Actifs
                  </h3>
                  <p className="text-sm text-gray-600">
                    Activité récente des employés
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100">
                  Voir tous
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {recentUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </div>

        {/* Actions rapides améliorées */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Actions Rapides
              </h3>
              <p className="text-sm text-gray-600">
                Accès rapide aux fonctionnalités principales
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <button className="group flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                <FaUsers />
              </div>
              <span className="text-sm font-semibold text-gray-900 text-center">
                Gérer Utilisateurs
              </span>
            </button>
            <button className="group flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 hover:border-emerald-200 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                <FaCalendarAlt />
              </div>
              <span className="text-sm font-semibold text-gray-900 text-center">
                Calendrier Congés
              </span>
            </button>
            <button className="group flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-violet-50 hover:border-purple-200 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                <FaFileAlt />
              </div>
              <span className="text-sm font-semibold text-gray-900 text-center">
                Rapports
              </span>
            </button>
            <button className="group flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-yellow-50 hover:border-amber-200 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                <FaBuilding />
              </div>
              <span className="text-sm font-semibold text-gray-900 text-center">
                Départements
              </span>
            </button>
            <button className="group flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-red-50 hover:to-rose-50 hover:border-red-200 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                <MdAnalytics />
              </div>
              <span className="text-sm font-semibold text-gray-900 text-center">
                Analyses
              </span>
            </button>
            <button className="group flex flex-col items-center p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 hover:border-teal-200 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                <FaShieldAlt />
              </div>
              <span className="text-sm font-semibold text-gray-900 text-center">
                Sécurité
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
