import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import ModalDetailsCandidate from "./ModalDetailsCandidate";

/* eslint-disable */
export default function ViewCandidate({ user }: { user: any }) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  // console.log(open);
  return (
    <>
      <div className="hidden md:block">
        <button
          onClick={() => setOpen(true)}
          className="flex gap-2 items-center text-blue-600 text-sm px-1 py-1 rounded-lg cursor-pointer whitespace-nowrap hover:bg-blue-50 transition-colors duration-200"
        >
          <FaEye className="w-5 h-5 text-orange-500 cursor-pointer hover:text-orange-600 transition-colors duration-200" />
        </button>
      </div>
      <div className="md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-blue-100 to-orange-100 flex gap-2 items-center text-blue-700 hover:from-blue-200 hover:to-orange-200 text-sm px-3 py-1 rounded-lg cursor-pointer whitespace-nowrap shadow-sm border border-blue-200 transition-all duration-300 transform hover:scale-105"
        >
          <FaEye className="w-5 h-5 text-orange-500 cursor-pointer" />
          <span className="font-medium">voir</span>
        </button>
      </div>

      <ModalDetailsCandidate
        isOpen={open}
        title="Détails du recruteur"
        onClose={handleClose}
      >
        <div className="space-y-6">
          <div className="border border-blue-200 rounded-xl shadow-lg overflow-hidden bg-white">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 px-6 py-4">
              <h4 className="font-bold text-white text-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Informations personnelles
              </h4>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm bg-gradient-to-br from-blue-50/30 to-orange-50/30">
              <div className="group">
                <p className="text-blue-600 font-semibold mb-1 uppercase tracking-wide text-xs">
                  Nom
                </p>
                <p className="font-medium text-gray-800 bg-white px-3 py-2 rounded-lg border border-blue-100 group-hover:border-orange-200 transition-colors duration-200">
                  {user.lastName || "-"}
                </p>
              </div>
              <div className="group">
                <p className="text-blue-600 font-semibold mb-1 uppercase tracking-wide text-xs">
                  Prénom
                </p>
                <p className="font-medium text-gray-800 bg-white px-3 py-2 rounded-lg border border-blue-100 group-hover:border-orange-200 transition-colors duration-200">
                  {user.firstName || "-"}
                </p>
              </div>
              <div className="group">
                <p className="text-blue-600 font-semibold mb-1 uppercase tracking-wide text-xs">
                  Email
                </p>
                <p className="font-medium text-gray-800 bg-white px-3 py-2 rounded-lg border border-blue-100 group-hover:border-orange-200 transition-colors duration-200 break-all">
                  {user.emailAddress || "-"}
                </p>
              </div>
              <div className="group">
                <p className="text-blue-600 font-semibold mb-1 uppercase tracking-wide text-xs">
                  Company
                </p>
                <p className="font-medium text-gray-800 bg-white px-3 py-2 rounded-lg border border-blue-100 group-hover:border-orange-200 transition-colors duration-200">
                  {user.company || "-"}
                </p>
              </div>
              <div className="group md:col-span-2">
                <p className="text-blue-600 font-semibold mb-1 uppercase tracking-wide text-xs">
                  Pays
                </p>
                <p className="font-medium text-gray-800 bg-white px-3 py-2 rounded-lg border border-blue-100 group-hover:border-orange-200 transition-colors duration-200 inline-block">
                  {user.country || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModalDetailsCandidate>
    </>
  );
}
