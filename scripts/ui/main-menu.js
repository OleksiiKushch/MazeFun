export function createMainMenuUI() {
  const mainMenuButton = document.createElement('button');
  mainMenuButton.id = 'main-menu-btn';
  mainMenuButton.textContent = '☰';
  document.body.appendChild(mainMenuButton);

  const mainMenuModal = document.createElement('div');
  mainMenuModal.id = 'main-menu-modal';
  mainMenuModal.innerHTML = `
      <button id="main-menu-new-game-btn">NEW GAME</button>
      <div class="game-version">v1.1.2</div>
    `;
  document.body.appendChild(mainMenuModal);

  const newGameModal = document.createElement('div');
  newGameModal.id = 'new-game-modal';
  newGameModal.innerHTML = `
      <div class="new-game-modal-container">
        <h2>Start New Game</h2>

        <div class="use-additional-options">
          <input type="checkbox" id="use-additional-options" />
          <label for="use-additional-options">Use Additional Options</label>
        </div>

        <hr/>
    
        <div class="additional-options">
          <label for="map-seed">Seed of Map:</label>
          <input type="number" id="map-seed" min="0" max="999999" placeholder="Seed">
          <br/>
          <label for="map-width">Width of Map:</label>
          <input type="number" id="map-width" min="4" max="50" placeholder="Width">
          <br/>
          <label for="map-height">Height of Map:</label>
          <input type="number" id="map-height" min="4" max="50" placeholder="Height">
        </div>

        <hr/>
    
        <div class="modal-buttons">
          <button class="cancel-button">Cancel</button>
          <button class="approve-button">GO!</button>
        </div>
      </div>
    `;
  document.body.appendChild(newGameModal);

  mainMenuButton.addEventListener('click', () => {
    mainMenuModal.classList.toggle('show');
  });

  document.getElementById('main-menu-new-game-btn').addEventListener('click', () => {
    newGameModal.classList.toggle('show');
  });
}
