// Initialize game state variables
let currentPlayer = 'X'; // Player 'X' goes first
let board = Array(9).fill(null); // Represents the 3x3 game board
let gameActive = true; // Determines if the game is active
let scores = {
    X: 0,
    O: 0,
    ties: 0
};

// DOM elements
const gameGrid = document.querySelector('#game-grid');
const gameStatus = document.querySelector('#game-status');
const scoreX = document.querySelector('#score-x');
const scoreTies = document.querySelector('#score-ties');
const scoreO = document.querySelector('#score-o');
const newGameCPU = document.querySelector('#new-game-cpu');
const newGamePlayer = document.querySelector('#new-game-player');
const quitGame = document.querySelector('#quit-game');
const nextRound = document.querySelector('#next-round');
const restartGame = document.querySelector('#restart-game');

// Utility function to check for winner
function checkWinner() {
    const winConditions = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    // Check for tie
    if (!board.includes(null)) {
        return 'tie';
    }

    return null; // No winner yet
}

// Function to handle player move
function handleMove(cellIndex) {
    if (!gameActive || board[cellIndex] !== null) {
        // Ignore if the game is inactive or the cell is already occupied
        return;
    }

    // Update board and UI
    board[cellIndex] = currentPlayer;
    const cell = gameGrid.children[cellIndex];
    cell.textContent = currentPlayer;

    // Check for winner
    const winner = checkWinner();
    if (winner) {
        gameActive = false;

        if (winner === 'tie') {
            gameStatus.textContent = 'Round tied';
            scores.ties++;
            scoreTies.textContent = scores.ties;
        } else {
            gameStatus.textContent = `${winner} wins!`;
            scores[winner]++;
            if (winner === 'X') {
                scoreX.textContent = scores[winner];
            } else {
                scoreO.textContent = scores[winner];
            }
        }

        // Show game controls for next round or restarting
        quitGame.style.display = 'block';
        nextRound.style.display = 'block';
        restartGame.style.display = 'block';
    } else {
        // Toggle player
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        gameStatus.textContent = `${currentPlayer}'s turn`;
    }
}

// Function to handle new game (vs CPU)
function startNewGameCPU() {
    resetGame();
    // Add AI implementation here if needed
}

// Function to handle new game (vs player)
function startNewGamePlayer() {
    resetGame();
}

// Function to handle quit game
function quitGameHandler() {
    resetGame();
    // Optionally, navigate away or show a game over screen
}

// Function to handle next round
function nextRoundHandler() {
    board = Array(9).fill(null);
    gameGrid.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    gameActive = true;
    currentPlayer = 'X';
    gameStatus.textContent = `${currentPlayer}'s turn`;
    // Hide game controls
    quitGame.style.display = 'none';
    nextRound.style.display = 'none';
    restartGame.style.display = 'none';
}

// Function to handle restart game
function restartGameHandler() {
    resetGame();
}

// Function to reset the game
function resetGame() {
    board = Array(9).fill(null);
    gameGrid.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    gameActive = true;
    currentPlayer = 'X';
    gameStatus.textContent = `${currentPlayer}'s turn`;
    // Hide game controls
    quitGame.style.display = 'none';
    nextRound.style.display = 'none';
    restartGame.style.display = 'none';
}

// Event listeners
gameGrid.addEventListener('click', event => {
    const cellIndex = Array.from(gameGrid.children).indexOf(event.target);
    handleMove(cellIndex);
});

newGameCPU.addEventListener('click', startNewGameCPU);
newGamePlayer.addEventListener('click', startNewGamePlayer);
quitGame.addEventListener('click', quitGameHandler);
nextRound.addEventListener('click', nextRoundHandler);
restartGame.addEventListener('click', restartGameHandler);

// Optionally, you can use Local Storage to save scores and other game data
function saveGameData() {
    localStorage.setItem('scores', JSON.stringify(scores));
}

function loadGameData() {
    const savedScores = localStorage.getItem('scores');
    if (savedScores) {
        scores = JSON.parse(savedScores);
        scoreX.textContent = scores.X;
        scoreO.textContent = scores.O;
        scoreTies.textContent = scores.ties;
    }
}

// Load game data on page load
loadGameData();