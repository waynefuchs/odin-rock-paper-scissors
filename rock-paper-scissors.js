// console.log("Add js to page method 1: Hello World!");

const rockPaperScissors = ["rock", "paper", "scissors"];
let score = {
    player: 0,
    computer: 0,
    draw: 0
}

function computerPlay() {
    return rockPaperScissors[getRandomInt(0, 2)];
}

function getUserInput() {
    while(true) {
        let userInput = prompt(`Please choose "Rock", "Paper", or "Scissors": `);
        if(rockPaperScissors.includes(userInput.toLocaleLowerCase())) return userInput;
        console.log("Invalid selection, please try again!");
    }
}

function getRandomInt(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function resetScore() {
    score.player = 0;
    score.computer = 0;
    score.draw = 0;
}

function printScore() {
    console.log(score);
}

function game() {
    resetScore();

    for(let roundNumber=1; roundNumber<=5; roundNumber++) 
    {
        let computerSelection = computerPlay();
        let playerSelection = getUserInput();
        let roundResult = playRound(playerSelection, computerSelection);
        console.log(roundResult);    
    }

    printScore();
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLocaleLowerCase();
    computerSelection = computerSelection.toLocaleLowerCase();  // This shouldn't be necessary, but doing it "just in case"

    let computerWins = "You Lose!";
    let playerWins = "You Win!";
    let nobodyWins = "It's a draw!";

    // It's a draw
    if(computerSelection === playerSelection) 
    {
        score.draw++;
        return `${nobodyWins} Both players picked ${computerSelection.capitalize()}`;
    }

    // Computer Wins
    if( (computerSelection === "rock" && playerSelection === "scissors")
        || (computerSelection === "paper" && playerSelection === "rock") 
        || (computerSelection === "scissors" && playerSelection === "paper")) 
        {
            score.computer++;
            return `${computerWins} ${computerSelection.capitalize()} beats ${playerSelection.capitalize()}`;
        }

    // Player Wins
    score.player++;
    return `${playerWins} ${playerSelection.capitalize()} beats ${computerSelection.capitalize()}`;
}


// Function to generate 1.5M random numbers and report how many times that was selected
// This led to me finding a bug in my getRandomInt() function
// (Real test cases would be better here)
// I'm not certain what the 'correct' way to implement tests in js is, yet
// checkRandomSelection();
function checkRandomSelection() {
    let rock = 0;
    let paper = 0;
    let scissors = 0;

    for(let x=0; x<1500000; x++) {
        let y = getRandomInt(0, 2);
        if(y == 0) rock++;
        if(y == 1) paper++;
        if(y == 2) scissors++;
    }

    console.log(`Rock:${rock} Paper:${paper} Scissors:${scissors}`);
}

// This is neat
// Adds a 'capitalize' method to the string class that capitalizes the first character in a string
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });



  game();
