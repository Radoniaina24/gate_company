"use client";
import React, { useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "@/components/Form/Modal";
import { FaCalendarDay } from "react-icons/fa";

import toast from "react-hot-toast";
import UserMultiSelect from "@/features/task/Form/SelectMultiplePromise";
import { DatePicker } from "@/features/task/Form/DatePicker";
import {
  useAddTimeoffMutation,
  useGetAllManagerQuery,
  useGetAllTypeTimeOffQuery,
} from "@/redux/api/timeoffApi";
import FormTextarea from "@/features/task/Form/TextArea";
import SelectPromise from "@/features/task/Form/SelectPromise";

interface TimeOff {
  manager: Array<string>;
  type: string;
  reason: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
  //   status: "";
  //   percentage: number;
  //   remarks: string;
}
export default function AddTimeOff() {
  const [open, setOpen] = useState<boolean>(false);

  const ErrorNotification = (msg: string) => toast.error(msg);
  const SuccessNotification = (msg: string) => toast.success(msg);
  const { data: manager, isLoading } = useGetAllManagerQuery("");
  const { data: typeTimeOff, isLoading: loadingTypeTimeOff } =
    useGetAllTypeTimeOffQuery("");

  const taskSchema = Yup.object().shape({
    manager: Yup.array().min(1, "Sélectionner au moins un manager"),
    type: Yup.string().required("Sélectionner le type de congé"),
    reason: Yup.string().required("Ce champ est requis"),
    startDate: Yup.string().required("Ce champ est requis"),
    endDate: Yup.string().required("Ce champ est requis"),
  });
  const initialValues: TimeOff = {
    manager: [],
    type: "",
    reason: "",
    startDate: null, // sérialisé en ISO string côté Next.js
    endDate: null,
  };
  const [addTimeOff] = useAddTimeoffMutation();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: taskSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values);
      setSubmitting(true);
      try {
        // console.log(values);
        const res = await addTimeOff(values).unwrap();
        // console.log(res);
        resetForm();
        setOpen(false);
        SuccessNotification(res.message);
      } catch (error: any) {
        console.error("Erreur lors de la soumission :", error);
        ErrorNotification(error.data.message || "Erreur interne du serveur");
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
  // console.log(values.reason);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <FaCalendarDay className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Nouveau congé</span>
        <span className="sm:hidden">Ajouter</span>
      </button>

      <Modal
        title="Nouveau congé"
        isOpen={open}
        onClose={() => setOpen(false)}
        maxHeight="max-h-[98%]"
        maxWidth="max-w-[95%] md:max-w-[60%]"
      >
        {" "}
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="space-y-3">
            <div>
              <h1 className="mb-1">Type de congé</h1>
              <SelectPromise
                data={typeTimeOff}
                placeholder="Sélectionner le type congé"
                value={values.type}
                onChange={(vals) => setFieldValue("type", vals)}
                loading={isLoading}
                className=""
                searchPlaceholder="Recherche ...."
                error={Boolean(errors.type && touched.type)}
              />
              {errors.type && touched.type && (
                <div className="text-red-500 text-sm mt-1">{errors.type}</div>
              )}
            </div>
            <div>
              <h1 className="mb-1">Manager</h1>
              <UserMultiSelect
                users={manager}
                placeholder="Sélectionner votre manager"
                value={values.manager}
                onChange={(vals) => setFieldValue("manager", vals)}
                loading={isLoading}
                className=""
                error={Boolean(errors.manager && touched.manager)}
              />
              {errors.manager && touched.manager && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.manager}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h1 className="mb-1">Date de début</h1>
                <DatePicker
                  value={
                    values.startDate instanceof Date
                      ? values.startDate
                      : values.startDate
                      ? new Date(values.startDate)
                      : null
                  }
                  onChange={(date) =>
                    setFieldValue("startDate", date?.toISOString())
                  }
                  error={
                    touched.startDate && errors.startDate
                      ? formik.errors.startDate
                      : ""
                  }
                />
              </div>
              <div>
                <h1 className="mb-1">Date de fin</h1>
                <DatePicker
                  value={
                    values.endDate instanceof Date
                      ? values.endDate
                      : values.endDate
                      ? new Date(values.endDate)
                      : null
                  }
                  onChange={(date) =>
                    setFieldValue("endDate", date?.toISOString())
                  }
                  error={
                    touched.endDate && errors.endDate
                      ? formik.errors.endDate
                      : ""
                  }
                />
              </div>
            </div>
            <div>
              <h1 className="mb-1">Raison</h1>
              <FormTextarea
                value={values.reason}
                id="reason"
                rows={4}
                onChange={handleChange}
                error={errors.reason}
                touched={errors.reason}
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
