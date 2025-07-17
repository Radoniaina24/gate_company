import React from "react";
/* eslint-disable */
interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
  touched?: any;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  touched,
  placeholder,
  required = false,
  min,
  max,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="number"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        className={`w-full px-4 py-2 text-sm border rounded-md shadow-sm transition duration-150 ease-in-out
          ${
            error && touched
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }
          focus:outline-none focus:ring-2`}
      />
      {error && touched && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default NumberInput;
