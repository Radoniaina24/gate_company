"use client";
/* eslint-disable */
import React from "react";
import { useFormPassContext } from "../context/SignupContext";
import ProgressBar from "../ProgressBar/ProgressBar";
import FormStep1 from "./FormStep1";
import FormStep5 from "./FormStep5";
import Confirmation from "./Confirmation";
import Link from "next/link";
import Image from "next/image";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import Modal from "../Modal/Modal";

export default function MultiStepForm() {
  const { currentStep } = useFormPassContext();
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <FormStep1 />;
      case 2:
        return <FormStep3 />;
      case 3:
        return <FormStep5 />;
      case 4:
        return <FormStep4 />;
      case 5:
        return <Confirmation />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen  bg-gray-50">
      <div className="container mx-auto  px-4 py-10 flex flex-col lg:flex-row gap-8">
        <div className="mx-auto w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-lg shadow-md">
          <div className="mb-8">
            <div className="flex justify-center pt-1">
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
            <Modal />
            <p className="text-center text-3xl font-bold text-blue-900 mb-2">
              Inscription Candidat
            </p>
          </div>
          {/* ProgressBar */}
          <ProgressBar currentStep={currentStep} />
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}
