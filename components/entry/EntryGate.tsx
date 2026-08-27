"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import HeartStart from "./HeartStart";
import { iconButton } from "@/lib/styles";

export default function EntryGate({
  coupleNames,
  backgroundPhoto,
  songSrc,
  children,
}: {
  coupleNames: string;
  backgroundPhoto: string;
  songSrc: string;
  children: ReactNode;
}) {
  const [entered, setEntered] = useState(false);
  const [started, setStarted] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Si nadie toca el corazón, igual se muestra la bienvenida a los pocos
  // segundos para que nadie quede "atascado" en la pantalla de entrada.
  useEffect(() => {
    if (started) return;
    const t = setTimeout(() => setStarted(true), 6000);
    return () => clearTimeout(t);
  }, [started]);

  const enter = (withMusic: boolean) => {
    setEntered(true);
    setMusicOn(withMusic);
    if (withMusic) {
      void audioRef.current?.play();
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.pause();
    } else {
      void audio.play();
    }
    setMusicOn(!musicOn);
  };

  return (
    <>
      <audio ref={audioRef} src={songSrc} loop />

      {entered && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={musicOn ? "Silenciar música" : "Activar música"}
          className={`fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-navy shadow-md backdrop-blur ${iconButton}`}
        >
          <motion.span
            animate={musicOn ? { rotate: 360 } : { rotate: 0 }}
            transition={
              musicOn
                ? { duration: 4, repeat: Infinity, ease: "linear" }
                : { duration: 0.3 }
            }
            className="flex"
          >
            {musicOn ? <Music size={18} /> : <VolumeX size={18} />}
          </motion.span>
        </button>
      )}

      <AnimatePresence>
        {!entered && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-navy"
          >
            <Image
              src={backgroundPhoto}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-navy/60" />
            <p className="absolute inset-0 flex select-none items-center justify-center whitespace-nowrap font-script text-[18vw] leading-none text-white/10">
              {coupleNames}
            </p>

            <div className="relative z-10 mx-6 flex max-w-md flex-col items-center text-center">
              <AnimatePresence mode="wait">
                {!started ? (
                  <motion.div
                    key="heart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <HeartStart onStart={() => setStarted(true)} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
                      Bienvenidos a la invitación de {coupleNames}
                    </h1>
                    <p className="mt-4 text-sm text-white/80">
                      La música de fondo es parte de la experiencia
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => enter(true)}
                        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                      >
                        Ingresar Con Música
                      </button>
                      <button
                        type="button"
                        onClick={() => enter(false)}
                        className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-white/10 active:scale-95"
                      >
                        Ingresar Sin Música
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {entered && children}
    </>
  );
}
