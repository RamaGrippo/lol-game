import React, { useEffect, useState, useCallback } from "react";
import lolChampions from "../../../DB/LolChampions.jsx";
import TecladoWordle from "./TecladoWordle.jsx";
import IntentoWordle from "./IntentoWordle.jsx";

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
    console.log("Objetivo:", champion); // Para debug
  }, []);

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

      if (
        isLetter &&
        palabraIntentada.length < championLength &&
        !estadoPartida
      ) {
        const newPalabraIntentada = palabraIntentada + event.key.toLowerCase();
        setPalabraIntentada(newPalabraIntentada);

        setGuesses((prevGuesses) => {
          const updatedGuesses = [...prevGuesses];
          updatedGuesses[nroIntento] = newPalabraIntentada;
          return updatedGuesses;
        });
        setIsGuessed(false);
      } else if (event.key === "Backspace" && !estadoPartida) {
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
        palabraIntentada.length === championLength &&
        !estadoPartida
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
            "Perdiste! ... El campeon era: " + randomChampion.toUpperCase(),
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
      estadoPartida,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    // Cambiamos justify-center por justify-start y bajamos el padding
    <div className="flex flex-col items-center justify-start h-full w-full bg-[#010a13] p-2 font-sans overflow-hidden">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* 1. Mensaje de Estado: Altura reducida y margen mínimo */}
        <div className="h-14 flex items-center justify-center w-full mb-2 shrink-0">
          {estadoPartida && (
            <div
              className={`w-full text-center p-2 border-2 animate-bounce font-black uppercase text-[10px] tracking-widest ${
                estadoPartida.includes("Ganaste")
                  ? "border-green-500 text-green-400 bg-green-900/20"
                  : "border-red-600 text-red-500 bg-red-900/20"
              }`}
            >
              {estadoPartida}
            </div>
          )}
        </div>

        {/* 2. Tablero de Intentos: Gap mínimo entre filas */}
        <div className="flex flex-col gap-1.5 items-center w-full px-2 py-1">
          {Array.from({ length: maxAttempts }).map((_, rowIndex) => (
            <IntentoWordle
              key={rowIndex}
              word={randomChampion}
              isGuessed={nroIntento > rowIndex ? true : isGuessed}
              championLength={championLength}
              guess={guesses[rowIndex] || ""}
            />
          ))}
        </div>

        {/* 3. Teclado: Eliminamos el mt-4 y lo dejamos pegado */}
        <div className="w-full shrink-0">
          <TecladoWordle teclasEstado={teclasEstado} />
        </div>
      </div>
    </div>
  );
}

export default Wordle;
