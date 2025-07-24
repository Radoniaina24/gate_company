"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "@/components/Form/Modal";
import { useGetAllUserForTasksQuery } from "@/redux/api/userApi";
import {
  useAddTasksMutation,
  useUpdateTaskMutation,
} from "@/redux/api/taskApi";
import FormInput from "../Form/InputField";
import UserMultiSelect from "../Form/SelectMultiplePromise";
import FormSelect from "../Form/FormSelect";
import DatePicker from "../Form/DatePicker";
import { TiptapEditor } from "../Form/Titptap";
import FormTextarea from "../Form/TextArea";
import { Edit } from "lucide-react";

interface Task {
  responsible: Array<string>;
  title: string;
  description: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
  status: string;
  remarks: string;
}

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};
export default function EditTask({ task }: { task: any }) {
  const [open, setOpen] = useState<boolean>(false);
  const [addTask] = useAddTasksMutation();
  const [updateTask] = useUpdateTaskMutation();

  const { data, isLoading } = useGetAllUserForTasksQuery("");
  //   console.log(data);
  const OPTIONS = [
    { value: "not_started", label: "Non commencé" },
    { value: "in_progress", label: "En cours" },
    { value: "pending", label: "En attente" },
    { value: "under_review", label: " Révision" },
    { value: "postponed", label: " Reporté" },
    { value: "completed", label: " Términé" },
    { value: "cancelled", label: " Annulé" },
  ];

  const taskSchema = Yup.object().shape({
    responsible: Yup.array().min(1, "Sélectionner au moins un collaborateur"),
    title: Yup.string().required("Ce champ est requis"),
    description: Yup.string().required("Ce champ est requis"),
    startDate: Yup.string().required("Ce champ est requis"),
    endDate: Yup.string().required("Ce champ est requis"),
    status: Yup.string().required("Ce champ est requis"),
    remarks: Yup.string().when("status", {
      is: (val: string) =>
        ["pending", "under_review", "postponed", "cancelled"].includes(val),
      then: (schema) =>
        schema.required("La remarque est obligatoire pour ce statut"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
  const initialValues: Task = {
    responsible: [],
    title: "",
    description: "",
    startDate: null, // sérialisé en ISO string côté Next.js
    endDate: null,
    status: "",
    remarks: "",
  };

  const users: Array<User> = task?.responsible;
  const tasksUserId = users.map((user) => user._id);
  const { user, ...restTask } = task;

  //   console.log("task sans utlisateur ", taskWithoutUser);
  const formik = useFormik({
    initialValues: task
      ? ({ ...restTask, responsible: tasksUserId } as Task)
      : initialValues,
    validationSchema: taskSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      console.log(task._id);
      try {
        if (task) {
          await updateTask({ data: values, id: task._id }).unwrap();
          //   console.log(values);
        } else {
          await addTask(values).unwrap();
        }
        resetForm();
        setOpen(false);
      } catch (error: unknown) {
        console.error("Erreur lors de la soumission :", error);
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
        className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
      >
        <Edit className="h-4 w-4" />
      </button>

      <Modal
        title={task ? "Modfication du tâche" : "Nouvelle tâche"}
        isOpen={open}
        onClose={() => setOpen(false)}
        maxHeight="max-h-[98%]"
        maxWidth="max-w-[95%] md:max-w-[60%]"
      >
        {" "}
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="space-y-3">
            <div>
              <h1 className="mb-1">Nom du tâche</h1>
              <FormInput
                id="title"
                value={values.title}
                onChange={handleChange}
                placeholder="tâche numéro 1"
                error={errors.title}
                touched={touched.title}
              />
            </div>
            <div>
              <h1 className="mb-1">Collaborateurs</h1>
              <UserMultiSelect
                users={data?.users}
                placeholder="Sélectionner les membres de l’équipe"
                value={values.responsible}
                onChange={(vals) => setFieldValue("responsible", vals)}
                loading={isLoading}
                className=""
                error={Boolean(errors.responsible && touched.responsible)}
              />
              {errors.responsible && touched.responsible && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.responsible}
                </div>
              )}
            </div>
            <div>
              <h1 className="mb-1">Statut</h1>
              <FormSelect
                id="status"
                value={values.status}
                options={OPTIONS}
                onChange={handleChange}
                placeholder="Selectionnez votre status"
                error={errors.status}
                touched={touched.status}
              />
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
              <h1 className="mb-1">Déscription</h1>
              <TiptapEditor
                content={values.description}
                onChange={(value) => {
                  const cleanedValue = value
                    .replace(/<p>(<br\s*\/?>)?<\/p>/g, "")
                    .trim();
                  setFieldValue("description", cleanedValue || "");
                }}
              />
              {errors.description && touched.description && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.description}
                </div>
              )}
            </div>
            {["pending", "under_review", "postponed", "cancelled"].includes(
              values.status
            ) && (
              <div>
                <h1 className="mb-1">Remarque</h1>
                <FormTextarea
                  value={values.remarks}
                  id="remarks"
                  rows={4}
                  onChange={handleChange}
                  error={errors.remarks}
                  touched={errors.remarks}
                />
              </div>
            )}

            <div className="grid">
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                disabled={formik.isSubmitting}
              >
                {getButtonText(formik.isSubmitting, !!task)}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
