import React, { useState, useEffect } from "react";
import db from "../../../DB/LolChampionsComplete.jsx";

function Impostor() {
  const [partida, setPartida] = useState({
    categoria: "",
    campeones: [],
    correctosRestantes: 0,
  });
  const [seleccionados, setSeleccionados] = useState([]); // { nombre, esCorrecto }
  const [gameOver, setGameOver] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // 1. Lógica para generar una partida aleatoria
  const generarPartida = () => {
    // Definimos posibles categorías (puedes agregar más: recursos, clases, etc)
    const categoriasPosibles = [
      {
        nombre: "Región: Shurima",
        filtro: (c) => c.regiones.includes("Shurima"),
      },
      { nombre: "Región: Ionia", filtro: (c) => c.regiones.includes("Ionia") },
      { nombre: "Recurso: Sin Maná", filtro: (c) => c.recurso === "Sin mana" },
      {
        nombre: "Rango: Cuerpo a Cuerpo",
        filtro: (c) => c.rango.includes("Cuerpo a cuerpo"),
      },
      { nombre: "Dificultad: Alta (3)", filtro: (c) => c.dificultad === "3" },
    ];

    const cat =
      categoriasPosibles[Math.floor(Math.random() * categoriasPosibles.length)];

    // Separamos campeones que cumplen y los que no
    const candidatosCorrectos = db.caracCampeones.filter(cat.filtro);
    const candidatosImpostores = db.caracCampeones.filter(
      (c) => !cat.filtro(c),
    );

    // Decidimos cuántos correctos habrá (entre 3 y 7 según tu regla)
    const cantidadCorrectos = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
    const cantidadImpostores = 12 - cantidadCorrectos;

    // Mezclamos y elegimos
    const elegidosCorrectos = [...candidatosCorrectos]
      .sort(() => 0.5 - Math.random())
      .slice(0, cantidadCorrectos);
    const elegidosImpostores = [...candidatosImpostores]
      .sort(() => 0.5 - Math.random())
      .slice(0, cantidadImpostores);

    // Creamos el tablero final mezclado
    const tablero = [...elegidosCorrectos, ...elegidosImpostores]
      .map((c) => ({
        nombre: c.nombre,
        esCorrecto: cat.filtro(c),
      }))
      .sort(() => 0.5 - Math.random());

    setPartida({
      categoria: cat.nombre,
      campeones: tablero,
      correctosRestantes: cantidadCorrectos,
    });
    setSeleccionados([]);
    setGameOver(false);
    setMensaje("");
  };

  useEffect(() => {
    generarPartida();
  }, []);

  const handleSelect = (idx) => {
    if (gameOver || seleccionados.find((s) => s.idx === idx)) return;

    const campeon = partida.campeones[idx];
    const nuevosSeleccionados = [
      ...seleccionados,
      { idx, esCorrecto: campeon.esCorrecto },
    ];
    setSeleccionados(nuevosSeleccionados);

    if (!campeon.esCorrecto) {
      setGameOver(true);
      setMensaje(`¡DERROTA! ${campeon.nombre} es un IMPOSTOR`);
    } else {
      // Contar cuántos correctos quedan
      const aciertos = nuevosSeleccionados.filter((s) => s.esCorrecto).length;
      if (aciertos === partida.campeones.filter((c) => c.esCorrecto).length) {
        setGameOver(true);
        setMensaje("¡VICTORIA! Encontraste a todos los campeones correctos");
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#010a13] font-sans text-[#f0e6d2] overflow-hidden p-4">
      {/* Header */}
      <div className="text-center mb-6 flex-shrink-0">
        <h1 className="text-[#c8aa6e] text-2xl font-black italic uppercase tracking-widest">
          LOL IMPOSTOR
        </h1>
        <div className="flex flex-col items-center mt-1">
          <span className="text-[10px] font-bold uppercase text-[#a09b8c] tracking-[0.3em] mb-1">
            Categoría de hoy:
          </span>
          <span className="w-full text-[11px] md:text-sm font-black uppercase tracking-[0.2em] text-[#c8aa6e] text-center px-2 py-1 leading-none">
            {partida.categoria}
          </span>
        </div>
      </div>

      {/* Grid de Campeones (3x4) */}
      <div className="grid grid-cols-4 grid-rows-3 gap-3 w-full max-w-2xl flex-1 items-center py-4">
        {partida.campeones.map((c, i) => {
          const sel = seleccionados.find((s) => s.idx === i);
          let bgClass =
            "bg-[#0a1428] border-[#785a28]/40 hover:border-[#c8aa6e]";

          if (sel) {
            bgClass = sel.esCorrecto
              ? "bg-green-900/40 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              : "bg-red-900/60 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
          }

          return (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              className={`
                aspect-video flex flex-col items-center justify-center border-2 
                cursor-pointer transition-all duration-300 rounded-md p-2 text-center
                ${bgClass} ${gameOver && !sel ? "opacity-40" : ""}
              `}
            >
              <span className="text-[10px] md:text-sm font-black uppercase tracking-tight">
                {c.nombre}
              </span>
              {sel && (
                <span
                  className={`text-[10px] mt-1 font-bold ${sel.esCorrecto ? "text-green-400" : "text-red-400"}`}
                >
                  {sel.esCorrecto ? "✓ CORRECTO" : "✗ IMPOSTOR"}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer y Mensajes - Estilo Unificado */}
      <div className="w-full max-w-2xl mx-auto p-6 bg-[#010a13]/80 backdrop-blur-md border-t-2 border-[#785a28]/30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4 flex-shrink-0">
        {/* Línea decorativa superior del mensaje */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#785a28]/50"></div>
          <span className="text-[#a09b8c] text-[10px] font-black uppercase tracking-[0.3em]">
            {gameOver ? "Partida Finalizada" : "Misión de hoy"}
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#785a28]/50"></div>
        </div>

        <div className="flex w-full gap-4 items-center justify-center">
          {gameOver ? (
            <div className="flex flex-col items-center animate-fade-in w-full">
              <p
                className={`text-sm font-black uppercase mb-3 tracking-tighter ${mensaje.includes("VICTORIA") ? "text-green-400" : "text-red-400"}`}
              >
                {mensaje}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-[#c8aa6e] text-[11px] md:text-sm font-black uppercase tracking-[0.2em] leading-none">
                Selecciona solo los campeones correctos
              </p>
            </div>
          )}
        </div>

        {/* Pequeño adorno final para consistencia */}
        <div className="w-24 h-[2px] bg-[#785a28]/50 mt-2"></div>
      </div>
    </div>
  );
}

export default Impostor;
