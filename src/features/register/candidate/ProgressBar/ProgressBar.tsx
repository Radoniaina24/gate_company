"use client";
import React from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  const t = useTranslations("form.progress");
  const steps = [
    t("personalInfo"),
    t("sectorChoice"),
    t("documents"),
    t("password"),
    t("confirmation"),
  ];

  const totalSteps = steps.length;
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="text-center flex-1">
            <div
              className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                currentStep > index + 1
                  ? "bg-orange-500 border-orange-500 shadow-lg"
                  : currentStep === index + 1
                  ? "bg-blue-600 border-blue-600 shadow-lg"
                  : "bg-white border-gray-300"
              } text-white font-bold text-lg`}
            >
              {currentStep > index + 1 ? (
                <Check className="w-5 h-5" />
              ) : (
                <span
                  className={currentStep < index + 1 ? "text-gray-400" : ""}
                >
                  {index + 1}
                </span>
              )}
            </div>
            <div
              className={`mt-3 text-xs md:text-sm font-medium transition-colors duration-300 ${
                currentStep === index + 1
                  ? "text-blue-600"
                  : currentStep > index + 1
                  ? "text-orange-500"
                  : "text-gray-400"
              }`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
      <div className="relative pt-4">
        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-200 shadow-inner">
          <div
            style={{ width: `${progressPercent}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-orange-400 transition-all duration-700 ease-out rounded-full"
          ></div>
        </div>
      </div>
    </div>
  );
}
