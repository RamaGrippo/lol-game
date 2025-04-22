import React, { useState, useEffect } from "react";
import db from "../../../DB/LolChampionsComplete";
import PositionSlot from "./PositionSlot";
import GameControl from "../../Componentes/GameControl";

// 🔹 Barajar un array aleatoriamente
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// 🔸 Posiciones válidas del juego
const POSITIONS = ["TOP", "JUNGLA", "MID", "INFERIOR", "SOPORTE"];

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

  // 🔹 Inicializar las regiones al cargar el juego
  useEffect(() => {
    const regionesUnicas = Array.from(
      new Set(db.caracCampeones.flatMap((champ) => champ.regiones || []))
    );

    const barajadas = shuffleArray(regionesUnicas);
    setRegionesDisponibles(barajadas);
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

    // 🔸 Verificar posición
    let updated = false;
    foundChampion.posiciones.forEach((pos) => {
      const upperPos = pos.toUpperCase();
      if (POSITIONS.includes(upperPos) && !guessedChampions[upperPos]) {
        setGuessedChampions((prev) => ({
          ...prev,
          [upperPos]: foundChampion.nombre,
        }));
        updated = true;

        // 🔁 Elegir nueva región válida
        setRegionAdivinada(false);
        elegirRegionValida(regionesDisponibles, [
          ...regionesUsadas,
          regionObjetivo,
        ]);
      }
    });

    if (!updated) {
      setMessage("Ese campeón no tiene una posición válida");
    }
  };

  return (
    <div className="">
      <h1 className="">RIFT5 - Adivina los campeones</h1>

      <div>
        Región objetivo: <span>{regionObjetivo}</span>
      </div>

      {regionAdivinada && <div>¡Región adivinada correctamente!</div>}

      <div className="">
        {POSITIONS.map((pos) => (
          <PositionSlot
            key={pos}
            position={pos}
            champion={guessedChampions[pos]}
          />
        ))}
      </div>

      <GameControl onGuess={handleGuess} />

      <div className="message-box">{message && <p>{message}</p>}</div>
    </div>
  );
}

export default Rift5;
