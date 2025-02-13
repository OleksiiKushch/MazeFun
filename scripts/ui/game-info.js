import { MAP_WIDTH, MAP_HEIGHT, SEED } from '../entity/map.js';

export function createGameInfoUI() {
  const gameInfoButton = document.createElement('button');
  gameInfoButton.id = 'game-info-btn';
  gameInfoButton.textContent = 'Game Info';
  document.body.appendChild(gameInfoButton);

  const gameInfoModal = document.createElement('div');
  gameInfoModal.id = 'game-info-modal';
  gameInfoModal.innerHTML = `
    <div class="info-section">General Info</div>
    <div class="info-content">Steps Taken: <span id="steps-count">0</span></div>

    <div class="info-section">Map Info</div>
    <div class="info-content">
      Seed: <span id="map-seed" class="copyable">${SEED}</span>
      <button id="copy-seed-btn" class="copy-btn" aria-label="Copy Seed">
        <img src="/resources/copy-icon.svg" alt="Copy" class="copy-icon">
      </button>
    </div>
    <div class="info-content">Width: <span id="map-width">${MAP_WIDTH}</span></div>
    <div class="info-content">Height: <span id="map-height">${MAP_HEIGHT}</span></div>
  `;
  document.body.appendChild(gameInfoModal);

  gameInfoButton.addEventListener('click', () => {
    gameInfoModal.classList.toggle('show');
  });

  document.getElementById('copy-seed-btn').addEventListener('click', function () {
    const seedText = document.getElementById('map-seed').textContent;
    navigator.clipboard
      .writeText(seedText)
      .then(() => console.log(`The seed of map successfully copied to the clipboard.`))
      .catch((error) => console.error('Failed to copy the seed of map to the clipboard. Error:', error));

    const button = this;
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 300);
  });
}

export function updateStepCount(steps) {
  document.getElementById('steps-count').textContent = steps;
}
