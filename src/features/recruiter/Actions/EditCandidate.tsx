"use client";
/* eslint-disable */
import React, { useState } from "react";
import Modal from "./Modal";
import { FaEdit, FaSpinner } from "react-icons/fa";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import FormSelect from "@/components/Form/FormSelect";
import { useUpdateRecruiterMutation } from "@/redux/api/recruiterApi";

export default function EditCandidate({ user }: { user: any }) {
  const [updateRecruiter, { isLoading }] = useUpdateRecruiterMutation();
  const ErrorNotification = (msg: string) => toast.error(msg);
  const SuccessNotification = (msg: string) => toast.success(msg);
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const course = [
    {
      label: "Validé",
      value: "approved",
    },

    {
      label: "Non Validé",
      value: "unapproved",
    },
  ];
  const initialValues = {
    status: user?.status,
  };
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      status: Yup.string().required("status is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const status = values;
      try {
        const response = await updateRecruiter({
          status,
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
  //   console.log(formik.values.status);
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
          <span className="">Modifier</span>
        </button>
      </div>
      <Modal
        isOpen={open}
        title={`${user.lastName} ${user.firstName}`}
        onClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <FormSelect
            id="status"
            label="Status"
            value={formik.values.status}
            onChange={formik.handleChange}
            options={course}
            error={formik.errors.status}
            touched={formik.touched.status}
            placeholder="Sélectionnez un status"
            required
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
