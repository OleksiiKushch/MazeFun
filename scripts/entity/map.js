import { playerPosition } from './player.js';

export const DEFAULT_MAP_WIDTH = 15;
export const DEFAULT_MAP_HEIGHT = 15;
export const SEED = Math.floor(Math.random() * 1000000);

export const EMPTY_FIELD = 0;
export const BLOCK_FIELD = 1;
export const WIN_FIELD = 2;

const BLOCK_DENSITY_COEFFICIENT = 0.3;

function seededRandom(seed) {
    let state = seed;
    return function () {
        state = (state * 16807) % 2147483647;
        return state / 2147483647;
    };
}

function generateDungeonMap(width, height, seed) {
    const random = seededRandom(seed);
    let map = Array.from({ length: height }, () =>
        Array.from({ length: width }, () =>
            random() > BLOCK_DENSITY_COEFFICIENT ? EMPTY_FIELD : BLOCK_FIELD,
        ),
    );

    // Create exterior walls
    for (let y = 0; y < height; y++) {
        map[y][0] = map[y][width - 1] = BLOCK_FIELD;
    }
    for (let x = 0; x < width; x++) {
        map[0][x] = map[height - 1][x] = BLOCK_FIELD;
    }

    // The starting position is always free
    map[1][1] = EMPTY_FIELD;

    map[height - 2][width - 2] = WIN_FIELD;

    return map;
}

export let dungeonMap = generateDungeonMap(DEFAULT_MAP_WIDTH, DEFAULT_MAP_HEIGHT, SEED);

export function drawMap() {
    const gameBoard = document.getElementById('game-board');

    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${DEFAULT_MAP_WIDTH}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${DEFAULT_MAP_HEIGHT}, 1fr)`;

    dungeonMap.forEach((row, y) => {
        row.forEach((cell, x) => {
            const div = document.createElement('div');
            div.classList.add('cell');

            if (cell === 1) div.classList.add('wall');
            else if (cell === 2) div.classList.add('goal');

            if (playerPosition.x === x && playerPosition.y === y) {
                div.classList.add('player');
            }

            gameBoard.appendChild(div);
        });
    });
}
