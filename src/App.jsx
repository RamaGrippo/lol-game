import "./App.css";
import "./LolGuess/AppContainers.css";
import { Route, Routes } from "react-router-dom";
import Header from "./LolGuess/Componentes/Header";
import Home from "./LolGuess/Componentes/Home";
import Esport5 from "./LolGuess/Juegos/Esport5/Esport5";
import Loldle from "./LolGuess/Juegos/Loldle/Loldle";
import LolGrid from "./LolGuess/Juegos/LolGrid/LolGrid";
import Questioner from "./LolGuess/Juegos/Questioner/Questioner";
import Rift5 from "./LolGuess/Juegos/Rift5/Rift5";
import Wordle from "./LolGuess/Juegos/Wordle/Wordle";

function App() {
  return (
    <div className="container">
      <Header />
      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loldle" element={<Loldle />} />
          <Route path="/wordle" element={<Wordle />} />
          <Route path="/lolgrid" element={<LolGrid />} />
          <Route path="/rift5" element={<Rift5 />} />
          <Route path="/esport5" element={<Esport5 />} />
          <Route path="/questioner" element={<Questioner />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
