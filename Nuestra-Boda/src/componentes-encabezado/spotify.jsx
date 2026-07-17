import React from "react";
import { motion } from "framer-motion";
import { Music2, ExternalLink } from "lucide-react";

const Spotify = ({
  imagen = "/Spotify.PNG",
  link = "https://open.spotify.com/playlist/6Ye6LP8eXe2rFrSLFeZHNg?si=EgXyLkAwS92dyqSFgiktZA&utm_source=copy-link&pi=XysnaEdKSnW3y",
}) => {
  return (
    <section className="relative overflow-hidden bg-white py-24 px-5">

      {/* Glow */}
      <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full  blur-[100px]" />
      <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .9 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto"
      >
        <div
          className="
            bg-white
            rounded-[2.8rem]
            overflow-hidden
            shadow-[0_25px_70px_rgba(26,28,41,.15)]
            border border-[#D1A697]/40
            grid
            lg:grid-cols-2
          "
        >

          {/* Imagen */}

<div className="flex flex-col items-center p-6 sm:p-8">

  <img
    src={imagen}
    alt="Playlist"
    className="
      w-full
      rounded-3xl
      shadow-2xl
      object-cover
    "
  />

  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="
      mt-8
      inline-flex
      items-center
      justify-center
      gap-3
      bg-[#1A1C29]
      text-white
      px-8
      py-4
      rounded-full
      font-playfair
      text-lg
      font-semibold
      shadow-[0_15px_35px_rgba(0,0,0,.25)]
      hover:bg-[#E4C4B5]
      hover:scale-105
      transition-all
      duration-300
    "
  >
    <Music2 size={20} />
    Escuchar Playlist
    <ExternalLink size={18} />
  </a>

</div>

          {/* Texto */}

          <div className="flex flex-col justify-center px-8 py-14 sm:px-14">

            <p className="uppercase  text-center tracking-[.35em] text-black text-lg font-semibold">
              Nuestra Música
            </p>

            

            <div className="w-24 h-px bg-white my-8"></div>

            <img src="/sello.png" alt="sello spotify" />


          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default Spotify;