"use client";
import React, { useState } from "react";
import AdminHeader from "./Header/AdminHeader";
import AdminSidebar from "./sidebar/AdminSidebar";
import AdminSidebarMobile from "./sidebar/AdminSidebarMobile";

export default function Admin({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [sidebarOpenMobile, setSidebarOpenMobile] = useState<boolean>(false);
  const toggleSidebarMobile = () => {
    setSidebarOpenMobile(!sidebarOpenMobile);
  };
  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 `}>
      <div className="flex  flex-1">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <AdminSidebarMobile
          sidebarOpen={sidebarOpenMobile}
          setSidebarOpen={setSidebarOpenMobile}
        />
        <main
          className={`flex-1 ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-16"
          } transition-all duration-300 `}
        >
          <AdminHeader
            toggleSidebar={toggleSidebar}
            toggleSidebarMobile={toggleSidebarMobile}
          />
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
}
