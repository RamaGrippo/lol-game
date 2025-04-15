import React, { useEffect, useState } from "react";
import GameControl from "../../Componentes/GameControl";
import campeonesData from "./LolChampionsLoldle";
import "./Loldle.css";
import "../../AppContainers.css";
import IntentoLoldle from "./IntentoLoldle";

function Loldle() {
  const [randomChampion, setRandomChampion] = useState({});
  const [atributos, setAtributos] = useState([]);
  const atributosEstables = [
    "nombre",
    "genero",
    "posiciones",
    "especies",
    "recurso",
    "rango",
    "regiones",
    "lanzamiento",
  ];
  const [intentos, setIntentos] = useState([]);

  const getRandomAttributes = (attributesArray, count) => {
    const shuffled = [...attributesArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const champion =
      campeonesData.caracCampeones[
        Math.floor(Math.random() * campeonesData.caracCampeones.length)
      ];
    setRandomChampion(champion);

    const randomFacil = getRandomAttributes(
      campeonesData.atributosCampeonesFacil,
      4
    );
    const randomMedio = getRandomAttributes(
      campeonesData.atributosCampeonesMedio,
      3
    );
    const randomDificil = getRandomAttributes(
      campeonesData.atributosCampeonesDificil,
      2
    );

    setAtributos([...randomFacil, ...randomMedio, ...randomDificil]);
  }, []);

  const handleGuess = (input) => {
    const campeon = campeonesData.caracCampeones.find(
      (champion) =>
        champion.nombre.replace(/['\s]/g, "").toLowerCase() ===
        input.replace(/['\s]/g, "").toLowerCase()
    );

    if (campeon) {
      const nuevoIntento = {
        nombre: campeon.nombre,
        atributosEvaluados: {},
      };

      atributosEstables.forEach((atributo) => {
        const valorAdivinar = randomChampion[atributo];
        const valorIntento = campeon[atributo];

        if (Array.isArray(valorAdivinar) && Array.isArray(valorIntento)) {
          if (JSON.stringify(valorAdivinar) === JSON.stringify(valorIntento)) {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "verde",
            };
          } else if (
            valorIntento.some((item) => valorAdivinar.includes(item))
          ) {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "amarillo",
            };
          } else {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "rojo",
            };
          }
        } else if (
          typeof valorAdivinar === "string" &&
          typeof valorIntento === "string"
        ) {
          if (valorAdivinar.toLowerCase() === valorIntento.toLowerCase()) {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "verde",
            };
          } else {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "rojo",
            };
          }
        } else {
          nuevoIntento.atributosEvaluados[atributo] = {
            valor: valorIntento,
            color: "rojo",
          };
        }
      });

      setIntentos((prevIntentos) => [...prevIntentos, nuevoIntento]);
    } else {
      alert("No existe ese campeon");
    }
  };

  return (
    <div className="game-container">
      <div className="game-layout-container">
        {/* <h2>{randomChampion.nombre}</h2> */}
        <div className="atributos-header">
          {atributosEstables.map((atributo, index) => (
            <div className="atributo" key={index}>
              <p> {atributo}</p>
            </div>
          ))}
        </div>
        {intentos.map((intento, rowIndex) => (
          <IntentoLoldle
            key={rowIndex}
            intentos={[intento]} // Pasa el intento como un array
          />
        ))}
      </div>
      <GameControl onGuess={handleGuess} />
    </div>
  );
}

export default Loldle;
