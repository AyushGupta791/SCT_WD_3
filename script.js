let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let mode = "2p";

function startGame(selectedMode) {
  mode = selectedMode;
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  createBoard();
}

function createBoard() {
  const boardEl = document.getElementById("board");
  boardEl.innerHTML = "";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  document.getElementById("result").textContent = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    boardEl.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    gameActive = false;
    document.getElementById("result").textContent = `${currentPlayer} Wins!`;
    return;
  }

  if (!board.includes("")) {
    gameActive = false;
    document.getElementById("result").textContent = "It's a Draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (mode === "cpu" && currentPlayer === "O") {
    setTimeout(cpuMove, 500);
  }
}

function cpuMove() {
  let emptyIndices = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  document.querySelectorAll(".cell")[randomIndex].click();
}

function checkWin(player) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => combo.every(i => board[i] === player));
}

function resetGame() {
  currentPlayer = "X";
  createBoard();
}
