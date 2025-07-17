"use client";
/* eslint-disable */
import React, { useEffect } from "react";
import { useFormPassContext } from "../context/SignupContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import ButtonNextPrev from "../ButtonPrevNext/Button";
import { motion } from "framer-motion";
import FormSelect from "@/components/Form/FormSelect";
import { useTranslations } from "next-intl";

export default function FormStep3() {
  const t = useTranslations("form.form3"); // Namespace, ex: translations/form3.json

  const sectors = [
    { label: t("sectors.technologies_btp"), value: "technologies_btp" },
    {
      label: t("sectors.tourisme_sante_services"),
      value: "tourisme_sante_services",
    },
    {
      label: t("sectors.communication_gestion"),
      value: "communication_gestion",
    },
    {
      label: t("sectors.evenementiel_artistique"),
      value: "evenementiel_artistique",
    },
  ];

  const sectorCategories: Record<string, { label: string; value: string }[]> = {
    technologies_btp: [
      {
        label: t("categories.tech.dev_web_ai"),
        value: "Développeurs web, IA, cybersécurité, robotique",
      },
      {
        label: t("categories.tech.techniciens"),
        value: "Électriciens, techniciens AC, plombiers, soudeurs",
      },
    ],
    tourisme_sante_services: [
      {
        label: t("categories.tourisme.hotel"),
        value: "Réception, cuisine, spa, housekeeping",
      },
      {
        label: t("categories.tourisme.medical"),
        value: "Infirmiers, aides-soignants, ambulanciers",
      },
      {
        label: t("categories.tourisme.logistique"),
        value: "Chauffeurs, agents logistiques",
      },
    ],
    communication_gestion: [
      {
        label: t("categories.comm.accueil"),
        value: "Accueil client trilingue, call center",
      },
      {
        label: t("categories.comm.rh"),
        value: "Secrétaires, assistants RH, community managers",
      },
    ],
    evenementiel_artistique: [
      {
        label: t("categories.event.technique"),
        value: "Techniciens lumière/son/vidéo, régisseurs",
      },
      {
        label: t("categories.event.artistes"),
        value: "DJs, musiciens, animateurs, artistes live",
      },
    ],
  };

  const { setFormData, nextStep, formData } = useFormPassContext();

  const formik = useFormik({
    initialValues: {
      sector: formData.sector || "",
      category: formData.category || "",
    },
    validationSchema: Yup.object({
      sector: Yup.string().required(t("validation.sectorRequired")),
      category: Yup.string().required(t("validation.categoryRequired")),
    }),
    onSubmit: (values) => {
      nextStep();
      setFormData((prev: any) => ({ ...prev, ...values }));
    },
  });

  useEffect(() => {
    const validOptions = sectorCategories[formik.values.sector] || [];
    const isValidCategory = validOptions.some(
      (opt) => opt.value === formik.values.category
    );
    if (!isValidCategory) {
      formik.setFieldValue("category", "");
    }
  }, [formik.values.sector]);

  return (
    <motion.form
      onSubmit={formik.handleSubmit}
      autoComplete="off"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl"
    >
      <div>
        <FormSelect
          id="sector"
          label={t("labels.sector")}
          value={formik.values.sector}
          onChange={formik.handleChange}
          options={sectors}
          error={formik.errors.sector}
          touched={formik.touched.sector}
          placeholder={t("placeholders.sector")}
          required
        />
      </div>

      <div>
        <FormSelect
          id="category"
          label={t("labels.category")}
          value={formik.values.category}
          onChange={formik.handleChange}
          options={sectorCategories[formik.values.sector] || []}
          error={formik.errors.category}
          touched={formik.touched.category}
          placeholder={t("placeholders.category")}
          required
        />
      </div>

      <div className="pt-4">
        <ButtonNextPrev />
      </div>
    </motion.form>
  );
}
