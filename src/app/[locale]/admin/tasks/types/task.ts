export enum TaskStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
  UNDER_REVIEW = "under_review",
  COMPLETED = "completed",
  POSTPONED = "postponed",
  CANCELLED = "cancelled",
}
export interface Task {
  responsible: Array<string>;
  title: string;
  description: string;
  startDate: string; // sérialisé en ISO string côté Next.js
  endDate: string;
  status: TaskStatus;
  percentage: number;
  remarks?: string;
}
