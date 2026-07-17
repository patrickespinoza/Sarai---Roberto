import Carousel from "./componentes-encabezado/carrusel";
import Portada from "./componentes-encabezado/portada";
import Contador from "./componentes-encabezado/Contador";
import Celebracion from "./componentes-encabezado/Ubicacion";
import Dresscode from "./componentes-encabezado/Dresscode";
import Regalos from "./componentes-encabezado/Regalos";
import Confirmacion from "./componentes-encabezado/Confirmacion";
import Spotify from "./componentes-encabezado/spotify";

export default function Intinerario() {
  return (
    <div>
      <Portada />

      <Contador />

      <Celebracion />

      <Dresscode />

      <Carousel />

      <Regalos />

      <Confirmacion />

      <Spotify/>
    </div>
  );
}