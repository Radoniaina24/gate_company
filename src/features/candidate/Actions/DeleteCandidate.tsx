"use client";
/* eslint-disable */
import React, { useState } from "react";
import Modal from "./Modal";
import { FaExclamationTriangle, FaSpinner, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useDeleteCandidateMutation } from "@/redux/api/candidateApi";

export default function DeleteCandidate({ user }: { user: any }) {
  const [deleteCandidate, { isLoading, error }] = useDeleteCandidateMutation();
  const ErrorNotification = (msg: string) => toast.error(msg);
  const SuccessNotification = (msg: string) => toast.success(msg);
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  async function handleDelete(id: string) {
    try {
      const response = await deleteCandidate(id).unwrap();
      SuccessNotification(response?.message);
      setOpen(false);
    } catch (error: any) {
      if (error) {
        ErrorNotification(error?.data?.message);
        setOpen(false);
      } else {
        ErrorNotification("Check your network");
        setOpen(false);
      }
    }
  }
  // console.log(isLoading);
  return (
    <>
      <Toaster />

      <div className="hidden md:block">
        <button
          className=" text-red-600 flex items-center gap-2  text-sm px-1 py-1 rounded-lg cursor-pointer whitespace-nowrap"
          onClick={() => setOpen(true)}
        >
          <FaTrash className="" />
        </button>
      </div>
      <div className="md:hidden">
        <button
          className="bg-red-100 text-red-600 flex items-center gap-2 hover:bg-red-200 text-sm px-3 py-1 rounded-lg cursor-pointer whitespace-nowrap"
          onClick={() => setOpen(true)}
        >
          <FaTrash className="" />
          <span className="">Supprimer</span>
        </button>
      </div>
      <Modal
        isOpen={open}
        // title="Confirmer la suppression"
        onClose={handleClose}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <FaExclamationTriangle className="text-red-600 text-xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Confirmer la suppression
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Êtes-vous sûr de vouloir supprimer le candidat{" "}
            <span className="font-medium">
              "{user.lastName} {user.firstName}"
            </span>{" "}
            ? Cette action est irréversible.
          </p>
          <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 sm:gap-4">
            {isLoading ? (
              ""
            ) : (
              <button
                disabled={isLoading}
                type="button"
                onClick={() => {
                  handleClose();
                }}
                className={`${
                  isLoading ? "cursor-not-allowed" : ""
                }w-full  sm:w-auto bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 font-bold py-3 sm:py-2 px-4 rounded-lg transition-colors duration-200 whitespace-nowrap`}
              >
                Annuler
              </button>
            )}

            <button
              onClick={() => handleDelete(user._id)}
              disabled={isLoading}
              type="button"
              className={` ${
                isLoading ? "cursor-not-allowed " : ""
              } w-full sm:w-auto  flex items-center justify-center text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-3 sm:py-2 px-4 rounded-lg transition-colors duration-200 whitespace-nowrap`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  {"Confirmer la suppression"}
                </>
              ) : (
                <>{"Confirmer la suppression"}</>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
