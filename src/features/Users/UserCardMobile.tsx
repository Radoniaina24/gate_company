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
  <div className="bg-white rounded-lg shadow p-4 mb-3 dark:bg-gray-700">
    <div className="flex items-start space-x-4">
      {/* <img
          className="h-12 w-12 rounded-full object-cover"
          src={user.avatar}
          alt=""
        /> */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user.lastName} {user.firstName}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
          <div className="flex space-x-2">
            <EditUser user={user} />
            {/* <button
                onClick={() => handleDelete(user._id)}
                className="p-1 text-gray-500 hover:text-red-600"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button> */}
            <RemoveUser id={user._id} />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-500 dark:text-gray-400">
            <div className="text-xs">Créé le</div>
            <div>{formatDate(user.createdAt)}</div>
          </div>
        </div>
        <div className="flex  justify-end items-center gap-2 mt-5">
          {user.roles.map((role) => (
            <RoleBadge key={role} role={role} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
