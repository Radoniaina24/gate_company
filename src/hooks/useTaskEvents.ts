// hooks/useTaskEvents.ts
import { useEffect } from "react";
import { getSocket } from "@/utils/socket";
import { tasksAPI } from "@/redux/api/taskApi";

export const useTaskEvents = (params: Record<string, any>) => {
  const socket = getSocket();
  const [triggerRefetch] = tasksAPI.endpoints.getAllTasks.useLazyQuery();

  useEffect(() => {
    const refetch = () => {
      triggerRefetch(params);
    };

    socket.on("taskCreated", refetch);
    socket.on("taskUpdated", refetch);
    socket.on("taskDeleted", refetch);

    return () => {
      socket.off("taskCreated", refetch);
      socket.off("taskUpdated", refetch);
      socket.off("taskDeleted", refetch);
    };
  }, [params]);
};
