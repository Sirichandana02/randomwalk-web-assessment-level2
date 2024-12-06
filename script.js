const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
const playerXScoreEl = document.getElementById('playerX-score');
const playerOScoreEl = document.getElementById('playerO-score');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let playerXScore = 0;
let playerOScore = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner(currentPlayer)) {
        status.textContent = `Player ${currentPlayer} Wins!`;
        updateScore(currentPlayer);
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== '')) {
        status.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner(player) {
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === player)
    );
}

function updateScore(player) {
    if (player === 'X') {
        playerXScore++;
        playerXScoreEl.textContent = `Player X: ${playerXScore}`;
    } else {
        playerOScore++;
        playerOScoreEl.textContent = `Player O: ${playerOScore}`;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player X's Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

