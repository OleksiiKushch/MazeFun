import { movePlayer } from '../entity/player.js';

export function registerControls() {
  registerKeyboardControl();
  registerVirtualPanelControl();
}

function registerKeyboardControl() {
  const keyToButtonMap = {
    ArrowUp: '.arrow.up',
    w: '.arrow.up',
    ArrowDown: '.arrow.down',
    s: '.arrow.down',
    ArrowLeft: '.arrow.left',
    a: '.arrow.left',
    ArrowRight: '.arrow.right',
    d: '.arrow.right',
  };

  document.addEventListener('keydown', (event) => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const buttonSelector = keyToButtonMap[key];

    if (buttonSelector) {
      document.querySelector(buttonSelector)?.classList.add('active');
      movePlayer(
        buttonSelector.includes('left') ? -1 : buttonSelector.includes('right') ? 1 : 0,
        buttonSelector.includes('up') ? -1 : buttonSelector.includes('down') ? 1 : 0
      );
    }
  });

  document.addEventListener('keyup', (event) => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const buttonSelector = keyToButtonMap[key];

    if (buttonSelector) {
      document.querySelector(buttonSelector)?.classList.remove('active');
    }
  });
}

function registerVirtualPanelControl() {
  // TODO: Add the possibility to hold the virtual control panel button and
  //  move in the responsive direction (as it works when we press and hold a button on the keyboard).

  document.querySelector('.arrow.up').addEventListener('click', () => movePlayer(0, -1));
  document.querySelector('.arrow.down').addEventListener('click', () => movePlayer(0, 1));
  document.querySelector('.arrow.left').addEventListener('click', () => movePlayer(-1, 0));
  document.querySelector('.arrow.right').addEventListener('click', () => movePlayer(1, 0));
}
