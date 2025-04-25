import React, { useEffect, useState } from "react";
import GameControl from "../../Componentes/GameControl";
import campeonesData from "../../../DB/LolChampionsComplete.jsx";
import "./Loldle.css";
import "../../AppContainers.css";
import IntentoLoldle from "./IntentoLoldle";

function Loldle() {
  const [randomChampion, setRandomChampion] = useState({});
  const [atributosAleatorios, setAtributosAleatorios] = useState([]);
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
  const [modoAtributos, setModoAtributos] = useState("estables"); // "estables" o "aleatorios"
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
      3
    );
    const randomMedio = getRandomAttributes(
      campeonesData.atributosCampeonesMedio,
      3
    );
    const randomDificil = getRandomAttributes(
      campeonesData.atributosCampeonesDificil,
      2
    );
    console.log(champion);
    setAtributosAleatorios([...randomFacil, ...randomMedio, ...randomDificil]);
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

      const atributosEvaluar =
        modoAtributos === "estables"
          ? atributosEstables
          : ["nombre", ...atributosAleatorios.filter((a) => a !== "nombre")];

      atributosEvaluar.forEach((atributo) => {
        const valorAdivinar = randomChampion[atributo];
        const valorIntento = campeon[atributo];

        if (["precio"].includes(atributo)) {
          const escalonesPrecio = [6300, 4800, 3150, 1350, 450];
          const indiceAdivinar = escalonesPrecio.indexOf(valorAdivinar);
          const indiceIntento = escalonesPrecio.indexOf(valorIntento);

          if (indiceAdivinar === indiceIntento) {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "verde",
            };
          } else if (Math.abs(indiceAdivinar - indiceIntento) === 1) {
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
        } else if (atributo === "winrate") {
          const diferencia = Math.abs(
            parseFloat(valorAdivinar) - parseFloat(valorIntento)
          );

          if (diferencia <= 1) {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "verde",
            };
          } else if (diferencia <= 3) {
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
        } else if (atributo === "pickrate") {
          const diferencia = Math.abs(
            parseFloat(valorAdivinar) - parseFloat(valorIntento)
          );

          if (diferencia <= 3) {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "verde",
            };
          } else if (diferencia <= 6) {
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
        } else if (atributo === "banrate") {
          const diferencia = Math.abs(
            parseFloat(valorAdivinar) - parseFloat(valorIntento)
          );

          if (diferencia <= 1) {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "verde",
            };
          } else if (diferencia <= 3) {
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
        } else if (["kda", "kdapromedio"].includes(atributo)) {
          const diferencia = Math.abs(
            parseFloat(valorAdivinar) - parseFloat(valorIntento)
          );

          if (diferencia <= 0.5) {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "verde",
            };
          } else if (diferencia <= 1.5) {
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
        }

        // Evaluación para otros atributos estándar
        else if (
          [
            "dureza",
            "movilidad",
            "utilidad",
            "control_masas",
            "dificultad",
          ].includes(atributo)
        ) {
          const diferencia = Math.abs(valorAdivinar - valorIntento);

          if (diferencia === 0) {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "verde",
            };
          } else if (diferencia === 1) {
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
        }

        // Evaluación para porcentajes (porcentaje_fisico, porcentaje_magico, porcentaje_verdadero)
        else if (
          [
            "porcentaje_fisico",
            "porcentaje_magico",
            "porcentaje_verdadero",
          ].includes(atributo)
        ) {
          const valorAdivinarNum = parseFloat(valorAdivinar);
          const valorIntentoNum = parseFloat(valorIntento);
          const diferencia = Math.abs(valorAdivinarNum - valorIntentoNum);

          if (diferencia <= 5) {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "verde",
            };
          } else if (diferencia <= 10) {
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
        } else if (atributo === "lanzamiento") {
          const añoAdivinar = new Date(valorAdivinar).getFullYear();
          const añoIntento = new Date(valorIntento).getFullYear();
          const diferencia = Math.abs(añoAdivinar - añoIntento);

          if (diferencia === 0) {
            nuevoIntento.atributosEvaluados[atributo] = {
              valor: valorIntento,
              color: "verde",
            };
          } else if (diferencia === 1) {
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
        }
        // Evaluación estándar para el resto de atributos
        else {
          if (Array.isArray(valorAdivinar) && Array.isArray(valorIntento)) {
            if (
              JSON.stringify(valorAdivinar) === JSON.stringify(valorIntento)
            ) {
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
        }
      });

      setIntentos((prevIntentos) => [...prevIntentos, nuevoIntento]);
    } else {
      alert("No existe ese campeón");
    }
  };

  const atributosMostrar =
    modoAtributos === "estables"
      ? atributosEstables
      : ["nombre", ...atributosAleatorios.filter((a) => a !== "nombre")];

  return (
    <div className="game-container">
      <div className="game-layout-container">
        <div className="atributos-selector">
          <button
            onClick={() => setModoAtributos("estables")}
            className={modoAtributos === "estables" ? "activo" : ""}
          >
            Atributos Estables
          </button>
          <button
            onClick={() => setModoAtributos("aleatorios")}
            className={modoAtributos === "aleatorios" ? "activo" : ""}
          >
            Atributos Aleatorios
          </button>
        </div>

        <div className="atributos-header">
          {atributosMostrar.map((atributo, index) => (
            <div className="atributo" key={index}>
              <p>{atributo}</p>
            </div>
          ))}
        </div>

        {intentos.map((intento, rowIndex) => (
          <IntentoLoldle
            key={rowIndex}
            intentos={[intento]}
            atributosMostrar={atributosMostrar}
          />
        ))}
      </div>
      <GameControl onGuess={handleGuess} />
    </div>
  );
}

export default Loldle;
