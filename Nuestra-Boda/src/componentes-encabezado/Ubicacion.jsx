import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
} from "lucide-react";

const Celebracion = ({
  titulo = "Celebración",
  fecha = "17 Octubre 2026",
  hora = "1:00 PM",
  lugar = "Bella Vista Salón y Eventos",
  direccion = "Paraje el Charco, Santo Tomás Ajusco, Tlalpan, 14710 El Charco, CDMX",
  ubicacion = "https://maps.app.goo.gl/Cs8wpvmTr8tY9ZR56",
}) => {
  const animacionTexto = {
    oculto: {
      opacity: 0,
      y: 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
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
      {/* Decoración superior izquierda */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-[#F6F4F0]/80
          blur-[80px]

          sm:h-96
          sm:w-96
        "
      />

      {/* Decoración inferior derecha */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -right-28
          h-80
          w-80
          rounded-full
          bg-[#3A415F]/20
          blur-[100px]

          sm:h-[430px]
          sm:w-[430px]
        "
      />

      {/* Línea vertical decorativa */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-14
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
              staggerChildren: 0.15,
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
          variants={animacionTexto}
          className="
            mx-auto
            mb-10
            max-w-3xl
            text-center

            sm:mb-14
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
              El gran día
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
            {titulo}
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              font-playfair
              text-sm
              leading-7
              text-[#3A415F]/85

              sm:text-base
            "
          >
            Nos hará muy felices compartir con ustedes este momento tan
            importante en nuestra historia.
          </p>
        </motion.div>

        {/* TARJETA PRINCIPAL */}
        <motion.div
          variants={animacionTexto}
          className="
            relative
            grid
            overflow-hidden
            rounded-[34px]
            border
            border-[#D1A697]/45
            bg-[#F6F4F0]
            shadow-[0_30px_80px_rgba(26,28,41,0.16)]

            lg:grid-cols-[1.25fr_0.75fr]
            lg:rounded-[44px]
          "
        >
          {/* COLUMNA DE INFORMACIÓN */}
          <div
            className="
              relative
              flex
              flex-col
              justify-center
              px-6
              py-12

              sm:px-10
              sm:py-14

              md:px-14

              lg:min-h-[620px]
              lg:px-16
              lg:py-16

              xl:px-20
            "
          >
            {/* Marca decorativa */}
            <div
              className="
                pointer-events-none
                absolute
                left-0
                top-16
                h-28
                w-1
                rounded-r-full
                bg-[#D1A697]

                sm:h-36
              "
            />

            <motion.div variants={animacionTexto}>
              <p
                className="
                  font-playfair
                  text-[10px]
                  uppercase
                  tracking-[0.38em]
                  text-[#D1A697]

                  sm:text-xs
                "
              >
                Los esperamos en
              </p>

              <h3
                className="
                  mt-4
                  max-w-xl
                  font-playfair
                  text-3xl
                  leading-tight
                  text-[#1A1C29]

                  sm:text-4xl
                  md:text-5xl
                "
              >
                {lugar}
              </h3>
            </motion.div>

            {/* DATOS DEL EVENTO */}
            <div
              className="
                mt-10
                grid
                gap-4

                sm:grid-cols-2
                sm:gap-5
              "
            >
              {/* Fecha */}
              <motion.div
                variants={animacionTexto}
                whileHover={{
                  y: -4,
                }}
                className="
                  group
                  rounded-[24px]
                  border
                  border-[#EDD2C2]
                  bg-[#EDD2C2]/35
                  px-5
                  py-6
                  transition
                  duration-300

                  hover:bg-[#EDD2C2]/55
                "
              >
                <div
                  className="
                    mb-5
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#1A1C29]
                    text-[#F6F4F0]
                    transition-transform
                    duration-300

                    group-hover:scale-105
                  "
                >
                  <CalendarDays size={20} strokeWidth={1.6} />
                </div>

                <p
                  className="
                    font-playfair
                    text-[10px]
                    uppercase
                    tracking-[0.28em]
                    text-[#3A415F]/70
                  "
                >
                  Fecha
                </p>

                <p
                  className="
                    mt-2
                    font-playfair
                    text-xl
                    text-[#1A1C29]

                    sm:text-2xl
                  "
                >
                  {fecha}
                </p>
              </motion.div>

              {/* Hora */}
              <motion.div
                variants={animacionTexto}
                whileHover={{
                  y: -4,
                }}
                className="
                  group
                  rounded-[24px]
                  border
                  border-[#EDD2C2]
                  bg-[#EDD2C2]/35
                  px-5
                  py-6
                  transition
                  duration-300

                  hover:bg-[#EDD2C2]/55
                "
              >
                <div
                  className="
                    mb-5
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#1A1C29]
                    text-[#F6F4F0]
                    transition-transform
                    duration-300

                    group-hover:scale-105
                  "
                >
                  <Clock3 size={20} strokeWidth={1.6} />
                </div>

                <p
                  className="
                    font-playfair
                    text-[10px]
                    uppercase
                    tracking-[0.28em]
                    text-[#3A415F]/70
                  "
                >
                  Hora
                </p>

                <p
                  className="
                    mt-2
                    font-playfair
                    text-xl
                    text-[#1A1C29]

                    sm:text-2xl
                  "
                >
                  {hora}
                </p>
              </motion.div>
            </div>

            {/* DIRECCIÓN */}
            <motion.div
              variants={animacionTexto}
              className="
                mt-8
                flex
                items-start
                gap-4
                border-t
                border-[#D1A697]/35
                pt-8
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D1A697]
                  text-[#D1A697]
                "
              >
                <MapPin size={20} strokeWidth={1.6} />
              </div>

              <div>
                <p
                  className="
                    font-playfair
                    text-[10px]
                    uppercase
                    tracking-[0.28em]
                    text-[#3A415F]/70
                  "
                >
                  Dirección
                </p>

                <p
                  className="
                    mt-2
                    max-w-xl
                    font-playfair
                    text-sm
                    leading-7
                    text-[#3A415F]

                    sm:text-base
                  "
                >
                  {direccion}
                </p>
              </div>
            </motion.div>

            {/* BOTÓN */}
            <motion.a
              variants={animacionTexto}
              href={ubicacion}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.025,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                mt-9
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#1A1C29]
                px-7
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
                sm:px-9
                sm:text-base
              "
            >
              <Navigation size={18} strokeWidth={1.7} />
              Ver ubicación
            </motion.a>
          </div>

          {/* BLOQUE VISUAL DE FECHA */}
          <div
            className="
              relative
              flex
              min-h-[410px]
              items-center
              justify-center
              overflow-hidden
              bg-[#1A1C29]
              px-6
              py-14

              sm:min-h-[470px]

              lg:min-h-[620px]
              lg:px-10
              lg:py-16
            "
          >
            {/* Degradados decorativos */}
            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
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
                -bottom-24
                -left-20
                h-72
                w-72
                rounded-full
                bg-[#3A415F]/80
                blur-[90px]
              "
            />

            {/* Marco interior */}
            <div
              className="
                pointer-events-none
                absolute
                inset-5
                rounded-[26px]
                border
                border-[#EDD2C2]/25

                sm:inset-7
                sm:rounded-[32px]
              "
            />

            {/* Esquinas decorativas */}
            <div
              className="
                pointer-events-none
                absolute
                left-5
                top-5
                h-14
                w-14
                border-l-2
                border-t-2
                border-[#D1A697]

                sm:left-7
                sm:top-7
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-5
                right-5
                h-14
                w-14
                border-b-2
                border-r-2
                border-[#D1A697]

                sm:bottom-7
                sm:right-7
              "
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                z-10
                text-center
              "
            >
              <p
                className="
                  font-playfair
                  text-[10px]
                  uppercase
                  tracking-[0.45em]
                  text-[#EDD2C2]

                  sm:text-xs
                "
              >
                Save the date
              </p>

              <div
                className="
                  mx-auto
                  my-8
                  flex
                  items-center
                  justify-center
                  gap-4
                "
              >
                <span className="h-px w-10 bg-[#D1A697]" />

                <span
                  className="
                    h-2
                    w-2
                    rotate-45
                    bg-[#D1A697]
                  "
                />

                <span className="h-px w-10 bg-[#D1A697]" />
              </div>

              <p
                className="
                  font-playfair
                  text-8xl
                  leading-none
                  text-[#F6F4F0]

                  sm:text-9xl

                  lg:text-[8.5rem]
                "
              >
                17
              </p>

              <p
                className="
                  mt-4
                  font-cursiveDancing
                  text-5xl
                  leading-none
                  text-[#D1A697]

                  sm:text-6xl
                "
              >
                Octubre
              </p>

              <div
                className="
                  mx-auto
                  my-8
                  h-px
                  w-24
                  bg-[#EDD2C2]/35
                "
              />

              <p
                className="
                  font-playfair
                  text-2xl
                  tracking-[0.3em]
                  text-[#F6F4F0]

                  sm:text-3xl
                "
              >
                2026
              </p>

              <p
                className="
                  mt-7
                  font-playfair
                  text-xs
                  uppercase
                  tracking-[0.35em]
                  text-[#EDD2C2]/80
                "
              >
                Sarai & Roberto
              </p>
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
          h-14
          w-px
          -translate-x-1/2
          bg-gradient-to-t
          from-[#1A1C29]
          to-transparent

          sm:h-20
        "
      />
    </section>
  );
};

export default Celebracion;