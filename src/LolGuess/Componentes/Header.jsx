import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-[8vh] bg-[#010a13] border-b-2 border-[#785a28] flex items-center justify-between px-8 z-50 relative shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      {/* Efecto de resplandor sutil en la parte superior */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c8aa6e]/30 to-transparent"></div>

      <div className="flex gap-6 z-10">
        <Link
          to="/"
          className="text-[#c8aa6e] hover:text-[#f0e6d2] text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(200,170,110,0.8)]"
        >
          Inicio
        </Link>
        <button className="text-[#c8aa6e] hover:text-[#f0e6d2] text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(200,170,110,0.8)]">
          Info
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        {/* Título con sombra de profundidad */}
        <h1 className="text-[#c8aa6e] text-2xl font-black italic tracking-tighter uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)] bg-gradient-to-b from-[#f0e6d2] to-[#c8aa6e] bg-clip-text text-transparent">
          LOL GUESSER
        </h1>
        {/* Pequeño adorno debajo del título */}
        <div className="w-12 h-[1px] bg-[#785a28] mx-auto mt-[-2px]"></div>
      </div>

      <div className="flex gap-6 z-10">
        <button className="text-[#a09b8c] hover:text-[#c8aa6e] text-lg transition-all duration-300 hover:scale-110">
          <i className="fab fa-instagram"></i>
        </button>
        <button className="text-[#a09b8c] hover:text-[#c8aa6e] text-lg transition-all duration-300 hover:scale-110">
          <i className="fab fa-twitter"></i>
        </button>
      </div>

      {/* Esquinas decorativas de la barra */}
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-[#785a28] ml-2 mb-2"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[#785a28] mr-2 mb-2"></div>
    </header>
  );
};

export default Header;
