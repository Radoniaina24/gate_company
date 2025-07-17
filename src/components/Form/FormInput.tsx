// components/FormInput.tsx
/* eslint-disable */
import React from "react";

interface FormInputProps {
  type?: string;
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
  touched?: any;
  placeholder?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  touched,
  required = false,
  type = "text",
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border ${
          error && touched ? "border-red-500" : "border-gray-300"
        } rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && touched ? (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default FormInput;
