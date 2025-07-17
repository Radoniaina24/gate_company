import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdCancelPresentation } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const ModalDetailsCandidate: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ zIndex: 110 }}
          />

          {/* Modal wrapper */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-4 py-6 sm:px-0 "
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{ zIndex: 130 }}
          >
            <div
              className="bg-white max-w-screen max-h-[80vh] sm:rounded-2xl shadow-lg relative  flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className={`flex items-center justify-between px-6 py-4 ${
                  title ? "border-b border-gray-200" : ""
                }`}
              >
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition"
                  aria-label="Fermer le modal"
                >
                  <MdCancelPresentation className="text-red-500 text-lg" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ModalDetailsCandidate;
