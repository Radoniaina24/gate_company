import DeleteConfirmation from "@/components/Form/DeleteConfirmation";
import Modal from "@/components/Form/Modal";
import { useDeleteTaskMutation } from "@/redux/api/taskApi";
import { Trash2, Trash2Icon } from "lucide-react";
import React, { useState } from "react";

export default function RemoveTask({ id }: { id?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [deleteTask] = useDeleteTaskMutation();

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      // Simuler une requête
      await deleteTask(id).unwrap();
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
        className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-105"
        title="Supprimer"
      >
        <Trash2Icon className="h-4 w-4" />
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
