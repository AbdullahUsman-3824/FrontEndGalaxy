// SnakeSprint Game

console.log("Welcome to SnakeSprint");

// Audio declarations
const music = new Audio("../audio/music.mp3");
const moveSound = new Audio("../audio/move.mp3");
const foodSound = new Audio("../audio/food.mp3");
const overSound = new Audio("../audio/gameover_2.mp3");

// Constants
const BOARD_SIZE = 18;
const INITIAL_POSITION = { x: 12, y: 15 };

// Variables
const board = document.getElementsByClassName("board")[0];
let inputDir = { x: 0, y: 0 };
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [INITIAL_POSITION];
let food = generateFood();
let score = 0;
let hiscoreval = getHiscore();

// Main game loop
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

// Check for collisions
function isCollide() {
  // Check self-collision
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  // Check boundary collision
  if (
    snakeArr[0].x <= 0 ||
    snakeArr[0].x >= BOARD_SIZE ||
    snakeArr[0].y <= 0 ||
    snakeArr[0].y >= BOARD_SIZE
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  if (isCollide()) {
    // Handle collision
    handleCollision();
  }

  //Eating the food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    // Handle eating food
    handleFoodEating();
  }

  // Move the snake
  moveSnake();

  // Display food and snake
  displayFood();
  displaySnake();

  // Update score
  scoreBox.innerText = `Score: ${score}`;
}

// Handle collision
function handleCollision() {
  overSound.play();
  music.pause();
  music.currentTime = 0;
  alert("Game Over");
  resetGame();
}

// Handle eating food
function handleFoodEating() {
  foodSound.play();
  score++;
  updateHiscore();

  snakeArr.unshift({
    x: snakeArr[0].x + inputDir.x,
    y: snakeArr[0].y + inputDir.y,
  });

  food = generateFood();
}

// Move the snake
function moveSnake() {
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
}

// Display food on the board
function displayFood() {
  board.innerHTML = "";
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Display snake on the board
function displaySnake() {
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add(index === 0 ? "head" : "body");
    board.appendChild(snakeElement);
  });
}

// Reset the game
function resetGame() {
  snakeArr = [{ x: 12, y: 15 }];
  inputDir = { x: 0, y: 0 };
  score = 0;
  food = generateFood(); // Reset the food position
}


// Generate random food coordinates
function generateFood() {
  const a = 2;
  const b = BOARD_SIZE - 2;
  let newFood;
  do {
    newFood = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  } while (isFoodOnSnake(newFood));
  return newFood;
}

// Check if food is on the snake
function isFoodOnSnake(foodCoords) {
  return snakeArr.some(
    (segment) => segment.x === foodCoords.x && segment.y === foodCoords.y
  );
}

// Local storage for hiscore
function getHiscore() {
  const hiscore = localStorage.getItem("hiscore");
  return hiscore === null ? 0 : JSON.parse(hiscore);
}

function updateHiscore() {
  if (score > hiscoreval) {
    hiscoreval = score;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
  }
}

// Initialize game
let hiscoreBox = document.getElementById("hiscoreBox");
let scoreBox = document.getElementById("scoreBox");

if (hiscoreval === 0) {
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreBox.innerHTML = `HiScore: ${hiscoreval}`;
}

// Event listener for user input
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  music.play();
  moveSound.play();
  // inputDir = { x: 0, y: -1 };
  inputDir = getDirectionFromKey(e.key);
});

// Get direction from key press
function getDirectionFromKey(key) {
  switch (key) {
    case "ArrowUp":
      return { x: 0, y: -1 };
    case "ArrowDown":
      return { x: 0, y: 1 };
    case "ArrowLeft":
      return { x: -1, y: 0 };
    case "ArrowRight":
      return { x: 1, y: 0 };
    default:
      return { x: 0, y: -1 };
  }
}
