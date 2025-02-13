export function createVirtualControlPanelUI() {
  const virtualControlPanel = document.createElement('div');
  virtualControlPanel.id = 'virtual-controls';

  virtualControlPanel.innerHTML = `
      <button class="arrow up">▲</button>
      <div class="controls-middle">
        <button class="arrow left">◀</button>
        <button class="arrow down">▼</button>
        <button class="arrow right">▶</button>
      </div>
    `;
  document.body.appendChild(virtualControlPanel);
}
