// components/FormTextarea.tsx
/* eslint-disable */
import React from "react";

interface FormTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: any;
  touched?: any;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  minCharCount?: number;
  hint?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  rows = 6,
  minCharCount,
  hint,
  touched,
}) => {
  const charCount = value.length;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block  font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
        {minCharCount && (
          <span className="text-gray-500 text-xs ml-2">
            ({minCharCount} caractères minimum)
          </span>
        )}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full px-4 py-2 border ${
          error && touched ? "border-red-500" : "border-gray-300"
        } rounded  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        placeholder={placeholder}
      ></textarea>
      <div
        className={`flex ${
          error && touched ? "justify-between" : "justify-end"
        }  mt-1`}
      >
        {error && touched && <p className="text-sm text-red-500">{error}</p>}
        <p className="text-sm text-gray-500">{charCount} caractères</p>
      </div>
    </div>
  );
};

export default FormTextarea;
