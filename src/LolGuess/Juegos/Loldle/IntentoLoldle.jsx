import React from "react";

function IntentoLoldle({ intentos }) {
  // Asegúrate de que intentos sea un array
  const intentosArray = Array.isArray(intentos) ? intentos : [];

  return (
    <>
      {intentosArray.map((intento, index) => (
        <div className="intento-loldle" key={index}>
          {console.log(intento.atributosEvaluados)}{" "}
          {/* Mover console.log aquí */}
          {Object.entries(intento.atributosEvaluados).map(
            ([atributo, valor], idx) => {
              // Verificamos si el valor es un array
              const valorFormateado = Array.isArray(valor.valor)
                ? valor.valor.join(", ")
                : valor.valor; // Unir los elementos con coma si es un array

              return (
                <div
                  key={atributo}
                  className={`atributo ${idx === 0 ? "negro" : valor.color}`}
                >
                  <p>{`${valorFormateado}`}</p>
                </div>
              );
            }
          )}
        </div>
      ))}
    </>
  );
}

export default IntentoLoldle;
