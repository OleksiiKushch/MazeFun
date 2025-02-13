export function showWinMessage() {
  const winMessage = document.createElement('div');
  winMessage.id = 'win-message';
  winMessage.textContent = 'You Win!';
  document.body.appendChild(winMessage);

  setTimeout(() => {
    winMessage.classList.add('show');
  }, 10);
}
