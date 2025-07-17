import React from "react";
import DesktopPagination from "./DesktopPagination";
import MobilePagination from "./MobilePagination";

export default function Pagination() {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <DesktopPagination />
      <MobilePagination />
    </div>
  );
}
