const words = [
    { word: "apple", hint: "A common fruit that keeps doctors away" },
    { word: "ocean", hint: "A large body of saltwater" },
    { word: "piano", hint: "A musical instrument with keys" },
    { word: "tiger", hint: "A large cat with stripes" },
    { word: "robot", hint: "A machine that can act like a human" }
];

let selectedWord, guessedLetters, displayWord;

const hintElement = document.getElementById("hint");
const wordDisplay = document.getElementById("wordDisplay");
const letterInput = document.getElementById("letterInput");
const message = document.getElementById("message");
const guessedLettersElement = document.getElementById("guessedLetters");
const resetBtn = document.getElementById("resetBtn");

function initGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word.toLowerCase();
    hintElement.textContent = `Hint: ${words[randomIndex].hint}`;
    guessedLetters = [];
    displayWord = Array(selectedWord.length).fill("_");
    updateDisplay();
    message.textContent = "";
    guessedLettersElement.textContent = "";
}

function updateDisplay() {
    wordDisplay.textContent = displayWord.join(" ");
    guessedLettersElement.textContent = guessedLetters.join(", ");
}

function handleGuess() {
    const guess = letterInput.value.toLowerCase();
    letterInput.value = "";

    if (!guess.match(/^[a-z]$/)) {
        message.textContent = "Please enter a single alphabet letter.";
        return;
    }

    if (guessedLetters.includes(guess)) {
        message.textContent = `You already guessed "${guess}".`;
        return;
    }

    guessedLetters.push(guess);

    if (selectedWord.includes(guess)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess) {
                displayWord[i] = guess;
            }
        }
        message.textContent = `Good job! "${guess}" is correct.`;
    } else {
        message.textContent = `Sorry, "${guess}" is not in the word.`;
    }

    updateDisplay();
    checkWin();
}

function checkWin() {
    if (!displayWord.includes("_")) {
        message.textContent = "🎉 Congratulations! You guessed the word!";
    }
}

letterInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        handleGuess();
    }
});

resetBtn.addEventListener("click", initGame);

initGame();
