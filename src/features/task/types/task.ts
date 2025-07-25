export enum TaskStatus {
  not_started = "not_started",
  in_progress = "in_progress",
  pending = "pending",
  under_review = "under_review",
  completed = "completed",
  postponed = "postponed",
  cancelled = "cancelled",
}

type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
};
export interface Task {
  _id?: string;
  user?: User;
  responsible: Array<string>;
  title: string;
  description: string;
  startDate: string; // sérialisé en ISO string côté Next.js
  endDate: string;
  status: TaskStatus;
  remarks?: string;
}
