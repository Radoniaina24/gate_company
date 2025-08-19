import React from "react";
import {
  getTaskStatusInfo,
  getTimeOffStatusInfo,
  TaskStatus,
} from "./getTaskStatusInfo";

type Props = {
  status: TaskStatus;
};

export function StatusBadge({ status }: Props) {
  const { label, color } = getTaskStatusInfo(status);

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {label}
    </span>
  );
}

export function StatusBadgeTimeOff({ status }: any) {
  const { label, color } = getTimeOffStatusInfo(status);

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {label}
    </span>
  );
}
