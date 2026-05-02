import React from "react";

// Este es el componente para UNA SOLA LETRA
function LetraWordle({ letra, estado }) {
  // Definimos los estilos de Tailwind para cada estado
  const estilos = {
    vacio: "border-[#785a28] bg-[#0a1428] text-[#f0e6d2]",
    correcto:
      "bg-green-600 border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]",
    casi: "bg-[#c8aa6e] border-[#f0e6d2] text-[#010a13]",
    incorrecto: "bg-[#1e2328] border-[#3c3c41] text-[#5b5a56]",
  };

  // Si no hay estado, usamos 'vacio'
  const claseEstado = estilos[estado] || estilos.vacio;

  return (
    <div
      className={`w-12 h-12 md:w-14 md:h-14 border-2 flex items-center justify-center text-2xl font-black transition-all duration-500 uppercase ${claseEstado}`}
    >
      {letra}
    </div>
  );
}

export default LetraWordle;
