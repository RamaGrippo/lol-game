import React, { useEffect, useState, useCallback } from "react";
// import GameInfo from "../Componentes/GameInfo";
// import GameControl from "../Componentes/GameControl";
import lolChampions from "./LolChampions.jsx";
import TecladoWordle from "./TecladoWordle.jsx";
import IntentoWordle from "./IntentoWordle.jsx";
import "../../AppContainers.css";
import "./Wordle.css";

function Wordle() {
  const [palabraIntentada, setPalabraIntentada] = useState("");
  const [randomChampion, setRandomChampion] = useState("");
  const maxAttempts = 6;
  const championLength = randomChampion.length;
  const [nroIntento, setNroIntento] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [isGuessed, setIsGuessed] = useState(false);
  const [estadoPartida, setEstadoPartida] = useState("");
  const [teclasEstado, setTeclasEstado] = useState({});

  useEffect(() => {
    const champion =
      lolChampions[Math.floor(Math.random() * lolChampions.length)];
    setRandomChampion(champion);
  }, []);

  // Función para actualizar el estado de las teclas, usando useCallback
  const updateTeclasEstado = useCallback(() => {
    const newTeclasEstado = { ...teclasEstado };
    palabraIntentada.split("").forEach((letter, index) => {
      if (randomChampion[index] === letter) {
        newTeclasEstado[letter] = "tecla-correcta";
      } else if (randomChampion.includes(letter)) {
        newTeclasEstado[letter] = "tecla-casi-correcta";
      } else {
        newTeclasEstado[letter] = "tecla-incorrecta";
      }
    });
    setTeclasEstado(newTeclasEstado);
  }, [palabraIntentada, randomChampion, teclasEstado]);

  const handleKeyPress = useCallback(
    (event) => {
      const isLetter = /^[a-zA-Z]$/.test(event.key);

      if (isLetter && palabraIntentada.length < championLength) {
        const newPalabraIntentada = palabraIntentada + event.key.toLowerCase();
        setPalabraIntentada(newPalabraIntentada);

        setGuesses((prevGuesses) => {
          const updatedGuesses = [...prevGuesses];
          updatedGuesses[nroIntento] = newPalabraIntentada;
          return updatedGuesses;
        });
        setIsGuessed(false);
      } else if (event.key === "Backspace") {
        const newPalabraIntentada = palabraIntentada.slice(0, -1);
        setPalabraIntentada(newPalabraIntentada);
        setGuesses((prevGuesses) => {
          const updatedGuesses = [...prevGuesses];
          updatedGuesses[nroIntento] = newPalabraIntentada;
          return updatedGuesses;
        });
        setIsGuessed(false);
      } else if (
        event.key === "Enter" &&
        palabraIntentada.length === championLength
      ) {
        setGuesses((prevGuesses) => {
          const updatedGuesses = [...prevGuesses];
          updatedGuesses[nroIntento] = palabraIntentada;
          return updatedGuesses;
        });

        updateTeclasEstado();

        setNroIntento((prev) => prev + 1);
        setIsGuessed(true);

        if (palabraIntentada === randomChampion) {
          setEstadoPartida("Ganaste!");
        } else if (nroIntento + 1 >= maxAttempts) {
          setEstadoPartida(
            "Perdiste! ... El campeon era: " + randomChampion.toUpperCase()
          );
        }

        setPalabraIntentada("");
      }
    },
    [
      palabraIntentada,
      championLength,
      nroIntento,
      randomChampion,
      updateTeclasEstado,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    console.log("Intentos actuales:", guesses);
  }, [guesses]);

  return (
    <div className="game-container">
      {/* <GameInfo /> */}
      <div className="game-layout-container">
        <div className="letters-wordle">
          {estadoPartida}
          {Array.from({ length: maxAttempts }).map((_, rowIndex) => (
            <IntentoWordle
              key={rowIndex}
              className="letters-row"
              word={randomChampion}
              isGuessed={nroIntento > rowIndex ? true : isGuessed}
              championLength={championLength}
              guess={guesses[rowIndex] || ""}
            />
          ))}
        </div>
        <div className="keyboard-wordle">
          <TecladoWordle teclasEstado={teclasEstado} />
        </div>
      </div>
      {/* <GameControl /> */}
    </div>
  );
}

export default Wordle;
