console.log("Welcome to Tic Tac Toe");

// Constants for better readability
const PLAYER_X = "X";
const PLAYER_O = "O";

// Variables
const boxes = Array.from(document.querySelectorAll(".box"));
const boxtext = Array.from(document.querySelectorAll(".boxText"));
const info = document.querySelector(".info");
const playAgainButton = document.getElementById("playAgain");
const resetButton = document.getElementById("reset");

let turn = PLAYER_X;
let gameOver = false;
let scoreX = 0;
let scoreO = 0;

// Audio play function with error handling
const playAudio = (audioFile) => {
  const audio = new Audio(`audio/${audioFile}`);
  audio.addEventListener("error", (error) => {
    console.error("Error playing audio:", error);
  });
  audio.play();
};

// Function to change the turn
const changeTurn = () => {
  turn = turn === PLAYER_X ? PLAYER_O : PLAYER_X;
  info.innerText = `Turn of ${turn}`;
};

// Function to update the score
const updateScore = (player) => {
  if (player === PLAYER_X) {
    scoreX++;
  } else {
    scoreO++;
  }
  document.getElementById("score-X").innerText = scoreX;
  document.getElementById("score-O").innerText = scoreO;
};

// Function to check for a win
let gameover = false;
const checkWin = () => {
  win = [
    [0, 1, 2, 0, 0, 4.5],
    [3, 4, 5, 0, 0, 14.5],
    [6, 7, 8, 0, 0, 24.7],
    [0, 3, 6, 90, -0.3, -5],
    [1, 4, 7, 90, -0.3, -15],
    [2, 5, 8, 90, -0.3, -25],
    [0, 4, 8, 45, 6, -0.3],
    [2, 4, 6, 135, -15, -21],
  ];
  win.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
      (boxtext[e[0]].innerText ||
        boxtext[e[1]].innerText ||
        boxtext[e[2]].innerText) !== ""
    ) {
      info.innerText = `${boxtext[e[0]].innerText} is Winner`;
      turn = boxtext[e[0]].innerText;
      document.getElementsByClassName(
        "line"
      )[0].style.transform = `rotate(${e[3]}deg) translate(${e[4]}vw,${e[5]}vw)`;
      document.getElementsByClassName("line")[0].style.width = "30vw";
      gameover = true;

      updateScore(boxtext[e[0]].innerText);
      playAudio("gameover.mp3");
    }
  });
};

// Function to handle a player's move
const handlePlayerMove = (boxText) => {
  if (boxText.innerText === "" && !gameOver) {
    boxText.innerText = turn;

    // Remove any existing X or O class
    boxText.classList.remove(PLAYER_X, PLAYER_O);

    // Add X or O class
    boxText.classList.add(turn);

    changeTurn();
    checkWin();
    playAudio("metal-clung.mp3");
  }
};

// Event listeners for each box
boxes.forEach((element) => {
  let boxText = element.querySelector(".boxText");
  element.addEventListener("click", () => {
    handlePlayerMove(boxText);
  });
});

// Function to clear the board
const clearBoard = () => {
  document.getElementsByClassName("line")[0].style.width = "0vw";
  boxtext.forEach((element) => {
    element.innerText = "";
  });
  gameover = false;
  info.innerText = `Turn of ${turn}`;
};

// Event listener for the "Play Again" button
playAgain.addEventListener("click", clearBoard);

// Event listener for the "Reset" button
reset.addEventListener("click", () => {
  clearBoard();
  scoreX = 0;
  scoreO = 0;
  document.getElementById("score-X").innerText = scoreX;
  document.getElementById("score-O").innerText = scoreO;
});
