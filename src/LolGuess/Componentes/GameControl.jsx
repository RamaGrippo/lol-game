import React, { useState } from "react";
import caracCampeones from "../../DB/LolChampionsComplete"; // Asumiendo que esta es la BDD de campeones
import "./Components.css";

function GameControl({ onGuess }) {
  const [inputValue, setInputValue] = useState(""); // Valor del input
  const [filteredChampions, setFilteredChampions] = useState([]); // Campeones filtrados
  const [selectedChampion, setSelectedChampion] = useState(""); // Campeón seleccionado

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const champions = caracCampeones.caracCampeones || [];

    if (value.length >= 1) {
      const filtered = champions.filter((champ) =>
        champ.nombre.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredChampions(filtered);
    } else {
      setFilteredChampions([]);
    }
  };

  const handleSelectChampion = (championName) => {
    setSelectedChampion(championName);
    setInputValue(championName);
    setFilteredChampions([]);
  };

  const handleGuessClick = () => {
    if (selectedChampion) {
      onGuess(selectedChampion);
      setInputValue("");
      setSelectedChampion("");
    }
  };

  return (
    <div className="game-control-container">
      <div>Intentos restantes: 10</div>

      <div>
        <div className="input-wrapper">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ingrese su adivinanza"
          />

          {filteredChampions.length > 0 && (
            <div className="autocomplete-dropdown">
              {filteredChampions.map((champ) => (
                <div
                  key={champ._id}
                  onClick={() => handleSelectChampion(champ.nombre)}
                >
                  {champ.nombre}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleGuessClick}>Adivinar</button>
      </div>

      <div>
        <button>Rendirse</button>
      </div>
    </div>
  );
}

export default GameControl;
