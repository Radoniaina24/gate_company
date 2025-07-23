"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Task, TaskStatus } from "../types/task";
import { InputField } from "@/components/Form/InputField";
import { ClipboardCheck, UserCircle } from "lucide-react";
import FormTasks from "@/features/task/FormTasks";

export const OPTIONS = [
  { label: "Non commencée", value: TaskStatus.NOT_STARTED },
  { label: "En cours", value: TaskStatus.IN_PROGRESS },
  { label: "En attente", value: TaskStatus.PENDING },
  { label: "En révision", value: TaskStatus.UNDER_REVIEW },
  { label: "Terminée", value: TaskStatus.COMPLETED },
  { label: "Reportée", value: TaskStatus.POSTPONED },
  { label: "Annulée", value: TaskStatus.CANCELLED },
];

export const TaskCreationSchema = Yup.object().shape({
  title: Yup.string().required("Le titre est requis"),
  description: Yup.string().required("La description est requise"),
  startDate: Yup.date()
    .typeError("La date de début est invalide")
    .required("La date de début est requise"),
  endDate: Yup.date()
    .typeError("La date de fin est invalide")
    .min(
      Yup.ref("startDate"),
      "La date de fin ne peut pas être antérieure à la date de début"
    )
    .required("La date de fin est requise"),
  status: Yup.string()
    .oneOf(
      OPTIONS.map((o) => o.value),
      "Statut invalide"
    )
    .required("Le statut est requis"),
  percentage: Yup.number()
    .min(0, "Le pourcentage doit être au minimum 0")
    .max(100, "Le pourcentage doit être au maximum 100")
    .required("Le pourcentage est requis"),
  responsible: Yup.array()
    .of(Yup.string())
    .min(1, "Sélectionner au moins un responsable")
    .required("Le(s) responsable(s) est requis"),
  remarks: Yup.string().notRequired(),
});

interface TaskFormProps {
  onClose?: () => void;
  task?: Task;
}
export const TaskForm = ({ onClose, task }: TaskFormProps) => {
  return (
    <div className="">
      <FormTasks />
    </div>
  );
};
