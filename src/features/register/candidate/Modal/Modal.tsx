"use client";
import React from "react";
import { useFormPassContext } from "../context/SignupContext";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export default function Modal() {
  const t = useTranslations("form.modal");
  const { showSuccessModal } = useFormPassContext();

  if (!showSuccessModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="text-center">
          <div className="relative mb-8">
            <div
              className="relative bg-gradient-to-br from-green-400 to-green-600 text-white text-5xl p-3 rounded-full inline-flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              <FaCircleCheck />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t("title")}
          </h3>

          <div className="bg-blue-50 p-4 rounded-lg text-start my-5">
            <h4 className="font-bold text-blue-800 mb-2">{t("nextSteps")}</h4>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
              <li>{t("step1")}</li>
              <li>{t("step2")}</li>
            </ol>
          </div>

          <div className="flex justify-center">
            <Link
              href="/"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-lg shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaHome className="text-lg transition-transform duration-300 group-hover:-translate-x-1 relative z-10" />
              <span className="relative z-10">{t("backHome")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
