import React from "react";
// import LetrasWordle from "./LetrasWordle";
import "./Wordle.css";
function IntentoWordle({ championLength, word, isGuessed, guess }) {
  return (
    <div className="letters-row">
      {Array.from({ length: championLength }).map((_, index) => {
        const letter = guess[index] || "";
        const className = !isGuessed
          ? "letra"
          : guess[index] === word[index]
          ? "letra-correcta"
          : word.includes(guess[index])
          ? "letra-casi-correcta"
          : guess !== ""
          ? "letra-incorrecta"
          : "letra";

        return (
          <div className={className} key={index}>
            {letter.toUpperCase()}
          </div>
        );
      })}
    </div>
  );
}

export default IntentoWordle;
