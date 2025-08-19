import DeleteConfirmation from "@/components/Form/DeleteConfirmation";
import Modal from "@/components/Form/Modal";
import { useDeleteTaskMutation } from "@/redux/api/taskApi";
import { useDeleteTimeOffMutation } from "@/redux/api/timeoffApi";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function RemoveTimeOff({ id }: { id?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteTimeOff] = useDeleteTimeOffMutation();
  const ErrorNotification = (msg: string) => toast.error(msg);
  const SuccessNotification = (msg: string) => toast.success(msg);

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      // Simuler une requête
      const res = await deleteTimeOff(id).unwrap();
      setIsModalOpen(false);
      SuccessNotification(res.message);
    } catch (error: any) {
      // console.error("Erreur lors de la suppression");
      ErrorNotification(error.message || "Erreur interne du serveur");
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
