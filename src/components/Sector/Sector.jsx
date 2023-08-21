import React, { useState, useEffect } from "react";

export default function Sector({ details, updateFlag, revealSector }) {


  const [status, setStatus] = useState();
  
  


  const style = {
    cellStyle: {
      width: 40,
      height: 40,
      backgroundColor: 
        details.isRevealed && details.value !== 0
          ? details.value === "X"
            ? "red"
            : " #00226d"
          : details.isRevealed && details.value === 0
          ? "#00226f"
          : "#000",
      opacity: "0.8",
      border: "3px solid white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
      cursor: "pointer",
      color: "cyan",
      fontWeight: "1000",
    },
  };

  //   const handleClick = () => {
  //     console.log(details);
  //   };

  return (
    <div
      style={style.cellStyle}
      onClick={() => revealSector(details.x, details.y)}
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
    >



      {(!details.isFlagged && details.isRevealed && details.value === 'x') && '💣' }
      {(details.isFlagged && details.isRevealed && details.value === 'x') && "🧨"}
      {(details.isRevealed && details.value !== 'x' && details.value > 0 ) && details.value}
      {(details.isRevealed && details.value !== 'x' && details.value === 0 ) && ""}
      {(!details.isRevealed && details.isFlagged) && "🚩"}

    </div>
  );
}
