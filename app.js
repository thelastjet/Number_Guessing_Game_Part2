// Variable declarations for the game

let playing = false;
let guesses = [];
let seconds = 0;
let minutes = 0;
let hours = 0;
let attempts = 0;
let bestScore = 0;
let randomNumber;

const input = document.getElementById("guess");
const feedback = document.getElementById("feedback");
const guessesPara = document.getElementById("guesses");
const timePara = document.getElementById("time");
const btn = document.getElementById("guess-btn");
const quitBtn = document.getElementById("quit-btn");
const bestScorePara = document.getElementById("lowest");
const currentGuesses = document.getElementById("current");

// Event listeners

btn.addEventListener("click", startGame);
quitBtn.addEventListener("click", resetGame);

function startGame() {
    // computer assigns a random number
    randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(randomNumber);
    // Change playing status
    playing = true;
    // Change button text
    btn.textContent = "Guess";
    // Enable input
    input.disabled = false;

    btn.removeEventListener("click", startGame);
    btn.addEventListener("click", guess);

    // Start the game clock
    const timeLapsed = setInterval(clock, 1000);

    function clock() {
        if (playing) {
            seconds++;
        }
        if (seconds > 59) {
            seconds = 0;
            minutes++;
        } else if (minutes > 59) {
            seconds = 0;
            minutes = 0;
            hours++;
        } else if (hours > 24 || !playing) {
            clearInterval(timeLapsed);
        }

        currenttime = `${hours
            .toString()
            .padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        timePara.textContent = "Elapsed Time: " + currenttime;
    }
}

function guess() {
    if (playing) {
        giveFeedback(input.value);
    }
}

function resetGame() {
    playing = false;
    btn.removeEventListener("click", guess);
    btn.addEventListener("click", startGame);
    btn.textContent = "Start";
    input.value = "";
    input.disabled = true;
    feedback.textContent = "Guess a whole number between 1 and 100";
    feedback.style.color = "black";
    guessesPara.textContent = "Your guesses will go here!";
    time.textContent = "Elapsed Time: 00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
    attempts = 0;
    currentGuesses.textContent = attempts + " of 10!";
    guesses = [];
}

function giveFeedback(guess) {
    if (checkInput(parseInt(guess))) {
      if (guesses.includes(guess)) {
        feedback.style.color = "Yellow";
        feedback.style.fontWeight = "bold";
        feedback.innerHTML = `Pay attention... You already guessed <span>${guess}</span>.`;
      } else {
        // Add guess to guesses array
        guesses.push(guess);
        // Change guesses paragraph to display current guesses
        guessesPara.textContent = guesses.join(" ");
        // Check to see if the guess matches the number
        checkCorrectAnswer(guess);
      }
    } else {
        feedback.style.color = "Yellow";
        feedback.style.fontWeight = "bold";
        feedback.textContent =
        "You are supposed to enter a whole number between 1 and 100.";
    }

    // Reset input
    input.value = "";
    input.focus();
}

function checkInput(guess) {
    if (guess < 1 || guess > 100 || isNaN(guess)) {
        return false;
    } else { 
        return true;
    }
}

// checking to see if the guess is correct
function checkCorrectAnswer (guess) {
    attempts++;
    currentGuesses.textContent = attempts + " of 10!";
    if (attempts == 10 && guess != randomNumber) {
        playing = false;
        feedback.style.color = "Yellow";
        feedback.style.fontWeight = "bold";
        feedback.textContent = `That was your last attempt, You Lose!`;
        input.disabled = true;
    } else if (guess > randomNumber) {
        feedback.style.color = 'yellow';
        feedback.textContent = `Your guess of ${guess} is too high. Try again!`;
    } else if (guess < randomNumber) {
        feedback.style.color = 'red';
        feedback.textContent = `Your guess of ${guess} is too low. Try again!`;
    } else {
        // stopping the game and congratulating the player
        playing = false;
        feedback.style.color = 'darkgreen';
        feedback.textContent = `Congratulations! ${guess} is the correct number!`;
        input.disabled = true;
        if (bestScore) {
            bestScore = bestScore > attempts ? attempts : bestScore;
        } else {
            bestScore = attempts;
        }
        bestScorePara.textContent = bestScore;
    }
}