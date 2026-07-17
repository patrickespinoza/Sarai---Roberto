import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  LockKeyhole,
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
    "https://script.google.com/macros/s/AKfycbylzhXgiSKvISMrZlQvwk8AK3O79bdHCyWWDluoCos_HlLNdlXwD7e7afGYHjyUguvkpQ/exec";

  const [idInvitacion, setIdInvitacion] = useState("");
  const [nombreInvitado, setNombreInvitado] = useState("");
  const [pasesPermitidos, setPasesPermitidos] = useState(0);

  const [mensajeInvitado, setMensajeInvitado] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitadosSeleccionados, setInvitadosSeleccionados] =
    useState("");

  const [error, setError] = useState("");
  const [errorEnlace, setErrorEnlace] = useState("");
  const [cargandoInvitacion, setCargandoInvitacion] =
    useState(true);

  const [enviandoA, setEnviandoA] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [destinatarioEnviado, setDestinatarioEnviado] =
    useState("");

  /*
    Cada invitación tendrá su propia llave.

    Esto evita que una confirmación enviada desde un enlace
    bloquee otra invitación diferente en el mismo dispositivo.
  */
  const storageKey = useMemo(() => {
    if (!idInvitacion) {
      return "confirmacion-sarai-roberto-sin-id";
    }

    return `confirmacion-sarai-roberto-${idInvitacion}`;
  }, [idInvitacion]);

  /*
    Convierte el resultado de atob a texto UTF-8.

    Esto permite leer correctamente nombres con acentos,
    eñes y otros caracteres especiales.
  */
  const binarioAUtf8 = (textoBinario) => {
    const bytes = Uint8Array.from(
      textoBinario,
      (caracter) => caracter.charCodeAt(0)
    );

    return new TextDecoder("utf-8").decode(bytes);
  };

  /*
    Agrega el relleno requerido por Base64.

    También acepta Base64 URL-safe:
    - reemplaza "-" por "+"
    - reemplaza "_" por "/"
  */
  const normalizarBase64 = (valor) => {
    let resultado = valor
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    while (resultado.length % 4 !== 0) {
      resultado += "=";
    }

    return resultado;
  };

  /*
    Decodifica el mismo formato usado por el generador:

    JSON
      → invertir texto
      → btoa
      → parámetro id

    También incluye métodos alternativos para que funcione
    si el generador aplicó encodeURIComponent o UTF-8.
  */
  const decodificarInvitacion = (id) => {
    const idNormalizado = normalizarBase64(id);
    const textoBase64 = atob(idNormalizado);

    const candidatos = [];

    /*
      Método principal:
      atob → invertir → JSON.parse
    */
    candidatos.push(
      textoBase64.split("").reverse().join("")
    );

    /*
      Variante UTF-8.
    */
    try {
      candidatos.push(
        binarioAUtf8(textoBase64)
          .split("")
          .reverse()
          .join("")
      );
    } catch {
      // Continúa con los demás métodos.
    }

    /*
      Variante con encodeURIComponent.
    */
    try {
      candidatos.push(
        decodeURIComponent(
          textoBase64.split("").reverse().join("")
        )
      );
    } catch {
      // Continúa con los demás métodos.
    }

    /*
      Variante donde primero se decodificó la URI
      y después se invirtió el contenido.
    */
    try {
      candidatos.push(
        decodeURIComponent(textoBase64)
          .split("")
          .reverse()
          .join("")
      );
    } catch {
      // Continúa con los demás métodos.
    }

    for (const candidato of candidatos) {
      try {
        const datos = JSON.parse(candidato);

        if (
          datos &&
          typeof datos === "object" &&
          datos.nombre !== undefined &&
          datos.pases !== undefined
        ) {
          return datos;
        }
      } catch {
        // Intenta con el siguiente formato.
      }
    }

    throw new Error(
      "No fue posible decodificar la invitación."
    );
  };

  /*
    Lee nombre y pases desde la URL.

    Ejemplo:
    /?id=CODIGO_GENERADO
  */
  useEffect(() => {
    const cargarDatosInvitacion = () => {
      setCargandoInvitacion(true);
      setErrorEnlace("");

      try {
        const parametros = new URLSearchParams(
          window.location.search
        );

        const id = parametros.get("id");

        if (!id) {
          throw new Error(
            "Este enlace no contiene los datos de la invitación."
          );
        }

        const datos = decodificarInvitacion(id);

        const nombre = String(datos.nombre || "").trim();
        const pases = Number(datos.pases);

        if (!nombre) {
          throw new Error(
            "La invitación no contiene un nombre válido."
          );
        }

        if (
          !Number.isInteger(pases) ||
          pases < 1 ||
          pases > 50
        ) {
          throw new Error(
            "La invitación no contiene un número de pases válido."
          );
        }

        setIdInvitacion(id);
        setNombreInvitado(nombre);
        setPasesPermitidos(pases);
      } catch (errorDecodificacion) {
        console.error(
          "Error al leer la invitación:",
          errorDecodificacion
        );

        setIdInvitacion("");
        setNombreInvitado("");
        setPasesPermitidos(0);

        setErrorEnlace(
          errorDecodificacion.message ||
            "El enlace de la invitación no es válido."
        );
      } finally {
        setCargandoInvitacion(false);
      }
    };

    cargarDatosInvitacion();
  }, []);

  /*
    Comprueba si esta invitación ya fue confirmada
    desde la sesión actual.
  */
  useEffect(() => {
    if (!idInvitacion) return;

    const confirmacionGuardada =
      sessionStorage.getItem(storageKey);

    if (!confirmacionGuardada) return;

    try {
      const datos = JSON.parse(confirmacionGuardada);

      setEnviado(true);
      setDestinatarioEnviado(
        datos.destinatario || ""
      );

      if (datos.asistencia) {
        setAsistencia(datos.asistencia);
      }

      if (datos.mensaje) {
        setMensajeInvitado(datos.mensaje);
      }

      if (datos.invitados) {
        setInvitadosSeleccionados(
          String(datos.invitados)
        );
      }
    } catch {
      sessionStorage.removeItem(storageKey);
    }
  }, [idInvitacion, storageKey]);

  const formularioBloqueado =
    enviandoA !== "" ||
    enviado ||
    cargandoInvitacion ||
    Boolean(errorEnlace) ||
    !nombreInvitado ||
    pasesPermitidos < 1;

  const validarFormulario = () => {
    if (cargandoInvitacion) {
      setError(
        "Espera mientras cargamos los datos de la invitación."
      );
      return false;
    }

    if (errorEnlace || !idInvitacion) {
      setError(
        "Abre el enlace personalizado generado para esta invitación."
      );
      return false;
    }

    if (!nombreInvitado.trim()) {
      setError(
        "No se encontró el nombre del invitado."
      );
      return false;
    }

    if (
      !Number.isInteger(pasesPermitidos) ||
      pasesPermitidos < 1
    ) {
      setError(
        "No se encontró un número válido de pases."
      );
      return false;
    }

    if (!asistencia) {
      setError(
        "Selecciona si asistirás o no al evento."
      );
      return false;
    }

    if (asistencia === "Sí asistiré") {
      const cantidadSeleccionada = Number(
        invitadosSeleccionados
      );

      if (
        !invitadosSeleccionados ||
        !Number.isInteger(cantidadSeleccionada) ||
        cantidadSeleccionada < 1
      ) {
        setError(
          "Selecciona cuántas personas asistirán."
        );
        return false;
      }

      if (cantidadSeleccionada > pasesPermitidos) {
        setError(
          `Esta invitación tiene un máximo de ${pasesPermitidos} ${
            pasesPermitidos === 1 ? "pase" : "pases"
          }.`
        );
        return false;
      }
    }

    setError("");
    return true;
  };

  /*
    Si confirma asistencia, se envía el número de personas
    seleccionado por el invitado, sin superar los pases
    asignados por el generador.

    Si no asistirá, se envía 0.
  */
  const obtenerNumeroAsistentes = () => {
    return asistencia === "Sí asistiré"
      ? Number(invitadosSeleccionados)
      : 0;
  };

  const crearMensajeWhatsApp = (destinatario) => {
    const numeroAsistentes =
      obtenerNumeroAsistentes();

    const descripcionPersonas =
      asistencia === "Sí asistiré"
        ? `${numeroAsistentes} ${
            numeroAsistentes === 1
              ? "persona"
              : "personas"
          }`
        : "No aplica";

    const mensaje = [
      `Hola ${destinatario} 💍`,
      "",
      "Quiero confirmar mi asistencia a la boda de Sarai y Roberto.",
      "",
      `Invitación para: ${nombreInvitado}`,
      `Asistencia: ${asistencia}`,
      `Pases asignados: ${pasesPermitidos}`,
      `Número de personas: ${descripcionPersonas}`,
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
      Impide envíos dobles por pulsaciones consecutivas.
    */
    if (formularioBloqueado) return;

    if (!validarFormulario()) return;

    setEnviandoA(lado);
    setError("");

    /*
      Abre la pestaña durante el clic original para evitar
      que el navegador bloquee WhatsApp después del fetch.
    */
    const ventanaWhatsApp = window.open("", "_blank");

    const numeroAsistentes =
      obtenerNumeroAsistentes();

    const datos = {
      nombre: nombreInvitado.trim(),
      pases: pasesPermitidos,
      asistencia,
      invitados: numeroAsistentes,
      mensaje: mensajeInvitado.trim(),
      lado,
      idInvitacion,
    };

    try {
      const respuesta = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(datos),
      });

      /*
        Intentamos leer la respuesta cuando sea posible.

        Algunas implementaciones de Apps Script pueden devolver
        una redirección. En esos casos, si fetch no genera error,
        se continúa con WhatsApp.
      */
      if (
        respuesta &&
        respuesta.type !== "opaque"
      ) {
        try {
          const resultado = await respuesta.json();

          if (resultado?.success === false) {
            throw new Error(
              resultado.message ||
                "Apps Script rechazó la confirmación."
            );
          }
        } catch (errorJson) {
          /*
            Si la respuesta no es JSON, no bloqueamos el proceso,
            salvo que sea un error creado explícitamente arriba.
          */
          if (
            errorJson.message ===
            "Apps Script rechazó la confirmación."
          ) {
            throw errorJson;
          }
        }
      }

      const mensajeWhatsApp =
        crearMensajeWhatsApp(destinatario);

      const telefonoLimpio = String(numero).replace(
        /\D/g,
        ""
      );

      const urlWhatsApp =
        `https://wa.me/${telefonoLimpio}` +
        `?text=${encodeURIComponent(
          mensajeWhatsApp
        )}`;

      setEnviado(true);
      setEnviandoA("");
      setDestinatarioEnviado(destinatario);

      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          enviado: true,
          lado,
          destinatario,
          nombre: nombreInvitado,
          pases: pasesPermitidos,
          asistencia,
          invitados: numeroAsistentes,
          mensaje: mensajeInvitado.trim(),
          fecha: new Date().toISOString(),
        })
      );

      if (ventanaWhatsApp) {
        ventanaWhatsApp.location.href =
          urlWhatsApp;
      } else {
        window.location.href = urlWhatsApp;
      }
    } catch (errorFetch) {
      console.error(
        "Error al registrar la confirmación:",
        errorFetch
      );

      if (ventanaWhatsApp) {
        ventanaWhatsApp.close();
      }

      setError(
        errorFetch.message ||
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
            Ayúdanos a preparar cada detalle confirmando tu
            asistencia.
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
              src="/Final.png"
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
                  text-center
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
                  text-center
                  leading-tight
                  text-white

                  sm:text-5xl
                "
              >
                Ponme como un sello sobre tu corazón
              </p>

              <div className="mt-5 h-px w-20 bg-[#D1A697]" />
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
                Confirma tu asistencia y selecciona a cuál de
                los novios deseas enviar la confirmación.
              </p>

              <div className="my-8 h-px w-full bg-[#D1A697]/35" />

              {/* CARGANDO DATOS */}
              {cargandoInvitacion && (
                <div
                  className="
                    mb-6
                    flex
                    items-center
                    justify-center
                    gap-3
                    rounded-[20px]
                    border
                    border-[#D1A697]/40
                    bg-white/70
                    px-5
                    py-6
                  "
                >
                  <LoaderCircle
                    size={21}
                    className="animate-spin text-[#D1A697]"
                  />

                  <p className="font-playfair text-sm text-[#3A415F]">
                    Cargando datos de la invitación...
                  </p>
                </div>
              )}

              {/* ERROR DEL ENLACE */}
              {!cargandoInvitacion && errorEnlace && (
                <div
                  className="
                    mb-6
                    rounded-[20px]
                    border
                    border-[#D1A697]/55
                    bg-[#EDD2C2]/45
                    px-5
                    py-5
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
                    {errorEnlace}
                  </p>

                  <p
                    className="
                      mt-2
                      font-playfair
                      text-xs
                      leading-5
                      text-[#3A415F]/75
                    "
                  >
                    Abre el enlace personalizado creado desde
                    el generador.
                  </p>
                </div>
              )}

              {!cargandoInvitacion && !errorEnlace && (
                <div className="space-y-5">
                  {/* DATOS DEL INVITADO */}
                  <div
                    className="
                      rounded-[24px]
                      border
                      border-[#D1A697]/45
                      bg-white/75
                      p-5
                      shadow-[0_16px_40px_rgba(26,28,41,0.06)]

                      sm:p-6
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        gap-5

                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#1A1C29]
                            text-[#F6F4F0]
                          "
                        >
                          <UserRound
                            size={21}
                            strokeWidth={1.5}
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              font-playfair
                              text-[9px]
                              uppercase
                              tracking-[0.28em]
                              text-[#D1A697]

                              sm:text-[10px]
                            "
                          >
                            Invitación para
                          </p>

                          <p
                            className="
                              mt-1
                              break-words
                              font-playfair
                              text-xl
                              text-[#1A1C29]

                              sm:text-2xl
                            "
                          >
                            {nombreInvitado}
                          </p>
                        </div>
                      </div>

                      <div
                        className="
                          flex
                          shrink-0
                          items-center
                          gap-3
                          rounded-[18px]
                          bg-[#EDD2C2]/45
                          px-4
                          py-3
                        "
                      >
                        <UsersRound
                          size={20}
                          strokeWidth={1.5}
                          className="text-[#1A1C29]"
                        />

                        <div>
                          <p
                            className="
                              font-playfair
                              text-[9px]
                              uppercase
                              tracking-[0.2em]
                              text-[#3A415F]/65
                            "
                          >
                            Pases
                          </p>

                          <p
                            className="
                              font-playfair
                              text-lg
                              font-semibold
                              text-[#1A1C29]
                            "
                          >
                            {pasesPermitidos}
                          </p>
                        </div>

                        <LockKeyhole
                          size={16}
                          strokeWidth={1.5}
                          className="text-[#D1A697]"
                        />
                      </div>
                    </div>
                  </div>

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

                          setInvitadosSeleccionados(
                            (cantidadActual) => {
                              const cantidad = Number(
                                cantidadActual
                              );

                              if (
                                Number.isInteger(cantidad) &&
                                cantidad >= 1 &&
                                cantidad <= pasesPermitidos
                              ) {
                                return cantidadActual;
                              }

                              return "1";
                            }
                          );

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
                        <Check
                          size={18}
                          strokeWidth={1.7}
                        />
                        Sí asistiré
                      </button>

                      <button
                        type="button"
                        disabled={formularioBloqueado}
                        onClick={() => {
                          setAsistencia(
                            "No podré asistir"
                          );
                          setInvitadosSeleccionados("");
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
                            asistencia ===
                            "No podré asistir"
                              ? "border-[#3A415F] bg-[#3A415F] text-[#F6F4F0] shadow-[0_12px_28px_rgba(58,65,95,0.18)]"
                              : "border-[#D1A697]/40 bg-white/75 text-[#1A1C29] hover:border-[#D1A697] hover:bg-[#EDD2C2]/35"
                          }
                        `}
                      >
                        No podré asistir
                      </button>
                    </div>
                  </div>

                  {/* PERSONAS QUE ASISTIRÁN */}
                  <AnimatePresence initial={false}>
                    {asistencia === "Sí asistiré" && (
                      <motion.div
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
                        className="overflow-hidden"
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
                          ¿Cuántas personas asistirán?
                        </span>

                        <div
                          className="
                            rounded-[20px]
                            border
                            border-[#D1A697]/40
                            bg-white/75
                            p-4

                            sm:p-5
                          "
                        >
                          <div className="mb-4 flex items-center gap-3">
                            <div
                              className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#EDD2C2]/55
                              "
                            >
                              <UsersRound
                                size={19}
                                strokeWidth={1.5}
                                className="text-[#1A1C29]"
                              />
                            </div>

                            <div>
                              <p
                                className="
                                  font-playfair
                                  text-sm
                                  text-[#1A1C29]
                                "
                              >
                                Selecciona el número de asistentes
                              </p>

                              <p
                                className="
                                  mt-1
                                  font-playfair
                                  text-xs
                                  leading-5
                                  text-[#3A415F]/60
                                "
                              >
                                Tienes hasta {pasesPermitidos}{" "}
                                {pasesPermitidos === 1
                                  ? "pase disponible"
                                  : "pases disponibles"}
                              </p>
                            </div>
                          </div>

                          <div
                            className="
                              grid
                              grid-cols-2
                              gap-3

                              sm:grid-cols-3
                            "
                          >
                            {Array.from(
                              { length: pasesPermitidos },
                              (_, indice) => indice + 1
                            ).map((cantidad) => {
                              const seleccionado =
                                Number(
                                  invitadosSeleccionados
                                ) === cantidad;

                              return (
                                <motion.button
                                  key={cantidad}
                                  type="button"
                                  disabled={formularioBloqueado}
                                  onClick={() => {
                                    setInvitadosSeleccionados(
                                      String(cantidad)
                                    );
                                    setError("");
                                  }}
                                  whileHover={
                                    formularioBloqueado
                                      ? {}
                                      : {
                                          y: -2,
                                          scale: 1.02,
                                        }
                                  }
                                  whileTap={
                                    formularioBloqueado
                                      ? {}
                                      : {
                                          scale: 0.97,
                                        }
                                  }
                                  className={`
                                    flex
                                    min-h-[58px]
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-[16px]
                                    border
                                    px-4
                                    py-3
                                    font-playfair
                                    text-sm
                                    transition
                                    duration-300

                                    disabled:cursor-not-allowed
                                    disabled:opacity-60

                                    ${
                                      seleccionado
                                        ? "border-[#1A1C29] bg-[#1A1C29] text-[#F6F4F0] shadow-[0_10px_24px_rgba(26,28,41,0.18)]"
                                        : "border-[#D1A697]/40 bg-[#F6F4F0] text-[#1A1C29] hover:border-[#D1A697] hover:bg-[#EDD2C2]/30"
                                    }
                                  `}
                                >
                                  {seleccionado && (
                                    <Check
                                      size={16}
                                      strokeWidth={1.8}
                                    />
                                  )}

                                  {cantidad}{" "}
                                  {cantidad === 1
                                    ? "persona"
                                    : "personas"}
                                </motion.button>
                              );
                            })}
                          </div>

                          <div
                            className="
                              mt-4
                              flex
                              items-center
                              justify-between
                              gap-3
                              rounded-[14px]
                              bg-[#EDD2C2]/30
                              px-4
                              py-3
                            "
                          >
                            <p
                              className="
                                font-playfair
                                text-xs
                                text-[#3A415F]/70
                              "
                            >
                              Pases asignados
                            </p>

                            <div className="flex items-center gap-2">
                              <p
                                className="
                                  font-playfair
                                  text-sm
                                  font-semibold
                                  text-[#1A1C29]
                                "
                              >
                                {pasesPermitidos}
                              </p>

                              <LockKeyhole
                                size={14}
                                strokeWidth={1.5}
                                className="text-[#D1A697]"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
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
                        setMensajeInvitado(
                          event.target.value
                        )
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
                          Confirmación registrada
                          correctamente.
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
                            Se abrió WhatsApp para
                            enviarla a{" "}
                            {destinatarioEnviado}.
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* BOTONES */}
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
                        formularioBloqueado
                          ? {}
                          : {
                              y: -3,
                              scale: 1.01,
                            }
                      }
                      whileTap={
                        formularioBloqueado
                          ? {}
                          : { scale: 0.98 }
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
                          <CheckCircle2
                            size={19}
                            strokeWidth={1.7}
                          />
                          Confirmación enviada
                        </>
                      ) : (
                        <>
                          <MessageCircle
                            size={19}
                            strokeWidth={1.7}
                          />
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
                        formularioBloqueado
                          ? {}
                          : {
                              y: -3,
                              scale: 1.01,
                            }
                      }
                      whileTap={
                        formularioBloqueado
                          ? {}
                          : { scale: 0.98 }
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
                          <CheckCircle2
                            size={19}
                            strokeWidth={1.7}
                          />
                          Confirmación enviada
                        </>
                      ) : (
                        <>
                          <Send
                            size={19}
                            strokeWidth={1.7}
                          />
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
                      Al seleccionar un botón, tu
                      confirmación se registrará y después
                      se abrirá WhatsApp.
                    </p>
                  )}
                </div>
              )}
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