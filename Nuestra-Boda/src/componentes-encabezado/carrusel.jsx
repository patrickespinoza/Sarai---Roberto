import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = () => {
  /*
    La propiedad "position" permite acomodar cada fotografía
    individualmente para evitar que las caras queden cortadas.

    Ejemplos:
    "center center" = centrada
    "center 30%" = muestra más la parte superior
    "center 70%" = muestra más la parte inferior
    "40% center" = mueve el enfoque hacia la izquierda
    "65% center" = mueve el enfoque hacia la derecha
  */
  const images = [
    {
      src: "/Carrusel01.png",
      alt: "Sarai y Roberto",
      position: "center 20%",
    },
    {
      src: "/Carrusel02.png",
      alt: "Sarai y Roberto",
      position: "center 20%",
    },
    {
      src: "/Carrusel03.png",
      alt: "Retrato de Sarai y Roberto",
      position: "center 25%",
    },
    {
      src: "/Carrusel04.png",
      alt: "Sarai y Roberto juntos",
      position: "center 35%",
    },
    {
      src: "/Carrusel05.png",
      alt: "Momentos de Sarai y Roberto",
      position: "center 30%",
    },
    {
      src: "/Carrusel06.png",
      alt: "Momentos de Sarai y Roberto",
      position: " center",
    },
  ];

  const [index, setIndex] = useState(0);
  const [direccion, setDireccion] = useState(1);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado) return undefined;

    const interval = setInterval(() => {
      setDireccion(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [images.length, pausado]);

  const nextImage = () => {
    setDireccion(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDireccion(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (nuevoIndex) => {
    setDireccion(nuevoIndex > index ? 1 : -1);
    setIndex(nuevoIndex);
  };

  const variantesImagen = {
    entrada: (direccionAnimacion) => ({
      opacity: 0,
      x: direccionAnimacion > 0 ? 45 : -45,
      scale: 1.03,
    }),

    centro: {
      opacity: 1,
      x: 0,
      scale: 1,
    },

    salida: (direccionAnimacion) => ({
      opacity: 0,
      x: direccionAnimacion > 0 ? -45 : 45,
      scale: 1.02,
    }),
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#1A1C29]
        px-5
        py-20

        sm:px-8
        sm:py-24

        lg:px-12
        lg:py-28
      "
    >
      {/* Resplandor nude superior */}
      <div
        className="
          pointer-events-none
          absolute
          -left-28
          -top-32
          h-80
          w-80
          rounded-full
          bg-[#D1A697]/20
          blur-[100px]

          sm:h-[430px]
          sm:w-[430px]
        "
      />

      {/* Resplandor azul inferior */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-28
          h-96
          w-96
          rounded-full
          bg-[#3A415F]/60
          blur-[120px]

          sm:h-[500px]
          sm:w-[500px]
        "
      />

      {/* Líneas decorativas de fondo */}
      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-20
          h-[60%]
          w-px
          bg-gradient-to-b
          from-transparent
          via-[#D1A697]/25
          to-transparent

          sm:left-12
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-20
          right-6
          h-[60%]
          w-px
          bg-gradient-to-b
          from-transparent
          via-[#D1A697]/25
          to-transparent

          sm:right-12
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
        "
      >
        {/* ENCABEZADO */}
        <div
          className="
            mx-auto
            mb-12
            max-w-3xl
            text-center

            sm:mb-16
          "
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#D1A697] sm:w-16" />

            <p
              className="
                font-playfair
                text-[10px]
                uppercase
                tracking-[0.42em]
                text-[#EDD2C2]

                sm:text-xs
              "
            >
              Nuestra historia
            </p>

            <span className="h-px w-10 bg-[#D1A697] sm:w-16" />
          </div>

          <h2
            className="
              font-cursiveDancing
              text-6xl
              leading-none
              text-[#F6F4F0]

              sm:text-7xl
              md:text-8xl
            "
          >
            Nuestros Momentos
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              font-playfair
              text-sm
              leading-7
              text-[#F6F4F0]/65

              sm:text-base
            "
          >
            Cada fotografía guarda un instante especial de nuestra historia.
          </p>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <div
          className="
            relative
            mx-auto
            max-w-6xl

            lg:px-14
          "
        >
          {/* Marco posterior desplazado */}
          <div
            className="
              pointer-events-none
              absolute
              -bottom-4
              left-4
              right-4
              top-4
              rounded-[30px]
              border
              border-[#D1A697]/35

              sm:-bottom-6
              sm:left-6
              sm:right-6
              sm:top-6
              sm:rounded-[40px]

              lg:left-20
              lg:right-8
            "
          />

          {/* TARJETA DE LA GALERÍA */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-[#EDD2C2]/25
              bg-[#F6F4F0]
              shadow-[0_35px_100px_rgba(0,0,0,0.35)]

              sm:rounded-[40px]
            "
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
          >
            {/* Contenedor fijo de la imagen */}
            <div
              className="
                relative
                h-[500px]
                w-full
                overflow-hidden
                bg-[#EDD2C2]

                sm:h-[650px]

                md:h-[720px]

                lg:h-[760px]
              "
            >
              <AnimatePresence
                mode="popLayout"
                initial={false}
                custom={direccion}
              >
                <motion.img
                  key={index}
                  custom={direccion}
                  variants={variantesImagen}
                  initial="entrada"
                  animate="centro"
                  exit="salida"
                  transition={{
                    opacity: {
                      duration: 0.5,
                    },
                    x: {
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    scale: {
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  src={images[index].src}
                  alt={images[index].alt}
                  style={{
                    objectPosition: images[index].position,
                  }}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                />
              </AnimatePresence>

              {/* Degradado superior neutral */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-0
                  z-10
                  h-36
                  bg-gradient-to-b
                  from-black/30
                  to-transparent
                "
              />

              {/* Degradado inferior neutral */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-10
                  h-52
                  bg-gradient-to-t
                  from-black/70
                  via-black/25
                  to-transparent
                "
              />

              {/* Número de fotografía */}
              <div
                className="
                  absolute
                  left-5
                  top-5
                  z-20
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/25
                  bg-black/15
                  px-4
                  py-2
                  text-white
                  backdrop-blur-md

                  sm:left-7
                  sm:top-7
                "
              >
                <span
                  className="
                    font-playfair
                    text-xs
                    tracking-[0.2em]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="h-3 w-px bg-white/50" />

                <span
                  className="
                    font-playfair
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-white/75
                  "
                >
                  {String(images.length).padStart(2, "0")}
                </span>
              </div>

              {/* Texto inferior */}
              <div
                className="
                  absolute
                  bottom-20
                  left-1/2
                  z-20
                  w-full
                  max-w-xl
                  -translate-x-1/2
                  px-8
                  text-center

                  sm:bottom-24
                "
              >
                <motion.p
                  key={`texto-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.25,
                  }}
                  className="
                    font-cursiveDancing
                    text-4xl
                    leading-none
                    text-white
                    drop-shadow-lg

                    sm:text-5xl
                  "
                >
                  Sarai & Roberto
                </motion.p>

                <motion.p
                  key={`detalle-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                  }}
                  className="
                    mt-3
                    font-playfair
                    text-[9px]
                    uppercase
                    tracking-[0.35em]
                    text-white/75

                    sm:text-[10px]
                  "
                >
                  Un recuerdo para siempre
                </motion.p>
              </div>


              {/* INDICADORES */}
              <div
                className="
                  absolute
                  bottom-7
                  left-1/2
                  z-30
                  flex
                  -translate-x-1/2
                  items-center
                  gap-2

                  sm:bottom-9
                  sm:gap-3
                "
              >
                {images.map((imagen, i) => (
                  <button
                    key={imagen.src}
                    type="button"
                    onClick={() => goToImage(i)}
                    aria-label={`Mostrar fotografía ${i + 1}`}
                    className="
                      flex
                      h-6
                      items-center
                      justify-center
                    "
                  >
                    <motion.span
                      animate={{
                        width: index === i ? 34 : 8,
                        backgroundColor:
                          index === i ? "#EDD2C2" : "rgba(246,244,240,0.45)",
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="
                        block
                        h-1.5
                        rounded-full
                      "
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

              {/* BOTÓN IZQUIERDO */}
              <motion.button
                type="button"
                onClick={prevImage}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Mostrar imagen anterior"
                className="
                  absolute
                  left-3
                  top-1/2
                  z-30
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#EDD2C2]/50
                  bg-[#1A1C29]/85
                  text-[#F6F4F0]
                  shadow-lg
                  backdrop-blur-md
                  transition-colors
                  duration-300

                  hover:bg-[#3A415F]

                  sm:left-6
                  sm:h-13
                  sm:w-13
                "
              >
                <FaChevronLeft size={16} />
              </motion.button>

              {/* BOTÓN DERECHO */}
              <motion.button
                type="button"
                onClick={nextImage}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Mostrar imagen siguiente"
                className="
                  absolute
                  right-3
                  top-1/2
                  z-30
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#EDD2C2]/50
                  bg-[#1A1C29]/85
                  text-[#F6F4F0]
                  shadow-lg
                  backdrop-blur-md
                  transition-colors
                  duration-300

                  hover:bg-[#3A415F]

                  sm:right-6
                  sm:h-13
                  sm:w-13
                "
              >
                <FaChevronRight size={16} />
              </motion.button>
        {/* Leyenda inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          viewport={{ once: true }}
          className="
            mx-auto
            mt-12
            flex
            max-w-xl
            items-center
            justify-center
            gap-4
            text-center

            sm:mt-16
          "
        >
          <span className="h-px flex-1 bg-[#D1A697]/40" />

          <p
            className="
              font-playfair
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-[#EDD2C2]/75

              sm:text-[10px]
            "
          >
            Nuestra historia en imágenes
          </p>

          <span className="h-px flex-1 bg-[#D1A697]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Carousel;