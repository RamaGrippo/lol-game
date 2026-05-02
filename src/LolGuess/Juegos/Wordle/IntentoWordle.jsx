import React from "react";

function IntentoWordle({ championLength, word, isGuessed, guess }) {
  // Definimos las clases de Tailwind como variables para que el código sea limpio
  const estiloVacio = "border-[#785a28] bg-[#0a1428] text-[#f0e6d2]";
  const estiloCorrecto =
    "bg-green-600 border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] border-b-4";
  const estiloCasi = "bg-[#c8aa6e] border-[#f0e6d2] text-[#010a13] border-b-4";
  const estiloIncorrecto =
    "bg-[#1e2328] border-[#3c3c41] text-[#5b5a56] opacity-60";

  // Inicializamos el array de resultados con el estilo vacío por defecto
  let resultado = Array(championLength).fill(estiloVacio);

  // Solo procesamos los colores si el intento ya fue enviado (Enter)
  if (isGuessed && guess.length === championLength && word) {
    const palabraBase = word.toUpperCase().split("");
    const intentoBase = guess.toUpperCase().split("");
    const letrasRestantes = {};
    const nuevoResultado = Array(championLength).fill(estiloIncorrecto);

    // 1. Identificar letras en la posición correcta
    palabraBase.forEach((letra, i) => {
      if (intentoBase[i] === letra) {
        nuevoResultado[i] = estiloCorrecto;
      } else {
        letrasRestantes[letra] = (letrasRestantes[letra] || 0) + 1;
      }
    });

    // 2. Identificar letras mal ubicadas
    palabraBase.forEach((letra, i) => {
      if (nuevoResultado[i] !== estiloCorrecto) {
        if (letrasRestantes[intentoBase[i]] > 0) {
          nuevoResultado[i] = estiloCasi;
          letrasRestantes[intentoBase[i]]--;
        }
      }
    });

    resultado = nuevoResultado;
  }

  // --- SOLUCIÓN PARA MANTENER EL CUADRADO ---
  // Definimos una altura/ancho fijo base (h-12 / w-12) y usamos aspect-square.
  // La cuadrícula (grid) se centrará en el padre (Wordle.jsx)
  return (
    <div className="flex gap-1.5 justify-center w-full max-w-[95vw]">
      {Array.from({ length: championLength }).map((_, index) => (
        <div
          key={index}
          className={`
          /* Usamos flex-1 para que se repartan el ancho, pero max-w-14 para que no crezcan de más */
          flex-1 max-w-[48px] md:max-w-[56px] 
          /* aspect-square garantiza que siempre sean cuadrados */
          aspect-square 
          border-2 flex items-center justify-center 
          text-lg md:text-2xl font-black 
          transition-all duration-500 uppercase select-none 
          ${resultado[index]}
        `}
        >
          {(guess[index] || "").toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default IntentoWordle;
