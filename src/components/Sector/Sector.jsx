import React, { useState, useEffect } from "react";

import { ReactComponent as BombSvg } from "../../assets/images/bomb-svgrepo-com.svg";
import { ReactComponent as FlagSvg } from "../../assets/images/flag-svgrepo-com.svg";
import { ReactComponent as TrueFlagSvg } from "../../assets/images/flag-founded-svgrepo-com.svg";

import styles from "./Sector.module.css";

export default function Sector({
  details,
  updateFlag,
  revealSector,
  gameStatus,
  lastCoordinate,
}) {
  const [status, setStatus] = useState("notTouched");
  const [selectedStyle, setSelectedStyle] = useState(styles.main);

  useEffect(() => {
    const { isRevealed, isFlagged, value } = details;

    if (gameStatus === "preparing") {
      setStatus("notTouched");
      setSelectedStyle(styles.main);
    }

    if (isRevealed && value === 0) {
      setStatus("revealed1");
      setSelectedStyle(styles.revealed);
    }

    if (isRevealed && value === 1) {
      setStatus("revealed1");
      setSelectedStyle(styles.revealed1);
    }

    if (isRevealed && value === 2) {
      setStatus("revealed2");
      setSelectedStyle(styles.revealed2);
    }

    if (isRevealed && value === 3) {
      setStatus("revealed3");
      setSelectedStyle(styles.revealed3);
    }

    if (isRevealed && value === 4) {
      setStatus("revealed4");
      setSelectedStyle(styles.revealed4);
    }

    if (isRevealed && value === 5) {
      setStatus("revealed5");
      setSelectedStyle(styles.revealed5);
    }

    if (isRevealed && value === 6) {
      setStatus("revealed6");
      setSelectedStyle(styles.revealed6);
    }

    if (isRevealed && value === 7) {
      setStatus("revealed7");
      setSelectedStyle(styles.revealed7);
    }

    if (isRevealed && value === 8) {
      setStatus("revealed8");
      setSelectedStyle(styles.revealed8);
    }

    if (!isRevealed && isFlagged) {
      setStatus("flagged");
    }

    if (!isRevealed && !isFlagged) {
      setStatus("notTouched");
    }

    if (isRevealed && isFlagged && details.value === "x") {
      setStatus("trueFlagged");
    }

    if (isRevealed && !isFlagged && details.value === "x") {
      setStatus("mined");
    }

    if (
      isRevealed &&
      !isFlagged &&
      details.value === "x" &&
      lastCoordinate.x === details.x &&
      lastCoordinate.y === details.y
    ) {
      setStatus("detonated");
      setSelectedStyle(styles.detonated);
    }
  });

  return (
    <div
      className={selectedStyle}
      onClick={() => {
        if (details.isFlagged) {
          return;
        }

        revealSector(details.x, details.y);
      }}
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
    >
      {status.includes("notTouched") && ""}

      {status.includes("revealed") && details.value === 0 && ""}
      {status.includes("revealed") && details.value > 0 && details.value}

      {status === "flagged" && <FlagSvg className={styles.svgImg} />}

      {status === "trueFlagged" && <TrueFlagSvg className={styles.svgImg} />}

      {status === "mined" && <BombSvg className={styles.svgImg} />}
      {status === "detonated" && <BombSvg className={styles.svgImg} />}
    </div>
  );
}
