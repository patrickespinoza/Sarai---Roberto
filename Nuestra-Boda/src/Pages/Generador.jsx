import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Clipboard,
  ExternalLink,
  Link2,
  LockKeyhole,
  MessageCircle,
  RefreshCw,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";

export default function Generador() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState(1);
  const [link, setLink] = useState("");

  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState("");

  /*
    Convierte texto UTF-8 a una cadena binaria que btoa
    pueda codificar correctamente.

    Esto permite usar nombres con:
    - Acentos
    - Ñ
    - Apellidos compuestos
    - Caracteres especiales
  */
  const utf8ABinario = (texto) => {
    const bytes = new TextEncoder().encode(texto);

    return Array.from(bytes, (byte) =>
      String.fromCharCode(byte)
    ).join("");
  };

  /*
    Convierte Base64 tradicional a Base64 URL-safe.

    Reemplaza:
    + por -
    / por _

    También elimina los signos "=" del final para que
    el código se vea más limpio.
  */
  const convertirAUrlSafe = (base64) => {
    return base64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  };

  /*
    Codificación compatible con Confirmacion.jsx:

    1. Crea un objeto con nombre y pases.
    2. Lo convierte a JSON.
    3. Invierte el texto.
    4. Lo convierte a UTF-8.
    5. Lo codifica con Base64.
    6. Lo adapta para usarse de forma segura en la URL.
  */
  const codificarInvitacion = (datos) => {
    const json = JSON.stringify(datos);

    const textoInvertido = json
      .split("")
      .reverse()
      .join("");

    const textoBinario = utf8ABinario(textoInvertido);

    const base64 = btoa(textoBinario);

    return convertirAUrlSafe(base64);
  };

  /*
    Genera automáticamente el mensaje que se enviará
    por WhatsApp junto con el enlace privado.
  */
  const mensajeWhatsApp = useMemo(() => {
    if (!link) return "";

    const numeroPases = Number(pases);

    const textoLugares =
      numeroPases === 1
        ? "Hemos reservado 1 lugar especialmente para ti."
        : `Hemos reservado ${numeroPases} lugares especialmente para ustedes.`;

    return [
      `Hola, ${nombre} ✨`,
      "",
      "Con mucha alegría queremos compartir contigo nuestra invitación de boda.",
      "",
      textoLugares,
      "",
      "Puedes consultar todos los detalles y confirmar tu asistencia en el siguiente enlace:",
      "",
      link,
      "",
      "Será un honor contar con tu presencia en este día tan especial. 🤍",
      "",
      "Sarai & Roberto",
    ].join("\n");
  }, [link, nombre, pases]);

  const limpiarFormulario = () => {
    setNombre("");
    setPases(1);
    setLink("");
    setError("");
    setCopiado("");
  };

  const generarLink = () => {
    const nombreLimpio = nombre.trim();
    const numeroPases = Number(pases);

    if (!nombreLimpio) {
      setError("Escribe el nombre del invitado o familia.");
      setLink("");
      return;
    }

    if (
      !Number.isInteger(numeroPases) ||
      numeroPases < 1
    ) {
      setError(
        "El número de pases debe ser mayor o igual a 1."
      );
      setLink("");
      return;
    }

    if (numeroPases > 50) {
      setError(
        "El número máximo permitido es de 50 pases."
      );
      setLink("");
      return;
    }

    const datosInvitacion = {
      nombre: nombreLimpio,
      pases: numeroPases,
    };

    const idCodificado =
      codificarInvitacion(datosInvitacion);

    const url = `${window.location.origin}/?id=${idCodificado}`;

    setNombre(nombreLimpio);
    setPases(numeroPases);
    setLink(url);
    setError("");
    setCopiado("");
  };

  const mostrarConfirmacionCopiado = (tipo) => {
    setCopiado(tipo);

    window.setTimeout(() => {
      setCopiado("");
    }, 2500);
  };

  const copiarLink = async () => {
    if (!link) return;

    try {
      await navigator.clipboard.writeText(link);
      mostrarConfirmacionCopiado("link");
    } catch (errorClipboard) {
      console.error(
        "No se pudo copiar el enlace:",
        errorClipboard
      );

      setError(
        "No se pudo copiar automáticamente. Selecciona el enlace y cópialo manualmente."
      );
    }
  };

  const copiarMensajeCompleto = async () => {
    if (!mensajeWhatsApp) return;

    try {
      await navigator.clipboard.writeText(
        mensajeWhatsApp
      );

      mostrarConfirmacionCopiado("mensaje");
    } catch (errorClipboard) {
      console.error(
        "No se pudo copiar el mensaje:",
        errorClipboard
      );

      setError(
        "No se pudo copiar el mensaje automáticamente. Selecciona el texto y cópialo manualmente."
      );
    }
  };

  /*
    Cuando se modifica el nombre o los pases después de
    generar un enlace, eliminamos el enlace anterior para
    evitar que se copie con información desactualizada.
  */
  useEffect(() => {
    setCopiado("");
  }, [nombre, pases]);

  const formularioValido =
    nombre.trim().length > 0 &&
    Number.isInteger(Number(pases)) &&
    Number(pases) >= 1 &&
    Number(pases) <= 50;

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#1A1C29]
        px-5
        py-10

        sm:px-8
        sm:py-14

        lg:flex
        lg:items-center
        lg:px-12
        lg:py-16
      "
    >
      {/* Resplandor superior */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-36
          h-[430px]
          w-[430px]
          rounded-full
          bg-[#D1A697]/20
          blur-[120px]

          md:h-[520px]
          md:w-[520px]
        "
      />

      {/* Resplandor inferior */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-28
          h-[460px]
          w-[460px]
          rounded-full
          bg-[#3A415F]/70
          blur-[130px]

          md:h-[580px]
          md:w-[580px]
        "
      />

      {/* Línea decorativa */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-20
          w-px
          -translate-x-1/2
          bg-gradient-to-b
          from-[#D1A697]
          to-transparent
        "
      />

      <motion.section
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-7xl
          overflow-hidden
          rounded-[32px]
          border
          border-[#D1A697]/30
          bg-[#F6F4F0]
          shadow-[0_40px_120px_rgba(0,0,0,0.42)]

          lg:grid-cols-[0.82fr_1.18fr]
          lg:rounded-[46px]
        "
      >
        {/* IMAGEN */}
        <div
          className="
            relative
            min-h-[390px]
            overflow-hidden

            sm:min-h-[500px]

            lg:min-h-[760px]
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
              via-[#1A1C29]/25
              to-black/10
            "
          />

          {/* Marco */}
          <div
            className="
              pointer-events-none
              absolute
              inset-5
              rounded-[24px]
              border
              border-white/25

              sm:inset-7
              sm:rounded-[30px]
            "
          />

          {/* Sello superior */}
          <div
            className="
              absolute
              left-8
              top-8
              flex
              items-center
              gap-3
              rounded-full
              border
              border-white/25
              bg-[#1A1C29]/35
              px-5
              py-3
              backdrop-blur-md

              sm:left-12
              sm:top-12
            "
          >
            <LockKeyhole
              size={16}
              strokeWidth={1.5}
              className="text-[#EDD2C2]"
            />

            <span
              className="
                font-playfair
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-white

                sm:text-[10px]
              "
            >
              Enlaces privados
            </span>
          </div>

          {/* Texto inferior */}
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-10
              px-8
              pb-11

              sm:px-12
              sm:pb-14
            "
          >
            <p
              className="
                font-playfair
                text-[10px]
                uppercase
                tracking-[0.4em]
                text-[#EDD2C2]

                sm:text-xs
              "
            >
              Sarai & Roberto
            </p>

            <h1
              className="
                mt-4
                max-w-md
                font-cursiveDancing
                text-5xl
                leading-[0.95]
                text-white

                sm:text-6xl
                lg:text-7xl
              "
            >
              Generador de invitaciones
            </h1>

            <div className="mt-6 h-px w-24 bg-[#D1A697]" />

            <p
              className="
                mt-5
                max-w-sm
                font-playfair
                text-sm
                leading-7
                text-white/75
              "
            >
              Crea un enlace personalizado para cada
              invitado y asigna el número exacto de pases.
            </p>
          </div>
        </div>

        {/* FORMULARIO */}
        <div
          className="
            relative
            px-6
            py-12

            sm:px-10
            sm:py-14

            lg:flex
            lg:min-h-[760px]
            lg:flex-col
            lg:justify-center
            lg:px-14
            lg:py-16

            xl:px-20
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-72
              w-72
              rounded-full
              bg-[#EDD2C2]/60
              blur-[90px]
            "
          />

          <div className="relative z-10 mx-auto w-full max-w-2xl">
            {/* Encabezado */}
            <div>
              <div className="flex items-center gap-3">
                <Sparkles
                  size={16}
                  strokeWidth={1.5}
                  className="text-[#D1A697]"
                />

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
                  Panel privado
                </p>
              </div>

              <h2
                className="
                  mt-5
                  font-playfair
                  text-3xl
                  leading-tight
                  text-[#1A1C29]

                  sm:text-4xl
                  md:text-5xl
                "
              >
                Crear invitación personalizada
              </h2>

              <p
                className="
                  mt-5
                  max-w-xl
                  font-playfair
                  text-sm
                  leading-7
                  text-[#3A415F]/75

                  sm:text-base
                "
              >
                Ingresa el nombre del invitado o familia y
                asigna la cantidad de pases reservados.
              </p>
            </div>

            <div className="my-8 h-px w-full bg-[#D1A697]/35" />

            {/* Campos */}
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
                  Nombre del invitado o familia
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
                    placeholder="Ejemplo: Familia Hernández"
                    value={nombre}
                    onChange={(event) => {
                      setNombre(event.target.value);
                      setLink("");
                      setError("");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        generarLink();
                      }
                    }}
                    className="
                      w-full
                      rounded-[18px]
                      border
                      border-[#D1A697]/45
                      bg-white/80
                      py-4
                      pl-14
                      pr-5
                      font-playfair
                      text-[#1A1C29]
                      outline-none
                      transition
                      duration-300

                      placeholder:text-[#3A415F]/35

                      focus:border-[#3A415F]
                      focus:ring-2
                      focus:ring-[#3A415F]/10
                    "
                  />
                </div>
              </label>

              {/* Pases */}
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
                  Número de pases asignados
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
                    max="50"
                    inputMode="numeric"
                    value={pases}
                    onChange={(event) => {
                      setPases(event.target.value);
                      setLink("");
                      setError("");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        generarLink();
                      }
                    }}
                    className="
                      w-full
                      rounded-[18px]
                      border
                      border-[#D1A697]/45
                      bg-white/80
                      py-4
                      pl-14
                      pr-5
                      font-playfair
                      text-[#1A1C29]
                      outline-none
                      transition
                      duration-300

                      focus:border-[#3A415F]
                      focus:ring-2
                      focus:ring-[#3A415F]/10
                    "
                  />
                </div>
              </label>

              {/* Resumen */}
              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  rounded-[22px]
                  border
                  border-[#D1A697]/35
                  bg-[#EDD2C2]/25
                  p-4

                  sm:p-5
                "
              >
                <div
                  className="
                    rounded-[16px]
                    bg-white/60
                    px-4
                    py-4
                  "
                >
                  <p
                    className="
                      font-playfair
                      text-[9px]
                      uppercase
                      tracking-[0.22em]
                      text-[#3A415F]/55
                    "
                  >
                    Invitado
                  </p>

                  <p
                    className="
                      mt-2
                      truncate
                      font-playfair
                      text-sm
                      text-[#1A1C29]

                      sm:text-base
                    "
                  >
                    {nombre.trim() || "Sin nombre"}
                  </p>
                </div>

                <div
                  className="
                    rounded-[16px]
                    bg-white/60
                    px-4
                    py-4
                  "
                >
                  <p
                    className="
                      font-playfair
                      text-[9px]
                      uppercase
                      tracking-[0.22em]
                      text-[#3A415F]/55
                    "
                  >
                    Lugares
                  </p>

                  <p
                    className="
                      mt-2
                      font-playfair
                      text-sm
                      text-[#1A1C29]

                      sm:text-base
                    "
                  >
                    {Number(pases) || 0}{" "}
                    {Number(pases) === 1
                      ? "pase"
                      : "pases"}
                  </p>
                </div>
              </div>

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

              {/* Generar */}
              <motion.button
                type="button"
                onClick={generarLink}
                disabled={!formularioValido}
                whileHover={
                  formularioValido
                    ? {
                        y: -3,
                        scale: 1.01,
                      }
                    : {}
                }
                whileTap={
                  formularioValido
                    ? {
                        scale: 0.98,
                      }
                    : {}
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
                  px-6
                  py-4
                  font-playfair
                  text-sm
                  text-[#F6F4F0]
                  shadow-[0_16px_34px_rgba(26,28,41,0.24)]
                  transition
                  duration-300

                  hover:bg-[#3A415F]

                  disabled:cursor-not-allowed
                  disabled:opacity-45
                "
              >
                <Link2 size={19} strokeWidth={1.6} />
                Generar enlace privado
              </motion.button>

              {/* Resultado */}
              <AnimatePresence>
                {link && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 18,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 12,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="
                      overflow-hidden
                      rounded-[24px]
                      border
                      border-[#D1A697]/45
                      bg-white
                      shadow-[0_18px_50px_rgba(26,28,41,0.08)]
                    "
                  >
                    {/* Encabezado del resultado */}
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        border-b
                        border-[#D1A697]/25
                        bg-[#EDD2C2]/30
                        px-5
                        py-4
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-[#1A1C29]
                            text-white
                          "
                        >
                          <LockKeyhole
                            size={16}
                            strokeWidth={1.5}
                          />
                        </div>

                        <div>
                          <p
                            className="
                              font-playfair
                              text-[9px]
                              uppercase
                              tracking-[0.25em]
                              text-[#D1A697]
                            "
                          >
                            Enlace generado
                          </p>

                          <p
                            className="
                              mt-1
                              font-playfair
                              text-sm
                              text-[#1A1C29]
                            "
                          >
                            Información codificada
                          </p>
                        </div>
                      </div>

                      <Check
                        size={19}
                        strokeWidth={1.7}
                        className="text-[#D1A697]"
                      />
                    </div>

                    <div className="space-y-5 p-5">
                      {/* Enlace */}
                      <div>
                        <div
                          className="
                            mb-2
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <p
                            className="
                              font-playfair
                              text-[9px]
                              uppercase
                              tracking-[0.25em]
                              text-[#3A415F]/65
                            "
                          >
                            Enlace privado
                          </p>

                          <LockKeyhole
                            size={14}
                            strokeWidth={1.5}
                            className="text-[#D1A697]"
                          />
                        </div>

                        <div
                          className="
                            max-h-28
                            overflow-y-auto
                            break-all
                            rounded-[16px]
                            border
                            border-[#D1A697]/30
                            bg-[#F6F4F0]
                            px-4
                            py-4
                            font-mono
                            text-xs
                            leading-6
                            text-[#3A415F]
                          "
                        >
                          {link}
                        </div>
                      </div>

                      {/* NUEVO: Mensaje para WhatsApp */}
                      <div>
                        <div
                          className="
                            mb-2
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <div className="flex items-center gap-2">
                            <MessageCircle
                              size={15}
                              strokeWidth={1.5}
                              className="text-[#D1A697]"
                            />

                            <p
                              className="
                                font-playfair
                                text-[9px]
                                uppercase
                                tracking-[0.25em]
                                text-[#3A415F]/65
                              "
                            >
                              Mensaje para WhatsApp
                            </p>
                          </div>

                          <span
                            className="
                              font-playfair
                              text-[9px]
                              uppercase
                              tracking-[0.15em]
                              text-[#D1A697]
                            "
                          >
                            Listo para copiar
                          </span>
                        </div>

                        <textarea
                          value={mensajeWhatsApp}
                          readOnly
                          rows={11}
                          onFocus={(event) =>
                            event.target.select()
                          }
                          className="
                            w-full
                            resize-none
                            rounded-[18px]
                            border
                            border-[#D1A697]/30
                            bg-[#F6F4F0]
                            px-4
                            py-4
                            font-playfair
                            text-sm
                            leading-7
                            text-[#3A415F]
                            outline-none
                            transition
                            duration-300

                            focus:border-[#D1A697]
                            focus:ring-2
                            focus:ring-[#D1A697]/10
                          "
                        />

                        <p
                          className="
                            mt-2
                            font-playfair
                            text-xs
                            italic
                            leading-5
                            text-[#3A415F]/55
                          "
                        >
                          El mensaje ya incluye el nombre,
                          número de pases y enlace de la
                          invitación.
                        </p>
                      </div>

                      {/* Botones para copiar */}
                      <div
                        className="
                          grid
                          grid-cols-1
                          gap-3

                          sm:grid-cols-2
                        "
                      >
                        <motion.button
                          type="button"
                          onClick={copiarLink}
                          whileHover={{
                            y: -2,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
                          className="
                            flex
                            min-h-[54px]
                            items-center
                            justify-center
                            gap-3
                            rounded-full
                            bg-[#D1A697]
                            px-5
                            py-3
                            font-playfair
                            text-sm
                            text-[#1A1C29]
                            transition
                            duration-300

                            hover:bg-[#EDD2C2]
                          "
                        >
                          {copiado === "link" ? (
                            <>
                              <Check
                                size={18}
                                strokeWidth={1.7}
                              />
                              Enlace copiado
                            </>
                          ) : (
                            <>
                              <Clipboard
                                size={18}
                                strokeWidth={1.7}
                              />
                              Copiar enlace
                            </>
                          )}
                        </motion.button>

                        <motion.button
                          type="button"
                          onClick={copiarMensajeCompleto}
                          whileHover={{
                            y: -2,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
                          className="
                            flex
                            min-h-[54px]
                            items-center
                            justify-center
                            gap-3
                            rounded-full
                            border
                            border-[#1A1C29]
                            bg-transparent
                            px-5
                            py-3
                            font-playfair
                            text-sm
                            text-[#1A1C29]
                            transition
                            duration-300

                            hover:bg-[#1A1C29]
                            hover:text-white
                          "
                        >
                          {copiado === "mensaje" ? (
                            <>
                              <Check
                                size={18}
                                strokeWidth={1.7}
                              />
                              Mensaje copiado
                            </>
                          ) : (
                            <>
                              <MessageCircle
                                size={18}
                                strokeWidth={1.7}
                              />
                              Copiar para WhatsApp
                            </>
                          )}
                        </motion.button>
                      </div>

                      {/* Acciones secundarias */}
                      <div
                        className="
                          grid
                          grid-cols-1
                          gap-3

                          sm:grid-cols-2
                        "
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex
                            min-h-[52px]
                            items-center
                            justify-center
                            gap-3
                            rounded-full
                            border
                            border-[#D1A697]/50
                            bg-white
                            px-5
                            py-3
                            font-playfair
                            text-sm
                            text-[#3A415F]
                            transition
                            duration-300

                            hover:border-[#D1A697]
                            hover:bg-[#EDD2C2]/30
                          "
                        >
                          <ExternalLink
                            size={17}
                            strokeWidth={1.6}
                          />
                          Probar invitación
                        </a>

                        <button
                          type="button"
                          onClick={limpiarFormulario}
                          className="
                            flex
                            min-h-[52px]
                            items-center
                            justify-center
                            gap-3
                            rounded-full
                            border
                            border-[#D1A697]/50
                            bg-white
                            px-5
                            py-3
                            font-playfair
                            text-sm
                            text-[#3A415F]
                            transition
                            duration-300

                            hover:border-[#D1A697]
                            hover:bg-[#EDD2C2]/30
                          "
                        >
                          <RefreshCw
                            size={17}
                            strokeWidth={1.6}
                          />
                          Crear otra
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p
              className="
                mt-6
                text-center
                font-playfair
                text-xs
                italic
                leading-6
                text-[#3A415F]/55
              "
            >
              El nombre y los pases se almacenan dentro de un
              código privado y no se muestran directamente en
              la dirección.
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}