const gameBoard = document.getElementById('game-board');

const dungeonMap = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 2],
  [1, 1, 1, 1, 1],
];

let playerPosition = { x: 1, y: 1 };
let gameOver = false;

function drawMap() {
  gameBoard.innerHTML = '';
  dungeonMap.forEach((row, y) => {
    row.forEach((cell, x) => {
      const div = document.createElement('div');
      div.classList.add('cell');

      if (cell === 1) {
        div.classList.add('wall');
      } else if (cell === 2) {
        div.classList.add('goal');
      }

      if (playerPosition.x === x && playerPosition.y === y) {
        div.classList.add('player');
      }

      gameBoard.appendChild(div);
    });
  });
}

function movePlayer(dx, dy) {
  if (gameOver) return;

  const newX = playerPosition.x + dx;
  const newY = playerPosition.y + dy;

  if (dungeonMap[newY] && dungeonMap[newY][newX] === 0) {
    playerPosition.x = newX;
    playerPosition.y = newY;
    drawMap();
  } else if (dungeonMap[newY] && dungeonMap[newY][newX] === 2) {
    playerPosition.x = newX;
    playerPosition.y = newY;
    drawMap();
    gameOver = true;
    setTimeout(showWinMessage, 100);
  }
}

function showWinMessage() {
  const winMessage = document.createElement('div');
  winMessage.id = 'win-message';
  winMessage.textContent = 'You Win!';

  document.body.appendChild(winMessage);

  setTimeout(() => {
    winMessage.classList.add('show');
  }, 10);
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      movePlayer(0, -1);
      break;
    case 'ArrowDown':
      movePlayer(0, 1);
      break;
    case 'ArrowLeft':
      movePlayer(-1, 0);
      break;
    case 'ArrowRight':
      movePlayer(1, 0);
      break;
  }
});

drawMap();
