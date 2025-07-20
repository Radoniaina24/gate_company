import React from "react";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

type DeleteConfirmationProps = {
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  dangerLevel?: "low" | "medium" | "high";
  icon?: React.ReactNode; // Permet de surcharger l'icône
};

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  onCancel,
  onConfirm,
  title = "Confirmer la suppression",
  description = "Cette action est irréversible. Voulez-vous vraiment continuer ?",
  confirmText = "Supprimer définitivement",
  cancelText = "Annuler",
  loading = false,
  dangerLevel = "high",
  icon,
}) => {
  // Couleurs en fonction du niveau de danger
  const getDangerColors = () => {
    switch (dangerLevel) {
      case "low":
        return {
          bg: "bg-amber-600",
          hover: "hover:bg-amber-700",
          focus: "focus:ring-amber-500",
          text: "text-amber-600",
          icon: <AlertTriangle className="w-5 h-5" />,
        };
      case "medium":
        return {
          bg: "bg-orange-600",
          hover: "hover:bg-orange-700",
          focus: "focus:ring-orange-500",
          text: "text-orange-600",
          icon: <AlertTriangle className="w-5 h-5" />,
        };
      case "high":
      default:
        return {
          bg: "bg-red-600",
          hover: "hover:bg-red-700",
          focus: "focus:ring-red-500",
          text: "text-red-600",
          icon: <Trash2 className="w-5 h-5" />,
        };
    }
  };

  const colors = getDangerColors();

  return (
    <div className="p-6 space-y-6 max-w-md w-full">
      {/* Icône d'avertissement */}
      <div className="flex justify-center">
        <div className={`p-3 rounded-full ${colors.bg}/10`}>
          {icon || (
            <AlertTriangle className={`w-15 h-15 ${colors.text}`} strokeWidth={1.5} />
          )}
        </div>
      </div>

      {/* Contenu textuel */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
        <button
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <X className="w-4 h-4" />
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`px-4 py-2.5 text-sm font-medium rounded-lg text-white ${colors.bg} ${
            loading ? "opacity-75 cursor-not-allowed" : colors.hover
          } focus:outline-none focus:ring-2 ${colors.focus} focus:ring-offset-2 transition-all flex items-center justify-center gap-2`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            colors.icon
          )}
          {loading ? "Traitement..." : confirmText}
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;

                    //Utilisation
                    
// export default function DeleteExamplePage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleConfirmDelete = async () => {
//     setLoading(true);
//     try {
//       // Simuler une requête
//       await new Promise((res) => setTimeout(res, 2000));
//       console.log("Élément supprimé");
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Erreur lors de la suppression");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8">
//  <Button
//         backgroundColor="bg-red-600 hover:bg-red-700 focus:ring-red-500"
//         textColor="text-white"
//         icon={TriangleAlert}
//         size="md"

//       >
//        Supprimer
//       </Button>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Confirmation de suppression"
//         maxWidth="max-w-lg"
//       >
//         <DeleteConfirmation
//           onCancel={() => setIsModalOpen(false)}
//           onConfirm={handleConfirmDelete}
//           loading={loading}
//         />
//       </Modal>
//     </div>
//   );
// }