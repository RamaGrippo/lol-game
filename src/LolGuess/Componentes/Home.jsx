import React from "react";
import { Link } from "react-router-dom";
import LoldleIcon from "../../assets/LoldleIcon.png";
import Rift5Icon from "../../assets/Rift5Icon.png";
import WordleIcon from "../../assets/WordleIcon.png";

function Home() {
  return (
    <div className="app-container">
      <h1>Bienvenido a Lol Game</h1>
      <div className="grid">
        <Link
          to="/wordle"
          className="square"
          style={{
            backgroundImage: `url(${WordleIcon})`,
          }}
        >
          Wordle
        </Link>
        <Link
          to="/loldle"
          className="square"
          style={{
            backgroundImage: `url(${LoldleIcon})`,
          }}
        >
          Loldle
        </Link>
        <Link to="/lolgrid" className="square">
          LolGrid
        </Link>
        <Link
          to="/rift5"
          className="square"
          style={{
            backgroundImage: `url(${Rift5Icon})`,
          }}
        >
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
