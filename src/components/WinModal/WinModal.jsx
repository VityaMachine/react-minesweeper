import React from "react";

import { createPortal } from "react-dom";

import styles from "./WinModal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function WinModal({ onCloseAndRestart, onCloseAndSelNewLvl }) {
  return createPortal(
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <div>Well Played!!! You win!!!</div>
        <div className={styles.btnsContainer}>
          <button onClick={onCloseAndRestart}>Start new game</button>
          <button onClick={onCloseAndSelNewLvl}>Select new level</button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
