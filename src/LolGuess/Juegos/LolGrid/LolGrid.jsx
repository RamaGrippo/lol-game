import React, { useState, useEffect } from "react";
import db from "../../../DB/LolChampionsComplete.jsx";
import GameControl from "../../Componentes/GameControl";

function LolGrid() {
  // Estado para la cuadrícula (9 celdas jugables)
  const [gridData, setGridData] = useState(Array(9).fill(null));
  const [selectedCell, setSelectedCell] = useState(null); // Índice de 0 a 8
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("Selecciona una celda para adivinar");

  // Configuración de las categorías (Esto luego podrías hacerlo aleatorio)
  const categories = {
    top: ["Asesino", "Freljord", "Mana"], // Características de las Columnas
    left: ["Soporte", "Dureza 3", "Ionia"], // Características de las Filas
  };

  const handleCellClick = (index) => {
    if (gameOver || gridData[index]) return;
    setSelectedCell(index);
    setMessage(`Buscando campeón para la celda ${index + 1}...`);
  };

  const handleGuess = (championName) => {
    if (selectedCell === null) {
      setMessage("¡Primero selecciona una celda!");
      return;
    }

    const champion = db.caracCampeones.find(
      (c) => c.nombre.toLowerCase() === championName.toLowerCase(),
    );

    if (!champion) return;

    // Obtener condiciones según la celda seleccionada
    const colIndex = selectedCell % 3;
    const rowIndex = Math.floor(selectedCell / 3);
    const colCond = categories.top[colIndex];
    const rowCond = categories.left[rowIndex];

    // Lógica de validación (Ejemplo simple de verificación)
    const validate = (champ, condition) => {
      // Esta lógica debe expandirse según tus datos (regiones, tags, dificultad, etc)
      const dataString = JSON.stringify(champ).toLowerCase();
      return dataString.includes(
        condition.toLowerCase().replace("dureza ", ""),
      );
    };

    const isCorrect =
      validate(champion, colCond) && validate(champion, rowCond);

    if (isCorrect) {
      const newGrid = [...gridData];
      newGrid[selectedCell] = champion.nombre;
      setGridData(newGrid);
      setAttempts(attempts + 1);
      setSelectedCell(null);
      setMessage(`¡Correcto! ${champion.nombre} encaja perfectamente.`);
    } else {
      setAttempts(attempts + 1);
      setMessage(`Incorrecto. ${champion.nombre} no cumple ambas condiciones.`);
    }

    if (attempts + 1 >= 10) setGameOver(true);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-[#010a13] p-4 font-sans text-[#f0e6d2] overflow-hidden">
      <h2 className="text-[#c8aa6e] text-xl font-black uppercase tracking-tighter mb-4 italic">
        Lol Grid
      </h2>

      {/* Contenedor de la Cuadrícula */}
      <div className="grid grid-cols-4 grid-rows-4 gap-2 w-[450px] h-[450px]">
        {/* Esquina vacía */}
        <div className="flex items-center justify-center border border-[#785a28]/20 text-[#c8aa6e] font-black text-xs uppercase text-center bg-[#0a1428]">
          FUTBOL11 GRID
        </div>

        {/* Headers Superiores (Columnas) */}
        {categories.top.map((cat, i) => (
          <div
            key={i}
            className="flex items-center justify-center border-2 border-[#785a28] bg-[#1e2328] text-[#c8aa6e] font-black text-[10px] uppercase text-center p-1"
          >
            {cat}
          </div>
        ))}

        {/* Filas */}
        {categories.left.map((rowCat, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {/* Header Lateral (Fila) */}
            <div className="flex items-center justify-center border-2 border-[#785a28] bg-[#1e2328] text-[#c8aa6e] font-black text-[10px] uppercase text-center p-1">
              {rowCat}
            </div>

            {/* Celdas de Juego */}
            {[0, 1, 2].map((colIndex) => {
              const cellIdx = rowIndex * 3 + colIndex;
              const isSelected = selectedCell === cellIdx;
              const value = gridData[cellIdx];

              return (
                <div
                  key={cellIdx}
                  onClick={() => handleCellClick(cellIdx)}
                  className={`
                    flex items-center justify-center border-2 cursor-pointer transition-all duration-300 font-bold text-xs uppercase p-1 text-center
                    ${value ? "bg-green-900/40 border-green-500 text-white" : "bg-[#0a1428] border-[#785a28]/40 hover:border-[#c8aa6e]"}
                    ${isSelected ? "ring-2 ring-[#c8aa6e] border-[#f0e6d2] shadow-[0_0_15px_rgba(200,170,110,0.3)]" : ""}
                  `}
                >
                  {value ? value : isSelected ? " " : ""}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Sección Inferior: Mensajes y GameControl */}
      <div className="w-full max-w-lg mb-2">
        <div className="h-10 flex items-center justify-center mb-2">
          <p className="text-[#c8aa6e] text-xs font-bold uppercase tracking-widest text-center">
            {message}
          </p>
        </div>

        <GameControl
          onGuess={handleGuess}
          attempts={attempts}
          maxAttempts={9}
          gameOver={gameOver}
        />
      </div>
    </div>
  );
}

export default LolGrid;
