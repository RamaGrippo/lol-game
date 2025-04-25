import React from "react";

function PositionSlot({ position, champion }) {
  const championImgUrl = champion
    ? `https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${champion
        .replace(/[\s.'"]/g, "") // Elimina espacios, puntos, apóstrofes y comillas
        .replace("RenataGlasc", "Renata") // Caso específico para "Renata Glasc"
        .replace("VelKoz", "Velkoz") // Caso específico para "Vel'Koz"
        .replace("NunuWillump", "Nunu") // Caso específico para "Nunu and Willump"
        .replace("ChoGath", "Chogath") // Ya no necesita cambio
        .replace("KhaZix", "Khazix") // Ya no necesita cambio
        .replace("BelVeth", "Belveth") // Ya no necesita cambio
        .replace("KaiSa", "Kaisa")}.png` // Ya no necesita cambio
    : null;

  return (
    <div className="champion-wrapper" title={position}>
      {championImgUrl ? (
        <img src={championImgUrl} alt={champion} className="champion-icon" />
      ) : (
        <div className="empty-slot">?</div>
      )}
    </div>
  );
}

export default PositionSlot;
