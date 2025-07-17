import { CountryDropdown } from "react-country-region-selector";
import { AlertCircle, Globe } from "lucide-react";
import { useFormik } from "formik";
import { FormValues } from "./InputField"; // Assure-toi que le type est importé si défini ailleurs

interface SelectCountryFieldProps {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  icon?: typeof Globe;
  formik: ReturnType<typeof useFormik<FormValues>>;
}

export const SelectCountryField: React.FC<SelectCountryFieldProps> = ({
  name,
  label,
  placeholder,
  icon: Icon = Globe,
  formik,
}) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-blue-900">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
        <CountryDropdown
          id={name}
          name={name}
          value={formik.values[name] || ""}
          onChange={(val: string) => formik.setFieldValue(name, val)}
          //   onBlur={() => formik.setFieldTouched(name, true)}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm appearance-none placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            hasError
              ? "border-red-300 bg-red-50"
              : "border-blue-200 bg-white hover:border-blue-300"
          }`}
          defaultOptionLabel={placeholder}
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
