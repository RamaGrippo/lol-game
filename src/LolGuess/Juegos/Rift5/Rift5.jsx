import React, { useState, useEffect } from "react";
import db from "../../../DB/LolChampionsComplete.jsx";
import PositionSlot from "./PositionSlot";
import GameControl from "../../Componentes/GameControl";
import "./Rift5.css";
import Shurima from "./assets/Shurima.jpg";
import Ionia from "./assets/Ionia.jpg";
import Noxus from "./assets/Noxus.jpg";
import Piltover from "./assets/Piltover.jpg";
import Freljord from "./assets/Freljord.jpg";
import Targon from "./assets/Targon.jpg";
import ElVacio from "./assets/El Vacío.jpg"; // Asegúrate de que el archivo no tenga espacios
import Zaun from "./assets/Zaun.jpg";
import BandleCity from "./assets/Bandle City.jpg";
import IslasDeLasSombras from "./assets/Islas de las Sombras.jpg";
import Demacia from "./assets/Demacia.jpg";
import Aguasturbias from "./assets/Aguasturbias.jpg";
import Ixtal from "./assets/Ixtal.jpg";
import Runeterra from "./assets/Runeterra.jpg";

// 🔹 Barajar un array aleatoriamente
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// 🔸 Posiciones válidas del juego
const POSITIONS = ["TOP", "JUNGLA", "MID", "INFERIOR", "SOPORTE"];

// Lista de regiones permitidas
const REGIONES_PERMITIDAS = [
  "Shurima",
  "Ionia",
  "Noxus",
  "Piltover",
  "Freljord",
  "Targon",
  "El vacio",
  "Zaun",
  "Bandle City",
  "Islas de las Sombras",
  "Demacia",
  "Aguasturbias",
  "Ixtal",
  "Runeterra",
];

function Rift5() {
  const [guessedChampions, setGuessedChampions] = useState({
    TOP: null,
    JUNGLA: null,
    MID: null,
    INFERIOR: null,
    SOPORTE: null,
  });

  const [regionObjetivo, setRegionObjetivo] = useState("");
  const [regionAdivinada, setRegionAdivinada] = useState(false);
  const [message, setMessage] = useState("");
  const [regionesUsadas, setRegionesUsadas] = useState([]);
  const [regionesDisponibles, setRegionesDisponibles] = useState([]);
  const [wasUpdated, setWasUpdated] = useState(false);

  // 🔹 Inicializar las regiones al cargar el juego
  useEffect(() => {
    // Obtener las regiones únicas de los campeones en la base de datos
    const regionesUnicas = Array.from(
      new Set(db.caracCampeones.flatMap((champ) => champ.regiones || []))
    );

    console.log(regionesUnicas);

    // Filtrar las regiones permitidas de la lista REGIONES_PERMITIDAS
    const regionesPermitidas = regionesUnicas.filter((region) =>
      REGIONES_PERMITIDAS.includes(region)
    );

    // Barajar las regiones permitidas
    const barajadas = shuffleArray(regionesPermitidas);
    setRegionesDisponibles(barajadas);

    // Elegir una región válida
    elegirRegionValida(barajadas, []);
  }, []);

  // 🔸 Elegir nueva región válida
  const elegirRegionValida = (regiones, yaUsadas) => {
    for (const region of regiones) {
      if (yaUsadas.includes(region)) continue;

      const campeonesRegion = db.caracCampeones.filter((champ) =>
        champ.regiones?.includes(region)
      );

      const posicionesLibres = POSITIONS.filter(
        (pos) => !guessedChampions[pos]
      );

      const hayCampeonCompatible = campeonesRegion.some((champ) =>
        champ.posiciones.some((pos) =>
          posicionesLibres.includes(pos.toUpperCase())
        )
      );

      if (hayCampeonCompatible) {
        setRegionObjetivo(region);
        setRegionesUsadas((prev) => [...prev, region]);
        return;
      }
    }

    setMessage("No quedan regiones válidas");
  };

  const handleGuess = (inputValue) => {
    const foundChampion = db.caracCampeones.find(
      (champ) =>
        champ.nombre.toLowerCase().trim() === inputValue.toLowerCase().trim()
    );

    if (!foundChampion) {
      setMessage("Campeón no encontrado");
      return;
    }

    if (Object.values(guessedChampions).includes(foundChampion.nombre)) {
      setMessage("Campeón ya puesto");
      return;
    }

    // 🔹 Verificar región
    const coincide = foundChampion.regiones?.includes(regionObjetivo);
    if (!regionAdivinada && coincide) {
      setRegionAdivinada(true);
    } else if (!regionAdivinada && !coincide) {
      setMessage(`No coincide la región con ${foundChampion.nombre}`);
      return;
    }

    // 🔸 Verificar si el campeón tiene posiciones libres
    const posicionesLibres = POSITIONS.filter((pos) => !guessedChampions[pos]);
    const tienePosicionesLibres = foundChampion.posiciones.some((pos) =>
      posicionesLibres.includes(pos.toUpperCase())
    );
    console.log(tienePosicionesLibres);
    console.log(message);
    if (!tienePosicionesLibres) {
      setMessage(`No hay posiciones libres para ${foundChampion.nombre}`);
      console.log(message);
      return;
    }

    // 🔸 Verificar posición y actualizar
    // Obtener posiciones del campeón que están libres
    const posicionesDisponibles = foundChampion.posiciones
      .map((pos) => pos.toUpperCase())
      .filter((pos) => POSITIONS.includes(pos) && !guessedChampions[pos]);

    // Si hay al menos una posición libre
    if (posicionesDisponibles.length > 0) {
      const posicionElegida =
        posicionesDisponibles[
          Math.floor(Math.random() * posicionesDisponibles.length)
        ];
      setGuessedChampions((prev) => ({
        ...prev,
        [posicionElegida]: foundChampion.nombre,
      }));
      setMessage("");
      setRegionAdivinada(false);
      elegirRegionValida(regionesDisponibles, [
        ...regionesUsadas,
        regionObjetivo,
      ]);
      setWasUpdated(true);
    } else {
      setWasUpdated(false);
      setMessage(`No hay posiciones libres para ${foundChampion.nombre}`);
    }
  };

  const regionImages = {
    Shurima,
    Ionia,
    Noxus,
    Piltover,
    Freljord,
    Targon,
    "El vacio": ElVacio,
    Zaun,
    "Bandle City": BandleCity,
    "Islas de las Sombras": IslasDeLasSombras,
    Demacia,
    Aguasturbias,
    Ixtal,
    Runeterra,
  };

  return (
    <div className="">
      <div className="region-info">
        <h2 className="region-title">
          {regionImages[regionObjetivo] && (
            <img
              className="region-icon"
              src={regionImages[regionObjetivo]}
              alt={regionObjetivo}
            />
          )}
          Región objetivo: <span>{regionObjetivo}</span>
        </h2>
      </div>
      <div className="rift-map">
        <div className="pos top">
          <PositionSlot position="TOP" champion={guessedChampions.TOP} />
        </div>
        <div className="pos jg">
          <PositionSlot position="JUNGLA" champion={guessedChampions.JUNGLA} />
        </div>
        <div className="pos mid">
          <PositionSlot position="MID" champion={guessedChampions.MID} />
        </div>
        <div className="pos adc">
          <PositionSlot
            position="INFERIOR"
            champion={guessedChampions.INFERIOR}
          />
        </div>
        <div className="pos support">
          <PositionSlot
            position="SOPORTE"
            champion={guessedChampions.SOPORTE}
          />
        </div>
      </div>
      {message && (
        <div className="message-box">
          <span className="icon">❌</span>
          <p>{message}</p>
        </div>
      )}
      <GameControl onGuess={handleGuess} />
    </div>
  );
}

export default Rift5;
