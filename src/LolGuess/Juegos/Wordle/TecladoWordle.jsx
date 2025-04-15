import React from "react";
import "./Wordle.css";

function TecladoWordle({ teclasEstado }) {
  const letters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

  return (
    <div className="teclado-wordle">
      <div className="fila">
        {letters.slice(0, 10).map((letter) => (
          <button
            key={letter}
            className={teclasEstado[letter.toLowerCase()] || "tecla"}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="fila">
        {letters.slice(10, 19).map((letter) => (
          <button
            key={letter}
            className={teclasEstado[letter.toLowerCase()] || "tecla"}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="fila">
        {letters.slice(19).map((letter) => (
          <button
            key={letter}
            className={teclasEstado[letter.toLowerCase()] || "tecla"}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TecladoWordle;
