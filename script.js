const gameBoard = document.getElementById('game-board');

const MAP_WIDTH = 15;
const MAP_HEIGHT = 15;
const SEED = Math.floor(Math.random() * 1000000);

let playerPosition = { x: 1, y: 1 };
let gameOver = false;

function seededRandom(seed) {
  let state = seed;
  return function () {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

function generateDungeonMap(width, height, seed) {
  const random = seededRandom(seed);
  let map = Array.from(
    { length: height },
    () => Array.from({ length: width }, () => (random() > 0.3 ? 0 : 1)) // 30% walls
  );

  // Ensure borders are walls
  for (let y = 0; y < height; y++) {
    map[y][0] = map[y][width - 1] = 1;
  }
  for (let x = 0; x < width; x++) {
    map[0][x] = map[height - 1][x] = 1;
  }

  // Ensure starting position is open
  map[1][1] = 0;

  // Find a place for the goal (farthest from player)
  // let goalX, goalY;
  // do {
  //   goalX = Math.floor(random() * (width - 2)) + 1;
  //   goalY = Math.floor(random() * (height - 2)) + 1;
  // } while (map[goalY][goalX] !== 0 || (goalX === 1 && goalY === 1));
  // map[goalY][goalX] = 2;
  map[height - 2][width - 2] = 2;

  return map;
}

let dungeonMap = generateDungeonMap(MAP_WIDTH, MAP_HEIGHT, SEED);

function drawMap() {
  gameBoard.innerHTML = '';
  gameBoard.style.gridTemplateColumns = `repeat(${MAP_WIDTH}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${MAP_HEIGHT}, 1fr)`;

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

let stepsTaken = 0;

const gameInfoButton = document.createElement('button');
gameInfoButton.id = 'game-info-btn';
gameInfoButton.textContent = 'Game Info';
document.body.appendChild(gameInfoButton);

const gameInfoModal = document.createElement('div');
gameInfoModal.id = 'game-info-modal';
// gameInfoModal.style.display = 'none';
gameInfoModal.innerHTML = `
  <div class="info-section">General Info</div>
  <div class="info-content">Steps Taken: <span id="steps-count">0</span></div>

  <div class="info-section">Map Info</div>
  <div class="info-content">Seed: <span id="map-seed">${SEED}</span></div>
  <div class="info-content">Width: <span id="map-width">${MAP_WIDTH}</span></div>
  <div class="info-content">Height: <span id="map-height">${MAP_HEIGHT}</span></div>
`;
document.body.appendChild(gameInfoModal);

// gameInfoBtn.addEventListener('click', () => {
//   gameInfoModal.style.display = gameInfoModal.style.display === 'none' ? 'block' : 'none';
// });

gameInfoButton.addEventListener('click', () => {
  gameInfoModal.classList.toggle('show');
});

function updateStepCount() {
  document.getElementById('steps-count').textContent = stepsTaken;
}

function movePlayer(dx, dy) {
  if (gameOver) return;

  const newX = playerPosition.x + dx;
  const newY = playerPosition.y + dy;

  if (dungeonMap[newY] && dungeonMap[newY][newX] === 0) {
    playerPosition.x = newX;
    playerPosition.y = newY;
    stepsTaken++;
    updateStepCount();
    drawMap();
  } else if (dungeonMap[newY] && dungeonMap[newY][newX] === 2) {
    playerPosition.x = newX;
    playerPosition.y = newY;
    stepsTaken++;
    updateStepCount();
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
