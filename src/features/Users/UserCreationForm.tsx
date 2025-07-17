"use client";
import { FormValues, InputField } from "@/components/Form/InputField";
import { SelectField } from "@/components/Form/SelectField";
import { useAddUserMutation } from "@/redux/api/userApi";
import { useFormik } from "formik";
import { Mail, Lock, User, UserCircle, UserCog, User2Icon } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

const UserCreationSchema = Yup.object().shape({
  lastName: Yup.string().required("Le nom est requis"),
  firstName: Yup.string().required("Le prénom est requis"),
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Mot de passe requis"),
  role: Yup.string().required("Rôle requis"),
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
      role: "",
    },
    validationSchema: UserCreationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await addUser({
          lastName: values.lastName,
          firstName: values.firstName,
          email: values.email,
          password: values.password,
          role: values.role,
        }).unwrap();
        console.log(response);
      } catch (error: any) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const roleOptions = [
    { value: "admin", label: "Administrateur" },
    { value: "manager", label: "Manager " },
    { value: "employee", label: "Employé" },
  ];

  return (
    <div className=" mt-30">
      <div className="max-w-xl mx-auto   bg-white p-6 rounded-lg shadow-md">
        <h2 className=" text-center text-2xl font-bold text-red-700 mb-6">
          Créer un utilisateur
        </h2>
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

          <SelectField
            name="role"
            label="Rôle"
            icon={User}
            formik={formik}
            options={roleOptions}
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Création..." : "Créer l'utilisateur"}
          </button>
        </form>
      </div>
    </div>
  );
};
