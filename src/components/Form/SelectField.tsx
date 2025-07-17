import { useFormik } from "formik";
import { AlertCircle, ChevronDown, LucideIcon } from "lucide-react";
import { FormValues } from "./InputField";

interface SelectFieldProps {
  name: keyof FormValues;
  label: string;
  icon: LucideIcon;
  formik: ReturnType<typeof useFormik<FormValues>>;
  options: { value: string; label: string }[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  icon: Icon,
  formik,
  options,
}) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-red-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-red-500" />
        </div>
        <select
          id={name}
          {...formik.getFieldProps(name)}
          className={`w-full pl-10 pr-12 py-3 text-sm border rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
            hasError
              ? "border-red-400 bg-red-50"
              : "border-red-300 bg-white hover:border-red-500"
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown className="h-5 w-5 text-red-500" />
        </div>
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
