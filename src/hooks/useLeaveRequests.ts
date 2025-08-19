// hooks/useTaskEvents.ts
import { useEffect } from "react";
import { getSocket } from "@/utils/socket";

import { timeoffAPI } from "@/redux/api/timeoffApi";

export const useleaveRequest = (params: Record<string, any>) => {
  const socket = getSocket();
  const [triggerRefetch] =
    timeoffAPI.endpoints.getLeaveRequestForManager.useLazyQuery();

  useEffect(() => {
    const refetch = () => {
      triggerRefetch(params);
    };

    socket.on("LeaveRequestCreated", refetch);
    socket.on("LeaveRequestUpdated", refetch);
    socket.on("LeaveRequestDeleted", refetch);

    return () => {
      socket.off("LeaveRequestCreated", refetch);
      socket.off("LeaveRequestUpdated", refetch);
      socket.off("LeaveRequestDeleted", refetch);
    };
  }, [params]);
};
