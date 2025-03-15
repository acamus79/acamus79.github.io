const canvas = document.getElementById('tetris-board');
const ctx = canvas.getContext('2d');

// Configuración del tablero
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = Math.min(window.innerWidth / COLS, window.innerHeight / ROWS);
canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let score = 0;
let level = 1;
let gameInterval;
let isPaused = false;

// Piezas de Tetris
const PIECES = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]], // Z
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 0, 0], [1, 1, 1]], // L
    [[0, 0, 1], [1, 1, 1]]  // J
];

// Original Alexey Pajitnov color scheme:
// I - Rojo, O - Azul, T - Marrón, Z - Cyan, S - Verde, L - Magenta, J - Blanco
const COLORS = ['#FF0000', '#0000FF', '#8B4513', '#00FFFF', '#00FF00', '#FF00FF', '#FFFFFF'];

let currentPiece = getRandomPiece();
let currentPosition = { x: Math.floor(COLS / 2) - 1, y: 0 };

// Dibujar el tablero
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col]) {
                drawBlock(col, row, COLORS[board[row][col] - 1]);
            }
        }
    }
}

// Dibujar un bloque
function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

// Dibujar la pieza actual
function drawPiece() {
    currentPiece.shape.forEach((row, dy) => {
        row.forEach((value, dx) => {
            if (value) {
                drawBlock(currentPosition.x + dx, currentPosition.y + dy, COLORS[currentPiece.color - 1]);
            }
        });
    });
}

// Colocar la pieza en el tablero
function placePiece() {
    currentPiece.shape.forEach((row, dy) => {
        row.forEach((value, dx) => {
            if (value) {
                board[currentPosition.y + dy][currentPosition.x + dx] = currentPiece.color;
            }
        });
    });
}

// Verificar si hay filas completas
function checkLines() {
    let linesCleared = 0;
    let completedRows = [];

    // Primero identificamos todas las filas completas
    for (let row = 0; row < ROWS; row++) {
        if (board[row].every(cell => cell !== 0)) {
            completedRows.push(row);
            linesCleared++;
        }
    }

    // Si hay líneas completas, animamos y luego actualizamos el tablero y la puntuación
    if (linesCleared > 0) {
        animateLines(completedRows, () => {
            // Callback que se ejecuta después de la animación
            // Eliminamos las filas y actualizamos el tablero
            completedRows.forEach(row => {
                board.splice(row, 1);
                board.unshift(Array(COLS).fill(0));
            });

            // Actualizamos la puntuación después de eliminar las filas
            updateScore(linesCleared);

            // Redibujamos el tablero con las filas eliminadas
            drawBoard();
            drawPiece();
        });
    }
}

// Animación de eliminación de línea
function animateLines(rows, callback) {
    // Hacemos una copia del estado actual del tablero
    const originalBoard = board.map(row => [...row]);

    // Marcamos las filas para animación (parpadeo)
    let flashCount = 0;
    const maxFlashes = 3;

    function flash() {
        flashCount++;

        // Alternamos entre mostrar y ocultar las filas completas
        rows.forEach(row => {
            if (flashCount % 2 === 1) {
                // Filas en blanco (ocultas)
                board[row] = Array(COLS).fill(0);
            } else {
                // Restauramos las filas
                board[row] = originalBoard[row].map(cell => cell);
            }
        });

        // Redibujamos el tablero
        drawBoard();
        drawPiece();

        if (flashCount < maxFlashes * 2) {
            // Continuamos el parpadeo
            setTimeout(flash, 100);
        } else {
            // Terminamos la animación y ejecutamos el callback
            if (callback) callback();
        }
    }

    // Iniciamos la animación
    flash();
}

// Actualizar la puntuación según las líneas eliminadas
function updateScore(linesCleared) {
    let points = 0;

    switch (linesCleared) {
        case 1:
            points = 40 * level; // 40 puntos por línea × nivel
            break;
        case 2:
            points = 100 * level; // 100 puntos por 2 líneas × nivel
            break;
        case 3:
            points = 300 * level; // 300 puntos por 3 líneas × nivel
            break;
        case 4:
            points = 1200 * level; // 1200 puntos por Tetris (4 líneas) × nivel
            break;
        default:
            points = 0;
    }

    score += points;
    document.getElementById('score').textContent = score;

    // Subir de nivel si se alcanza cierta puntuación
    if (score >= level * 1000) {
        level++;
        document.getElementById('level').textContent = level;
        clearInterval(gameInterval);
        startGame();
    }
}

// Obtener una pieza aleatoria
function getRandomPiece() {
    const randomIndex = Math.floor(Math.random() * PIECES.length);
    return {
        shape: PIECES[randomIndex],
        color: randomIndex + 1
    };
}

// Verificar colisiones
function collide() {
    for (let dy = 0; dy < currentPiece.shape.length; dy++) {
        for (let dx = 0; dx < currentPiece.shape[dy].length; dx++) {
            if (currentPiece.shape[dy][dx]) {
                const newX = currentPosition.x + dx;
                const newY = currentPosition.y + dy;
                if (
                    newX < 0 || newX >= COLS ||
                    newY >= ROWS ||
                    board[newY][newX]
                ) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Mover la pieza hacia abajo
function moveDown() {
    currentPosition.y++;
    if (collide()) {
        currentPosition.y--;
        placePiece();
        checkLines();
        currentPiece = getRandomPiece();
        currentPosition = { x: Math.floor(COLS / 2) - 1, y: 0 };
        if (collide()) {
            gameOver();
        }
    }
    drawBoard();
    drawPiece();
}

// Controlar el juego
function control(e) {
    if (e.key === 'Escape') {
        togglePause();
        return;
    }
    if (isPaused) return;
    switch (e.key) {
        case 'ArrowLeft':
            currentPosition.x--;
            if (collide()) currentPosition.x++;
            break;
        case 'ArrowRight':
            currentPosition.x++;
            if (collide()) currentPosition.x--;
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'Shift':
            rotatePiece();
            break;
        case 'h':
        case 'H':
            toggleHistory();
            break;
    }
}

// Rotar la pieza
function rotatePiece() {
    const rotated = currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
    );
    const previousShape = currentPiece.shape;
    currentPiece.shape = rotated;
    if (collide()) {
        currentPiece.shape = previousShape;
    }
}

// Iniciar el juego
function startGame() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    score = 0;
    level = 1;
    updateScore(0); // Reiniciar la puntuación
    currentPiece = getRandomPiece();
    currentPosition = { x: Math.floor(COLS / 2) - 1, y: 0 };
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        moveDown();
    }, 1000 - level * 100);
}

// Pausar el juego
function togglePause() {
    isPaused = !isPaused;
    const pauseOverlay = document.getElementById('pause-overlay');
    pauseOverlay.style.display = isPaused ? 'flex' : 'none';

    // Aplicar estilo retro al texto de pausa
    if (isPaused) {
        const pauseText = document.getElementById('pause-overlay');
        pauseText.classList.add('retro-text');
    }

    if (!isPaused) {
        // Reanudar el juego sin reiniciarlo
        gameInterval = setInterval(() => {
            moveDown();
        }, 1000 - level * 100);
    } else {
        clearInterval(gameInterval);
    }
}

// Mostrar/ocultar historia en móviles
function toggleHistory() {
    const historyModal = document.getElementById('tetris-history');
    if (window.innerWidth <= 768) {
        if (historyModal.style.display === 'flex') {
            historyModal.style.display = 'none';
            togglePause(); // Reanudar el juego
        } else {
            historyModal.style.display = 'flex';
            togglePause(); // Pausar el juego
        }
    }
}

// Fin del juego
function gameOver() {
    clearInterval(gameInterval);
    document.getElementById('final-score').textContent = score;
    const gameOverOverlay = document.getElementById('game-over-overlay');
    gameOverOverlay.style.display = 'flex';

    // Aplicar estilo retro al texto de fin del juego
    const gameOverText = document.querySelector('.game-over-text');
    if (gameOverText) {
        gameOverText.classList.add('retro-text');
    }
}

// Guardar puntuación en localStorage
document.getElementById('save-score').addEventListener('click', () => {
    const initials = document.getElementById('player-initials').value.toUpperCase();
    if (initials.length === 3) {
        const finalScore = score;

        // Obtener las puntuaciones existentes del localStorage
        let scores = JSON.parse(localStorage.getItem('tetrisScores')) || [];

        // Agregar la nueva puntuación
        scores.push({ initials, score: finalScore });

        // Ordenar las puntuaciones de mayor a menor
        scores.sort((a, b) => b.score - a.score);

        // Guardar las puntuaciones actualizadas en localStorage
        localStorage.setItem('tetrisScores', JSON.stringify(scores));

        alert('Puntuación guardada');
    } else {
        alert('Por favor, ingresa 3 letras.');
    }
});

// Reiniciar el juego
document.getElementById('restart-game').addEventListener('click', () => {
    document.getElementById('game-over-overlay').style.display = 'none';
    score = 0;
    level = 1;
    updateScore(0); // Reiniciar la puntuación
    startGame(); // Iniciar el juego nuevamente
});

// Ajustar el tamaño del tablero dinámicamente
function resizeCanvas() {
    const BLOCK_SIZE = Math.min(window.innerWidth / COLS, window.innerHeight / ROWS);
    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE;
}

// Llamar a resizeCanvas al cargar la página y al cambiar el tamaño de la ventana
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Inicializar el juego
document.addEventListener('keydown', control);
startGame(); // Asegurarse de que el juego comience automáticamente
