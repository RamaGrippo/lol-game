import React, { useState, useEffect } from "react";
import db from "../../../DB/LolChampionsComplete.jsx";
import GameControl from "../../Componentes/GameControl";

function Top7() {
  const [topChampions, setTopChampions] = useState([]);
  const [guessedIds, setGuessedIds] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const CONDICION_TEXTO = "Top 7 Campeones con más Porcentaje de Daño Mágico";

  useEffect(() => {
    const sorted = [...db.caracCampeones]
      .sort((a, b) => {
        const valA = parseFloat(a.porcentaje_magico.replace("%", ""));
        const valB = parseFloat(b.porcentaje_magico.replace("%", ""));
        return valB - valA;
      })
      .slice(0, 7);
    setTopChampions(sorted);
  }, []);

  const handleGuess = (championName) => {
    if (gameOver) return;

    const found = topChampions.find(
      (c) => c.nombre.toLowerCase() === championName.toLowerCase(),
    );

    if (found) {
      if (guessedIds.includes(found.nombre)) {
        setMensaje("Ya adivinaste a " + found.nombre);
      } else {
        const nuevosAdivinados = [...guessedIds, found.nombre];
        setGuessedIds(nuevosAdivinados);
        setMensaje(`¡Correcto! ${found.nombre} está en el top.`);
        if (nuevosAdivinados.length === 7) {
          setGameOver(true);
          setMensaje("¡FELICITACIONES! COMPLETADO");
        }
      }
    } else {
      setMensaje("No está en el Top 7");
    }
    setTimeout(() => !gameOver && setMensaje(""), 2000);
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#010a13] font-sans text-[#f0e6d2] overflow-hidden">
      {/* 1. Header Compacto */}
      <div className="flex flex-col items-center pt-2 flex-shrink-0">
        <h1 className="text-[#c8aa6e] text-lg font-black italic uppercase tracking-tighter">
          TOP 7{" "}
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a09b8c] mt-1">
          {CONDICION_TEXTO}
        </p>
      </div>

      {/* 2. Área de Lista (Sin Scroll) */}
      <div className="flex-1 w-full max-w-xl flex flex-col justify-center gap-1 px-4 py-2">
        {topChampions.map((champ, index) => {
          const isGuessed = guessedIds.includes(champ.nombre);

          return (
            <div
              key={index}
              className={`flex items-center border h-10 md:h-11 transition-all duration-500 shadow-sm ${
                isGuessed
                  ? "border-green-500 bg-green-900/20"
                  : "border-[#785a28]/30 bg-[#0a1428]/40"
              }`}
            >
              {/* Número */}
              <div className="w-10 h-full flex items-center justify-center border-r border-[#785a28]/20 font-black text-[#c8aa6e] text-xs">
                {index + 1}
              </div>

              {/* Pista o Check */}
              <div className="w-12 h-full flex items-center justify-center bg-[#010a13]/30">
                {!isGuessed ? (
                  <span className="text-[8px] text-[#785a28] font-bold uppercase text-center leading-none px-1">
                    {champ.regiones[0]}
                  </span>
                ) : (
                  <span className="text-green-500 text-sm">✔</span>
                )}
              </div>

              {/* Nombre y Dato */}
              <div className="flex-1 px-3 font-black uppercase tracking-widest text-xs">
                {isGuessed ? (
                  <div className="flex justify-between items-center">
                    <span className="animate-fade-in">{champ.nombre}</span>
                    <span className="text-[10px] text-[#c8aa6e] font-mono">
                      {champ.porcentaje_magico}
                    </span>
                  </div>
                ) : (
                  <div className="h-1 w-16 bg-[#1e2328] rounded-full opacity-30"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Footer de Mensajes y Control */}
      <div className="w-full flex-shrink-0">
        <div className="h-8 flex items-center justify-center mb-1">
          {mensaje && (
            <p
              className={`text-[10px] font-black uppercase animate-bounce ${mensaje.includes("¡Correcto") || mensaje.includes("FELICITACIONES") ? "text-green-400" : "text-red-500"}`}
            >
              {mensaje}
            </p>
          )}
        </div>

        <GameControl
          onGuess={handleGuess}
          attempts={guessedIds.length}
          maxAttempts={7}
          gameOver={gameOver}
        />
      </div>
    </div>
  );
}

export default Top7;
