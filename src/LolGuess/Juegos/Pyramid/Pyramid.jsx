import React, { useState, useEffect } from "react";
import db from "../../../DB/LolChampionsComplete.jsx";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function Pyramid() {
  const [piramideActual, setPiramideActual] = useState([]);
  const [solucionValores, setSolucionValores] = useState([]);
  const [slotSeleccionado, setSlotSeleccionado] = useState(null);
  const [correctosBloqueados, setCorrectosBloqueados] = useState([]);
  const [intentosRestantes, setIntentosRestantes] = useState(2);
  const [gameOver, setGameOver] = useState(false);

  const CONDICION_TEXTO =
    "Top 10 Campeones con más Porcentaje de Daño Verdadero";
  const ATRIBUTO_BDD = "porcentaje_verdadero";

  useEffect(() => {
    const campeonesConDato = db.caracCampeones
      .map((c) => ({
        ...c,
        valNum: parseFloat(c[ATRIBUTO_BDD].replace("%", "")) || 0,
      }))
      .filter((c) => c.valNum > 0);

    const elegidos = shuffleArray(campeonesConDato).slice(0, 10);
    const valoresOrdenados = [...elegidos]
      .sort((a, b) => b.valNum - a.valNum)
      .map((c) => c.valNum);

    setSolucionValores(valoresOrdenados);
    setPiramideActual(shuffleArray(elegidos));
  }, []);

  const handleSlotClick = (index) => {
    if (gameOver || correctosBloqueados.includes(index)) return;
    if (slotSeleccionado === null) {
      setSlotSeleccionado(index);
    } else if (slotSeleccionado === index) {
      setSlotSeleccionado(null);
    } else {
      const nuevaPiramide = [...piramideActual];
      const temp = nuevaPiramide[slotSeleccionado];
      nuevaPiramide[slotSeleccionado] = nuevaPiramide[index];
      nuevaPiramide[index] = temp;
      setPiramideActual(nuevaPiramide);
      setSlotSeleccionado(null);
    }
  };

  const handleGuess = () => {
    if (gameOver) return;
    const nuevosCorrectos = [];
    let aciertosTotales = 0;

    piramideActual.forEach((champ, index) => {
      if (champ.valNum === solucionValores[index]) {
        nuevosCorrectos.push(index);
        aciertosTotales++;
      }
    });

    setCorrectosBloqueados(nuevosCorrectos);
    const nuevosIntentos = intentosRestantes - 1;
    setIntentosRestantes(nuevosIntentos);

    if (aciertosTotales === 10 || nuevosIntentos === 0) {
      setGameOver(true);
    }
  };

  const getSlotStyle = (index) => {
    const isSelected = slotSeleccionado === index;
    const isCorrect = correctosBloqueados.includes(index);
    const base =
      "relative flex flex-col items-center justify-center border-2 transition-all duration-300 rounded select-none ";
    if (isCorrect)
      return (
        base +
        "border-green-500 bg-green-900/40 text-green-100 cursor-default shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
      );
    if (isSelected)
      return (
        base +
        "border-[#c8aa6e] bg-[#c8aa6e]/20 cursor-pointer shadow-[0_0_15px_rgba(200,170,110,0.4)] scale-105 z-10"
      );
    return (
      base +
      "border-[#785a28]/40 bg-[#0a1428] hover:border-[#c8aa6e]/80 cursor-pointer"
    );
  };

  const renderBlock = (index) => {
    const champ = piramideActual[index];
    const isCorrect = correctosBloqueados.includes(index);
    return (
      <div
        key={index}
        onClick={() => handleSlotClick(index)}
        className={`${getSlotStyle(index)} w-20 h-20 md:w-24 md:h-24`}
      >
        <span className="absolute top-1 left-2 text-[#c8aa6e]/40 font-black text-[10px]">
          {index + 1}
        </span>
        <span className="font-black uppercase text-[10px] md:text-xs text-center px-1 leading-tight">
          {champ.nombre}
        </span>
        {(isCorrect || gameOver) && (
          <span className="text-[10px] text-[#c8aa6e] font-mono mt-1 bg-black/40 px-1 rounded">
            {champ[ATRIBUTO_BDD]}
          </span>
        )}
      </div>
    );
  };

  if (piramideActual.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-[#010a13] font-sans text-[#f0e6d2] overflow-hidden">
      {/* 1. Header con más espacio */}
      <div className="flex flex-col items-center pt-8 mb-4 flex-shrink-0">
        <p className="w-full text-[11px] md:text-sm font-black uppercase tracking-[0.2em] text-[#c8aa6e] text-center px-2 py-1 leading-none">
          {CONDICION_TEXTO}
        </p>
      </div>

      {/* 2. Pirámide */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2 w-full scale-90 md:scale-100">
        <div className="flex justify-center">{renderBlock(0)}</div>
        <div className="flex gap-2 justify-center">
          {[1, 2].map((i) => renderBlock(i))}
        </div>
        <div className="flex gap-2 justify-center">
          {[3, 4, 5].map((i) => renderBlock(i))}
        </div>
        <div className="flex gap-2 justify-center">
          {[6, 7, 8, 9].map((i) => renderBlock(i))}
        </div>
      </div>

      {/* 3. Footer Minimalista */}
      <div className="w-full max-w-2xl mx-auto p-4 bg-[#010a13]/80 backdrop-blur-md border-t-2 border-[#785a28]/30 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#c8aa6e]"></div>
          <span className="text-[#c8aa6e] text-xs font-black uppercase tracking-[0.4em]">
            Intentos restantes:{" "}
            <span className="text-[#f0e6d2] text-xl ml-2">
              {intentosRestantes}
            </span>
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#c8aa6e]"></div>
        </div>

        <button
          onClick={handleGuess}
          disabled={gameOver || slotSeleccionado !== null}
          className="w-full max-w-sm h-14 border-2 border-[#785a28] text-[#c8aa6e] font-black uppercase text-sm tracking-[0.4em] hover:bg-[#c8aa6e] hover:text-[#010a13] transition-all active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          {gameOver ? "PARTIDA TERMINADA" : "COMPROBAR"}
        </button>
      </div>
    </div>
  );
}

export default Pyramid;
