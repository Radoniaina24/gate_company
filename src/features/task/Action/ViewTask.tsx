import Modal from "@/components/Form/Modal";

import React, { useState } from "react";
import { Task } from "../types/task";
import { Eye } from "lucide-react";
import TaskCardView, { TaskData } from "./View";

export default function ViewTask({ task }: { task: Task }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-105"
        title="Supprimer"
      >
        <Eye className="h-4 w-4" />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // title="Details du tâche"
        maxWidth="max-w-[80%]"
        maxHeight="max-h-[97%]"
      >
        <TaskCardView task={task as unknown as TaskData} />
      </Modal>
    </div>
  );
}
