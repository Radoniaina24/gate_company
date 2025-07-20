"use client";
import { FormValues, InputField } from "@/components/Form/InputField";
import MultiSelect from "@/components/Form/SelectMultiple";
import { useAddUserMutation } from "@/redux/api/userApi";
import { useFormik } from "formik";
import { Mail, Lock, UserCircle, User2Icon, AlertCircle } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

const OPTIONS = [
  { label: "Manager", value: "manager" },
  { label: "Admin", value: "admin" },
  { label: "Employee", value: "employee" },
];

const UserCreationSchema = Yup.object().shape({
  lastName: Yup.string().required("Le nom est requis"),
  firstName: Yup.string().required("Le prénom est requis"),
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Mot de passe requis"),
  roles: Yup.array()
    .min(1, "Sélectionner au moins un rôle")
    .of(Yup.string().oneOf(OPTIONS.map((o) => o.value))),
});

export const UserCreationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [addUser] = useAddUserMutation();
  const formik = useFormik<FormValues>({
    initialValues: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      roles: [],
    },
    validationSchema: UserCreationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const response = await addUser({
          lastName: values.lastName,
          firstName: values.firstName,
          email: values.email,
          password: values.password,
          roles: values.roles,
        }).unwrap();
        console.log(response);
        resetForm();
      } catch (error: any) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <InputField
          name="lastName"
          label="Nom"
          type="text"
          icon={UserCircle}
          placeholder="John"
          formik={formik}
        />

        <InputField
          name="firstName"
          label="Prénom"
          type="text"
          icon={User2Icon}
          placeholder="Doe"
          formik={formik}
        />

        <InputField
          name="email"
          label="Email"
          type="email"
          icon={Mail}
          placeholder="email@exemple.com"
          formik={formik}
        />

        <InputField
          name="password"
          label="Mot de passe"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          formik={formik}
        />

        {/* <SelectField
            name="role"
            label="Rôle"
            icon={User}
            formik={formik}
            options={roleOptions}
          /> */}
        <div className="space-y-2">
          <h1 className="text-red-700 text-sm">Roles</h1>
          <MultiSelect
            options={OPTIONS}
            placeholder="Choisir un ou plusieurs rôles"
            value={formik.values.roles}
            onChange={(vals) => formik.setFieldValue("roles", vals)}
            error={Boolean(formik.errors.roles && formik.touched.roles)}
          />
          {formik.errors.roles && formik.touched.roles && (
            <div className="text-red-600 text-sm flex gap-1 items-center ">
              <AlertCircle className="h-4 w-4" /> {formik.errors.roles}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Création..." : "Créer l'utilisateur"}
        </button>
      </form>
    </div>
  );
};
