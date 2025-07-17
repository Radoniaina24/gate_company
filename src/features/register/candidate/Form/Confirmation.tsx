"use client";
/* eslint-disable */
import React from "react";
import { useFormPassContext } from "../context/SignupContext";
import { FaCheck } from "react-icons/fa";
import ButtonNextPrev from "../ButtonPrevNext/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../Modal/Modal";
import dayjs from "dayjs";
import { useAddCandidateMutation } from "@/redux/api/candidateApi";
import { useTranslations } from "next-intl";

export default function Confirmation() {
  const t = useTranslations("form.confirmation");
  dayjs.locale("en");

  const formatDate = (isoDate: string | Date): string => {
    return dayjs(isoDate).format("DD MMMM YYYY");
  };

  const { formData, setShowSuccessModal } = useFormPassContext();
  const [registerCandidate] = useAddCandidateMutation();

  const formik = useFormik({
    initialValues: { acceptConditions: false },
    validationSchema: Yup.object({
      acceptConditions: Yup.boolean()
        .oneOf([true], t("validation.required"))
        .required(t("validation.required")),
    }),
    onSubmit: async (_, { setSubmitting }) => {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]: any) => {
        if (value !== undefined && value !== "") {
          data.append(key, value instanceof File ? value : String(value));
        }
      });

      setSubmitting(true);
      // console.log(formData);
      try {
        await registerCandidate(data).unwrap();
        setShowSuccessModal(true);
      } catch (error: any) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Modal />
      <div className="space-y-6">
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="text-green-600 text-5xl mb-4">
            <i className="fas fa-check-circle"></i>
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">
            {t("title")}
          </h3>
          <p className="text-gray-700">{t("subtitle")}</p>
        </div>

        {/* Personal info */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2">
            <h4 className="font-bold text-gray-800">
              {t("sections.personal")}
            </h4>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              ["lastName", formData.lastName],
              ["firstName", formData.firstName],
              ["email", formData.emailAddress],
              ["phone", formData.phoneNumber],
              ["birthdate", formatDate(formData.dateOfBirth)],
              ["nationality", formData.nationality],
              ["address", formData.address],
              ["country", formData.country],
              ["city", formData.city],
              ["postalCode", formData.postalCode],
            ].map(([key, value]) => (
              <div key={key}>
                <p className="text-gray-500">{t(`fields.${key}`)}</p>
                <p className="font-medium">{value || "-"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sector info */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2">
            <h4 className="font-bold text-gray-800">{t("sections.sector")}</h4>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">{t("fields.sector")}</p>
              <p className="font-medium">{formData.sector || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">{t("fields.category")}</p>
              <p className="font-medium">{formData.category || "-"}</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2">
            <h4 className="font-bold text-gray-800">
              {t("sections.documents")}
            </h4>
          </div>
          <div className="p-4 space-y-2 text-sm">
            {["photo", "cv", "degree", "coverLetter"].map((key) => (
              <div className="flex items-center" key={key}>
                <FaCheck
                  className={` ${formData[key] ? "text-green-500 mr-2" : ""}`}
                />
                <span>{t(`documents.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Consent */}
        <div className="mt-6">
          <div className="flex items-start mb-4">
            <input
              type="checkbox"
              id="acceptConditions"
              name="acceptConditions"
              checked={formik.values.acceptConditions}
              onChange={formik.handleChange}
              className="mt-1 mr-2"
            />
            <label htmlFor="acceptConditions" className="text-sm text-gray-700">
              {t("consent.text")}{" "}
              <a href="#" className="text-blue-700 hover:underline">
                {t("consent.terms")}
              </a>{" "}
              {t("consent.and")}{" "}
              <a href="#" className="text-blue-700 hover:underline">
                {t("consent.privacy")}
              </a>
            </label>
          </div>
          {formik.errors.acceptConditions && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.acceptConditions}
            </p>
          )}
        </div>

        <ButtonNextPrev isSubmitting={formik.isSubmitting} />
      </div>
    </form>
  );
}
