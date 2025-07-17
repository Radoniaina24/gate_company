import { useFormik } from "formik";
import { AlertCircle, Eye, EyeOff, LucideIcon } from "lucide-react";

export interface FormValues {
  lastName?: string;
  firstName?: string;
  adresse?: string;
  emailAddress?: string;
  password?: string;
  confirmPassword?: string;
  company?: string;
  message?: string;
  country?: string;
  email?: string;
  recaptcha?: string;
  role?: string;
}

interface InputFieldProps {
  name: keyof FormValues;
  label: string;
  type?: string;
  icon: LucideIcon;
  placeholder: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  formik: ReturnType<typeof useFormik<FormValues>>;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  icon: Icon,
  placeholder,
  showPassword,
  onTogglePassword,
  formik,
}) => {
  const isPassword = type === "password";
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
        <input
          id={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          className={`w-full pl-10 pr-12 py-3 text-sm border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-sm duration-200 ${
            hasError
              ? "border-red-400 bg-red-50"
              : "border-red-300 bg-white hover:border-red-500"
          }`}
        />
        {isPassword && onTogglePassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-red-500 hover:text-red-700" />
            ) : (
              <Eye className="h-5 w-5 text-red-500 hover:text-red-700" />
            )}
          </button>
        )}
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
