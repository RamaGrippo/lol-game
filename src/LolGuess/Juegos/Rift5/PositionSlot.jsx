import React from "react"; // Añadido para evitar errores de entorno

function PositionSlot({ position, champion }) {
  const championImgUrl = champion
    ? `https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${champion
        .replace(/[\s.'"]/g, "")
        .replace("RenataGlasc", "Renata")
        .replace("VelKoz", "Velkoz")
        .replace("NunuWillump", "Nunu")
        .replace("ChoGath", "Chogath")
        .replace("KhaZix", "Khazix")
        .replace("BelVeth", "Belveth")
        .replace("KaiSa", "Kaisa")}.png`
    : null;

  return (
    <div className="group relative">
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#010a13] border border-[#c8aa6e] text-[#c8aa6e] text-[10px] px-2 py-0.5 font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
        {position}
      </span>

      <div
        className={`
        w-16 h-16 rounded-full border-2 transition-all duration-700 overflow-hidden flex items-center justify-center
        ${champion ? "border-[#c8aa6e] shadow-[0_0_15px_rgba(200,170,110,0.6)] scale-110" : "border-[#785a28] bg-[#0a1428]/80 text-[#785a28]"}
      `}
      >
        {championImgUrl ? (
          <img
            src={championImgUrl}
            alt={champion}
            className="w-full h-full object-cover animate-in zoom-in duration-500"
          />
        ) : (
          <div className="text-xl font-black opacity-50">?</div>
        )}
      </div>
    </div>
  );
}

export default PositionSlot; // CRÍTICO: Sin esto el otro archivo se rompe
