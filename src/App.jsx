import { Route, Routes } from "react-router-dom";
import Header from "./LolGuess/Componentes/Header";
import Home from "./LolGuess/Componentes/Home";
import Esport5 from "./LolGuess/Juegos/Esport5/Esport5";
import Loldle from "./LolGuess/Juegos/Loldle/Loldle";
import LolGrid from "./LolGuess/Juegos/LolGrid/LolGrid";
import Questioner from "./LolGuess/Juegos/Questioner/Questioner";
import Rift5 from "./LolGuess/Juegos/Rift5/Rift5";
import Wordle from "./LolGuess/Juegos/Wordle/Wordle";
import Top7 from "./LolGuess/Juegos/Top7/Top7";
import Impostor from "./LolGuess/Juegos/Impostor/Impostor";
import Pyramid from "./LolGuess/Juegos/Pyramid/Pyramid";
import "./index.css";
import LowerOrHigher from "./LolGuess/Juegos/LowerOrHigher/LowerOrHigher";

function App() {
  return (
    <div className="h-screen w-full bg-[#010a13] flex flex-col overflow-hidden font-sans text-[#f0e6d2]">
      <Header />
      <main className="flex-1 w-full relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loldle" element={<Loldle />} />
          <Route path="/wordle" element={<Wordle />} />
          <Route path="/lolgrid" element={<LolGrid />} />
          <Route path="/top7" element={<Top7 />} />
          <Route path="/pyramid" element={<Pyramid />} />
          <Route path="/impostor" element={<Impostor />} />
          <Route path="/lowerorhigher" element={<LowerOrHigher />} />
          <Route path="/rift5" element={<Rift5 />} />
          <Route path="/esport5" element={<Esport5 />} />
          <Route path="/questioner" element={<Questioner />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
