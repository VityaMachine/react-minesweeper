import React, { useEffect, useState } from "react";

import styles from "./Game.module.css";

import Field from "../Field/Field";

export default function Game() {
  const [status, setStatus] = useState("selectingDimension");
  const [fieldDimension, setFieldDimension] = useState(10);
  const [minesCount, setMinesCount] = useState(10);

  useEffect(() => {
    let calcMines = Math.floor((fieldDimension * fieldDimension) / 6);
    setMinesCount(calcMines);
  }, [fieldDimension]);

  const inputHandler = (e) => {
    setFieldDimension(e.target.value);
  };

  const setFieldHandler = () => {
    if (fieldDimension < 8 || fieldDimension > 16) {
      alert("wrong field dimension");
      return;
    }

    setStatus("rdy2play");
  };

  const resetFieldHandler = () => {
    setStatus("selectingDimension");
  };

  return (
    <div className={styles.container}>
      {status === "selectingDimension" && (
        <>
          <h3>Select mined field dimension</h3>

          <div className={styles.inputContainer}>
            <label>
              <span>Input field dimension (min = 8, max = 16)</span>
              <input
                type="number"
                value={fieldDimension}
                onChange={inputHandler}
              />
            </label>

            <button className={styles.setBtn} onClick={setFieldHandler}>
              Set field
            </button>
          </div>
        </>
      )}

      {status === "rdy2play" && (
        <>
          <button onClick={resetFieldHandler}>Reset field</button>
          <Field fieldDimension={fieldDimension} minesCount={minesCount} />
        </>
      )}
    </div>
  );
}
