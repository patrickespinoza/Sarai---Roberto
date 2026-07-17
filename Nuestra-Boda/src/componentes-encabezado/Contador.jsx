import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Contador = ({
  titulo = "¡Falta Poco!",
  texto = "Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto.",
  frase = "ECLESIASTÉS 4:12",
  fecha = "2026-10-17T00:00:00",
}) => {
  const calcularTiempo = () => {
    const diferencia = new Date(fecha).getTime() - new Date().getTime();

    if (diferencia > 0) {
      return {
        Días: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
        Horas: Math.floor(
          (diferencia / (1000 * 60 * 60)) % 24
        ),
        Minutos: Math.floor(
          (diferencia / (1000 * 60)) % 60
        ),
        Segundos: Math.floor(
          (diferencia / 1000) % 60
        ),
      };
    }

    return {
      Días: 0,
      Horas: 0,
      Minutos: 0,
      Segundos: 0,
    };
  };

  const [tiempoRestante, setTiempoRestante] = useState(calcularTiempo());

  useEffect(() => {
    const temporizador = setInterval(() => {
      setTiempoRestante(calcularTiempo());
    }, 1000);

    return () => clearInterval(temporizador);
  }, [fecha]);

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
    <section
      className="
        relative
        overflow-hidden
        bg-[#F6F4F0]
        px-5
        py-20

        sm:px-8
        sm:py-24

        lg:px-12
        lg:py-28
      "
    >
      {/* Decoración superior */}
      <div
        className="
          pointer-events-none
          absolute
          -left-28
          -top-28
          h-72
          w-72
          rounded-full
          bg-[#EDD2C2]/70
          blur-[80px]

          sm:h-96
          sm:w-96
        "
      />

      {/* Decoración inferior */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-36
          -right-28
          h-80
          w-80
          rounded-full
          bg-[#3A415F]/15
          blur-[100px]

          sm:h-[430px]
          sm:w-[430px]
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
          from-[#D1A697]
          to-transparent

          sm:h-20
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-7xl
          items-stretch
          gap-8

          lg:grid-cols-[0.9fr_1.2fr]
          lg:gap-10
        "
      >
        {/* COLUMNA DE FRASE */}
        <motion.div
          initial="oculto"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          variants={animacionEntrada}
          className="
            relative
            flex
            min-h-[440px]
            flex-col
            justify-between
            overflow-hidden
            rounded-[32px]
            bg-[#1A1C29]
            px-7
            py-10
            text-center
            shadow-[0_25px_70px_rgba(26,28,41,0.2)]

            sm:min-h-[480px]
            sm:px-11
            sm:py-12

            lg:min-h-[610px]
            lg:rounded-[40px]
            lg:px-12
            lg:py-14
            lg:text-left
          "
        >
          {/* Resplandor superior */}
          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-[#D1A697]/15
              blur-[80px]
            "
          />

          {/* Resplandor inferior */}
          <div
            className="
              pointer-events-none
              absolute
              -bottom-28
              -left-24
              h-72
              w-72
              rounded-full
              bg-[#3A415F]/50
              blur-[90px]
            "
          />

          {/* Marco interior */}
          <div
            className="
              pointer-events-none
              absolute
              inset-4
              rounded-[24px]
              border
              border-[#EDD2C2]/20

              sm:inset-5
              sm:rounded-[28px]

              lg:rounded-[32px]
            "
          />

          <div className="relative z-10">


            <span
              className="
                block
                font-playfair
                text-7xl
                leading-none
                text-center
                text-[#D1A697]/50

                sm:text-8xl
              "
            >
              “
            </span>

            <p
              className="
                -mt-5
                font-playfair
                text-xl
                leading-relaxed
                text-[#F6F4F0]

                sm:text-2xl
                sm:leading-relaxed

                lg:text-[1.7rem]
                lg:leading-[1.65]
              "
            >
              {texto}
            </p>
          </div>

          <span
              className="
                block
                font-playfair
                text-7xl
                text-center
                leading-none
                text-[#D1A697]/50

                sm:text-8xl
              "
            >
              “
            </span>

          <div className="relative z-10 mt-10">
            <div
              className="
                mx-auto
                mb-5
                h-px
                w-20
                bg-[#D1A697]

                lg:mx-0
              "
            />

            <p
              className="
                font-playfair
                text-xs
                uppercase
                tracking-[0.32em]
                text-[#EDD2C2]

                sm:text-sm
              "
            >
              {frase}
            </p>
          </div>
        </motion.div>

        {/* COLUMNA DEL CONTADOR */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            flex
            flex-col
            justify-center
            overflow-hidden
            rounded-[32px]
            border
            border-[#D1A697]/35
            bg-[#EDD2C2]/55
            px-5
            py-12
            shadow-[0_25px_60px_rgba(58,65,95,0.1)]
            backdrop-blur-sm

            sm:px-10
            sm:py-14

            lg:min-h-[610px]
            lg:rounded-[40px]
            lg:px-12
            lg:py-16
          "
        >
          {/* Fondo decorativo */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-60
              [background-image:radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.85),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(209,166,151,0.3),transparent_38%)]
            "
          />

          <div className="relative z-10">
            <div className="text-center">
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
                Cuenta regresiva
              </p>

              <h2
                className="
                  mt-4
                  font-cursiveDancing
                  text-5xl
                  leading-none
                  text-[#1A1C29]

                  sm:text-6xl
                  md:text-7xl
                "
              >
                {titulo}
              </h2>

              <div className="mx-auto mt-7 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-[#D1A697]" />

                <span
                  className="
                    h-2
                    w-2
                    rotate-45
                    border
                    border-[#D1A697]
                  "
                />

                <span className="h-px w-12 bg-[#D1A697]" />
              </div>
            </div>

            {/* CONTADOR */}
            <div
              className="
                mt-10
                grid
                grid-cols-2
                gap-3

                sm:mt-12
                sm:gap-4

                md:grid-cols-4
              "
            >
              {Object.entries(tiempoRestante).map(
                ([etiqueta, valor], index) => (
                  <motion.div
                    key={etiqueta}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.65,
                      delay: 0.15 + index * 0.1,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-[#D1A697]/40
                      bg-[#F6F4F0]/90
                      px-3
                      py-6
                      text-center
                      shadow-[0_12px_30px_rgba(58,65,95,0.08)]
                      transition-shadow
                      duration-300

                      hover:shadow-[0_18px_35px_rgba(58,65,95,0.16)]

                      sm:rounded-[26px]
                      sm:py-8
                    "
                  >
                    {/* Línea superior */}
                    <span
                      className="
                        absolute
                        left-1/2
                        top-0
                        h-[3px]
                        w-10
                        -translate-x-1/2
                        rounded-b-full
                        bg-[#D1A697]
                        transition-all
                        duration-300

                        group-hover:w-16
                      "
                    />

                    <motion.p
                      key={valor}
                      initial={{
                        opacity: 0.4,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="
                        font-playfair
                        text-4xl
                        leading-none
                        text-[#1A1C29]

                        sm:text-5xl

                        md:text-[2.7rem]

                        xl:text-5xl
                      "
                    >
                      {String(valor).padStart(2, "0")}
                    </motion.p>

                    <div
                      className="
                        mx-auto
                        my-4
                        h-px
                        w-8
                        bg-[#D1A697]/65
                      "
                    />

                    <span
                      className="
                        block
                        font-playfair
                        text-[9px]
                        uppercase
                        tracking-[0.19em]
                        text-[#3A415F]

                        sm:text-[10px]
                      "
                    >
                      {etiqueta}
                    </span>
                  </motion.div>
                )
              )}
            </div>

            <p
              className="
                mx-auto
                mt-9
                max-w-md
                text-center
                font-playfair
                text-sm
                italic
                leading-7
                text-[#3A415F]/85

                sm:mt-10
                sm:text-base
              "
            >
              Cada día nos acerca un poco más al momento de compartir esta
              historia con ustedes.
            </p>
          </div>
        </motion.div>
      </div>

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
          from-[#D1A697]
          to-transparent

          sm:h-20
        "
      />
    </section>
  );
};

export default Contador;