import { useFormik } from "formik";
import { AlertCircle, LucideIcon } from "lucide-react";
import React from "react";
import { FormValues } from "./InputField"; // ou adapte le chemin selon ton projet

interface TextAreaFieldProps {
  name: keyof FormValues;
  label: string;
  icon: LucideIcon;
  placeholder: string;
  rows?: number;
  formik: ReturnType<typeof useFormik<FormValues>>;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  icon: Icon,
  placeholder,
  rows = 5,
  formik,
}) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-blue-900">
        {label}
      </label>
      <div className="relative">
        <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
          <Icon className="h-5 w-5 text-blue-400 mt-1" />
        </div>
        <textarea
          id={name}
          placeholder={placeholder}
          rows={rows}
          {...formik.getFieldProps(name)}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
            hasError
              ? "border-red-300 bg-red-50"
              : "border-blue-200 bg-white hover:border-blue-300"
          }`}
        />
      </div>
      {hasError && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{formik.errors[name]}</span>
        </div>
      )}
    </div>
  );
};
