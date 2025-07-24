import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  show: boolean;
  onSelectColor: (color: string) => void;
  onReset: () => void;
  onClose: () => void; // fonction pour fermer le picker
}

export default function CustomColorPicker({
  show,
  onSelectColor,
  onReset,
  onClose,
}: ColorPickerProps) {
  const [color, setColor] = useState("#000000");
  const pickerRef = useRef<HTMLDivElement>(null);

  // Fermer le color picker quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      ref={pickerRef}
      className="absolute mt-4 bg-white p-4 w-64 rounded-xl shadow-lg z-50 border border-slate-200"
    >
      <HexColorPicker
        color={color}
        onChange={(newColor) => {
          setColor(newColor);
          onSelectColor(newColor);
        }}
        style={{ width: "100%", height: "150px" }}
      />

      <div className="mt-4 flex justify-between items-center">
        <div
          className="w-6 h-6 rounded-full border"
          style={{ backgroundColor: color }}
          title={color}
        />
        <button
          onClick={() => {
            onReset();
            setColor("#000000");
          }}
          className="text-xs px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 transition"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
