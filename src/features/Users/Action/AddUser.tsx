import Modal from "@/components/Form/Modal";
import { UserPlus } from "lucide-react";
import React, { useState } from "react";
import { UserCreationForm } from "../UserCreationForm";

export default function AddUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [loading, setLoading] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Nouvel utilisateur</span>
        <span className="sm:hidden">Ajouter</span>
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=" Nouvel utilisateur"
        maxWidth="max-w-lg"
      >
        <UserCreationForm />
      </Modal>
    </div>
  );
}
