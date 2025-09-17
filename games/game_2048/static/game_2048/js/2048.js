const board = document.getElementById("board");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");

let grid;

function init() {
  grid = Array.from({ length: 4 }, () => Array(4).fill(0));
  addRandom();
  addRandom();
  draw();
  message.textContent = "";
}

function addRandom() {
  let empty = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) empty.push({ r, c });
    }
  }
  if (empty.length === 0) return;
  let { r, c } = empty[Math.floor(Math.random() * empty.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function draw() {
  board.innerHTML = "";
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let value = grid[r][c];
      let tile = document.createElement("div");
      tile.className = "tile";
      if (value > 0) {
        tile.textContent = value;
        tile.classList.add(`tile-${value}`);
      }
      board.appendChild(tile);
    }
  }
}

function slide(row) {
  let arr = row.filter(v => v !== 0);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      arr[i + 1] = 0;
    }
  }
  arr = arr.filter(v => v !== 0);
  while (arr.length < 4) arr.push(0);
  return arr;
}

function rotateGrid() {
  let newGrid = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      newGrid[r][c] = grid[c][3 - r];
    }
  }
  grid = newGrid;
}

function moveLeft() {
  let changed = false;
  for (let r = 0; r < 4; r++) {
    let newRow = slide(grid[r]);
    if (grid[r].toString() !== newRow.toString()) changed = true;
    grid[r] = newRow;
  }
  if (changed) {
    addRandom();
    draw();
    checkGameOver();
  }
}

function moveRight() {
  let changed = false;
  for (let r = 0; r < 4; r++) {
    let row = grid[r].slice().reverse();
    let newRow = slide(row).reverse();
    if (grid[r].toString() !== newRow.toString()) changed = true;
    grid[r] = newRow;
  }
  if (changed) {
    addRandom();
    draw();
    checkGameOver();
  }
}

function moveUp() {
  let changed = false;
  for (let c = 0; c < 4; c++) {
    let col = [];
    for (let r = 0; r < 4; r++) col.push(grid[r][c]);
    let newCol = slide(col);
    for (let r = 0; r < 4; r++) {
      if (grid[r][c] !== newCol[r]) changed = true;
      grid[r][c] = newCol[r];
    }
  }
  if (changed) {
    addRandom();
    draw();
    checkGameOver();
  }
}

function moveDown() {
  let changed = false;
  for (let c = 0; c < 4; c++) {
    let col = [];
    for (let r = 0; r < 4; r++) col.push(grid[r][c]);
    let newCol = slide(col.reverse()).reverse();
    for (let r = 0; r < 4; r++) {
      if (grid[r][c] !== newCol[r]) changed = true;
      grid[r][c] = newCol[r];
    }
  }
  if (changed) {
    addRandom();
    draw();
    checkGameOver();
  }
}

function checkGameOver() {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) return;
      if (c < 3 && grid[r][c] === grid[r][c + 1]) return;
      if (r < 3 && grid[r][c] === grid[r + 1][c]) return;
    }
  }
  message.textContent = "ゲームオーバー！";
}

document.addEventListener("keydown", e => {
  if (message.textContent) return;
  switch (e.key) {
    case "ArrowLeft": moveLeft(); break;
    case "ArrowRight": moveRight(); break;
    case "ArrowUp": moveUp(); break;
    case "ArrowDown": moveDown(); break;
  }
});

restartBtn.addEventListener("click", init);

init();
