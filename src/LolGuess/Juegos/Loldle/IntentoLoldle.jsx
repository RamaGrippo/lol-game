import React from "react";

function IntentoLoldle({ intentos, atributosMostrar }) {
  const intentosArray = Array.isArray(intentos) ? intentos : [];

  return (
    <>
      {intentosArray.map((intento, index) => (
        <div className="intento-loldle" key={index}>
          {atributosMostrar.map((atributo, idx) => {
            const dato = intento.atributosEvaluados[atributo];

            if (!dato)
              return (
                <div key={atributo} className="atributo rojo">
                  <p>-</p>
                </div>
              );

            const valorFormateado = Array.isArray(dato.valor)
              ? dato.valor.join(", ")
              : dato.valor;

            return (
              <div
                key={atributo}
                className={`atributo ${idx === 0 ? "negro" : dato.color}`}
              >
                <p>{valorFormateado}</p>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default IntentoLoldle;
