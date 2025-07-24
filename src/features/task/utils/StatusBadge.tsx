import React from "react";
import { getTaskStatusInfo, TaskStatus } from "./getTaskStatusInfo";

type Props = {
  status: TaskStatus;
};

export default function StatusBadge({ status }: Props) {
  const { label, color } = getTaskStatusInfo(status);

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {label}
    </span>
  );
}
