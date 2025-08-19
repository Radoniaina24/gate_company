// hooks/useSocketRefetch.ts
import { useEffect } from "react";
import { getSocket } from "@/utils/socket";

type RefetchHandler = () => void;

interface UseSocketRefetchOptions {
  events: string[];
  refetch: RefetchHandler;
}

export const useSocketRefetch = ({
  events,
  refetch,
}: UseSocketRefetchOptions) => {
  const socket = getSocket();

  useEffect(() => {
    events.forEach((event) => {
      socket.on(event, refetch);
    });

    return () => {
      events.forEach((event) => {
        socket.off(event, refetch);
      });
    };
  }, [events, refetch]);
};
