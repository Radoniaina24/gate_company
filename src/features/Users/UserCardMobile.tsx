import { User, Mail, Calendar, Shield } from "lucide-react";
import EditUser from "./Action/EditUser";
import RemoveUser from "./Action/RemoveUser";
import { IUser } from "./Liste";
import RoleBadge from "./utils/RoleBadge";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const UserCard = ({ user }: { user: IUser }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-4 hover:shadow-xl transition-all duration-300 hover:border-red-100">
    {/* Header avec utilisateur */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="bg-red-50 p-2 rounded-full">
          <User className="h-5 w-5 text-red-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
            {user.lastName} {user.firstName}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 flex items-center mt-1 truncate">
            <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-1 shrink-0" />
            {user.email}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-1 shrink-0">
        <div className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-red-500 transition-all duration-200">
          <EditUser user={user} />
        </div>
        <div className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-red-600 transition-all duration-200">
          <RemoveUser id={user._id} />
        </div>
      </div>
    </div>

    {/* Date de création */}
    <div className="mb-4">
      <div className="bg-red-50 rounded-lg p-3 border border-red-100">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="h-4 w-4 text-red-600" />
          <span className="text-xs font-medium text-red-700 uppercase tracking-wide">
            Date de création
          </span>
        </div>
        <div className="text-sm font-semibold text-gray-900">
          {formatDate(user.createdAt)}
        </div>
      </div>
    </div>

    {/* Rôles */}
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Shield className="h-4 w-4 text-red-600" />
        <span className="text-xs font-medium text-red-700 uppercase tracking-wide">
          Rôles
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {user.roles.map((role) => (
          <RoleBadge key={role} role={role} />
        ))}
      </div>
    </div>
  </div>
);
