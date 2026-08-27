"use client";

import { useEffect, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetISO: string): TimeLeft {
  const diff = Math.max(0, new Date(targetISO).getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function useCountdown(targetISO: string) {
  // Empieza en null (igual en servidor y cliente) para evitar un mismatch de
  // hidratación: el servidor y el cliente calcularían el segundo actual en
  // instantes distintos si se computara de entrada.
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTime(getTimeLeft(targetISO));
    const firstTick = setTimeout(update, 0);
    const id = setInterval(update, 1000);
    return () => {
      clearTimeout(firstTick);
      clearInterval(id);
    };
  }, [targetISO]);

  return time;
}
