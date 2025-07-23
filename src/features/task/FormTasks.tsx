import React, { useEffect, useState } from "react";
import UserMultiSelect, { User } from "./SelectMultiplePromise";
import FormInput from "./InputField";
import FormSelect from "./FormSelect";

import FormTextarea from "./TextArea";

import * as Yup from "yup";
import { useFormik } from "formik";
import { TiptapEditor } from "./Titptap";
import Modal from "@/components/Form/Modal";
import DatePicker from "./DatePicker";

interface Task {
  responsible: Array<string>;
  title: string;
  description: string;
  startDate: null; // sérialisé en ISO string côté Next.js
  endDate: null;
  status: "";
  //   percentage: number;
  remarks: string;
}
export default function FormTasks() {
  const [open, setOpen] = useState<boolean>(false);
  const OPTIONS = [
    { value: "not_started", label: "Non commencé" },
    { value: "in_progress", label: "En cours" },
    { value: "pending", label: "En attente" },
    { value: "under_review", label: " Révision" },
    { value: "postponed", label: " Reporté" },
    { value: "completed", label: " Términé" },
    { value: "cancelled", label: " Annulé" },
  ];
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de chargement asynchrone
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // En pratique, vous feriez un appel API ici
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockUsers = [
          {
            _id: "687e103dc85ec61be700835b",
            firstName: "Faniry",
            lastName: "Ratsimba",
          },
          {
            _id: "687e104ac85ec61be700835e",
            firstName: "Radoniaina",
            lastName: "Andrianarisoa",
          },
          {
            _id: "687e1055c85ec61be7008361",
            firstName: "Tiana",
            lastName: "Rajaonarison",
          },
          {
            _id: "687e1064c85ec61be7008365",
            firstName: "Luc",
            lastName: "Asong",
          },
        ];

        setUsers(mockUsers);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: taskSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { values, errors, touched, handleChange, setFieldValue } = formik;
  // console.log(values.remarks);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Nouvel tâche</button>

      <Modal
        title="Nouvelle tâche"
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
                placeholder="taché numéro 1"
                error={errors.title}
                touched={touched.title}
              />
            </div>
            <div>
              <h1 className="mb-1">Collaborateurs</h1>
              <UserMultiSelect
                users={users}
                placeholder="Sélectionner les membres de l’équipe"
                value={values.responsible}
                onChange={(vals) => setFieldValue("responsible", vals)}
                loading={loading}
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
                  value={values.startDate}
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
                  value={values.endDate}
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
                onChange={(value) =>
                  setFieldValue("description", value === "<p></p>" ? "" : value)
                }
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
              >
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
