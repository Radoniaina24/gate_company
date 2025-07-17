/* eslint-disable */
import React from "react";
import { useFormPassContext } from "../context/SignupContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "@/components/Form/FormInput";
import ButtonNextPrev from "../ButtonPrevNext/Button";
import FormSelect from "@/components/Form/FormSelect";
export default function FormStep2() {
  const domaines = [
    {
      value: "Sciences économiques et gestion",
      label: "Sciences économiques et gestion",
    },
    { value: "Sciences de l'ingénieur", label: "Sciences de l'ingénieur" },
    { value: "Informatique", label: "Informatique" },
    { value: "Droit", label: "Droit" },
    { value: "Sciences politiques", label: "Sciences politiques" },
    {
      value: "Lettres et sciences humaines",
      label: "Lettres et sciences humaines",
    },
    { value: "Médecine et santé", label: "Médecine et santé" },
    { value: "Arts et design", label: "Arts et design" },
    {
      value: "Agriculture et environnement",
      label: "Agriculture et environnement",
    },
    { value: "Autre", label: "Autre" },
  ];

  const {
    setFormData,

    nextStep,

    formData,
  } = useFormPassContext();
  const initialvalues = {
    lastDegree: formData.lastDegree as string,
    institution: formData.institution as string,
    graduationYear: formData.graduationYear as string,
    overallGPA: formData.overallGPA as string,
    fieldOfStudy: formData.fieldOfStudy as string,
  };
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      lastDegree: Yup.string().required("Le dernier diplôme est requis"),
      institution: Yup.string().required("L'établissement est requis"),
      graduationYear: Yup.string().required("L'année d'obtention est requise"),
      overallGPA: Yup.string().required("Votre moyenne générale est requis"),
      fieldOfStudy: Yup.string().required("Le domaine d'études est requis"),
    }),

    onSubmit: (values) => {
      // console.log("Form Submitted : ", values);
      nextStep();
      setFormData((prev: any) => ({ ...prev, ...values }));
    },
  });
  //   console.log(formik.values);
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="space-y-6">
        <FormInput
          id="lastDegree"
          label="Dernier diplôme obtenu"
          value={formik.values.lastDegree}
          onChange={formik.handleChange}
          error={formik.errors.lastDegree}
          touched={formik.touched.lastDegree}
          placeholder="Ex: Baccalauréat, Licence, Master..."
          required
        />
        <FormInput
          id="institution"
          label="Établissement"
          value={formik.values.institution}
          onChange={formik.handleChange}
          error={formik.errors.institution}
          touched={formik.touched.institution}
          placeholder="Nom de l'établissement"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="graduationYear"
            label="Année d'obtention"
            value={formik.values.graduationYear}
            onChange={formik.handleChange}
            error={formik.errors.graduationYear}
            touched={formik.touched.graduationYear}
            placeholder="Année"
            required
          />
          <FormInput
            id="overallGPA"
            label=" Moyenne générale"
            value={formik.values.overallGPA}
            onChange={formik.handleChange}
            error={formik.errors.overallGPA}
            touched={formik.touched.overallGPA}
            placeholder="Ex: 14/20, Mention Bien..."
            required
          />
        </div>
      </div>
      <FormSelect
        id="fieldOfStudy"
        label="Domaine d'études"
        value={formik.values.fieldOfStudy}
        onChange={formik.handleChange}
        options={domaines}
        error={formik.errors.fieldOfStudy}
        touched={formik.touched.fieldOfStudy}
        placeholder="Sélectionnez votre domaine d'études"
        required
      />
      <ButtonNextPrev />
    </form>
  );
}
