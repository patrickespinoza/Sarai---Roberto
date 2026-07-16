import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Vestimenta = ({
  imagen = "/dresscode.png",
  codigo = "Formal",
  descripcion = "Nos encantará verte elegante para celebrar este día tan especial junto a nosotros.",
}) => {
  return (
    <section
      className="
        relative
        w-full
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
          bg-[#EDD2C2]/70
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
          -bottom-32
          -right-24
          h-80
          w-80
          rounded-full
          bg-[#3A415F]/15
          blur-[100px]

          sm:h-[430px]
          sm:w-[430px]
        "
      />

      {/* Línea superior */}
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

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
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
                text-[25px]
                uppercase
                tracking-[0.42em]
                text-[#3A415F]

                sm:text-xs
              "
            >
              Nuestro día
            </p>

            <span className="h-px w-10 bg-[#D1A697] sm:w-16" />
          </div>

        </motion.div>

        {/* CONTENIDO */}
        <div
          className="
            relative
            mx-auto
            grid
            max-w-6xl
            items-center
            gap-8

            lg:grid-cols-[0.95fr_1.05fr]
            lg:gap-0
          "
        >
          {/* IMAGEN */}
          <motion.div
            initial={{
              opacity: 0,
              x: -45,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="
              relative
              z-10
              mx-auto
              w-full
              max-w-[560px]

              lg:mx-0
            "
          >
            {/* Fondo desplazado */}
            <div
              className="
                absolute
                -bottom-4
                -left-4
                h-full
                w-full
                rounded-[30px]
                border
                border-[#D1A697]/50
                bg-[#EDD2C2]

                sm:-bottom-6
                sm:-left-6
                sm:rounded-[36px]
              "
            />

            {/* Contenedor de imagen */}
            <div
              className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-[#D1A697]/35
                bg-white
                shadow-[0_25px_70px_rgba(26,28,41,0.16)]

                sm:rounded-[36px]
              "
            >
              <img
                src={imagen}
                alt="Código de vestimenta formal"
                className="
                  h-[640px]
                  w-full
                  object-cover
                  object-center
                  transition-transform
                  duration-1000

                  group-hover:scale-105

                  sm:h-[670px]

                  lg:h-[850px]
                "
              />

              {/* Sombra inferior */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-40
                  bg-gradient-to-t
                  from-[#1A1C29]/45
                  to-transparent
                "
              />

              {/* Etiqueta inferior */}
              <div
                className="
                  absolute
                  bottom-6
                  left-1/2
                  flex
                  -translate-x-1/2
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/30
                  bg-white/15
                  px-6
                  py-3
                  text-white
                  backdrop-blur-md
                "
              >
                <Sparkles size={17} strokeWidth={1.6} />

                <span
                  className="
                    whitespace-nowrap
                    font-playfair
                    text-[10px]
                    uppercase
                    tracking-[0.3em]

                    sm:text-xs
                  "
                >
                  Elegancia especial
                </span>
              </div>
            </div>
          </motion.div>

          {/* TARJETA DE TEXTO */}
          <motion.div
            initial={{
              opacity: 0,
              x: 45,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="
              relative
              z-20
              overflow-hidden
              rounded-[32px]
              bg-[#1A1C29]
              px-7
              py-12
              text-center
              shadow-[0_28px_80px_rgba(26,28,41,0.24)]

              sm:px-12
              sm:py-14

              lg:-ml-10
              lg:rounded-[38px]
              lg:px-14
              lg:py-16
              lg:text-left

              xl:-ml-16
              xl:px-16
            "
          >
            {/* Resplandor nude */}
            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-72
                w-72
                rounded-full
                bg-[#D1A697]/18
                blur-[85px]
              "
            />

            {/* Resplandor azul */}
            <div
              className="
                pointer-events-none
                absolute
                -bottom-28
                -left-24
                h-72
                w-72
                rounded-full
                bg-[#3A415F]/65
                blur-[90px]
              "
            />

            {/* Marco interior */}
            <div
              className="
                pointer-events-none
                absolute
                inset-4
                rounded-[25px]
                border
                border-[#EDD2C2]/20

                sm:inset-5
                sm:rounded-[30px]
              "
            />

            <div className="relative z-10">
              {/* Icono */}
              <div
                className="
                  mx-auto
                  mb-7
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D1A697]/55
                  bg-[#D1A697]/10
                  text-[#D1A697]

                  lg:mx-0
                "
              >
                <Sparkles size={23} strokeWidth={1.5} />
              </div>

              <p
                className="
                  font-playfair
                  text-[10px]
                  uppercase
                  tracking-[0.38em]
                  text-[#EDD2C2]

                  sm:text-xs
                "
              >
                Dress code
              </p>

              <h3
                className="
                  mt-4
                  font-playfair
                  text-4xl
                  leading-tight
                  text-[#F6F4F0]

                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {codigo}
              </h3>

              <div
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

                <span
                  className="
                    h-2
                    w-2
                    rotate-45
                    bg-[#D1A697]
                  "
                />

                <span className="h-px w-12 bg-[#D1A697]" />
              </div>

              <p
                className="
                  mx-auto
                  max-w-xl
                  font-playfair
                  text-base
                  leading-8
                  text-[#F6F4F0]/80

                  sm:text-lg

                  lg:mx-0
                "
              >
                {descripcion}
              </p>

            </div>
          </motion.div>
        </div>
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

export default Vestimenta;