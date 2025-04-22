import React from "react";
import "./Wordle.css";

function IntentoWordle({ championLength, word, isGuessed, guess }) {
  const resultado = Array(championLength).fill("letra");

  const intentoCompleto =
    isGuessed && guess.length === word.length && guess !== "";

  if (intentoCompleto) {
    const palabra = word.toUpperCase().split("");
    const intento = guess.toUpperCase().split("");

    const letrasRestantes = {};

    // 1. Marcar verdes (correctas)
    palabra.forEach((letra, i) => {
      if (intento[i] === letra) {
        resultado[i] = "letra-correcta";
      } else {
        letrasRestantes[letra] = (letrasRestantes[letra] || 0) + 1;
      }
    });

    // 2. Marcar amarillas y grises
    palabra.forEach((letra, i) => {
      if (resultado[i] !== "letra-correcta") {
        if (letrasRestantes[intento[i]] > 0) {
          resultado[i] = "letra-casi-correcta";
          letrasRestantes[intento[i]]--;
        } else {
          resultado[i] = "letra-incorrecta";
        }
      }
    });
  }

  return (
    <div className="letters-row">
      {Array.from({ length: championLength }).map((_, index) => (
        <div className={resultado[index]} key={index}>
          {(guess[index] || "").toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default IntentoWordle;
