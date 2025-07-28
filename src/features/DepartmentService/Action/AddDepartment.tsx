"use client";
import React, { useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "@/components/Form/Modal";
import FormInput from "@/features/task/Form/InputField";
import FormTextarea from "@/features/task/Form/TextArea";
import { useAddDepartmentMutation } from "@/redux/api/departmentApi";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

interface Department {
  _id?: string;
  name: string;
  description: string;
}
export default function AddDepartment() {
  const [open, setOpen] = useState<boolean>(false);
  const [addDepartment] = useAddDepartmentMutation();
  const taskSchema = Yup.object().shape({
    name: Yup.string().required("Ce champ est requis"),
  });

  const ErrorNotification = (msg: string) => toast.error(msg);
  const SuccessNotification = (msg: string) => toast.success(msg);

  //  ErrorNotification(error.message || "Erreur interne du serveur");

  const initialValues: Department = {
    name: "",
    description: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: taskSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        // console.log(values);
        const res = await addDepartment(values).unwrap();
        resetForm();
        setOpen(false);

        SuccessNotification(res.message);
      } catch (error: any) {
        console.error("Erreur lors de la soumission :", error);
        ErrorNotification(error?.message || "Erreur interne du serveur");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { values, errors, touched, handleChange, setFieldValue } = formik;
  const getButtonText = (isSubmitting: boolean, isEditMode: boolean) => {
    if (isSubmitting) {
      return isEditMode ? "Modification..." : "Création...";
    }
    return isEditMode ? "Modifier " : "Enregistrer";
  };
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="relative group overflow-hidden bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex text-xs items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Ajouter un departement</span>
        </div>
      </button>

      <Modal
        title="Nouvel département"
        isOpen={open}
        onClose={() => setOpen(false)}
        maxHeight="max-h-[98%]"
        // maxWidth="max-w-[60%] md:max-w-[60%]"
      >
        {" "}
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="space-y-3">
            <div>
              <h1 className="mb-1">Nom du departement</h1>
              <FormInput
                id="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Ex: Informatique"
                error={errors.name}
                touched={touched.name}
              />
            </div>
            <div>
              <h1 className="mb-1">Description</h1>
              <FormTextarea
                value={values.description}
                id="description"
                rows={4}
                onChange={handleChange}
                error={errors.description}
                touched={errors.description}
              />
            </div>
            <div className="grid">
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                disabled={formik.isSubmitting}
              >
                {getButtonText(formik.isSubmitting, false)}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
