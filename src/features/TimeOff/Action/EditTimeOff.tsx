"use client";
import React, { useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "@/components/Form/Modal";
import toast from "react-hot-toast";
import UserMultiSelect from "@/features/task/Form/SelectMultiplePromise";
import { DatePicker } from "@/features/task/Form/DatePicker";
import {
  useGetAllManagerQuery,
  useGetAllTypeTimeOffQuery,
  useUpdateTimeOffMutation,
} from "@/redux/api/timeoffApi";
import FormTextarea from "@/features/task/Form/TextArea";
import SelectPromise from "@/features/task/Form/SelectPromise";
import { Edit } from "lucide-react";

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
export default function EditTimeOff({ timeoff }: { timeoff: any }) {
  const [open, setOpen] = useState<boolean>(false);
  //   console.log(timeoff);
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

  const timeOff: Array<TimeOff> = timeoff?.manager;
  const managers = timeOff.map((manager: any) => manager?._id);

  const { userId, ...restTimeOff } = timeoff;

  const [updateTimeOff] = useUpdateTimeOffMutation();
  const formik = useFormik({
    initialValues: timeoff
      ? ({
          ...restTimeOff,
          manager: managers,
          type: timeoff?.type?._id,
        } as TimeOff)
      : initialValues,
    validationSchema: taskSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const res = await updateTimeOff({
          data: values,
          id: timeoff._id,
        }).unwrap();
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
        className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
      >
        <Edit className="h-4 w-4" />
      </button>

      <Modal
        title="Mofication du congé"
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
                {getButtonText(formik.isSubmitting, true)}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
