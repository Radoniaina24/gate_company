"use client";
import React, { useState, useEffect, JSX } from "react";
import { Calendar, MapPin, Target } from "lucide-react";
import { useTranslations } from "next-intl";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeCardProps {
  value: number;
  label: string;
  color: string;
}

// Date cible pour Madagascar (fuseau horaire Indian/Antananarivo)
const targetDate: Date = new Date(
  new Intl.DateTimeFormat("en-US", {
    timeZone: "Indian/Antananarivo",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date("2025-09-19T00:00:00"))
);

export default function CountdownTimer(): JSX.Element {
  const t = useTranslations("countdown");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    const updateTimer = (): void => {
      const now = new Date();

      // Convertir l'heure actuelle à Madagascar via string formatting
      const formatter = new Intl.DateTimeFormat("fr-FR", {
        timeZone: "Indian/Antananarivo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentTime(formatter.format(now));

      // Obtenir la date actuelle à Madagascar pour les calculs
      const madagascarNow = new Date(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Indian/Antananarivo",
          hour12: false,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(now)
      );

      const difference = targetDate.getTime() - madagascarNow.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeCard: React.FC<TimeCardProps> = ({ value, label, color }) => (
    <div
      className={`relative bg-gradient-to-br ${color} p-3 md:p-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[70px] md:min-w-[90px]`}
    >
      <div className="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm"></div>
      <div className="relative z-10 text-center">
        <div className="text-xl md:text-3xl font-bold text-white mb-1 font-mono tracking-wider">
          {value.toString().padStart(2, "0")}
        </div>
        <div className="text-white/80 text-xs font-medium uppercase tracking-wide">
          {label}
        </div>
      </div>
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-white/20 rounded-full blur-lg"></div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 py-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span className="text-white text-sm font-medium">
              {t("location")} • {currentTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold  mb-3 bg-gradient-to-r from-white via-blue-200 to-orange-200 bg-clip-text text-transparent">
            {t("title")}
          </h1>

          <div className="flex items-center justify-center gap-2 text-lg md:text-xl text-blue-200 font-medium">
            <Calendar className="w-5 h-5" />
            <span>{t("targetDate")}</span>
          </div>
        </div>

        {/* Countdown Cards */}
        {!isExpired ? (
          <div className="flex justify-center items-center gap-2 md:gap-4">
            <TimeCard
              value={timeLeft.days}
              label={t("units.days")}
              color="from-blue-600 to-blue-700"
            />
            <div className="text-white text-2xl md:text-3xl font-bold mx-1">
              :
            </div>
            <TimeCard
              value={timeLeft.hours}
              label={t("units.hours")}
              color="from-orange-500 to-orange-600"
            />
            <div className="text-white text-2xl md:text-3xl font-bold mx-1">
              :
            </div>
            <TimeCard
              value={timeLeft.minutes}
              label={t("units.minutes")}
              color="from-blue-500 to-blue-600"
            />
            <div className="text-white text-2xl md:text-3xl font-bold mx-1">
              :
            </div>
            <TimeCard
              value={timeLeft.seconds}
              label={t("units.seconds")}
              color="from-orange-600 to-orange-700"
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-6 rounded-2xl shadow-xl">
              <Target className="w-12 h-12 text-white mx-auto mb-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {t("expiredTitle")}
              </h2>
              <p className="text-blue-100">{t("expiredMessage")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
