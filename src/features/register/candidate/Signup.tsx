import React from "react";
import { FormPassProvider } from "./context/SignupContext";
import MultiStepForm from "./Form/MultiStepForm";

export default function Signup() {
  return (
    <FormPassProvider>
      <MultiStepForm />
    </FormPassProvider>
  );
}
