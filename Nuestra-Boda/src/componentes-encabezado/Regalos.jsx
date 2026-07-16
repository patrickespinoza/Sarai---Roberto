import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Copy,
  CreditCard,
  Gift,
  Heart,
  Landmark,
  X,
} from "lucide-react";

const Regalos = ({
  banco = "Santander",
  cuenta = "014180606055021027",
  titular = "Roberto mejia",
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const copiarCuenta = async () => {
    try {
      await navigator.clipboard.writeText(cuenta);
      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 2200);
    } catch (error) {
      console.error("No fue posible copiar el número de cuenta:", error);
    }
  };

  useEffect(() => {
    const cerrarConEscape = (event) => {
      if (event.key === "Escape") {
        setMostrarModal(false);
      }
    };

    if (mostrarModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", cerrarConEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [mostrarModal]);

  const animacionEntrada = {
    oculto: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <section
        className="
          relative
          w-full
          overflow-hidden
          bg-[#EDD2C2]
          px-5
          py-20

          sm:px-8
          sm:py-24

          lg:px-12
          lg:py-28
        "
      >
        {/* Resplandor superior */}
        <div
          className="
            pointer-events-none
            absolute
            -left-24
            -top-28
            h-80
            w-80
            rounded-full
            bg-[#F6F4F0]/80
            blur-[90px]

            sm:h-96
            sm:w-96
          "
        />

        {/* Resplandor inferior */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-36
            -right-28
            h-96
            w-96
            rounded-full
            bg-[#3A415F]/20
            blur-[110px]

            sm:h-[470px]
            sm:w-[470px]
          "
        />

        {/* Línea decorativa superior */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-16
            w-px
            -translate-x-1/2
            bg-gradient-to-b
            from-[#1A1C29]
            to-transparent

            sm:h-20
          "
        />

        <motion.div
          initial="oculto"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          variants={{
            oculto: {},
            visible: {
              transition: {
                staggerChildren: 0.14,
              },
            },
          }}
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
          "
        >
          {/* ENCABEZADO */}
          <motion.div
            variants={animacionEntrada}
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
                  text-[#3A415F]

                  sm:text-xs
                "
              >
                Con cariño
              </p>

              <span className="h-px w-10 bg-[#D1A697] sm:w-16" />
            </div>

            <h2
              className="
                font-cursiveDancing
                text-6xl
                leading-none
                text-[#1A1C29]

                sm:text-7xl
                md:text-8xl
              "
            >
              Regalos
            </h2>

            <p
              className="
                mx-auto
                mt-6
                max-w-xl
                font-playfair
                text-sm
                leading-7
                text-[#3A415F]/85

                sm:text-base
              "
            >
              Su presencia será siempre nuestro mejor regalo.
            </p>
          </motion.div>

          {/* CONTENIDO PRINCIPAL */}
          <motion.div
            variants={animacionEntrada}
            className="
              relative
              grid
              overflow-hidden
              rounded-[34px]
              border
              border-[#D1A697]/45
              bg-[#F6F4F0]
              shadow-[0_30px_85px_rgba(26,28,41,0.16)]

              lg:grid-cols-[1fr_0.85fr]
              lg:rounded-[44px]
            "
          >
            {/* COLUMNA DE TEXTO */}
            <div
              className="
                relative
                flex
                flex-col
                justify-center
                px-7
                py-12
                text-center

                sm:px-12
                sm:py-16

                lg:min-h-[620px]
                lg:px-16
                lg:text-left

                xl:px-20
              "
            >
              {/* Acento lateral */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-20
                  h-32
                  w-1
                  rounded-r-full
                  bg-[#D1A697]

                  sm:h-40
                "
              />

              <motion.div
                variants={animacionEntrada}
                className="
                  mx-auto
                  mb-8
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D1A697]/55
                  bg-[#EDD2C2]/50
                  text-[#1A1C29]

                  lg:mx-0
                "
              >
                <Gift size={28} strokeWidth={1.45} />
              </motion.div>

              <motion.p
                variants={animacionEntrada}
                className="
                  font-playfair
                  text-[10px]
                  uppercase
                  tracking-[0.38em]
                  text-[#D1A697]

                  sm:text-xs
                "
              >
                El mejor obsequio
              </motion.p>

              <motion.h3
                variants={animacionEntrada}
                className="
                  mt-4
                  font-playfair
                  text-3xl
                  leading-tight
                  text-[#1A1C29]

                  sm:text-4xl
                  md:text-5xl
                "
              >
                Compartir este día con ustedes
              </motion.h3>

              <motion.div
                variants={animacionEntrada}
                className="
                  mx-auto
                  my-8
                  flex
                  items-center
                  justify-center
                  gap-3

                  lg:mx-0
                  lg:justify-start
                "
              >
                <span className="h-px w-12 bg-[#D1A697]" />

                <Heart
                  size={15}
                  strokeWidth={1.5}
                  className="text-[#D1A697]"
                />

                <span className="h-px w-12 bg-[#D1A697]" />
              </motion.div>

              <motion.p
                variants={animacionEntrada}
                className="
                  mx-auto
                  max-w-xl
                  font-playfair
                  text-base
                  leading-8
                  text-[#3A415F]

                  sm:text-lg

                  lg:mx-0
                "
              >
                El mejor regalo será contar con su presencia y celebrar juntos
                este momento tan especial.
              </motion.p>

              <motion.p
                variants={animacionEntrada}
                className="
                  mx-auto
                  mt-5
                  max-w-xl
                  font-playfair
                  text-sm
                  italic
                  leading-7
                  text-[#3A415F]/75

                  sm:text-base

                  lg:mx-0
                "
              >
                Para quienes deseen tener un detalle adicional con nosotros,
                hemos preparado una opción de transferencia bancaria.
              </motion.p>

              <motion.button
                type="button"
                variants={animacionEntrada}
                onClick={() => setMostrarModal(true)}
                whileHover={{
                  scale: 1.025,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  mx-auto
                  mt-9
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#1A1C29]
                  px-8
                  py-4
                  font-playfair
                  text-sm
                  tracking-[0.08em]
                  text-[#F6F4F0]
                  shadow-[0_15px_35px_rgba(26,28,41,0.22)]
                  transition-colors
                  duration-300

                  hover:bg-[#3A415F]

                  sm:w-fit
                  sm:text-base

                  lg:mx-0
                "
              >
                <CreditCard size={19} strokeWidth={1.6} />
                Ver datos bancarios
              </motion.button>
            </div>

            {/* COLUMNA VISUAL */}
            <div
              className="
                relative
                flex
                min-h-[440px]
                items-center
                justify-center
                overflow-hidden
                bg-[#1A1C29]
                px-6
                py-14

                sm:min-h-[500px]
                sm:px-10

                lg:min-h-[620px]
              "
            >
              {/* Resplandores */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-72
                  w-72
                  rounded-full
                  bg-[#D1A697]/20
                  blur-[90px]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-28
                  -left-24
                  h-80
                  w-80
                  rounded-full
                  bg-[#3A415F]/75
                  blur-[100px]
                "
              />

              {/* Marco interior */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-5
                  rounded-[28px]
                  border
                  border-[#EDD2C2]/20

                  sm:inset-7
                  sm:rounded-[34px]
                "
              />

              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                  rotate: -2,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  z-10
                  w-full
                  max-w-[360px]
                "
              >
                {/* Tarjeta posterior */}
                <div
                  className="
                    absolute
                    -bottom-4
                    -right-4
                    h-full
                    w-full
                    rounded-[28px]
                    border
                    border-[#D1A697]/40
                    bg-[#3A415F]

                    sm:-bottom-6
                    sm:-right-6
                  "
                />

                {/* Tarjeta bancaria decorativa */}
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-[#EDD2C2]/25
                    bg-gradient-to-br
                    from-[#F6F4F0]
                    via-[#EDD2C2]
                    to-[#D1A697]
                    px-6
                    py-7
                    shadow-[0_28px_70px_rgba(0,0,0,0.3)]

                    sm:px-8
                    sm:py-9
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-16
                      -top-16
                      h-40
                      w-40
                      rounded-full
                      border
                      border-white/45
                    "
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-8
                      -top-8
                      h-28
                      w-28
                      rounded-full
                      border
                      border-white/35
                    "
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className="
                            font-playfair
                            text-[9px]
                            uppercase
                            tracking-[0.3em]
                            text-[#3A415F]/65
                          "
                        >
                          Detalle especial
                        </p>

                        <p
                          className="
                            mt-2
                            font-playfair
                            text-2xl
                            text-[#1A1C29]

                            sm:text-3xl
                          "
                        >
                          Para los novios
                        </p>
                      </div>

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#1A1C29]
                          text-[#F6F4F0]
                        "
                      >
                        <Gift size={20} strokeWidth={1.5} />
                      </div>
                    </div>

                    <div
                      className="
                        mt-12
                        h-9
                        w-12
                        rounded-md
                        bg-gradient-to-br
                        from-[#F6F4F0]
                        to-[#D1A697]
                        shadow-inner
                      "
                    />

                    <div className="mt-9 flex items-end justify-between gap-4">
                      <div>
                        <p
                          className="
                            font-playfair
                            text-[9px]
                            uppercase
                            tracking-[0.25em]
                            text-[#3A415F]/60
                          "
                        >
                          Con amor
                        </p>

                        <p
                          className="
                            mt-2
                            font-cursiveDancing
                            text-3xl
                            text-[#1A1C29]

                            sm:text-4xl
                          "
                        >
                          Sarai & Roberto
                        </p>
                      </div>

                      <Heart
                        size={25}
                        strokeWidth={1.35}
                        className="text-[#1A1C29]/75"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Línea inferior */}
        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-16
            w-px
            -translate-x-1/2
            bg-gradient-to-t
            from-[#1A1C29]
            to-transparent

            sm:h-20
          "
        />
      </section>

      {/* MODAL DE DATOS BANCARIOS */}
      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.35,
              },
            }}
            onClick={() => setMostrarModal(false)}
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              overflow-y-auto
              bg-black/70
              px-5
              py-8
              backdrop-blur-md
            "
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-datos-bancarios"
              onClick={(event) => event.stopPropagation()}
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 35,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 25,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                w-full
                max-w-[440px]
                overflow-hidden
                rounded-[30px]
                border
                border-[#D1A697]/40
                bg-[#F6F4F0]
                p-6
                shadow-[0_35px_100px_rgba(0,0,0,0.45)]

                sm:p-8
              "
            >
              {/* Decoración */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-52
                  w-52
                  rounded-full
                  bg-[#EDD2C2]/70
                  blur-[60px]
                "
              />

              <button
                type="button"
                onClick={() => setMostrarModal(false)}
                aria-label="Cerrar datos bancarios"
                className="
                  absolute
                  right-4
                  top-4
                  z-20
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D1A697]/40
                  bg-[#F6F4F0]/85
                  text-[#1A1C29]
                  backdrop-blur-sm
                  transition-colors
                  duration-300

                  hover:bg-[#EDD2C2]
                "
              >
                <X size={19} strokeWidth={1.6} />
              </button>

              <div className="relative z-10">
                <div
                  className="
                    mb-6
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-[#1A1C29]
                    text-[#F6F4F0]
                  "
                >
                  <Landmark size={23} strokeWidth={1.5} />
                </div>

                <p
                  className="
                    font-playfair
                    text-[10px]
                    uppercase
                    tracking-[0.35em]
                    text-[#D1A697]
                  "
                >
                  Transferencia bancaria
                </p>

                <h3
                  id="titulo-datos-bancarios"
                  className="
                    mt-3
                    font-playfair
                    text-3xl
                    text-[#1A1C29]

                    sm:text-4xl
                  "
                >
                  {banco}
                </h3>

                {/* TARJETA DE DATOS */}
                <div
                  className="
                    relative
                    mt-7
                    overflow-hidden
                    rounded-[26px]
                    bg-[#1A1C29]
                    px-6
                    py-7
                    text-[#F6F4F0]
                    shadow-[0_20px_50px_rgba(26,28,41,0.24)]
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-48
                      w-48
                      rounded-full
                      bg-[#D1A697]/18
                      blur-[60px]
                    "
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <p
                        className="
                          font-playfair
                          text-[9px]
                          uppercase
                          tracking-[0.3em]
                          text-[#EDD2C2]/75
                        "
                      >
                        Cuenta bancaria
                      </p>

                      <CreditCard
                        size={23}
                        strokeWidth={1.5}
                        className="text-[#D1A697]"
                      />
                    </div>

                    <div
                      className="
                        mt-7
                        h-8
                        w-11
                        rounded-md
                        bg-[#D1A697]
                      "
                    />

                    <p
                      className="
                        mt-7
                        break-all
                        font-playfair
                        text-lg
                        tracking-[0.12em]

                        sm:text-xl
                      "
                    >
                      {cuenta}
                    </p>

                    <div
                      className="
                        mt-7
                        border-t
                        border-[#F6F4F0]/15
                        pt-5
                      "
                    >
                      <p
                        className="
                          font-playfair
                          text-[9px]
                          uppercase
                          tracking-[0.28em]
                          text-[#EDD2C2]/65
                        "
                      >
                        Titular
                      </p>

                      <p className="mt-2 font-playfair text-lg">
                        {titular}
                      </p>
                    </div>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={copiarCuenta}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    mt-6
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[#1A1C29]
                    px-6
                    py-4
                    font-playfair
                    text-sm
                    tracking-[0.08em]
                    text-[#F6F4F0]
                    transition-colors
                    duration-300

                    hover:bg-[#3A415F]

                    sm:text-base
                  "
                >
                  <Copy size={18} strokeWidth={1.6} />
                  Copiar número de cuenta
                </motion.button>

                <AnimatePresence>
                  {copiado && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                      }}
                      className="
                        mt-4
                        rounded-full
                        border
                        border-[#D1A697]/40
                        bg-[#EDD2C2]/55
                        px-4
                        py-3
                        text-center
                      "
                    >
                      <p
                        className="
                          font-playfair
                          text-sm
                          text-[#1A1C29]
                        "
                      >
                        Número copiado correctamente
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p
                  className="
                    mt-6
                    text-center
                    font-playfair
                    text-xs
                    italic
                    leading-6
                    text-[#3A415F]/70
                  "
                >
                  Gracias por formar parte de este momento tan especial.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Regalos;