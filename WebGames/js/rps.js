console.log("Welcome to Rock Paper Scissors");

// Audio play function with error handling
const playAudio = (audioFile) => {
  const audio = new Audio(`../audio/${audioFile}`);
  audio.addEventListener("error", (error) => {
    console.error("Error playing audio:", error);
  });
  audio.play();
};

// DOM Elements
let playerArea = document.querySelector(".playerArea");
let systemArea = document.querySelector(".systemArea");
let playerScoreDisplay = document.querySelector(".playerScore");
let systemScoreDisplay = document.querySelector(".systemScore");
let message = document.querySelector(".message");

// Symbol definitions
const ROCK_SYMBOL = `<i class="fa-regular fa-hand-back-fist"></i>`;
const PAPER_SYMBOL = `<i class="fa-regular fa-hand"></i>`;
const SCISSORS_SYMBOL = `<i class="fa-regular fa-hand-scissors" style="transform: rotate(90deg)"></i>`;

let playerScore = 0;
let systemScore = 0;
let messageText;

// Function to check the game result
const checkWin = (playerChoice, systemChoice) => {
  if (
    (playerChoice === ROCK_SYMBOL && systemChoice === SCISSORS_SYMBOL) ||
    (playerChoice === PAPER_SYMBOL && systemChoice === ROCK_SYMBOL) ||
    (playerChoice === SCISSORS_SYMBOL && systemChoice === PAPER_SYMBOL)
  ) {
    playerScore++;
    messageText = `You Win! ${
      choices.find((c) => c.symbol === playerChoice).name
    } beats ${choices.find((c) => c.symbol === systemChoice).name}`;
  } else if (playerChoice === systemChoice) {
    messageText = `It's a Tie`;
  } else {
    systemScore++;
    messageText = `You lose! ${
      choices.find((c) => c.symbol === systemChoice).name
    } beats ${choices.find((c) => c.symbol === playerChoice).name}`;
  }
};

// Choices array with symbol and name
let choices = [
  { symbol: ROCK_SYMBOL, name: "Rock" },
  { symbol: PAPER_SYMBOL, name: "Paper" },
  { symbol: SCISSORS_SYMBOL, name: "Scissors" },
];

// Event listeners for player choices
let keys = Array.from(document.getElementsByClassName("keys"));
keys.forEach((element, index) => {
  element.addEventListener("click", () => {
    playAudio("metal-clung.mp3");
    
    playerChoice = choices[index].symbol;
    systemChoice = choices[Math.floor(Math.random() * choices.length)].symbol;

    playerArea.innerHTML = playerChoice;
    systemArea.innerHTML = systemChoice;

    checkWin(playerChoice, systemChoice);
    message.innerText = messageText;
    playerScoreDisplay.innerText = playerScore;
    systemScoreDisplay.innerText = systemScore;

    
  });
});

// Event listener to reset the game
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
  playerArea.innerText = "";
  systemArea.innerText = "";
  playerScore = 0;
  systemScore = 0;
  message.innerText = "";
  playerScoreDisplay.innerText = "0";
  systemScoreDisplay.innerText = "0";
});
