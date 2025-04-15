import React from "react";

function PositionSlot({ position, champion }) {
  return (
    <div className="border border-blue-400 rounded p-4 w-28 h-24 text-center flex flex-col justify-center items-center bg-gray-900 text-white">
      <strong>{position}</strong>
      <div>{champion ? champion : "?"}</div>
    </div>
  );
}

export default PositionSlot;
