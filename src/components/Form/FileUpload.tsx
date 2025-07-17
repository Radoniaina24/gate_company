"use client";
/* eslint-disable */
import React from "react";
import { useTranslations } from "next-intl";

interface FileUploadProps {
  name: string;
  label: string;
  value: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
  touched?: any;
  accept?: string;
  required?: boolean;
  helperText?: string;
  maxSizeMB?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  touched,
  accept = ".pdf,.jpg,.jpeg,.png,.gif",
  required = false,
  helperText,
  maxSizeMB = 5,
}) => {
  const t = useTranslations("upload");

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.includes("pdf")) return "fa-file-pdf text-red-500";
    if (type.includes("image")) return "fa-file-image text-green-500";
    return "fa-file text-gray-500";
  };

  const isFileTooLarge = value && value.size > maxSizeMB * 1024 * 1024;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          error && touched ? "border-red-500" : "border-gray-300"
        }`}
      >
        <input
          type="file"
          id={name}
          name={name}
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
        <label htmlFor={name} className="cursor-pointer block">
          <div className="text-center">
            <i className="fas fa-upload text-blue-500 text-3xl mb-2"></i>
            <p className="text-sm text-gray-700 mb-1">{t("clickToUpload")}</p>
            {helperText && (
              <p className="text-xs text-gray-500">{helperText}</p>
            )}
            <p className="text-xs text-gray-400">
              {t("maxSize", { size: maxSizeMB })}
            </p>
          </div>
        </label>

        {value && (
          <div className="mt-3 flex items-center justify-center text-sm">
            <i className={`fas ${getFileIcon(value)} mr-2 text-lg`}></i>
            <span
              className={`${
                isFileTooLarge ? "text-red-500" : "text-green-600"
              }`}
            >
              {value.name} {isFileTooLarge && `(${t("tooLarge")})`}
            </span>
          </div>
        )}
      </div>

      {error && touched && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
