"use client";
/* eslint-disable */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User, Mail, Lock, MapPin, Globe } from "lucide-react";
import { FormValues, InputField } from "@/components/Form/InputField";
import Link from "next/link";
import Image from "next/image";
import { SelectCountryField } from "@/components/Form/SelectCountryField";
import toast, { Toaster } from "react-hot-toast";
import { useAddRecruiterMutation } from "@/redux/api/recruiterApi";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";

export const InscriptionFormRecruiter: React.FC = () => {
  const t = useTranslations("recruteur.form");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const ErrorNotification = (msg: string) => toast.error(msg);
  const SuccessNotification = (msg: string) => toast.success(msg);
  const [addRecruiter] = useAddRecruiterMutation();
  const navigation = useRouter();

  const validationSchema = Yup.object({
    lastName: Yup.string().required(t("errors.required")),
    firstName: Yup.string().required(t("errors.required")),
    company: Yup.string().required(t("errors.required")),
    country: Yup.string().required(t("errors.required")),
    emailAddress: Yup.string()
      .email(t("errors.invalid_email"))
      .required(t("errors.required")),
    password: Yup.string()
      .min(6, t("errors.password_min"))
      .required(t("errors.required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("errors.password_match"))
      .required(t("errors.required")),
    recaptcha: Yup.string().required(t("errors.recaptcha_required")),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      lastName: "",
      firstName: "",
      company: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      country: "",
      recaptcha: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const response: any = await addRecruiter(values).unwrap();
        SuccessNotification(response?.message);
        resetForm();
      } catch (error: any) {
        const message = error?.data?.message || t("errors.default");
        ErrorNotification(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>
      <Toaster />
      <div className="relative max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center pt-5">
            <Link href={"/"}>
              <Image
                src="https://res.cloudinary.com/dbpoyo4gw/image/upload/v1748260405/carrefour-removebg-preview_pjn3yd.png"
                alt="Logo"
                width={160}
                height={60}
                priority
                className="h-28 w-auto"
              />
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-2">
            {t("title")}
          </h2>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-8 space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputField
              name="lastName"
              label={t("lastName")}
              icon={User}
              placeholder={t("placeholders.lastName")}
              formik={formik}
            />
            <InputField
              name="firstName"
              label={t("firstName")}
              icon={User}
              placeholder={t("placeholders.firstName")}
              formik={formik}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputField
              name="company"
              label={t("company")}
              icon={MapPin}
              placeholder={t("placeholders.company")}
              formik={formik}
            />
            <InputField
              name="emailAddress"
              label="Email"
              type="email"
              icon={Mail}
              placeholder={t("placeholders.email")}
              formik={formik}
            />
          </div>

          <SelectCountryField
            name="country"
            label={t("country")}
            placeholder={t("placeholders.country")}
            icon={Globe}
            formik={formik}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputField
              name="password"
              label={t("password")}
              type="password"
              icon={Lock}
              placeholder={t("placeholders.password")}
              formik={formik}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
            <InputField
              name="confirmPassword"
              label={t("confirmPassword")}
              type="password"
              icon={Lock}
              placeholder={t("placeholders.confirmPassword")}
              formik={formik}
              showPassword={showConfirmPassword}
              onTogglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />
          </div>

          <div className="flex justify-center flex-col gap-5">
            <ReCAPTCHA
              sitekey="6LejtWwrAAAAAM-q2rZLldZogcZT5D0aISfZLqNb"
              onChange={(value) => formik.setFieldValue("recaptcha", value)}
              onExpired={() => formik.setFieldValue("recaptcha", "")}
            />
            {formik.errors.recaptcha && formik.touched.recaptcha && (
              <div className="text-red-500 text-sm">
                {formik.errors.recaptcha}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold shadow-lg transition-all duration-300 transform ${
              formik.isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:shadow-xl hover:scale-105 hover:from-blue-700 hover:to-orange-600"
            }`}
          >
            {formik.isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t("loading")}</span>
              </div>
            ) : (
              t("submit")
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-600">
              {t("already_registered")}{" "}
              <Link
                href="/connexion"
                className="font-medium text-orange-600 hover:text-orange-700"
              >
                {t("login")}
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-blue-500">{t("terms")}</p>
        </div>
      </div>
    </div>
  );
};
