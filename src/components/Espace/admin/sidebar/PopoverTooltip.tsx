import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type PopoverTooltipProps = {
  content: string;
  children: React.ReactNode;
};

export const PopoverTooltip = ({ content, children }: PopoverTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.right,
      });
    }
  }, [isHovered]);

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        {children}
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 8 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed z-[9999] pointer-events-none"
                style={{
                  top: position.top,
                  left: position.left + 8,
                  transform: "translateY(-50%)",
                }}
              >
                <div className="relative">
                  <div className="relative bg-white/90 text-black/80 text-sm px-4 py-2 rounded-2xl shadow-xl">
                    {content}
                    {/* Triangle en bas à gauche */}
                    {/* <span className="absolute left-3 -bottom-1 w-3 h-3 rotate-45 bg-gray-800 shadow-md" /> */}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
