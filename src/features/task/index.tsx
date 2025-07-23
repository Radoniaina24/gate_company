"use client";
import React from "react";
import AddTask from "./Action/AddTask";

export default function Task() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des tâches
          </h1>
          <p className="mt-1 sm:mt-2 text-sm text-gray-600 dark:text-gray-400">
            {/* {data?.users?.meta?.total} utilisateurs trouvés */}
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex space-x-2 sm:space-x-3">
          <AddTask />
        </div>
      </div>
    </div>
  );
}
