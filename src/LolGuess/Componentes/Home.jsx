import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app-container">
      <h1>Bienvenido a los Juegos</h1>
      <div className="grid">
        <Link to="/wordle" className="square">
          Wordle
        </Link>
        <Link to="/loldle" className="square">
          Loldle
        </Link>
        <Link to="/lolgrid" className="square">
          LolGrid
        </Link>
        <Link to="/rift5" className="square">
          Rift5
        </Link>
        <Link to="/esport5" className="square">
          Esport5
        </Link>
        <Link to="/questioner" className="square">
          Questioner
        </Link>
      </div>
    </div>
  );
}

export default Home;
