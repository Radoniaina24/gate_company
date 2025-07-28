"use client";

import { CircleX } from "lucide-react";
import React, { ReactNode, useEffect, useCallback } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  closeButton?: boolean;
  overlayClose?: boolean;
  maxWidth?: string;
  maxHeight?: string;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  closeButton = true,
  overlayClose = true,
  maxWidth = "max-w-2xl",
  maxHeight = "",
}: ModalProps) => {
  // Gestion de la fermeture via la touche ESC
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // bloquer scroll
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = ""; // restaurer scroll
    };
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99] flex items-center justify-center px-4 py-6 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Overlay (flou + fond) */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={overlayClose ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Contenu du modal */}
      <div
        className={`relative z-50 w-full rounded-2xl overflow-y-auto bg-white shadow-xl transition-all ${maxHeight} ${maxWidth}`}
        tabIndex={-1}
      >
        {/* En-tête */}
        {(title || closeButton) && (
          <div
            className={`flex items-center ${
              title ? "justify-between border-b border-gray-200" : "justify-end"
            }   px-6 py-4`}
          >
            {title && (
              <h2
                id="modal-title"
                className="text-lg font-semibold text-gray-900"
              >
                {title}
              </h2>
            )}
            {closeButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Fermer le modal"
              >
                <CircleX className="text-red-500 hover:cursor-pointer" />
              </button>
            )}
          </div>
        )}

        {/* Corps du modal */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
