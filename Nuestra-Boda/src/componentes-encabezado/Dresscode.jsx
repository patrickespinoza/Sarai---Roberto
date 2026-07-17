import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const imagenVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Vestimenta = ({
  imagenDressCode = "/dresscode.png",
  imagenPaleta = "/paletadeColores.png",
}) => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F6F4F0]
        px-4
        py-20

        sm:px-8
        sm:py-24

        lg:px-12
        lg:py-28
      "
    >
      {/* Resplandor superior izquierdo */}
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

      {/* Resplandor inferior derecho */}
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

      {/* Resplandor central */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#D1A697]/10
          blur-[120px]

          lg:h-[650px]
          lg:w-[650px]
        "
      />

      {/* Línea superior */}
      <div
        className="
          pointer-events-none
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
        {/* Encabezado principal */}
        <motion.div
          initial={{
            opacity: 0,
            y: 28,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
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
          <div
            className="
              mb-5
              flex
              items-center
              justify-center
              gap-3

              sm:gap-4
            "
          >
            <span className="h-px w-9 bg-[#D1A697] sm:w-16" />

            <Sparkles
              size={15}
              strokeWidth={1.5}
              className="text-[#D1A697]"
            />

            <p
              className="
                font-playfair
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-[#3A415F]

                sm:text-xs
                sm:tracking-[0.42em]
              "
            >
              Nuestro día
            </p>

            <Sparkles
              size={15}
              strokeWidth={1.5}
              className="text-[#D1A697]"
            />

            <span className="h-px w-9 bg-[#D1A697] sm:w-16" />
          </div>

          <h2
            className="
              font-playfair
              text-4xl
              leading-tight
              text-[#1A1C29]

              sm:text-5xl
              lg:text-6xl
            "
          >
            Código de Vestimenta
          </h2>

          <div
            className="
              mx-auto
              mt-6
              flex
              items-center
              justify-center
              gap-3
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
              mt-6
              max-w-2xl
              font-playfair
              text-sm
              leading-7
              text-[#3A415F]/75

              sm:text-base
              sm:leading-8
            "
          >
            Hemos preparado algunas recomendaciones para que
            todos disfrutemos de una celebración elegante y
            armoniosa.
          </p>
        </motion.div>

        {/* Primera imagen: código de vestimenta */}
        <motion.div
          variants={imagenVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="
            relative
            mx-auto
            mb-20
            w-full
            max-w-5xl

            sm:mb-24
          "
        >
          {/* Título de la primera imagen */}
          <div className="mb-8 text-center">
            <p
              className="
                font-playfair
                text-[20px]
                uppercase
                tracking-[0.35em]
                text-[#D1A697]

                sm:text-xs
              "
            >
              Para todos nuestros invitados
            </p>

          </div>

          <div
            className="
              absolute
              -bottom-3
              -left-3
              h-full
              w-full
              rounded-[24px]
              border
              border-[#D1A697]/45
              bg-[#EDD2C2]/55

              sm:-bottom-5
              sm:-left-5
              sm:rounded-[34px]
            "
          />

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-[#D1A697]/35
              bg-white
              p-2
              shadow-[0_25px_80px_rgba(26,28,41,0.18)]

              sm:rounded-[34px]
              sm:p-3
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-[18px]
                bg-[#F6F4F0]

                sm:rounded-[27px]
              "
            >
              <img
                src={imagenDressCode}
                alt="Código de vestimenta formal"
                loading="lazy"
                className="
                  block
                  h-auto
                  w-full
                  object-contain
                  object-center
                  transition-transform
                  duration-1000

                  group-hover:scale-[1.01]
                "
              />
            </div>

            {/* Esquinas decorativas */}
            <div
              className="
                pointer-events-none
                absolute
                left-5
                top-5
                h-10
                w-10
                border-l
                border-t
                border-[#D1A697]/70

                sm:left-7
                sm:top-7
                sm:h-14
                sm:w-14
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                right-5
                top-5
                h-10
                w-10
                border-r
                border-t
                border-[#D1A697]/70

                sm:right-7
                sm:top-7
                sm:h-14
                sm:w-14
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-5
                left-5
                h-10
                w-10
                border-b
                border-l
                border-[#D1A697]/70

                sm:bottom-7
                sm:left-7
                sm:h-14
                sm:w-14
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-5
                right-5
                h-10
                w-10
                border-b
                border-r
                border-[#D1A697]/70

                sm:bottom-7
                sm:right-7
                sm:h-14
                sm:w-14
              "
            />
          </div>
        </motion.div>

        {/* Separador */}
        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
          }}
          className="
            mx-auto
            mb-16
            flex
            max-w-xl
            items-center
            justify-center
            gap-4

            sm:mb-20
          "
        >
          <span
            className="
              h-px
              flex-1
              bg-gradient-to-r
              from-transparent
              to-[#D1A697]
            "
          />

          <div
            className="
              flex
              h-10
              w-10
              rotate-45
              items-center
              justify-center
              border
              border-[#D1A697]/60
              bg-[#F6F4F0]
            "
          >
            <Sparkles
              size={15}
              strokeWidth={1.4}
              className="-rotate-45 text-[#D1A697]"
            />
          </div>

          <span
            className="
              h-px
              flex-1
              bg-gradient-to-l
              from-transparent
              to-[#D1A697]
            "
          />
        </motion.div>

        {/* Segunda imagen: paleta de honor */}
        <motion.div
          variants={imagenVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            relative
            mx-auto
            w-full
            max-w-7xl
          "
        >
          {/* Título de la segunda imagen */}
          <div className="mb-8 text-center">
            <p
              className="
                font-playfair
                text-[20px]
                uppercase
                tracking-[0.35em]
                text-[#D1A697]

                sm:text-xs
              "
            >
              Paleta especial
            </p>

          </div>

          <div
            className="
              absolute
              -bottom-3
              -right-3
              h-full
              w-full
              rounded-[24px]
              border
              border-[#D1A697]/45
              bg-[#EDD2C2]/55

              sm:-bottom-5
              sm:-right-5
              sm:rounded-[34px]

              lg:-bottom-7
              lg:-right-7
              lg:rounded-[42px]
            "
          />

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-[#D1A697]/35
              bg-white
              p-2
              shadow-[0_25px_80px_rgba(26,28,41,0.18)]

              sm:rounded-[34px]
              sm:p-3

              lg:rounded-[42px]
              lg:p-4
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-[18px]
                bg-[#F6F4F0]

                sm:rounded-[27px]

                lg:rounded-[34px]
              "
            >
              <img
                src={imagenPaleta}
                alt="Paleta de colores para damas y caballeros de honor"
                loading="lazy"
                className="
                  block
                  h-auto
                  w-full
                  object-contain
                  object-center
                  transition-transform
                  duration-1000

                  group-hover:scale-[1.01]
                "
              />
            </div>

            {/* Esquinas decorativas */}
            <div
              className="
                pointer-events-none
                absolute
                left-5
                top-5
                h-10
                w-10
                border-l
                border-t
                border-[#D1A697]/70

                sm:left-7
                sm:top-7
                sm:h-14
                sm:w-14
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                right-5
                top-5
                h-10
                w-10
                border-r
                border-t
                border-[#D1A697]/70

                sm:right-7
                sm:top-7
                sm:h-14
                sm:w-14
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-5
                left-5
                h-10
                w-10
                border-b
                border-l
                border-[#D1A697]/70

                sm:bottom-7
                sm:left-7
                sm:h-14
                sm:w-14
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-5
                right-5
                h-10
                w-10
                border-b
                border-r
                border-[#D1A697]/70

                sm:bottom-7
                sm:right-7
                sm:h-14
                sm:w-14
              "
            />
          </div>
        </motion.div>

        {/* Nota inferior */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          viewport={{
            once: true,
          }}
          className="
            mx-auto
            mt-12
            flex
            max-w-2xl
            items-center
            justify-center
            gap-4
            text-center

            sm:mt-16
          "
        >
          <span
            className="
              hidden
              h-px
              flex-1
              bg-gradient-to-r
              from-transparent
              to-[#D1A697]/60

              sm:block
            "
          />

          <p
            className="
              font-playfair
              text-xs
              italic
              leading-6
              text-[#3A415F]/65

              sm:text-sm
            "
          >
            Gracias por acompañarnos y formar parte de este día
            tan especial.
          </p>

          <span
            className="
              hidden
              h-px
              flex-1
              bg-gradient-to-l
              from-transparent
              to-[#D1A697]/60

              sm:block
            "
          />
        </motion.div>
      </div>

      {/* Línea inferior */}
      <div
        className="
          pointer-events-none
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