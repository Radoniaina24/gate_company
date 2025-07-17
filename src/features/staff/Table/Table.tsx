import React from "react";

import DesktopTable from "./DesktopTable";
import Loading from "./Loading";
import { useStaffContext } from "../context/StaffContext";
import MobileTable from "./MobileTable";
export default function Table() {
  const { isLoading } = useStaffContext();
  return (
    <div
      className="overflow-y-auto overflow-x-auto "
      style={{
        height: "calc(100vh - 300px)",
        minHeight: "400px",
        maxHeight: "800px",
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <DesktopTable />
          <MobileTable />
        </>
      )}
    </div>
  );
}
