/* eslint-disable */
import React from "react";
import { useFormPassContext } from "../context/SignupContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "@/components/Form/FormInput";
import ButtonNextPrev from "../ButtonPrevNext/Button";
import { useTranslations } from "next-intl";

export default function FormStep1() {
  const t = useTranslations("form.form1");
  const { setFormData, nextStep, formData } = useFormPassContext();

  const initialvalues = {
    lastName: formData.lastName as string,
    firstName: formData.firstName as string,
    emailAddress: formData.emailAddress as string,
    confirmEmailAddress: formData.confirmEmailAddress as string,
    phoneNumber: formData.phoneNumber as string,
    dateOfBirth: formData.dateOfBirth as string,
    nationality: formData.nationality as string,
    address: formData.address as string,
    city: formData.city as string,
    postalCode: formData.postalCode as string,
    country: formData.country as string,
  };

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      lastName: Yup.string().required(t("validation.required.lastName")),
      firstName: Yup.string().required(t("validation.required.firstName")),
      emailAddress: Yup.string()
        .email(t("validation.invalid.email"))
        .required(t("validation.required.email")),
      confirmEmailAddress: Yup.string()
        .oneOf([Yup.ref("emailAddress")], t("validation.invalid.emailMismatch"))
        .required(t("validation.required.confirmEmail")),
      phoneNumber: Yup.string().required(t("validation.required.phone")),
      dateOfBirth: Yup.string().required(t("validation.required.dateOfBirth")),
      nationality: Yup.string().required(t("validation.required.nationality")),
      address: Yup.string().required(t("validation.required.address")),
      city: Yup.string().required(t("validation.required.city")),
      postalCode: Yup.string().required(t("validation.required.postalCode")),
      country: Yup.string().required(t("validation.required.country")),
    }),
    onSubmit: (values) => {
      nextStep();
      setFormData((prev: any) => ({ ...prev, ...values }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="lastName"
            label={t("personal.lastName")}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
            placeholder={t("placeholders.lastName")}
            required
          />
          <FormInput
            id="firstName"
            label={t("personal.firstName")}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
            placeholder={t("placeholders.firstName")}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="emailAddress"
            label={t("personal.email")}
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            error={formik.errors.emailAddress}
            touched={formik.touched.emailAddress}
            placeholder={t("placeholders.email")}
            required
          />
          <FormInput
            id="confirmEmailAddress"
            label={t("personal.confirmEmail")}
            value={formik.values.confirmEmailAddress}
            onChange={formik.handleChange}
            error={formik.errors.confirmEmailAddress}
            touched={formik.touched.confirmEmailAddress}
            placeholder={t("placeholders.confirmEmail")}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="phoneNumber"
            label={t("personal.phone")}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.errors.phoneNumber}
            touched={formik.touched.phoneNumber}
            placeholder={t("placeholders.phone")}
            required
          />
          <FormInput
            type="date"
            id="dateOfBirth"
            label={t("personal.dateOfBirth")}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            error={formik.errors.dateOfBirth}
            touched={formik.touched.dateOfBirth}
            required
          />
        </div>

        <FormInput
          id="nationality"
          label={t("personal.nationality")}
          value={formik.values.nationality}
          onChange={formik.handleChange}
          error={formik.errors.nationality}
          touched={formik.touched.nationality}
          placeholder={t("placeholders.nationality")}
          required
        />

        <FormInput
          id="address"
          label={t("personal.address")}
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.errors.address}
          touched={formik.touched.address}
          placeholder={t("placeholders.address")}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput
            id="city"
            label={t("personal.city")}
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.errors.city}
            touched={formik.touched.city}
            placeholder={t("placeholders.city")}
            required
          />
          <FormInput
            id="postalCode"
            label={t("personal.postalCode")}
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            error={formik.errors.postalCode}
            touched={formik.touched.postalCode}
            placeholder={t("placeholders.postalCode")}
            required
          />
          <FormInput
            id="country"
            label={t("personal.country")}
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.errors.country}
            touched={formik.touched.country}
            placeholder={t("placeholders.country")}
            required
          />
        </div>
        <ButtonNextPrev />
      </div>
    </form>
  );
}
