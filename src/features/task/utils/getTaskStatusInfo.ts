export enum TaskStatus {
  not_started = "not_started",
  in_progress = "in_progress",
  pending = "pending",
  under_review = "under_review",
  completed = "completed",
  postponed = "postponed",
  cancelled = "cancelled",
}

type StatusInfo = {
  label: string;
  color: string;
};

export function getTaskStatusInfo(status: TaskStatus): StatusInfo {
  switch (status) {
    case TaskStatus.not_started:
      return { label: "Non commencé", color: "bg-gray-500 text-white" };
    case TaskStatus.in_progress:
      return { label: "En cours", color: "bg-blue-500 text-white" };
    case TaskStatus.pending:
      return { label: "En attente", color: "bg-yellow-400 text-black" };
    case TaskStatus.under_review:
      return { label: "En révision", color: "bg-purple-500 text-white" };
    case TaskStatus.completed:
      return { label: "Terminé", color: "bg-green-500 text-white" };
    case TaskStatus.postponed:
      return { label: "Reporté", color: "bg-orange-500 text-white" };
    case TaskStatus.cancelled:
      return { label: "Annulé", color: "bg-red-500 text-white" };
    default:
      return { label: "Inconnu", color: "bg-gray-300 text-black" };
  }
}

export function getTimeOffStatusInfo(status: string): StatusInfo {
  switch (status) {
    case "pending":
      return { label: "En attente", color: "bg-yellow-400 text-black" };
    case "approved":
      return { label: "Approuvé", color: "bg-green-500 text-white" };
    case "rejected":
      return { label: "Refusé", color: "bg-red-500 text-white" };
    default:
      return { label: "Inconnu", color: "bg-gray-300 text-black" };
  }
}
