import React, { useState, useEffect } from "react";
import db from "../../../DB/LolChampionsComplete.jsx";
import PositionSlot from "./PositionSlot";
import GameControl from "../../Componentes/GameControl";
import Shurima from "./assets/Shurima.jpg";
import Ionia from "./assets/Ionia.jpg";
import Noxus from "./assets/Noxus.jpg";
import Piltover from "./assets/Piltover.jpg";
import Freljord from "./assets/Freljord.jpg";
import Targon from "./assets/Targon.jpg";
import ElVacio from "./assets/El Vacío.jpg";
import Zaun from "./assets/Zaun.jpg";
import BandleCity from "./assets/Bandle City.jpg";
import IslasDeLasSombras from "./assets/Islas de las Sombras.jpg";
import Demacia from "./assets/Demacia.jpg";
import Aguasturbias from "./assets/Aguasturbias.jpg";
import Ixtal from "./assets/Ixtal.jpg";
import Runeterra from "./assets/Runeterra.jpg";
import SummonersRift from "./assets/SummonersRiftMap.jpg";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const POSITIONS = ["TOP", "JUNGLA", "MID", "INFERIOR", "SOPORTE"];
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

  // NUEVOS ESTADOS PARA LOGICA DE PARTIDA
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const MAX_ATTEMPTS = 10;

  useEffect(() => {
    const regionesUnicas = Array.from(
      new Set(db.caracCampeones.flatMap((champ) => champ.regiones || [])),
    );
    const regionesPermitidas = regionesUnicas.filter((region) =>
      REGIONES_PERMITIDAS.includes(region),
    );
    const barajadas = shuffleArray(regionesPermitidas);
    setRegionesDisponibles(barajadas);
    elegirRegionValida(barajadas, []);
  }, []);

  const elegirRegionValida = (regiones, yaUsadas) => {
    for (const region of regiones) {
      if (yaUsadas.includes(region)) continue;
      const campeonesRegion = db.caracCampeones.filter((champ) =>
        champ.regiones?.includes(region),
      );
      const posicionesLibres = POSITIONS.filter(
        (pos) => !guessedChampions[pos],
      );
      const hayCampeonCompatible = campeonesRegion.some((champ) =>
        champ.posiciones.some((pos) =>
          posicionesLibres.includes(pos.toUpperCase()),
        ),
      );
      if (hayCampeonCompatible) {
        setRegionObjetivo(region);
        setRegionesUsadas((prev) => [...prev, region]);
        return;
      }
    }
    setGameOver(true);
    setMessage("No quedan regiones válidas");
  };

  const handleGuess = (inputValue) => {
    if (gameOver) return;

    const foundChampion = db.caracCampeones.find(
      (champ) =>
        champ.nombre.toLowerCase().trim() === inputValue.toLowerCase().trim(),
    );

    if (!foundChampion) {
      setMessage("Campeón no encontrado");
      return;
    }

    if (Object.values(guessedChampions).includes(foundChampion.nombre)) {
      setMessage("Campeón ya puesto");
      return;
    }

    // Aumentar intentos
    const nuevosIntentos = attempts + 1;
    setAttempts(nuevosIntentos);

    const coincide = foundChampion.regiones?.includes(regionObjetivo);
    if (!regionAdivinada && coincide) {
      setRegionAdivinada(true);
    } else if (!regionAdivinada && !coincide) {
      setMessage(`Región incorrecta para ${foundChampion.nombre}`);
      verificarDerrota(nuevosIntentos);
      return;
    }

    const posicionesLibres = POSITIONS.filter((pos) => !guessedChampions[pos]);
    const tienePosicionesLibres = foundChampion.posiciones.some((pos) =>
      posicionesLibres.includes(pos.toUpperCase()),
    );

    if (!tienePosicionesLibres) {
      setMessage(`Sin posición libre para ${foundChampion.nombre}`);
      verificarDerrota(nuevosIntentos);
      return;
    }

    const posicionesDisponibles = foundChampion.posiciones
      .map((pos) => pos.toUpperCase())
      .filter((pos) => POSITIONS.includes(pos) && !guessedChampions[pos]);

    if (posicionesDisponibles.length > 0) {
      const posicionElegida =
        posicionesDisponibles[
          Math.floor(Math.random() * posicionesDisponibles.length)
        ];
      const nuevoEquipo = {
        ...guessedChampions,
        [posicionElegida]: foundChampion.nombre,
      };
      setGuessedChampions(nuevoEquipo);
      setMessage("");
      setRegionAdivinada(false);

      if (Object.values(nuevoEquipo).every((champ) => champ !== null)) {
        setGameOver(true);
      } else {
        elegirRegionValida(regionesDisponibles, [
          ...regionesUsadas,
          regionObjetivo,
        ]);
        verificarDerrota(nuevosIntentos);
      }
    }
  };

  const verificarDerrota = (n) => {
    if (n >= MAX_ATTEMPTS) {
      setGameOver(true);
      setMessage("PERDISTE: Te has quedado sin intentos");
    }
  };

  const handleSurrender = () => {
    setGameOver(true);
    // Buscar un campeón que servía para la región actual
    const ejemplo = db.caracCampeones.find(
      (champ) =>
        champ.regiones?.includes(regionObjetivo) &&
        champ.posiciones.some((p) => !guessedChampions[p.toUpperCase()]),
    );
    setMessage(
      `RENDICIÓN. Un ejemplo era: ${ejemplo ? ejemplo.nombre : "???"}`,
    );
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
  const ganaste = Object.values(guessedChampions).every(
    (champ) => champ !== null,
  );

  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-[#010a13] p-2 font-sans text-[#f0e6d2] overflow-hidden">
      <div className="flex flex-col items-center mt-2">
        <h2 className="text-[#c8aa6e] text-[10px] font-black uppercase tracking-[0.2em] mb-1">
          Región Objetivo
        </h2>
        <div className="flex items-center gap-3 bg-[#0a1428] border border-[#785a28] px-3 py-2 shadow-lg">
          {regionImages[regionObjetivo] && (
            <img
              className="w-10 h-10 object-contain"
              src={regionImages[regionObjetivo]}
              alt={regionObjetivo}
            />
          )}
          <span className="text-xl font-black italic uppercase text-[#f0e6d2]">
            {regionObjetivo}
          </span>
        </div>
      </div>

      <div className="relative w-[420px] h-[420px] border-2 border-[#785a28] shadow-2xl rounded-lg overflow-hidden my-2">
        <img
          src={SummonersRift}
          alt="Summoners Rift"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute top-[12%] left-[12%] transform -translate-x-1/2 -translate-y-1/2 z-10">
          <PositionSlot position="TOP" champion={guessedChampions.TOP} />
        </div>
        <div className="absolute top-[35%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 z-10">
          <PositionSlot position="JUNGLA" champion={guessedChampions.JUNGLA} />
        </div>
        <div className="absolute top-[48%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 z-10">
          <PositionSlot position="MID" champion={guessedChampions.MID} />
        </div>
        <div className="absolute bottom-[28%] right-[18%] transform translate-x-1/2 translate-y-1/2 z-10">
          <PositionSlot
            position="INFERIOR"
            champion={guessedChampions.INFERIOR}
          />
        </div>
        <div className="absolute bottom-[10%] right-[10%] transform translate-x-1/2 translate-y-1/2 z-10">
          <PositionSlot
            position="SOPORTE"
            champion={guessedChampions.SOPORTE}
          />
        </div>
      </div>

      <div className="w-full max-w-lg mb-2">
        <div className="h-12 flex items-center justify-center mb-2">
          {ganaste ? (
            <div className="w-full py-2 px-3 bg-green-900/30 border border-green-500 text-green-400 font-black uppercase tracking-[0.3em] shadow-[0_0_15px_rgba(34,197,94,0.4)] animate-bounce text-center">
              ¡VICTORIA! Equipo completado
            </div>
          ) : message ? (
            <div
              className={`w-full py-2 px-3 border-l-2 text-xs font-bold animate-pulse text-center ${message.includes("incorrecta") || message.includes("PERDISTE") || message.includes("RENDICIÓN") ? "bg-red-900/20 border-red-600 text-red-400" : "bg-blue-900/20 border-blue-600 text-blue-400"}`}
            >
              {message}
            </div>
          ) : (
            <div className="h-full w-full"></div>
          )}
        </div>

        <GameControl
          onGuess={handleGuess}
          onSurrender={handleSurrender}
          attempts={attempts}
          maxAttempts={MAX_ATTEMPTS}
          gameOver={gameOver}
        />
      </div>
    </div>
  );
}

export default Rift5;
