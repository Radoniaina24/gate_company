"use client";
/* eslint-disable */
import React, { useState } from "react";
import Modal from "./Modal";
import { FaSpinner } from "react-icons/fa";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import FormSelect from "@/components/Form/FormSelect";

import FormInput from "@/components/Form/FormInput";
import { useAddUserMutation } from "@/redux/api/userApi";

export default function AddUserStaff() {
  const [addUser, { error, isLoading }] = useAddUserMutation();
  const ErrorNotification = (msg: string) => toast.error(msg);
  const SuccessNotification = (msg: string) => toast.success(msg);
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const role = [
    {
      label: "Admin",
      value: "admin",
    },

    {
      label: "Super admin",
      value: "super_admin",
    },
  ];
  const initialValues = {
    role: "",
    lastName: "",
    firstName: "",
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      role: Yup.string().required("role is required"),
      lastName: Yup.string().required("Le nom est requis"),
      firstName: Yup.string().required("Le prénom est requis"),
      email: Yup.string()
        .email("Email invalide")
        .required("L'email est requis"),
      password: Yup.string().required("Le mot de passe  est requis"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      // console.log(values);
      try {
        const response = await addUser(values).unwrap();
        SuccessNotification(response?.message);
        setOpen(false);
      } catch (error: any) {
        if (error?.data?.message) {
          // console.log(error);

          ErrorNotification(error?.data?.message);
          setOpen(false);
        } else {
          ErrorNotification("Verifier votre connexion internet");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  //   console.log(formik.values);
  return (
    <>
      <div className="">
        <Toaster />
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            setOpen(true);
          }}
          className={`w-full cursor-pointer  sm:w-auto bg-green-600 hover:bg-green-600 text-sm text-white font-bold py-3 sm:py-2 px-4 rounded-lg transition-colors duration-200 whitespace-nowrap`}
        >
          Ajouter
        </button>
      </div>
      <Modal isOpen={open} title="Nouvel utilisateur" onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              id="lastName"
              label="Nom"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
              placeholder="Votre nom de famille"
              required
            />
            <FormInput
              id="firstName"
              label="Prénom"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
              placeholder="Votre prénom"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              id="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
              touched={formik.touched.email}
              placeholder="exemple@..."
              required
            />
            <FormSelect
              id="role"
              label="Rôle"
              value={formik.values.role}
              onChange={formik.handleChange}
              options={role}
              error={formik.errors.role}
              touched={formik.touched.role}
              placeholder="Sélectionnez un rôle"
            />
          </div>

          <FormInput
            id="password"
            label="Mot de passe"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
            touched={formik.touched.password}
            placeholder="Mot de passe"
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
                  {"Ajouter"}
                </>
              ) : (
                <>{"Ajouter"}</>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
