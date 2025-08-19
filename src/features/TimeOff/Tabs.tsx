"use client";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import React from "react";
import TimeOff from ".";
import LeaveRequests from "./LeaveRequests";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";

export default function TabsManager() {
  const user: any = useSelector(selectUser);

  const roles = user?.user?.roles || user?.roles;
  const role = roles.find((role: any) => role === "manager");
  return (
    <Tabs defaultValue="myTimeOff">
      <div className="text-center">
        <TabsList>
          <TabsTrigger value="myTimeOff">Mes congé</TabsTrigger>
          {role === "manager" ? (
            <TabsTrigger value="leaveRequest">Demande de congés</TabsTrigger>
          ) : (
            ""
          )}
        </TabsList>
      </div>

      <TabsContent value="myTimeOff">
        <TimeOff />
      </TabsContent>
      <TabsContent value="leaveRequest">
        <LeaveRequests />
      </TabsContent>
    </Tabs>
  );
}
