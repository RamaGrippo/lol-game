import React from "react";
import "./Wordle.css";
function LetrasWordle({ championLength }) {
  return (
    <div>
      {Array.from({ length: championLength }).map((_, index) => (
        <LetrasWordle className="letra" key={index} />
      ))}
    </div>
  );
}

export default LetrasWordle;
