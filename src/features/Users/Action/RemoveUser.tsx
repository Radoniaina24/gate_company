import DeleteConfirmation from "@/components/Form/DeleteConfirmation";
import Modal from "@/components/Form/Modal";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

export default function RemoveUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      // Simuler une requête
      await new Promise((res) => setTimeout(res, 2000));
      console.log("Élément supprimé");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
        title="Supprimer"
      >
        <Trash2 className="h-5 w-5" />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmation de suppression"
        maxWidth="max-w-lg"
      >
        <DeleteConfirmation
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      </Modal>
    </div>
  );
}
