import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LISTA_JUEGOS = [
  { id: "wordle", nombre: "Wordle", icono: null },
  { id: "loldle", nombre: "Loldle", icono: null },
  { id: "lolgrid", nombre: "LolGrid", icono: null },
  { id: "top7", nombre: "Top7", icono: null },
  { id: "impostor", nombre: "Impostor", icono: null },
  { id: "pyramid", nombre: "Pyramid", icono: null },
  { id: "lowerorhigher", nombre: "LowerOrHigher", icono: null },
  { id: "rift5", nombre: "Rift5", icono: null },
  { id: "esport5", nombre: "Esport5", icono: null },
  { id: "questioner", nombre: "Questioner", icono: null },
];

function Home() {
  return (
    /* h-full asegura que el menú use todo el espacio del main sin pasarse */
    <div className="h-full w-full p-4 flex items-center justify-center bg-[#010a13]">
      {/* La grilla es flexible: grid-cols-2 en móvil, grid-cols-3 en PC */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl h-full max-h-[85vh]">
        {LISTA_JUEGOS.map((juego, index) => (
          <motion.div
            key={juego.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 0.97 }} /* Efecto de botón presionado */
            className="w-full h-full"
          >
            <Link to={`/${juego.id}`} className="block h-full w-full group">
              <div className="h-full w-full border-2 border-[#785a28] bg-[#0a1428] relative flex flex-col items-center justify-center transition-all duration-300 group-hover:border-[#c8aa6e] overflow-hidden">
                {/* Imagen pequeña en el centro como pediste */}
                {juego.icono && (
                  <img
                    src={juego.icono}
                    className="w-16 h-16 object-contain mb-4 opacity-40 group-hover:opacity-100 transition-opacity"
                    alt={juego.nombre}
                  />
                )}

                <span className="text-xl font-black text-[#c8aa6e] uppercase tracking-[0.2em] group-hover:text-[#f0e6d2] text-center px-2">
                  {juego.nombre}
                </span>

                {/* Detalles decorativos en las esquinas */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#c8aa6e] m-2 opacity-30 group-hover:opacity-100" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c8aa6e] m-2 opacity-30 group-hover:opacity-100" />

                {/* Resplandor interno Hextech */}
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] pointer-events-none" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;
