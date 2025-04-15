import React, { useState } from "react";
import caracCampeones from "../Juegos/Loldle/LolChampionsLoldle"; // Asumiendo que esta es la BDD de campeones
import "./Components.css";

function GameControl({ onGuess }) {
  const [inputValue, setInputValue] = useState(""); // Valor del input
  const [filteredChampions, setFilteredChampions] = useState([]); // Campeones filtrados
  const [selectedChampion, setSelectedChampion] = useState(""); // Campeón seleccionado

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Guarda el valor del input

    // Asegúrate de acceder correctamente al array de campeones
    const champions = caracCampeones.caracCampeones || []; // Accede al array de campeones

    // Filtra los campeones que coinciden con las primeras 2 letras
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
    setInputValue(championName); // Pone el nombre seleccionado en el input
    setFilteredChampions([]); // Oculta el dropdown
  };

  const handleGuessClick = () => {
    if (selectedChampion) {
      onGuess(selectedChampion); // Llama a la función onGuess y pasa el campeón seleccionado
      setInputValue(""); // Limpia el input después de enviar la adivinanza
      setSelectedChampion(""); // Resetea el campeón seleccionado
    }
  };

  return (
    <div className="game-control-container">
      <div>Intentos restantes: 10</div>

      {/* Input para adivinar el campeón */}
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingrese su adivinanza"
        />

        {/* Si hay coincidencias, mostrar el dropdown */}
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

        <button onClick={handleGuessClick}>Adivinar</button>
      </div>

      <div>
        <button>Rendirse</button>
      </div>
    </div>
  );
}

export default GameControl;
