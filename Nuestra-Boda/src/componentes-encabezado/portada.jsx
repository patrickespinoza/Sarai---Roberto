import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function Portada() {
  const audioRef = useRef(null);

  const [modalAbierto, setModalAbierto] = useState(true);
  const [musicaActiva, setMusicaActiva] = useState(false);
  const [audioListo, setAudioListo] = useState(false);

  /*
    Cuando el componente se cierre o cambie de página,
    detenemos correctamente el audio.
  */
  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  /*
    Abrir invitación y comenzar la música.
    El clic del usuario permite que el navegador reproduzca el audio.
  */
  const abrirConMusica = async () => {
    const audio = audioRef.current;

    setModalAbierto(false);

    if (!audio) return;

    try {
      audio.volume = 0.45;
      await audio.play();
      setMusicaActiva(true);
    } catch (error) {
      console.warn("El navegador bloqueó la reproducción del audio:", error);
      setMusicaActiva(false);
    }
  };

  /*
    Abrir la invitación sin reproducir música.
  */
  const abrirSinMusica = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
    }

    setMusicaActiva(false);
    setModalAbierto(false);
  };

  /*
    Botón flotante para pausar o reanudar.
  */
  const alternarMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        audio.volume = 0.45;
        await audio.play();
        setMusicaActiva(true);
      } else {
        audio.pause();
        setMusicaActiva(false);
      }
    } catch (error) {
      console.warn("No fue posible reproducir el audio:", error);
      setMusicaActiva(false);
    }
  };

  return (
    <>
      <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">
        {/* AUDIO */}
        <audio
          ref={audioRef}
          src="/musica.mp3"
          loop
          preload="auto"
          onCanPlay={() => setAudioListo(true)}
          onPlay={() => setMusicaActiva(true)}
          onPause={() => setMusicaActiva(false)}
        />

        {/* FOTOGRAFÍA */}
        <motion.img
          src="/Portada.png"
          alt="Sarai y Roberto"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/*
          Solo se conserva una sombra neutral para que el texto sea legible.
          No agrega ningún tono de la paleta sobre la fotografía.
        */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/20
            via-transparent
            to-black/80
          "
        />

        {/* Sombra inferior adicional */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[55%]
            bg-gradient-to-t
            from-black/65
            via-black/20
            to-transparent
          "
        />

        {/* MARCO EDITORIAL */}
        <div
          className="
            pointer-events-none
            absolute
            inset-4
            z-10
            border
            border-white/40

            sm:inset-6
            md:inset-8
          "
        />

        {/* Detalle superior izquierdo */}
        <div
          className="
            pointer-events-none
            absolute
            left-4
            top-4
            z-20
            h-12
            w-12
            border-l-2
            border-t-2
            border-white/90

            sm:left-6
            sm:top-6
            sm:h-16
            sm:w-16

            md:left-8
            md:top-8
          "
        />

        {/* Detalle inferior derecho */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-4
            right-4
            z-20
            h-12
            w-12
            border-b-2
            border-r-2
            border-white/90

            sm:bottom-6
            sm:right-6
            sm:h-16
            sm:w-16

            md:bottom-8
            md:right-8
          "
        />

        {/* TEXTO SUPERIOR */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.3,
          }}
          className="
            absolute
            top-10
            z-20
            w-full
            -translate-x-1/2
            px-16
            items-center

            sm:top-14
            md:top-16
          "
        >
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <span className="h-px w-8 bg-white/70 sm:w-14" />

            <p
              className="
                font-playfair
                text-[15px]
                text-center
                uppercase
                tracking-[0.45em]
                text-white
                

                sm:text-xs
              "
            >
              Nos casamos
            </p>

            <span className="h-px w-8 bg-white/70 sm:w-14" />
          </div>
        </motion.div>
        {/* FRASE SUPERIOR */}
<motion.p
  initial={{
    opacity: 0,
    y: -20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.8,
    delay: 0.55,
  }}
  className="
    absolute
    top-24
    z-30
    w-full
    -translate-x-1/2
    px-8
    items-center
    text-center
    font-playfair
    text-[17px]
    uppercase
    tracking-[0.35em]
    text-white
    drop-shadow-[0_3px_12px_rgba(0,0,0,0.75)]

    sm:top-28
    sm:text-xs
    sm:tracking-[0.4em]

    md:top-32
    md:px-12
    md:text-sm
  "
>
  El inicio de nuestro para siempre
</motion.p>

        {/* CONTENIDO PRINCIPAL */}
        <div
          className="
            relative
            z-20
            flex
            min-h-[100svh]
            w-full
            items-end
            justify-center
            px-8
            pb-16
            pt-28

            sm:px-12
            sm:pb-20

            md:justify-start
            md:px-20
            md:pb-20

            lg:px-28
            lg:pb-24
          "
        >
          <motion.div
            initial="oculto"
            animate="visible"
            variants={{
              oculto: {},
              visible: {
                transition: {
                  delayChildren: 0.55,
                  staggerChildren: 0.18,
                },
              },
            }}
            className="
              w-full
              max-w-5xl
              text-center

              md:text-left
            "
          >

            {/* NOMBRES */}
            <motion.div
              variants={{
                oculto: {
                  opacity: 0,
                  y: 28,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.9,
                  },
                },
              }}
            >
              <h1
                className="
                  font-cursiveDancing
                  text-[4.2rem]
                  leading-[0.85]
                  text-white
                  drop-shadow-[0_5px_18px_rgba(0,0,0,0.65)]

                  sm:text-[5.6rem]
                  md:text-[6.7rem]
                  lg:text-[8rem]
                  xl:text-[9rem]
                "
              >
                Sarai
              </h1>

              <div
                className="
                  my-2
                  flex
                  items-center
                  justify-center
                  gap-4

                  md:my-0
                  md:justify-start
                  md:pl-20
                "
              >
                <span
                  className="
                    hidden
                    h-px
                    w-16
                    bg-white/70

                    sm:block
                    md:w-24
                  "
                />

                <span
                  className="
                    font-cursiveDancing
                    text-4xl
                    leading-none
                    text-white

                    sm:text-5xl
                    md:text-6xl
                  "
                >
                  &
                </span>

                <span
                  className="
                    hidden
                    h-px
                    w-16
                    bg-white/70

                    sm:block
                    md:hidden
                  "
                />
              </div>

              <h1
                className="
                  font-cursiveDancing
                  text-[4.2rem]
                  leading-[0.85]
                  text-white
                  drop-shadow-[0_5px_18px_rgba(0,0,0,0.65)]

                  sm:text-[5.6rem]

                  md:pl-28
                  md:text-[6.7rem]

                  lg:pl-36
                  lg:text-[8rem]

                  xl:text-[9rem]
                "
              >
                Roberto
              </h1>
            </motion.div>

            {/* FECHA */}
            <motion.div
              variants={{
                oculto: {
                  opacity: 0,
                  y: 22,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                  },
                },
              }}
              className="
                mx-auto
                mt-8
                flex
                w-fit
                items-center
                gap-3

                sm:mt-10
                sm:gap-5

                md:mx-0
                md:ml-6
              "
            >
              <span className="h-px w-6 bg-white/65 sm:w-12" />

              <p
                className="
                  whitespace-nowrap
                  font-playfair
                  text-sm
                  uppercase
                  tracking-[0.18em]
                  text-white

                  sm:text-base
                  sm:tracking-[0.25em]

                  md:text-lg
                "
              >
                17 · Octubre · 2026
              </p>

              <span className="h-px w-6 bg-white/65 sm:w-12" />
            </motion.div>
          </motion.div>
        </div>

        {/* BOTÓN FLOTANTE DE MÚSICA */}
        <AnimatePresence>
          {!modalAbierto && (
            <motion.button
              type="button"
              onClick={alternarMusica}
              initial={{
                opacity: 0,
                scale: 0.7,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label={
                musicaActiva ? "Pausar música" : "Reproducir música"
              }
              title={musicaActiva ? "Pausar música" : "Reproducir música"}
              className="
                fixed
                bottom-5
                right-5
                z-50
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-[#EDD2C2]/70
                bg-[#1A1C29]/95
                text-[#F6F4F0]
                shadow-[0_12px_35px_rgba(26,28,41,0.38)]
                backdrop-blur-md
                transition-colors
                duration-300

                hover:bg-[#3A415F]

                sm:bottom-7
                sm:right-7
                sm:h-14
                sm:w-14
              "
            >
              {/* Ondas animadas */}
              {musicaActiva && (
                <span
                  className="
                    absolute
                    inset-0
                    animate-ping
                    rounded-full
                    border
                    border-[#D1A697]/60
                  "
                />
              )}

              <span className="relative z-10">
                {musicaActiva ? (
                  <Volume2 size={21} strokeWidth={1.7} />
                ) : (
                  <VolumeX size={21} strokeWidth={1.7} />
                )}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </section>

      {/* VENTANA EMERGENTE DE BIENVENIDA */}
      <AnimatePresence>
        {modalAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.45,
              },
            }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              overflow-y-auto
              bg-black/65
              px-5
              py-8
              backdrop-blur-md
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                w-full
                max-w-[430px]
                overflow-hidden
                rounded-[30px]
                border
                border-[#EDD2C2]
                bg-[#F6F4F0]
                px-6
                py-8
                text-center
                shadow-[0_30px_90px_rgba(0,0,0,0.4)]

                sm:px-10
                sm:py-10
              "
            >
              {/* Decoración superior */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-[#EDD2C2]/60
                  blur-2xl
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-20
                  -left-16
                  h-44
                  w-44
                  rounded-full
                  bg-[#3A415F]/10
                  blur-3xl
                "
              />

              <div className="relative z-10">
                {/* Ícono */}
                <motion.div
                  animate={{
                    rotate: musicaActiva ? 360 : 0,
                  }}
                  transition={{
                    duration: 8,
                    repeat: musicaActiva ? Infinity : 0,
                    ease: "linear",
                  }}
                  className="
                    mx-auto
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#D1A697]/65
                    bg-[#EDD2C2]/55
                    text-[#1A1C29]
                    shadow-sm
                  "
                >
                  <Music size={27} strokeWidth={1.5} />
                </motion.div>

                <p
                  className="
                    mb-3
                    font-playfair
                    text-[10px]
                    uppercase
                    tracking-[0.4em]
                    text-[#D1A697]
                  "
                >
                  Bienvenidos
                </p>

                <h2
                  className="
                    font-cursiveDancing
                    text-5xl
                    leading-none
                    text-[#1A1C29]

                    sm:text-[3.5rem]
                  "
                >
                  Sarai & Roberto
                </h2>

                <div className="mx-auto my-6 flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-[#D1A697]/75" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#D1A697]" />
                  <span className="h-px w-10 bg-[#D1A697]/75" />
                </div>

                <p
                  className="
                    mx-auto
                    max-w-[310px]
                    font-playfair
                    text-sm
                    leading-7
                    text-[#3A415F]

                    sm:text-[15px]
                  "
                >
                  Hemos preparado esta invitación con mucho cariño. 
                </p>
                <p
                  className="
                    mx-auto
                    max-w-[310px]
                    font-playfair
                    text-sm
                    leading-7
                    text-[#3A415F]

                    sm:text-[15px]
                  "
                >
                  Disfruta nuestra historia acompañada de música.
                </p>

                {/* BOTONES */}
                <div className="mt-8 flex flex-col gap-3">
                  <motion.button
                    type="button"
                    onClick={abrirConMusica}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[#1A1C29]
                      px-6
                      py-3.5
                      font-playfair
                      text-sm
                      tracking-[0.08em]
                      text-[#F6F4F0]
                      shadow-[0_12px_28px_rgba(26,28,41,0.22)]
                      transition-colors
                      duration-300

                      hover:bg-[#3A415F]
                    "
                  >
                    <Volume2 size={18} strokeWidth={1.7} />
                    Abrir con música
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={abrirSinMusica}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      border
                      border-[#D1A697]
                      bg-[#EDD2C2]/65
                      px-6
                      py-3.5
                      font-playfair
                      text-sm
                      tracking-[0.08em]
                      text-[#1A1C29]
                      transition-colors
                      duration-300

                      hover:bg-[#D1A697]
                      hover:text-white
                    "
                  >
                    <VolumeX size={18} strokeWidth={1.7} />
                    Continuar sin música
                  </motion.button>
                </div>

                {!audioListo && (
                  <p
                    className="
                      mt-4
                      font-playfair
                      text-[10px]
                      tracking-[0.08em]
                      text-[#3A415F]/65
                    "
                  >
                    Preparando la experiencia musical...
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}