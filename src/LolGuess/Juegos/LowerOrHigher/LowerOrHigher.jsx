import React, { useState, useEffect } from "react";
import db from "../../../DB/LolChampionsComplete.jsx";

function LowerOrHigher() {
  const [campeonRef, setCampeonRef] = useState(null); // El que ya conocemos (Campeón 2)
  const [campeonNuevo, setCampeonNuevo] = useState(null); // El que hay que adivinar (Campeón 1)
  const [puntos, setPuntos] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [usados, setUsados] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const ATRIBUTO = "pickrate";
  const CONDICION_TEXTO = "Campeón con mayor Pickrate";

  // Función para obtener valor numérico limpio (ej: "9.6%" -> 9.6)
  const getVal = (c) => parseFloat(c[ATRIBUTO].replace("%", ""));

  const obtenerNuevoCampeon = (referencia) => {
    const filtrados = db.caracCampeones.filter(
      (c) => !usados.includes(c.nombre) && getVal(c) !== getVal(referencia),
    );

    if (filtrados.length === 0) return null;
    return filtrados[Math.floor(Math.random() * filtrados.length)];
  };

  const iniciarJuego = () => {
    const primero =
      db.caracCampeones[Math.floor(Math.random() * db.caracCampeones.length)];
    const segundo = db.caracCampeones.filter(
      (c) => getVal(c) !== getVal(primero),
    )[Math.floor(Math.random() * (db.caracCampeones.length - 1))];

    setCampeonRef(primero);
    setCampeonNuevo(segundo);
    setUsados([primero.nombre, segundo.nombre]);
    setPuntos(0);
    setGameOver(false);
    setMensaje("");
  };

  useEffect(() => {
    iniciarJuego();
  }, []);

  const handleGuess = (eleccion) => {
    if (gameOver) return;

    const valRef = getVal(campeonRef);
    const valNuevo = getVal(campeonNuevo);

    const acertó =
      (eleccion === "higher" && valNuevo > valRef) ||
      (eleccion === "lower" && valNuevo < valRef);

    if (acertó) {
      setMensaje("¡Correcto!");
      setPuntos(puntos + 1);

      const siguiente = obtenerNuevoCampeon(campeonNuevo);
      if (siguiente) {
        setCampeonRef(campeonNuevo);
        setCampeonNuevo(siguiente);
        setUsados((prev) => [...prev, siguiente.nombre]);
      } else {
        setGameOver(true);
        setMensaje("¡Increíble! Te pasaste el juego.");
      }
    } else {
      setGameOver(true);
      setMensaje(
        `Incorrecto. ${campeonNuevo.nombre} tiene ${campeonNuevo[ATRIBUTO]}`,
      );
    }
  };

  if (!campeonRef || !campeonNuevo) return null;

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#010a13] font-sans text-[#f0e6d2] overflow-hidden">
      {/* 1. Header (Estilo unificado) */}
      <div className="flex flex-col items-center mt-4 mb-8 flex-shrink-0">
        <h1 className="text-[#c8aa6e] text-[10px] font-black italic uppercase tracking-widest opacity-50 mb-2">
          LOL GUESSER — HIGHER OR LOWER
        </h1>
        <p className="w-full text-[11px] md:text-sm font-black uppercase tracking-[0.2em] text-[#c8aa6e] text-center px-2 py-1 leading-none">
          {CONDICION_TEXTO}
        </p>
      </div>

      {/* 2. Área de Juego (Comparación) */}
      <div className="flex-1 w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-4 px-4">
        {/* Campeón de Referencia (CONOCIDO) */}
        <div className="flex-1 w-full bg-[#0a1428] border-2 border-[#785a28]/40 p-6 flex flex-col items-center justify-center rounded-lg shadow-lg">
          <span className="text-[10px] text-[#a09b8c] uppercase font-bold mb-2">
            Referencia
          </span>
          <h2 className="text-2xl font-black uppercase text-white mb-2">
            {campeonRef.nombre}
          </h2>
          <div className="text-3xl font-black text-[#c8aa6e] border-t border-[#785a28]/30 pt-2 w-full text-center">
            {campeonRef[ATRIBUTO]}
          </div>
        </div>

        <div className="text-xl font-black text-[#c8aa6e] italic">VS</div>

        {/* Campeón Nuevo (A ADIVINAR) */}
        <div className="flex-1 w-full bg-[#0a1428] border-2 border-[#c8aa6e] p-6 flex flex-col items-center justify-center rounded-lg shadow-[0_0_20px_rgba(200,170,110,0.1)]">
          <span className="text-[10px] text-[#a09b8c] uppercase font-bold mb-2">
            ¿Es mayor o menor?
          </span>
          <h2 className="text-2xl font-black uppercase text-white mb-6">
            {campeonNuevo.nombre}
          </h2>

          {!gameOver ? (
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => handleGuess("higher")}
                className="w-full py-3 border-2 border-[#c8aa6e] text-[#c8aa6e] font-black uppercase text-xs tracking-widest hover:bg-[#c8aa6e] hover:text-[#010a13] transition-all"
              >
                ▲ Higher
              </button>
              <button
                onClick={() => handleGuess("lower")}
                className="w-full py-3 border-2 border-[#785a28] text-[#785a28] font-black uppercase text-xs tracking-widest hover:bg-[#785a28] hover:text-white transition-all"
              >
                ▼ Lower
              </button>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-2xl font-black text-red-500 uppercase italic">
                Game Over
              </span>
              <p className="text-xs mt-2 text-[#a09b8c]">{mensaje}</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Footer (Contador de Racha) */}
      <div className="w-full max-w-2xl mx-auto p-6 bg-[#010a13]/80 backdrop-blur-md border-t-2 border-[#785a28]/30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c8aa6e]"></div>
          <span className="text-[#c8aa6e] text-xs font-black uppercase tracking-[0.3em]">
            Racha actual:{" "}
            <span className="text-[#f0e6d2] text-2xl ml-2">{puntos}</span>
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c8aa6e]"></div>
        </div>

        {gameOver && (
          <button
            onClick={iniciarJuego}
            className="px-8 h-10 border-2 border-[#785a28] text-[#c8aa6e] font-black uppercase text-xs tracking-[0.2em] hover:bg-[#c8aa6e] hover:text-[#010a13] transition-all"
          >
            Reiniciar partida
          </button>
        )}

        <div className="w-24 h-[2px] bg-[#785a28]/50 mt-2"></div>
      </div>
    </div>
  );
}

export default LowerOrHigher;
