"use client";
import React from "react";
import { useFormPassContext } from "../context/SignupContext";
import { FaArrowLeft, FaArrowRight, FaPaperPlane } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ButtonNextPrev({
  isSubmitting,
}: {
  isSubmitting?: boolean;
}) {
  const { prevStep, currentStep } = useFormPassContext();
  const t = useTranslations("form.buttons");

  return (
    <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
      {/* Previous button */}
      <div className="w-full sm:w-auto">
        {currentStep > 1 &&
          (isSubmitting ? null : (
            <button
              type="button"
              onClick={prevStep}
              className="group relative w-full sm:w-auto overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300 text-slate-700 px-8 py-3.5 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md font-medium text-sm flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1 text-slate-600" />
              <span className="relative z-10">{t("previous")}</span>
            </button>
          ))}
      </div>

      {/* Next or Submit button */}
      <div className="w-full sm:w-auto">
        {currentStep < 5 ? (
          <button
            type="submit"
            className="group relative w-full sm:w-auto overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-lg font-medium text-sm flex items-center justify-center gap-3 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">{t("next")}</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
          </button>
        ) : (
          <button
            disabled={isSubmitting}
            type="submit"
            className={`group relative w-full sm:w-auto overflow-hidden ${
              isSubmitting
                ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-lg"
            } text-white px-8 py-3.5 rounded-xl transition-all duration-300 font-medium text-sm flex items-center justify-center gap-3 shadow-lg`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-orange-500/20 opacity-0 ${
                !isSubmitting && "group-hover:opacity-100"
              } transition-opacity duration-300`}
            ></div>
            <span className="relative z-10">{t("submit")}</span>
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin relative z-10" />
            ) : (
              <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 relative z-10" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
