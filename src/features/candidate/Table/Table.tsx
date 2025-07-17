import React from "react";
import { useCandidateContext } from "../context/CandidateContext";
import DesktopTable from "./DesktopTable";
import Loading from "./Loading";
import MobileTable from "./MobileTable";

export default function Table() {
  const { isLoading } = useCandidateContext();
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
