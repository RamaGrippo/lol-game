import React, { useState, useEffect, useRef } from "react";
import campeonesData from "../../DB/LolChampionsComplete.jsx";

function GameControl({
  onGuess,
  onSurrender,
  attempts = 0,
  maxAttempts = 10,
  gameOver = false,
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredChampions, setFilteredChampions] = useState([]);

  // Referencia para poder darle foco al input automáticamente
  const inputRef = useRef(null);

  // EFECTO: Escuchar teclado globalmente y manejar selección rápida con Enter
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (gameOver) return;

      // --- LÓGICA DE SELECCIÓN CON ENTER ---
      if (e.key === "Enter") {
        if (filteredChampions.length > 0) {
          handleSelectChampion(filteredChampions[0].nombre);
          // Quitamos el foco para que la próxima tecla física lo resetee limpiamente
          inputRef.current.blur();
        }
        return;
      }

      // --- LÓGICA DE FOCO AUTOMÁTICO ---
      // Si ya estamos escribiendo en el input, no hacemos nada extra
      if (document.activeElement === inputRef.current) return;

      // Solo actuar si es una tecla de carácter (letra, número, etc.)
      // Evitamos teclas de sistema como F5, Alt, Control, etc.
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [gameOver, filteredChampions]); // Escuchamos cambios en filteredChampions para que Enter siempre tenga la lista fresca

  const handleInputChange = (e) => {
    if (gameOver) return;
    const value = e.target.value;
    setInputValue(value);

    const champions = campeonesData.caracCampeones || [];

    if (value.length >= 1) {
      const filtered = champions.filter((champ) =>
        champ.nombre.toLowerCase().startsWith(value.toLowerCase()),
      );
      setFilteredChampions(filtered);
    } else {
      setFilteredChampions([]);
    }
  };

  const handleSelectChampion = (championName) => {
    onGuess(championName);
    setInputValue("");
    setFilteredChampions([]);
  };

  return (
    <div
      className={`flex flex-col items-center gap-6 w-full max-w-2xl mx-auto p-6 bg-[#010a13]/80 backdrop-blur-md border-t-2 border-[#785a28]/30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-opacity ${
        gameOver ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Contador de Intentos Dinámico */}
      <div className="flex items-center gap-3">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c8aa6e]"></div>
        <span className="text-[#c8aa6e] text-xs font-black uppercase tracking-[0.3em]">
          Intentos restantes:{" "}
          <span className="text-[#f0e6d2] text-lg ml-2">
            {maxAttempts - attempts}
          </span>
        </span>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c8aa6e]"></div>
      </div>

      <div className="flex w-full gap-4 items-end">
        <div className="relative flex-1 group">
          <label className="text-[10px] text-[#a09b8c] uppercase font-bold mb-1 block ml-2 tracking-widest">
            {gameOver ? "Partida terminada" : "Selecciona tu campeón"}
          </label>
          <input
            ref={inputRef}
            type="text"
            disabled={gameOver}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={gameOver ? "---" : "Escribe el nombre..."}
            className="w-full bg-[#0a1428] border-2 border-[#785a28] p-3 text-[#f0e6d2] placeholder-[#5b5a56] focus:outline-none focus:border-[#c8aa6e] focus:shadow-[0_0_15px_rgba(200,170,110,0.2)] transition-all font-bold disabled:cursor-not-allowed"
          />

          {/* Lista de Autocomplete */}
          {filteredChampions.length > 0 && !gameOver && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-[#0a1428] border-2 border-[#c8aa6e] max-h-60 overflow-y-auto z-50 shadow-[0_0_20px_rgba(0,0,0,0.8)] border-b-0 rounded-t-md">
              {filteredChampions.map((champ) => (
                <div
                  key={champ._id}
                  onClick={() => handleSelectChampion(champ.nombre)}
                  className="p-3 text-[#c8aa6e] hover:bg-[#c8aa6e] hover:text-[#010a13] cursor-pointer font-bold transition-colors border-b border-[#785a28]/20 last:border-0"
                >
                  {champ.nombre}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onSurrender}
          disabled={gameOver}
          className="px-6 h-[52px] border-2 border-red-900 text-red-500 font-black uppercase text-xs tracking-widest hover:bg-red-900 hover:text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Rendirse
        </button>
      </div>

      <div className="w-24 h-[2px] bg-[#785a28]/50"></div>
    </div>
  );
}

export default GameControl;
