// components/FormSelect.tsx
/* eslint-disable */
import React from "react";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: any;
  touched?: any;
  placeholder?: string;
  required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
  touched,
  placeholder = "Sélectionnez une option",
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border ${
          error && touched ? "border-red-500" : "border-gray-300"
        } rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && touched && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormSelect;
