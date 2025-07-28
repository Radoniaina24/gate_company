// hooks/useTaskEvents.ts
import { useEffect } from "react";
import { getSocket } from "@/utils/socket";
import { departmentAPI } from "@/redux/api/departmentApi";

export const useDepartmentEvents = (params: Record<string, any>) => {
  const socket = getSocket();
  const [triggerRefetch] =
    departmentAPI.endpoints.getAllDepartment.useLazyQuery();

  useEffect(() => {
    const refetch = () => {
      triggerRefetch(params);
    };

    socket.on("departmentCreated", refetch);
    socket.on("departmentUpdated", refetch);
    socket.on("departmentDeleted", refetch);

    return () => {
      socket.off("departmentCreated", refetch);
      socket.off("departmentUpdated", refetch);
      socket.off("departmentDeleted", refetch);
    };
  }, [params]);
};
