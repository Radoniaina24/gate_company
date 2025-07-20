// utils/roleConfig.ts

export type RoleKey = "admin" | "manager" | "employee" | "default";

export type RoleConfig = {
  label: string;
  color: string;
  priority: number;
};

export const ROLE_CONFIG: Record<RoleKey, RoleConfig> = {
  admin: {
    label: "Administrateur",
    color: "text-purple-600",
    priority: 3,
  },
  manager: {
    label: "Manager",
    color: "text-orange-600",
    priority: 2,
  },
  employee: {
    label: "Employé",
    color: "text-blue-600",
    priority: 1,
  },
  default: {
    label: "Utilisateur",
    color: "text-gray-500",
    priority: 0,
  },
};
