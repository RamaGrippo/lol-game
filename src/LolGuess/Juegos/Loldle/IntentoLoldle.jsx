import React from "react";

function IntentoLoldle({ intentos }) {
  // Asegúrate de que intentos sea un array
  const intentosArray = Array.isArray(intentos) ? intentos : [];
  console.log(intentos);
  return (
    <>
      {intentosArray.map((intento, index) => (
        <div className="intento-loldle" key={index}>
          {Object.entries(intento.atributosEvaluados).map(
            ([atributo, valor]) => (
              <p key={atributo}>
                {valor.valor} ({valor.color})
              </p>
            )
          )}
        </div>
      ))}
    </>
  );
}

export default IntentoLoldle;
