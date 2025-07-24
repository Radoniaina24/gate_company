import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-react";

interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  format?: "dd/mm/yyyy" | "mm/dd/yyyy" | "yyyy-mm-dd";
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Sélectionner une date",
  disabled = false,
  className = "",
  format = "dd/mm/yyyy",
  minDate,
  maxDate,
  label,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const containerRef = useRef<HTMLDivElement>(null);

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    switch (format) {
      case "mm/dd/yyyy":
        return `${month}/${day}/${year}`;
      case "yyyy-mm-dd":
        return `${year}-${month}-${day}`;
      default:
        return `${day}/${month}/${year}`;
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Jours du mois précédent
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false,
      });
    }

    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Fin de la journée actuelle

    // Empêcher la sélection des dates futures
    // if (date > today) return true;

    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDateClick = (date: Date) => {
    // console.log(date);
    if (isDateDisabled(date)) return;

    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0)
    );

    // setSelectedDate(date);
    // onChange?.(date);
    setSelectedDate(utcDate);
    onChange?.(utcDate);

    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
    onChange?.(null);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            relative w-full px-4 py-2.5 text-left border rounded-xl transition-all duration-200
            ${
              disabled
                ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border-gray-300 text-gray-900 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 cursor-pointer"
            }
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : ""
            }
            ${isOpen ? "border-blue-500 ring-2 ring-blue-200" : ""}
          `}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              !disabled && setIsOpen(!isOpen);
            }
          }}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <div className="flex items-center text-sm justify-between">
            <span className={selectedDate ? "text-gray-900" : "text-gray-500"}>
              {selectedDate ? formatDate(selectedDate) : placeholder}
            </span>
            <div className="flex items-center space-x-2">
              {selectedDate && !disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
                  aria-label="Effacer la sélection"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
            {/* En-tête avec navigation */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
              <button
                type="button"
                onClick={() => navigateMonth("prev")}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white/70 rounded-lg transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-gray-800">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <button
                type="button"
                onClick={() => navigateMonth("next")}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white/70 rounded-lg transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendrier */}
            <div className="p-4">
              {/* Jours de la semaine */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-xs font-medium text-gray-500 text-center py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Grille des jours */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const isSelected = isDateSelected(day.date);
                  const isTodayDate = isToday(day.date);
                  const isDisabled = isDateDisabled(day.date);

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateClick(day.date)}
                      disabled={isDisabled}
                      className={`
                        relative h-10 text-sm rounded-lg transition-all duration-200 font-medium
                        ${
                          !day.isCurrentMonth
                            ? "text-gray-300 hover:bg-gray-50"
                            : isDisabled
                            ? "text-gray-300 cursor-not-allowed"
                            : isSelected
                            ? "bg-blue-500 text-white shadow-md transform scale-95"
                            : isTodayDate
                            ? "bg-blue-50 text-blue-600 border-2 border-blue-200 hover:bg-blue-100"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                        ${
                          day.isCurrentMonth && !isDisabled && !isSelected
                            ? "hover:scale-105"
                            : ""
                        }
                      `}
                    >
                      {day.date.getDate()}
                      {isTodayDate && !isSelected && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DatePicker;

//Utilisation

//   const date = selectedDate?.toISOString(); // ajouter dans mongoDb
//   const dateObj = date ? new Date(date) : null;
//   console.log(dateObj);

// interface FormValues {
//   date: Date | null;
// }

// const validationSchema = Yup.object({
//   date: Yup.date().nullable().required("La date est obligatoire"),
// });

// const FormWithDatePicker: React.FC = () => {
//   const formik = useFormik<FormValues>({
//     initialValues: {
//       date: null,
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       console.log("Date sélectionnée :", values.date);
//       // Traitement backend ou API
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit} className="max-w-md space-y-4">
//       <DatePicker
//         value={formik.values.date}
//         onChange={(date) => formik.setFieldValue("date", date)}
//         label="Date de l'événement"
//         error={
//           formik.touched.date && formik.errors.date ? formik.errors.date : ""
//         }
//       />

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all"
//       >
//         Soumettre
//       </button>
//     </form>
//   );
// };
