"use client";
/* eslint-disable */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Lock } from "lucide-react";
import { FormValues, InputField } from "@/components/Form/InputField";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { resolve } from "path";

const Signin: React.FC = () => {
  const t = useTranslations("auth.form");
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const router = useRouter();

  const ErrorNotification = (msg: string) => toast.error(msg);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("errors.invalid_email"))
      .required(t("errors.required")),
    password: Yup.string()
      .min(6, t("errors.password_min"))
      .required(t("errors.required")),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await login({
          email: values.email,
          password: values.password,
        }).unwrap();

        const roles: string[] = response?.user?.roles || [];

        const allowedRoles = ["admin", "employee", "manager"];
        const hasValidRole = roles.some((role) => allowedRoles.includes(role));
        if (hasValidRole) {
          router.push("/admin");
        } else {
          ErrorNotification(t("errors.unknown_role"));
        }
      } catch (error: any) {
        const message = error?.data?.message || t("errors.default");
        ErrorNotification(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="relative max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50">
        <div className="flex justify-center">
          <Link href={"/"}>
            <Image
              src="https://res.cloudinary.com/dbpoyo4gw/image/upload/v1749549435/logo_gate_group_pktaw2.jpg"
              alt="Logo"
              width={400}
              height={400}
              priority
              className="h-24 w-auto"
            />
          </Link>
        </div>
        <form onSubmit={formik.handleSubmit} className="p-8 space-y-6">
          <InputField
            name="email"
            label={t("email")}
            type="email"
            icon={Mail}
            placeholder={t("placeholders.email")}
            formik={formik}
          />

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

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full bg-white text-sm my-5 text-red-600 border border-red-600 py-3 px-6 rounded-lg font-semibold shadow-md transition-all duration-300 transform ${
              formik.isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-red-600 hover:text-white hover:shadow-lg "
            }`}
          >
            {formik.isSubmitting ? (
              <div className="flex items-center  justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <span>{t("loading")}</span>
              </div>
            ) : (
              t("submit")
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
