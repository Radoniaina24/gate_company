import DeleteConfirmation from "@/components/Form/DeleteConfirmation";
import Modal from "@/components/Form/Modal";
import { useDeleteUserMutation } from "@/redux/api/userApi";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function RemoveUser({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ErrorNotification = (msg: string) => toast.error(msg);
  const SuccessNotification = (msg: string) => toast.success(msg);
  const [deleteUser] = useDeleteUserMutation();

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      // Simuler une requête
      const res = await deleteUser(id).unwrap();
      setIsModalOpen(false);
      SuccessNotification(res.message);
    } catch (error: any) {
      // console.error("Erreur lors de la suppression");
      ErrorNotification(error?.message);
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
        <Trash2 className="h-4 w-4 lg:h-4 lg:w-4" />
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
