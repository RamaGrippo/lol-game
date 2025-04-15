import React, { useState } from "react";
import "./Components.css";

function GameControl({ onGuess }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Guarda el valor del input en el estado local
  };

  const handleGuessClick = () => {
    onGuess(inputValue); // Llama a la función onGuess y le pasa el valor del input
    setInputValue(""); // Limpia el input después de enviar la adivinanza
  };

  return (
    <div className="game-control-container">
      <div>Intentos restantes: 10</div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingrese su adivinanza"
        />
        <button onClick={handleGuessClick}>Adivinar</button>
      </div>
      <div>
        <button>Rendirse</button>
      </div>
    </div>
  );
}

export default GameControl;
