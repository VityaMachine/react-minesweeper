import React, { useState, useEffect } from "react";

import styles from "./Field.module.css";

import Sector from "../Sector";

import fieldMaker from "../../utils/fieldMaker";
import sectorReveal from "../../utils/sectorReveal";

export default function Field({ fieldDimension, minesCount }) {
  const [dimension, setDimension] = useState(fieldDimension);
  const [gameField, setGameField] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocation, setMineLocation] = useState([]);
  const [gameStatus, setGameStatus] = useState("preparing");
  const [usedFlags, setUsedFlags] = useState(0);
  const [lastCoordinate, setLastCoordinate] = useState({ x: null, y: null });

  useEffect(() => {
    createNewField();
  }, []);

  useEffect(() => {
    if (nonMineCount === 0 && usedFlags === minesCount) {
      setGameStatus("won");
      alert("Well Played!! You won");
    }
  });

  const createNewField = () => {
    const newField = fieldMaker(dimension, minesCount);

    setNonMineCount(dimension * dimension - minesCount);
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

    setLastCoordinate({ x, y });

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
      countUsedFlags();
      setNonMineCount(revealedField.newNonMines);
      setGameStatus("game");
    }
  };

  const onStartNewGame = () => {
    setGameStatus("preparing");
    setUsedFlags(0);
    createNewField();
    setLastCoordinate({ x: null, y: null });
  };

  const countUsedFlags = () => {
    let usedFlags = 0;

    for (let i = 0; i < gameField.length; i++) {
      for (let j = 0; j < gameField[i].length; j++) {
        gameField[i][j].isFlagged && !gameField[i][j].isRevealed && usedFlags++;
      }
    }

    setUsedFlags(usedFlags);
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoText}>Non-Mines : {nonMineCount}</div>
      <div
        className={
          usedFlags > minesCount ? styles.infoTextError : styles.infoText
        }
      >
        Set flags : {usedFlags} / {minesCount}
      </div>




      <div className={styles.fieldContainer}>
        {gameField.map((row, i) => (
          <div key={i} className={styles.gameField}>
            {row.map((cell, i) => (
              <Sector
                key={i}
                details={cell}
                updateFlag={updateFlag}
                revealSector={revealSector}
                gameStatus={gameStatus}
                lastCoordinate={lastCoordinate}
              />
            ))}
          </div>
        ))}
      </div>

      {gameStatus === "won" && <div className={styles.infoTextSuccess}>Well Played!!! You win!!!</div>} 

      {gameStatus !== "preparing" && (
        <button className={styles.newGameBtn} onClick={onStartNewGame}>
          Start new
        </button>
      )}
    </div>
  );
}
