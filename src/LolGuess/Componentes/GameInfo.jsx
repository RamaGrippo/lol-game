import React, { useState, useEffect } from "react";

function GameInfo() {
  const [timeLeft, setTimeLeft] = useState(60); // Inicializa con 60 segundos, puedes cambiarlo

  useEffect(() => {
    // Configura el temporizador que se actualiza cada segundo
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Limpia el temporizador cuando el componente se desmonta o cuando llega a 0
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="game-info-container">
      <div>Dificultad: Fácil</div>
      <div>
        <h2>Personas que adivinaron: 3532</h2>
      </div>
      <div>
        <p>Temporizador: {timeLeft} segundos</p>
      </div>
    </div>
  );
}

export default GameInfo;
