import Modal from "@/components/Form/Modal";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import { UserCreationForm } from "../UserCreationForm";
import { IUser } from "../Liste";

export default function EditUser({ user }: { user: IUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   console.log(user);
  return (
    <div className="text-start">
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
        title="Éditer"
      >
        <Edit className="h-5 w-5" />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={user ? "Modfication de l'utilisateur" : "Nouvel utilisateur"}
        maxWidth="max-w-lg"
      >
        <UserCreationForm onClose={() => setIsModalOpen(false)} user={user} />
      </Modal>
    </div>
  );
}
