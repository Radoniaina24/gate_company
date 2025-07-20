import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  onClick?: () => Promise<void> | void;
  backgroundColor?: string; // ✅ couleur bouton
  textColor?: string; // ✅ couleur texte
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  backgroundColor,
  textColor,
  className,
  onClick,
  ...props
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!onClick) return;
    try {
      setIsLoading(true);
      await onClick();
    } catch (error) {
      console.error("Erreur lors de l'action :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400",
    outline:
      "border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-3",
  };

  // ✅ prioriser les couleurs personnalisées sinon fallback variant
  const customStyles = backgroundColor
    ? `${backgroundColor} ${textColor ?? "text-white"}`
    : variants[variant];

  return (
    <button
      className={cn(baseClasses, customStyles, sizes[size], className)}
      onClick={handleClick}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg
          className={cn(
            "animate-spin mr-2",
            size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"
          )}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {Icon && iconPosition === "left" && (
        <Icon
          className={cn(
            "mr-2",
            size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
          )}
        />
      )}
      {children}

      {Icon && iconPosition === "right" && (
        <Icon
          className={cn(
            "ml-2",
            size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
          )}
        />
      )}
    </button>
  );
};

//utilisation
// export default function Exemple() {

//    const saveAction = async () => {
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     alert("Données sauvegardées !");
//   };

//    const handleConfirmDelete = async () => {

//       await new Promise((res) => setTimeout(res, 2000));
//        alert("Données sauvegardées !");

//   };

//   return (
//     <div className="p-8 soa">

//       <Button
//         backgroundColor="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
//         textColor="text-white"
//         icon={Plus}
//         size="md"
//         onClick={() => alert("Ajouté !")}
//       >
//         Ajouter
//       </Button>

//     </div>
//   );
// }
