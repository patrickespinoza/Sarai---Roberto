import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Intinerario from "./intinerario";
import Generador from "./Pages/Generador";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Invitación */}
        <Route
          path="/"
          element={<Intinerario />}
        />

        {/* Generador */}
        <Route
          path="/generador"
          element={<Generador />}
        />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);