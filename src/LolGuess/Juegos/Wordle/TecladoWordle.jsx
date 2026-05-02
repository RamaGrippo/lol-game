import React from "react";

function TecladoWordle({ teclasEstado }) {
  const letters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

  const getTeclaStyle = (letter) => {
    const l = letter.toLowerCase();
    const estado = teclasEstado[l];

    // DISEÑO ULTRA-SLIM: h-8 es muy fino, ideal para ahorrar espacio vertical
    const base =
      "flex-1 h-8 sm:h-9 rounded-sm font-bold transition-all duration-300 uppercase text-[10px] sm:text-xs flex items-center justify-center cursor-default select-none ";

    if (estado === "tecla-correcta") {
      return base + "bg-green-600 text-white border-b border-green-400";
    }
    if (estado === "tecla-casi-correcta") {
      return base + "bg-[#c8aa6e] text-[#010a13] border-b border-[#f0e6d2]";
    }
    if (estado === "tecla-incorrecta") {
      return base + "bg-[#1e2328] text-[#5b5a56] opacity-30 line-through";
    }

    return base + "bg-[#1e2328] text-[#c8aa6e] border border-[#785a28]/20";
  };

  const renderFila = (lettersArray) => (
    // Gap y margen mínimo
    <div className="flex gap-0.5 sm:gap-1 w-full mb-0.5 justify-center">
      {lettersArray.map((letter) => (
        <div key={letter} className={getTeclaStyle(letter)}>
          {letter}
        </div>
      ))}
    </div>
  );

  return (
    // mt-1 para que esté pegado a los intentos sin desperdiciar aire
    <div className="w-full max-w-md mx-auto px-1 mt-1">
      {renderFila(letters.slice(0, 10))}
      {renderFila(letters.slice(10, 19))}
      {renderFila(letters.slice(19))}
    </div>
  );
}

export default TecladoWordle;
