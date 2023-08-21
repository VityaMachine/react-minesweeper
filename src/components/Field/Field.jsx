import React, { useState, useEffect } from "react";
import Sector from "../Sector";

import fieldMaker from "../../utils/fieldMaker";
import sectorReveal from "../../utils/sectorReveal";

export default function Field() {
  const [dimension, setDimension] = useState(8);
  const [gameField, setGameField] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocation, setMineLocation] = useState([]);
  const [gameStatus, setGameStatus] = useState("preparing");
  const [usedFlags, setUsedFlags] = useState(0);

  const createNewField = () => {
    const newField = fieldMaker(dimension, 10);

    setNonMineCount(dimension * dimension - 10);
    setMineLocation(newField.minesLocation);

    setGameField(newField.field);
  };

  const updateFlag = (e, x, y) => {
    e.preventDefault();

    if (gameStatus === "lose" || gameStatus === "won") {
      return;
    }

    let newField = [...gameField];

    if (newField[x][y].isRevealed) {
      return;
    }

    newField[x][y].isFlagged = !newField[x][y].isFlagged;

    setGameField(newField);
    setGameStatus("game");
    countUsedFlags();
  };

  const revealSector = (x, y) => {
    if (gameStatus === "lose" || gameStatus === "won") {
      return;
    }

    let newField = [...gameField];
    if (newField[x][y].value === "x") {
      alert("clicked on mine. You lose");

      for (let i = 0; i < mineLocation.length; i++) {
        newField[mineLocation[i][0]][mineLocation[i][1]].isRevealed = true;
      }
      setGameField(newField);
      setGameStatus("lose");
    } else {
      let revealedField = sectorReveal(newField, x, y, nonMineCount);
      setGameField(revealedField.arr);
      setNonMineCount(revealedField.newNonMines);
      setGameStatus("game");
    }
  };

  const onStartNewGame = () => {
    setGameStatus("preparing");
    setUsedFlags(0);
    createNewField();
  };

  const countUsedFlags = () => {
    let usedFlags = 0;

    for (let i = 0; i < gameField.length; i++) {
      for (let j = 0; j < gameField[i].length; j++) {
        gameField[i][j].isFlagged && usedFlags++;
      }
    }

    setUsedFlags(usedFlags);
  };

  useEffect(() => {
    createNewField();
  }, []);

  useEffect(() => {
    if (nonMineCount === 0 && usedFlags === 10) {
      setGameStatus("won")
      alert("Well Played!! You won");
    }
  }, [nonMineCount, usedFlags]);

  return (
    <div className="parent">
      <div style={{ textAlign: "center", fontSize: "35px" }}>
        Non-Mines : {nonMineCount}
      </div>
      <div style={{ textAlign: "center", fontSize: "35px" }}>
        Set flags : {usedFlags} / 10
      </div>

      <div>
        {gameField.map((row, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "row" }}>
            {row.map((cell, i) => (
              <Sector
                key={i}
                details={cell}
                updateFlag={updateFlag}
                revealSector={revealSector}
              />
            ))}
          </div>
        ))}
      </div>

      {gameStatus !== "preparing" && (
        <button onClick={onStartNewGame}>Start new</button>
      )}
    </div>
  );
}
