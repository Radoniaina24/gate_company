"use client";
/* eslint-disable */
import React from "react";
import { useFormPassContext } from "../context/SignupContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "@/components/Form/FormInput";
import ButtonNextPrev from "../ButtonPrevNext/Button";
import { useTranslations } from "next-intl";

export default function FormStep4() {
  const t = useTranslations("form.form4");

  const { setFormData, nextStep, formData } = useFormPassContext();

  const initialvalues = {
    password: formData.password as string,
    re_type_password: formData.re_type_password as string,
  };

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      password: Yup.string()
        .required(t("validation.password.required"))
        .min(6, t("validation.password.min")),
      re_type_password: Yup.string()
        .required(t("validation.retype.required"))
        .oneOf([Yup.ref("password")], t("validation.retype.match"))
        .min(6, t("validation.retype.min")),
    }),
    onSubmit: (values) => {
      nextStep();
      setFormData((prev: any) => ({ ...prev, ...values }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="space-y-6">
        <FormInput
          id="password"
          label={t("labels.password")}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
          touched={formik.touched.password}
          placeholder={t("placeholders.password")}
          required
          type="password"
        />
        <FormInput
          id="re_type_password"
          label={t("labels.retype")}
          value={formik.values.re_type_password}
          onChange={formik.handleChange}
          error={formik.errors.re_type_password}
          touched={formik.touched.re_type_password}
          placeholder={t("placeholders.retype")}
          required
          type="password"
        />
      </div>

      <ButtonNextPrev />
    </form>
  );
}
