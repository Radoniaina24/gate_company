"use client";
/* eslint-disable */
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import { FaEdit, FaSpinner } from "react-icons/fa";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import FormSelect from "@/components/Form/FormSelect";

import { useUpdateUserMutation } from "@/redux/api/userApi";

export default function EditUserStaff({ user }: { user: any }) {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const ErrorNotification = (msg: string) => toast.error(msg);
  const SuccessNotification = (msg: string) => toast.success(msg);
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const role = [
    {
      label: "Payé",
      value: "paid",
    },

    {
      label: "Non payé",
      value: "unpaid",
    },
  ];
  const initialValues = {
    role: user?.status,
  };
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      role: Yup.string().required("role is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      // console.log(values);
      try {
        const response = await updateUser({
          data: { status: values.role },
          id: user._id,
        }).unwrap();
        SuccessNotification(response?.message);
        setOpen(false);
      } catch (error: any) {
        if (error?.data?.message) {
          ErrorNotification(error?.data?.message);
        } else {
          ErrorNotification("Verifier votre connexion internet");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  // console.log(formik.values);
  return (
    <>
      <Toaster />

      <div className="hidden md:block">
        <button
          className=" flex items-center gap-2 text-blue-600  text-sm px-2 py-1 rounded-lg  cursor-pointer whitespace-nowrap"
          onClick={() => setOpen(true)}
        >
          <FaEdit className="" />
        </button>
      </div>
      <div className="md:hidden">
        <button
          className="bg-blue-100 flex items-center gap-2 text-blue-600 hover:bg-blue-200 text-sm px-3 py-1 rounded-lg  cursor-pointer whitespace-nowrap"
          onClick={() => setOpen(true)}
        >
          <FaEdit className="" />
          <span className="">Modifier </span>
        </button>
      </div>
      <Modal
        isOpen={open}
        title={`${user.lastName} ${user.firstName}`}
        onClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <FormSelect
            id="role"
            label="Statut"
            value={formik.values.role}
            onChange={formik.handleChange}
            options={role}
            error={formik.errors.role}
            touched={formik.touched.role}
            placeholder="Sélectionnez un rôle"
          />
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
              disabled={isLoading}
              type="submit"
              className={` ${
                isLoading ? "cursor-not-allowed " : ""
              } w-full sm:w-auto  flex items-center justify-center text-sm bg-green-500 hover:green-red-700 text-gray-800 font-bold py-2 sm:py-2 px-4 rounded-lg transition-colors duration-200 whitespace-nowrap`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  {"Editer"}
                </>
              ) : (
                <>{"Editer"}</>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
