const sectorReveal = (arr, x, y, newNonMines) => {
  let show = [];
  show.push(arr[x][y]);
  while (show.length !== 0) {
    let one = show.pop();
    let i = one.x;
    let j = one.y;
    if (!one.isRevealed) {
      newNonMines--;
      one.isRevealed = true;
    }
    if (one.value !== 0) {
      break;
    }

    // top left

    if (
      i > 0 &&
      j > 0 &&
      arr[i - 1][j - 1].value === 0 &&
      !arr[i - 1][j - 1].isRevealed
    ) {
      show.push(arr[i - 1][j - 1]);
    }

    // bottom right

    if (
      i < arr.length - 1 &&
      j < arr[0].length - 1 &&
      arr[i + 1][j + 1].value === 0 &&
      !arr[i + 1][j + 1].isRevealed
    ) {
      show.push(arr[i + 1][j + 1]);
    }

    // top right

    if (
      i > 0 &&
      j < arr[0].length - 1 &&
      arr[i - 1][j + 1].value === 0 &&
      !arr[i - 1][j + 1].isRevealed
    ) {
      show.push(arr[i - 1][j + 1]);
    }

    // bottom left

    if (
      i < arr.length - 1 &&
      j > 0 &&
      arr[i + 1][j - 1].value === 0 &&
      !arr[i + 1][j - 1].isRevealed
    ) {
      show.push(arr[i + 1][j - 1]);
    }

    // top
    if (i > 0 && arr[i - 1][j].value === 0 && !arr[i - 1][j].isRevealed) {
      show.push(arr[i - 1][j]);
    }

    // right

    if (
      j < arr[0].length - 1 &&
      arr[i][j + 1].value === 0 &&
      !arr[i][j + 1].isRevealed
    ) {
      show.push(arr[i][j + 1]);
    }

    // bottom

    if (
      i < arr.length - 1 &&
      arr[i + 1][j].value === 0 &&
      !arr[i + 1][j].isRevealed
    ) {
      show.push(arr[i + 1][j]);
    }

    // left

    if (j > 0 && arr[i][j - 1].value === 0 && !arr[i][j - 1].isRevealed) {
      show.push(arr[i][j - 1]);
    }

    // start revealing the item

    if (i > 0 && j > 0 && !arr[i - 1][j - 1].isRevealed) {
      //Top Left Reveal

      arr[i - 1][j - 1].isRevealed = true;
      newNonMines--;
    }

    if (j > 0 && !arr[i][j - 1].isRevealed) {
      // Left Reveal
      arr[i][j - 1].isRevealed = true;
      newNonMines--;
    }

    if (i < arr.length - 1 && j > 0 && !arr[i + 1][j - 1].isRevealed) {
      //Bottom Left Reveal
      arr[i + 1][j - 1].isRevealed = true;
      newNonMines--;
    }

    if (i > 0 && !arr[i - 1][j].isRevealed) {
      //Top Reveal
      arr[i - 1][j].isRevealed = true;
      newNonMines--;
    }

    if (i < arr.length - 1 && !arr[i + 1][j].isRevealed) {
      // Bottom Reveal
      arr[i + 1][j].isRevealed = true;
      newNonMines--;
    }

    if (i > 0 && j < arr[0].length - 1 && !arr[i - 1][j + 1].isRevealed) {
      // Top Right Reveal
      arr[i - 1][j + 1].isRevealed = true;
      newNonMines--;
    }

    if (j < arr[0].length - 1 && !arr[i][j + 1].isRevealed) {
      //Right Reveal
      arr[i][j + 1].isRevealed = true;
      newNonMines--;
    }

    if (
      i < arr.length - 1 &&
      j < arr[0].length - 1 &&
      !arr[i + 1][j + 1].isRevealed
    ) {
      // Bottom Right Reveal
      arr[i + 1][j + 1].isRevealed = true;
      newNonMines--;
    }
  }

  return { arr, newNonMines };
};

export default sectorReveal;
