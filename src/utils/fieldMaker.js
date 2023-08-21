export default function fieldMaker(dimension, mines) {
  let field = [];

  let minesLocation = [];

  for (let x = 0; x < dimension; x++) {
    let xCol = [];
    for (let y = 0; y < dimension; y++) {
      xCol.push({
        value: 0,
        isRevealed: false,
        x,
        y,
        isFlagged: false,
      });
    }

    field.push(xCol);
  }

  let minesCount = 0;

  while (minesCount < mines) {
    let x = Math.floor(Math.random() * (dimension - 1 + 1));
    let y = Math.floor(Math.random() * (dimension - 1 + 1));

    if (field[x][y].value === 0) {
      field[x][y].value = "x";
      minesLocation.push([x, y]);
      minesCount++;
    }
  }

  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      if (field[i][j].value === "x") {
        continue;
      }

      // check top box mine
      if (i > 0 && field[i - 1][j].value === "x") {
        field[i][j].value++;
      }

      // check top right box mine
      if (i > 0 && j < dimension - 1 && field[i - 1][j + 1].value === "x") {
        field[i][j].value++;
      }

      // check right box mine
      if (j < dimension - 1 && field[i][j + 1].value === "x") {
        field[i][j].value++;
      }

      // cheek bottom right box mine
      if (i < dimension - 1 && j < dimension - 1 && field[i + 1][j + 1].value === "x") {
        field[i][j].value++;
      }

      // check bottom box mine
      if (i < dimension - 1 && field[i + 1][j].value === "x") {
        field[i][j].value++;
      }

      // check bottom left box mine
      if (i < dimension - 1 && j > 0 && field[i + 1][j - 1].value === "x") {
        field[i][j].value++;
      }

      // check left box mine
      if (j > 0 && field[i][j - 1].value === "x") {
        field[i][j].value++;
      }

      // check top left box mine
      if (i > 0 && j > 0 && field[i - 1][j - 1].value === "x") {
        field[i][j].value++;
      }
    }
  }

  return {field, minesLocation};
}
