// console.log("Add js to page method 1: Hello World!");
// DOM objects
const scorePlayer = document.querySelector("#score-player");
const scoreComputer = document.querySelector("#score-computer");
const scoreDraw = document.querySelector("#score-draw");
const gameResult = document.querySelector("#game-result");
const roundResult = document.querySelector("#round-result");
const buttons = document.querySelectorAll("#game .rps-button");

// internal variables
const rockPaperScissors = ["rock", "paper", "scissors"];
let score = {
  player: 0,
  computer: 0,
  draw: 0,
};

// Start execution here
buttons.forEach((button) => button.addEventListener("click", rpsButtonPushed));
updateUI();

function rpsButtonPushed(e) {
  runTouchAnimation(e);
  let playerSelection = this.id;
  let computerSelection = computerPlay();
  roundResult.textContent = playRound(
    playerSelection.toLocaleLowerCase(),
    computerSelection.toLocaleLowerCase()
  );
  updateUI();
  roundResult.focus();
}

function runTouchAnimation(e) {
  console.log(e);
  e.target.classList.add("puke");
  e.target.addEventListener(
    "transitionend",
    (e) => {
      e.target.classList.remove("puke");
    },
    true
  );
}

function isGameOver() {
  if (score.player >= 5) {
    gameResult.textContent = "You won the game! Congratulations!";
    return true;
  } else if (score.computer >= 5) {
    gameResult.textContent = "The computer won!";
    return true;
  }

  return false;
}

function computerPlay() {
  return rockPaperScissors[getRandomInt(0, 2)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function resetScore() {
  score.player = 0;
  score.computer = 0;
  score.draw = 0;
}

function printScore() {
  console.log(score);
}

function updateUI() {
  scorePlayer.textContent = score.player.toString();
  scoreComputer.textContent = score.computer.toString();
  scoreDraw.textContent = score.draw.toString();
  isGameOver();
}

function playRound(playerSelection, computerSelection) {
  if (isGameOver()) return `The game is over, no further input is allowed.`;

  if (drawWins(playerSelection, computerSelection))
    return `It's a draw! Both players picked ${computerSelection.capitalize()}`;

  if (computerWins(playerSelection, computerSelection))
    return `You Lose! ${computerSelection.capitalize()} beats ${playerSelection.capitalize()}`;

  // When it isn't a draw, and the computer didn't win: Player Wins
  score.player++;
  return `You win this round! ${playerSelection.capitalize()} beats ${computerSelection.capitalize()}`;
}

function drawWins(playerSelection, computerSelection) {
  if (computerSelection === playerSelection) {
    score.draw++;
    return true;
  }
  return false;
}

function computerWins(playerSelection, computerSelection) {
  if (
    (computerSelection === "rock" && playerSelection === "scissors") ||
    (computerSelection === "paper" && playerSelection === "rock") ||
    (computerSelection === "scissors" && playerSelection === "paper")
  ) {
    score.computer++;
    updateUI();
    return true;
  }
  return false;
}

// Adds a 'capitalize' method to the string class
// Capitalizes the first character in a string
Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});
