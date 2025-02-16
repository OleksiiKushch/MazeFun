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

        <form>
          <div class="use-additional-options">
            <input type="checkbox" id="use-additional-options" />
            <label for="use-additional-options">Use Additional Options</label>
          </div>
      
          <div class="additional-options">
            <hr style="margin-bottom: 10px;" />
            <label for="map-seed">Seed of Map <span class="tip">(<span class="tip-value">generated randomly</span> by default)</span>:</label>
            <input type="number" id="map-seed" min="0" max="999999" placeholder="Seed">
            <br/>
            <label for="map-width">Width of Map <span class="tip">(<span class="tip-value">15</span> by default)</span>:</label>
            <input type="number" id="map-width" min="4" max="50" placeholder="Width">
            <br/>
            <label for="map-height">Height of Map <span class="tip">(<span class="tip-value">15</span> by default)</span>:</label>
            <input type="number" id="map-height" min="4" max="50" placeholder="Height">
            <hr style="margin-top: 20px;" />
          </div>
      
          <div class="modal-buttons">
            <button type="button" id="new-game-modal-cancel-btn" class="cancel-button">Cancel</button>
            <button type="submit" id="new-game-modal-approve-btn" class="approve-button">GO!</button>
          </div>
        </form>

      </div>
    `;
  document.body.appendChild(newGameModal);

  mainMenuButton.addEventListener('click', () => {
    mainMenuModal.classList.toggle('show');
  });

  document.getElementById('main-menu-new-game-btn').addEventListener('click', () => {
    newGameModal.style.display = 'flex';
    setTimeout(() => newGameModal.classList.add('show'), 50);
  });

  document.getElementById('new-game-modal-cancel-btn').addEventListener('click', () => {
    newGameModal.classList.remove('show');
    setTimeout(() => (newGameModal.style.display = 'none'), 300);

    newGameModal.querySelectorAll('input').forEach((input) => {
      if (input.type === 'checkbox') {
        input.checked = false;
      } else {
        input.value = '';
      }
    });

    document.querySelector('.additional-options').classList.remove('show');
  });

  document.getElementById('new-game-modal-approve-btn').addEventListener('click', () => {
    // Start new game.
  });

  document.getElementById('use-additional-options').addEventListener('change', function () {
    const additionalOptions = document.querySelector('.additional-options');

    if (this.checked) {
      additionalOptions.classList.add('show');
    } else {
      additionalOptions.classList.remove('show');
    }
  });
}
