import React, { useState, useEffect } from "react";
import caracCampeones from "./LolChampionsLoldle";
import PositionSlot from "./PositionSlot";
import GameControl from "../../Componentes/GameControl";

// 🔹 Obtenemos todas las regiones posibles
const REGIONES = Array.from(
  new Set(caracCampeones.flatMap((champ) => champ.regiones || []))
);

// 🔸 Usamos solo las posiciones que el juego va a reconocer
const POSITIONS = ["TOP", "JUNGLA", "MID", "ADC", "SUP"];

function Rift5() {
  const [guessedChampions, setGuessedChampions] = useState({
    TOP: null,
    JUNGLA: null,
    MID: null,
    ADC: null,
    SUP: null,
  });

  const [regionObjetivo, setRegionObjetivo] = useState("");
  const [regionAdivinada, setRegionAdivinada] = useState(false);
  const [message, setMessage] = useState(""); // Mensajes para mostrar en la interfaz

  useEffect(() => {
    const randomRegion = REGIONES[Math.floor(Math.random() * REGIONES.length)];
    setRegionObjetivo(randomRegion);
  }, []);

  const handleGuess = (inputValue) => {
    const foundChampion = caracCampeones.find(
      (champ) =>
        champ.nombre.toLowerCase().trim() === inputValue.toLowerCase().trim()
    );

    if (!foundChampion) {
      setMessage("Campeón no encontrado");
      return;
    }

    // 🔸 Verificar región
    const coincide = foundChampion.regiones?.includes(regionObjetivo);
    if (!regionAdivinada && coincide) {
      setRegionAdivinada(true);
      setMessage(
        `¡Correcto! ${foundChampion.nombre} pertenece a ${regionObjetivo}`
      );
    } else if (!regionAdivinada && !coincide) {
      setMessage(`No coincide la región con ${foundChampion.nombre}`);
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
      }
    });

    if (!updated) {
      setMessage(
        "Ese campeón ya está en esa posición o no tiene una posición válida"
      );
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

      {/* Sección para mostrar mensajes */}
      <div className="message-box">{message && <p>{message}</p>}</div>
    </div>
  );
}

export default Rift5;
