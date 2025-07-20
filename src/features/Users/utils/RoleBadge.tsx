// components/RoleBadge.tsx

import { ROLE_CONFIG, RoleKey } from "./roleConfig";

interface RoleBadgeProps {
  role: string;
  className?: string;
}

const RoleBadge = ({ role, className = "" }: RoleBadgeProps) => {
  const config = ROLE_CONFIG[role as RoleKey] ?? ROLE_CONFIG.default;

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${config.color} bg-gray-100 border border-gray-200 ${className}`}
    >
      {config.label}
    </span>
  );
};

export default RoleBadge;
