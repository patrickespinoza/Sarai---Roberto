import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Heart,
  LoaderCircle,
  MessageCircle,
  Send,
  UserRound,
  UsersRound,
} from "lucide-react";

const Confirmacion = ({
  numeroNovia = "525586768565",
  numeroNovio = "525536421895",
  nombreNovia = "Sarai",
  nombreNovio = "Roberto",
}) => {
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzaGJIphBdXIIkBYmqxudrelYEU-CJCNDWq5uykCdSawlhcS4KwHDnBloBXBa2_MlE6/exec";

  const STORAGE_KEY = "confirmacion-sarai-roberto-enviada";

  const [nombreInvitado, setNombreInvitado] = useState("");
  const [mensajeInvitado, setMensajeInvitado] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");

  const [error, setError] = useState("");
  const [enviandoA, setEnviandoA] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [destinatarioEnviado, setDestinatarioEnviado] = useState("");

  /*
    Revisa si ya se envió una confirmación durante esta sesión.
    Esto evita que al actualizar la página se vuelva a enviar.
  */
  useEffect(() => {
    const confirmacionGuardada = sessionStorage.getItem(STORAGE_KEY);

    if (confirmacionGuardada) {
      try {
        const datos = JSON.parse(confirmacionGuardada);

        setEnviado(true);
        setDestinatarioEnviado(datos.destinatario || "");
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const formularioBloqueado = enviandoA !== "" || enviado;

  const validarFormulario = () => {
    if (!nombreInvitado.trim()) {
      setError("Escribe tu nombre y apellido.");
      return false;
    }

    if (!asistencia) {
      setError("Selecciona si asistirás o no al evento.");
      return false;
    }

    if (asistencia === "Sí asistiré") {
      const cantidadInvitados = Number(invitados);

      if (
        !invitados ||
        Number.isNaN(cantidadInvitados) ||
        cantidadInvitados < 1
      ) {
        setError("Indica el número de personas que asistirán.");
        return false;
      }
    }

    setError("");
    return true;
  };

  const crearMensajeWhatsApp = (destinatario) => {
    const cantidad =
      asistencia === "Sí asistiré"
        ? invitados || "1"
        : "No aplica";

    const mensaje = [
      `Hola ${destinatario} 💍`,
      "",
      "Quiero confirmar mi asistencia a la boda de Sarai y Roberto.",
      "",
      `Nombre: ${nombreInvitado.trim()}`,
      `Asistencia: ${asistencia}`,
      `Número de personas: ${cantidad}`,
      mensajeInvitado.trim()
        ? `Mensaje: ${mensajeInvitado.trim()}`
        : "Mensaje: Sin mensaje adicional",
      "",
      "¡Gracias!",
    ];

    return mensaje.join("\n");
  };

  const enviarConfirmacion = async ({
    lado,
    numero,
    destinatario,
  }) => {
    /*
      Evita que una segunda pulsación ejecute nuevamente la función.
    */
    if (formularioBloqueado) return;

    if (!validarFormulario()) return;

    setEnviandoA(lado);
    setError("");

    /*
      Se abre una pestaña vacía durante el clic directo.
      Después se envía a WhatsApp cuando Excel confirma el registro.
      Esto reduce el riesgo de que el navegador bloquee la ventana.
    */
    const ventanaWhatsApp = window.open("", "_blank");

    const cantidadInvitados =
      asistencia === "Sí asistiré"
        ? Number(invitados)
        : 0;

    const datos = {
      nombre: nombreInvitado.trim(),
      asistencia,
      invitados: cantidadInvitados,
      mensaje: mensajeInvitado.trim(),
      lado,
    };

    try {
      const respuesta = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(datos),
      });

      /*
        Google Apps Script puede devolver una respuesta opaca o una
        redirección. Si fetch no lanza error, continuamos con WhatsApp.
      */
      const mensajeWhatsApp = crearMensajeWhatsApp(destinatario);

      const telefonoLimpio = numero.replace(/\D/g, "");

      const urlWhatsApp = `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(
        mensajeWhatsApp
      )}`;

      setEnviado(true);
      setDestinatarioEnviado(destinatario);

      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          enviado: true,
          lado,
          destinatario,
          fecha: new Date().toISOString(),
        })
      );

      if (ventanaWhatsApp) {
        ventanaWhatsApp.location.href = urlWhatsApp;
      } else {
        window.location.href = urlWhatsApp;
      }
    } catch (errorFetch) {
      console.error("Error al registrar la confirmación:", errorFetch);

      if (ventanaWhatsApp) {
        ventanaWhatsApp.close();
      }

      setError(
        "No pudimos registrar tu confirmación. Revisa tu conexión e inténtalo nuevamente."
      );

      setEnviandoA("");
    }
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
      {/* Resplandor superior */}
      <div
        className="
          pointer-events-none
          absolute
          -left-28
          -top-32
          h-96
          w-96
          rounded-full
          bg-[#D1A697]/20
          blur-[110px]

          sm:h-[480px]
          sm:w-[480px]
        "
      />

      {/* Resplandor inferior */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-32
          h-[430px]
          w-[430px]
          rounded-full
          bg-[#3A415F]/70
          blur-[120px]

          sm:h-[540px]
          sm:w-[540px]
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

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{
          once: true,
          amount: 0.1,
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
              RSVP
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
            Confirmación
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              font-playfair
              text-sm
              leading-7
              text-[#F6F4F0]/70

              sm:text-base
            "
          >
            Ayúdanos a preparar cada detalle confirmando tu asistencia.
          </p>
        </div>

        {/* TARJETA PRINCIPAL */}
        <div
          className="
            relative
            grid
            overflow-hidden
            rounded-[34px]
            border
            border-[#D1A697]/30
            bg-[#F6F4F0]
            shadow-[0_35px_100px_rgba(0,0,0,0.35)]

            lg:grid-cols-[0.78fr_1.22fr]
            lg:rounded-[44px]
          "
        >
          {/* IMAGEN */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="
              relative
              min-h-[430px]
              overflow-hidden

              sm:min-h-[520px]

              lg:min-h-[820px]
            "
          >
            <img
              src="/Final.JPG"
              alt="Sarai y Roberto"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                object-center
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#1A1C29]/95
                via-[#1A1C29]/20
                to-black/10
              "
            />

            {/* Marco interior */}
            <div
              className="
                pointer-events-none
                absolute
                inset-5
                rounded-[25px]
                border
                border-white/25

                sm:inset-7
                sm:rounded-[30px]
              "
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                z-10
                px-8
                pb-12

                sm:px-12
                sm:pb-14

                lg:px-10
              "
            >

              <p
                className="
                  font-playfair
                  text-[15px]
                  uppercase
                  tracking-[0.36em]
                  text-white
                "
              >
                Cantares 8:6
              </p>

              <p
                className="
                  max-w-md
                  font-cursiveDancing
                  text-4xl
                  leading-tight
                  text-white

                  sm:text-5xl
                "
              >
                Ponme como un sello sobre tu corazón
              </p>

              <div className=" h-px w-20 bg-[#D1A697]" />
            </div>
          </motion.div>

          {/* FORMULARIO */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
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
            viewport={{ once: true }}
            className="
              relative
              px-6
              py-12

              sm:px-10
              sm:py-14

              lg:flex
              lg:min-h-[820px]
              lg:flex-col
              lg:justify-center
              lg:px-14
              lg:py-16

              xl:px-16
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-64
                w-64
                rounded-full
                bg-[#EDD2C2]/55
                blur-[80px]
              "
            />

            <div className="relative z-10">
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
                Reserva tu lugar
              </p>

              <h3
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
                ¿Nos acompañas?
              </h3>

              <p
                className="
                  mt-5
                  max-w-2xl
                  font-playfair
                  text-sm
                  leading-7
                  text-[#3A415F]/80

                  sm:text-base
                "
              >
                Completa tus datos y selecciona a cuál de los novios deseas
                enviar tu confirmación.
              </p>

              <div className="my-8 h-px w-full bg-[#D1A697]/35" />

              {/* FORMULARIO */}
              <div className="space-y-5">
                {/* Nombre */}
                <label className="block">
                  <span
                    className="
                      mb-2
                      block
                      font-playfair
                      text-[10px]
                      uppercase
                      tracking-[0.25em]
                      text-[#3A415F]/75
                    "
                  >
                    Nombre y apellido
                  </span>

                  <div className="relative">
                    <UserRound
                      size={19}
                      strokeWidth={1.5}
                      className="
                        pointer-events-none
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-[#D1A697]
                      "
                    />

                    <input
                      type="text"
                      placeholder="Escribe tu nombre completo"
                      value={nombreInvitado}
                      disabled={formularioBloqueado}
                      onChange={(event) =>
                        setNombreInvitado(event.target.value)
                      }
                      className="
                        w-full
                        rounded-[18px]
                        border
                        border-[#D1A697]/40
                        bg-white/75
                        py-4
                        pl-14
                        pr-5
                        font-playfair
                        text-[#1A1C29]
                        outline-none
                        transition
                        duration-300

                        placeholder:text-[#3A415F]/40

                        focus:border-[#3A415F]
                        focus:ring-2
                        focus:ring-[#3A415F]/10

                        disabled:cursor-not-allowed
                        disabled:opacity-65
                      "
                    />
                  </div>
                </label>

                {/* Asistencia */}
                <div>
                  <span
                    className="
                      mb-3
                      block
                      font-playfair
                      text-[10px]
                      uppercase
                      tracking-[0.25em]
                      text-[#3A415F]/75
                    "
                  >
                    Confirma tu asistencia
                  </span>

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-3

                      sm:grid-cols-2
                    "
                  >
                    <button
                      type="button"
                      disabled={formularioBloqueado}
                      onClick={() => {
                        setAsistencia("Sí asistiré");
                        setError("");
                      }}
                      className={`
                        flex
                        items-center
                        justify-center
                        gap-3
                        rounded-[18px]
                        border
                        px-5
                        py-4
                        font-playfair
                        text-sm
                        transition
                        duration-300

                        disabled:cursor-not-allowed
                        disabled:opacity-65

                        ${
                          asistencia === "Sí asistiré"
                            ? "border-[#1A1C29] bg-[#1A1C29] text-[#F6F4F0] shadow-[0_12px_28px_rgba(26,28,41,0.18)]"
                            : "border-[#D1A697]/40 bg-white/75 text-[#1A1C29] hover:border-[#D1A697] hover:bg-[#EDD2C2]/35"
                        }
                      `}
                    >
                      <Check size={18} strokeWidth={1.7} />
                      Sí asistiré
                    </button>

                    <button
                      type="button"
                      disabled={formularioBloqueado}
                      onClick={() => {
                        setAsistencia("No podré asistir");
                        setInvitados("");
                        setError("");
                      }}
                      className={`
                        flex
                        items-center
                        justify-center
                        gap-3
                        rounded-[18px]
                        border
                        px-5
                        py-4
                        font-playfair
                        text-sm
                        transition
                        duration-300

                        disabled:cursor-not-allowed
                        disabled:opacity-65

                        ${
                          asistencia === "No podré asistir"
                            ? "border-[#3A415F] bg-[#3A415F] text-[#F6F4F0] shadow-[0_12px_28px_rgba(58,65,95,0.18)]"
                            : "border-[#D1A697]/40 bg-white/75 text-[#1A1C29] hover:border-[#D1A697] hover:bg-[#EDD2C2]/35"
                        }
                      `}
                    >
                      No podré asistir
                    </button>
                  </div>
                </div>

                {/* Invitados */}
                <AnimatePresence initial={false}>
                  {asistencia === "Sí asistiré" && (
                    <motion.label
                      initial={{
                        opacity: 0,
                        height: 0,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        y: -8,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="block overflow-hidden"
                    >
                      <span
                        className="
                          mb-2
                          block
                          font-playfair
                          text-[10px]
                          uppercase
                          tracking-[0.25em]
                          text-[#3A415F]/75
                        "
                      >
                        Número de personas
                      </span>

                      <div className="relative">
                        <UsersRound
                          size={19}
                          strokeWidth={1.5}
                          className="
                            pointer-events-none
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            text-[#D1A697]
                          "
                        />

                        <input
                          type="number"
                          min="1"
                          inputMode="numeric"
                          placeholder="Ejemplo: 2"
                          value={invitados}
                          disabled={formularioBloqueado}
                          onChange={(event) =>
                            setInvitados(event.target.value)
                          }
                          className="
                            w-full
                            rounded-[18px]
                            border
                            border-[#D1A697]/40
                            bg-white/75
                            py-4
                            pl-14
                            pr-5
                            font-playfair
                            text-[#1A1C29]
                            outline-none
                            transition
                            duration-300

                            placeholder:text-[#3A415F]/40

                            focus:border-[#3A415F]
                            focus:ring-2
                            focus:ring-[#3A415F]/10

                            disabled:cursor-not-allowed
                            disabled:opacity-65
                          "
                        />
                      </div>
                    </motion.label>
                  )}
                </AnimatePresence>

                {/* Mensaje */}
                <label className="block">
                  <span
                    className="
                      mb-2
                      block
                      font-playfair
                      text-[10px]
                      uppercase
                      tracking-[0.25em]
                      text-[#3A415F]/75
                    "
                  >
                    Mensaje para los novios
                  </span>

                  <textarea
                    placeholder="Escribe un mensaje especial..."
                    value={mensajeInvitado}
                    disabled={formularioBloqueado}
                    onChange={(event) =>
                      setMensajeInvitado(event.target.value)
                    }
                    rows={4}
                    className="
                      w-full
                      resize-none
                      rounded-[18px]
                      border
                      border-[#D1A697]/40
                      bg-white/75
                      px-5
                      py-4
                      font-playfair
                      text-[#1A1C29]
                      outline-none
                      transition
                      duration-300

                      placeholder:text-[#3A415F]/40

                      focus:border-[#3A415F]
                      focus:ring-2
                      focus:ring-[#3A415F]/10

                      disabled:cursor-not-allowed
                      disabled:opacity-65
                    "
                  />
                </label>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      className="
                        rounded-[16px]
                        border
                        border-[#D1A697]/50
                        bg-[#EDD2C2]/45
                        px-5
                        py-4
                      "
                    >
                      <p
                        className="
                          font-playfair
                          text-sm
                          leading-6
                          text-[#1A1C29]
                        "
                      >
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Confirmación enviada */}
                <AnimatePresence>
                  {enviado && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 12,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      className="
                        rounded-[22px]
                        border
                        border-[#D1A697]/55
                        bg-[#EDD2C2]/45
                        px-5
                        py-5
                        text-center
                      "
                    >
                      <CheckCircle2
                        size={28}
                        strokeWidth={1.5}
                        className="mx-auto text-[#1A1C29]"
                      />

                      <p
                        className="
                          mt-3
                          font-playfair
                          text-base
                          text-[#1A1C29]
                        "
                      >
                        Confirmación registrada correctamente.
                      </p>

                      {destinatarioEnviado && (
                        <p
                          className="
                            mt-2
                            font-playfair
                            text-sm
                            text-[#3A415F]/75
                          "
                        >
                          Se abrió WhatsApp para enviarla a{" "}
                          {destinatarioEnviado}.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* BOTONES DE WHATSAPP */}
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-3
                    pt-2

                    sm:grid-cols-2
                  "
                >
                  <motion.button
                    type="button"
                    disabled={formularioBloqueado}
                    onClick={() =>
                      enviarConfirmacion({
                        lado: "Novia",
                        numero: numeroNovia,
                        destinatario: nombreNovia,
                      })
                    }
                    whileHover={
                      formularioBloqueado ? {} : { y: -3, scale: 1.01 }
                    }
                    whileTap={
                      formularioBloqueado ? {} : { scale: 0.98 }
                    }
                    className="
                      flex
                      min-h-[60px]
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[#D1A697]
                      px-5
                      py-4
                      font-playfair
                      text-sm
                      text-[#1A1C29]
                      shadow-[0_14px_30px_rgba(209,166,151,0.28)]
                      transition
                      duration-300

                      hover:bg-[#EDD2C2]

                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {enviandoA === "Novia" ? (
                      <>
                        <LoaderCircle
                          size={19}
                          strokeWidth={1.7}
                          className="animate-spin"
                        />
                        Registrando...
                      </>
                    ) : enviado ? (
                      <>
                        <CheckCircle2 size={19} strokeWidth={1.7} />
                        Confirmación enviada
                      </>
                    ) : (
                      <>
                        <MessageCircle size={19} strokeWidth={1.7} />
                        Confirmar con {nombreNovia}
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    type="button"
                    disabled={formularioBloqueado}
                    onClick={() =>
                      enviarConfirmacion({
                        lado: "Novio",
                        numero: numeroNovio,
                        destinatario: nombreNovio,
                      })
                    }
                    whileHover={
                      formularioBloqueado ? {} : { y: -3, scale: 1.01 }
                    }
                    whileTap={
                      formularioBloqueado ? {} : { scale: 0.98 }
                    }
                    className="
                      flex
                      min-h-[60px]
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[#1A1C29]
                      px-5
                      py-4
                      font-playfair
                      text-sm
                      text-[#F6F4F0]
                      shadow-[0_14px_30px_rgba(26,28,41,0.24)]
                      transition
                      duration-300

                      hover:bg-[#3A415F]

                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {enviandoA === "Novio" ? (
                      <>
                        <LoaderCircle
                          size={19}
                          strokeWidth={1.7}
                          className="animate-spin"
                        />
                        Registrando...
                      </>
                    ) : enviado ? (
                      <>
                        <CheckCircle2 size={19} strokeWidth={1.7} />
                        Confirmación enviada
                      </>
                    ) : (
                      <>
                        <Send size={19} strokeWidth={1.7} />
                        Confirmar con {nombreNovio}
                      </>
                    )}
                  </motion.button>
                </div>

                {!enviado && (
                  <p
                    className="
                      pt-1
                      text-center
                      font-playfair
                      text-xs
                      italic
                      leading-6
                      text-[#3A415F]/60
                    "
                  >
                    Al seleccionar un botón, tu confirmación se registrará y
                    después se abrirá WhatsApp.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
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
          from-[#D1A697]
          to-transparent

          sm:h-20
        "
      />
    </section>
  );
};

export default Confirmacion;