import { dungeonMap, drawMap, EMPTY_FIELD, WIN_FIELD } from './map.js';
import { updateStepCount } from '../ui/game-info.js';
import { showWinMessage } from '../ui/end-game.js';

export let playerPosition = { x: 1, y: 1 };
let stepsTaken = 0;
let gameOver = false;

export function movePlayer(dx, dy) {
    if (gameOver) return;

    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (dungeonMap[newY] && dungeonMap[newY][newX] === EMPTY_FIELD) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        stepsTaken++;
        updateStepCount(stepsTaken);
        drawMap();
    } else if (dungeonMap[newY] && dungeonMap[newY][newX] === WIN_FIELD) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        stepsTaken++;
        updateStepCount(stepsTaken);
        drawMap();
        gameOver = true;
        setTimeout(showWinMessage, 100);
    }
}
