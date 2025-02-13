import { movePlayer } from '../entity/player.js';

export function registerControls() {
  const gameBoard = document.getElementById('game-board');

  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        movePlayer(0, -1, gameBoard);
        break;
      case 'ArrowDown':
        movePlayer(0, 1, gameBoard);
        break;
      case 'ArrowLeft':
        movePlayer(-1, 0, gameBoard);
        break;
      case 'ArrowRight':
        movePlayer(1, 0, gameBoard);
        break;
    }
  });

  document.querySelector('.arrow.up').addEventListener('click', () => movePlayer(0, -1));
  document.querySelector('.arrow.down').addEventListener('click', () => movePlayer(0, 1));
  document.querySelector('.arrow.left').addEventListener('click', () => movePlayer(-1, 0));
  document.querySelector('.arrow.right').addEventListener('click', () => movePlayer(1, 0));
}
