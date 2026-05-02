import React, { useEffect, useState } from "react";
import GameControl from "../../Componentes/GameControl";
import campeonesData from "../../../DB/LolChampionsComplete.jsx";
import IntentoLoldle from "./IntentoLoldle";

function Loldle() {
  const [randomChampion, setRandomChampion] = useState({});
  const [atributosAleatorios, setAtributosAleatorios] = useState([]);
  const [modoAtributos, setModoAtributos] = useState("estables");
  const [intentos, setIntentos] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const MAX_INTENTOS = 10;

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

  useEffect(() => {
    const champion =
      campeonesData.caracCampeones[
        Math.floor(Math.random() * campeonesData.caracCampeones.length)
      ];
    setRandomChampion(champion);

    const getRandomAttributes = (attributesArray, count) => {
      const shuffled = [...attributesArray].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const randomFacil = getRandomAttributes(
      campeonesData.atributosCampeonesFacil,
      3,
    );
    const randomMedio = getRandomAttributes(
      campeonesData.atributosCampeonesMedio,
      3,
    );
    const randomDificil = getRandomAttributes(
      campeonesData.atributosCampeonesDificil,
      2,
    );
    setAtributosAleatorios([...randomFacil, ...randomMedio, ...randomDificil]);
  }, []);

  const handleSurrender = () => {
    setGameOver(true);
    setMensaje(`RENDICIÓN. El campeón era: ${randomChampion.nombre}`);
  };

  const handleGuess = (input) => {
    if (gameOver) return;
    const campeon = campeonesData.caracCampeones.find(
      (c) =>
        c.nombre.replace(/['\s]/g, "").toLowerCase() ===
        input.replace(/['\s]/g, "").toLowerCase(),
    );

    if (campeon) {
      const nuevoIntento = { nombre: campeon.nombre, atributosEvaluados: {} };
      const atributosEvaluar =
        modoAtributos === "estables"
          ? atributosEstables
          : ["nombre", ...atributosAleatorios.filter((a) => a !== "nombre")];

      atributosEvaluar.forEach((atributo) => {
        const valorAdivinar = randomChampion[atributo];
        const valorIntento = campeon[atributo];

        if (
          [
            "precio",
            "dureza",
            "movilidad",
            "utilidad",
            "control_masas",
            "dificultad",
          ].includes(atributo)
        ) {
          const diff = Math.abs(
            (Array.isArray(valorAdivinar) ? 0 : valorAdivinar) -
              (Array.isArray(valorIntento) ? 0 : valorIntento),
          );
          nuevoIntento.atributosEvaluados[atributo] = {
            valor: valorIntento,
            color: diff === 0 ? "verde" : diff === 1 ? "amarillo" : "rojo",
          };
        } else if (atributo === "lanzamiento") {
          const yA = new Date(valorAdivinar).getFullYear();
          const yI = new Date(valorIntento).getFullYear();
          const diff = Math.abs(yA - yI);
          nuevoIntento.atributosEvaluados[atributo] = {
            valor: valorIntento,
            color: diff === 0 ? "verde" : diff === 1 ? "amarillo" : "rojo",
          };
        } else if (
          Array.isArray(valorAdivinar) &&
          Array.isArray(valorIntento)
        ) {
          const match =
            valorIntento.every((v) => valorAdivinar.includes(v)) &&
            valorIntento.length === valorAdivinar.length;
          const partial = valorIntento.some((v) => valorAdivinar.includes(v));
          nuevoIntento.atributosEvaluados[atributo] = {
            valor: valorIntento,
            color: match ? "verde" : partial ? "amarillo" : "rojo",
          };
        } else {
          nuevoIntento.atributosEvaluados[atributo] = {
            valor: valorIntento,
            color: valorAdivinar === valorIntento ? "verde" : "rojo",
          };
        }
      });

      const listaActualizada = [...intentos, nuevoIntento];
      setIntentos(listaActualizada);

      if (campeon.nombre === randomChampion.nombre) {
        setGameOver(true);
        setMensaje("¡VICTORIA!");
      } else if (listaActualizada.length >= MAX_INTENTOS) {
        setGameOver(true);
        setMensaje(`PERDISTE. Era: ${randomChampion.nombre}`);
      }
    }
  };

  const atributosMostrar =
    modoAtributos === "estables"
      ? atributosEstables
      : ["nombre", ...atributosAleatorios.filter((a) => a !== "nombre")];

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#010a13] font-sans overflow-hidden">
      {/* SECCIÓN FIJA SUPERIOR */}
      <div className="w-full max-w-7xl flex flex-col items-center pt-2 px-4 flex-shrink-0">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setModoAtributos("estables")}
            className={`px-4 py-1.5 border-2 text-xs uppercase font-black tracking-widest transition-all ${modoAtributos === "estables" ? "bg-[#c8aa6e] text-[#010a13]" : "text-[#c8aa6e] border-[#785a28]"}`}
          >
            Estables
          </button>
          <button
            onClick={() => setModoAtributos("aleatorios")}
            className={`px-4 py-1.5 border-2 text-xs uppercase font-black tracking-widest transition-all ${modoAtributos === "aleatorios" ? "bg-[#c8aa6e] text-[#010a13]" : "text-[#c8aa6e] border-[#785a28]"}`}
          >
            Aleatorios
          </button>
        </div>

        <div className="h-12 flex items-center justify-center my-1">
          {mensaje && (
            <div
              className={`px-4 py-1.5 border-2 text-xs font-black uppercase tracking-widest animate-fade-in ${mensaje.includes("VICTORIA") ? "bg-green-900/20 border-green-500 text-green-400" : "bg-red-900/20 border-red-500 text-red-400"}`}
            >
              {mensaje}
            </div>
          )}
        </div>

        {/* Header de la Tabla */}
        <div className="grid grid-cols-8 gap-1 w-full border-b border-[#785a28] pb-1">
          {atributosMostrar.map((a, i) => (
            <div
              key={i}
              className="text-center text-[#c8aa6e] text-[9px] md:text-[10px] font-black uppercase"
            >
              {a}
            </div>
          ))}
        </div>
      </div>

      {/* ÁREA DE SCROLL */}
      <div className="w-full max-w-7xl flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
        <div className="flex flex-col gap-1">
          {" "}
          {/* Bajamos el gap a 1 */}
          {[...intentos].reverse().map((int, i) => (
            <IntentoLoldle
              key={i}
              intentos={[int]}
              atributosMostrar={atributosMostrar}
            />
          ))}
        </div>
      </div>

      {/* SECCIÓN FIJA INFERIOR */}
      <div className="w-full flex-shrink-0 bg-[#010a13] shadow-[0_-10px_25px_rgba(0,0,0,0.9)]">
        <GameControl
          onGuess={handleGuess}
          onSurrender={handleSurrender}
          attempts={intentos.length}
          maxAttempts={MAX_INTENTOS}
          gameOver={gameOver}
        />
      </div>
    </div>
  );
}

export default Loldle;
