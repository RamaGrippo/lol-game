import React from "react";

function IntentoLoldle({ intentos, atributosMostrar }) {
  const intentosArray = Array.isArray(intentos) ? intentos : [];

  const getColorClass = (color, isNombre) => {
    if (isNombre) return "bg-[#1e2328] border-[#c8aa6e] text-[#f0e6d2]";
    if (color === "verde")
      return "bg-green-600 border-green-400 text-white shadow-[inset_0_0_8px_rgba(0,0,0,0.4)]";
    if (color === "amarillo")
      return "bg-[#c8aa6e] border-[#f0e6d2] text-[#010a13]";
    if (color === "rojo")
      return "bg-red-900/80 border-red-600 text-red-200 opacity-80";
    return "bg-[#0a1428] border-[#3c3c41]";
  };

  return (
    <>
      {intentosArray.map((intento, index) => (
        <div
          className="grid grid-cols-8 gap-1 w-full animate-in fade-in slide-in-from-top-1 duration-300"
          key={index}
        >
          {atributosMostrar.map((atributo, idx) => {
            const dato = intento.atributosEvaluados[atributo];

            if (!dato)
              return (
                <div
                  key={atributo}
                  className="h-9 md:h-10 flex items-center justify-center border bg-[#0a1428] border-red-900 text-red-500 font-black"
                >
                  -
                </div>
              );

            const valorFormateado = Array.isArray(dato.valor)
              ? dato.valor.join(", ")
              : dato.valor;

            return (
              <div
                key={atributo}
                className={`h-9 md:h-10 flex items-center justify-center border text-center px-1 text-[8px] md:text-[10px] font-bold transition-all duration-700 uppercase overflow-hidden leading-none ${getColorClass(dato.color, idx === 0)}`}
              >
                <p className="truncate drop-shadow-sm">{valorFormateado}</p>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default IntentoLoldle;
