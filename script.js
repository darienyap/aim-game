const gameArea = document.getElementById('gameArea');
const scoreEl = document.getElementById('score');
const accuracyEl = document.getElementById('accuracy');

let score = 0;
let attempts = 0;

function spawnTarget() {
  const target = document.createElement('div');
  target.classList.add('target');

  const x = Math.random() * (gameArea.clientWidth - 60);
  const y = Math.random() * (gameArea.clientHeight - 60);

  target.style.left = x + 'px';
  target.style.top = y + 'px';

  // troll: move away when cursor gets close 😈
  target.addEventListener('mouseenter', () => {
    const newX = Math.random() * (gameArea.clientWidth - 60);
    const newY = Math.random() * (gameArea.clientHeight - 60);
    target.style.left = newX + 'px';
    target.style.top = newY + 'px';
  });

  target.addEventListener('click', () => {
    attempts++;

    // troll: sometimes don't count score 💀
    if (Math.random() < 0.3) {
      score++;
    }

    updateStats();
    target.remove();
    spawnTarget();
  });

  gameArea.appendChild(target);
}

// clicking anywhere else = miss 😭
gameArea.addEventListener('click', (e) => {
  if (!e.target.classList.contains('target')) {
    attempts++;
    updateStats();
  }
});

function updateStats() {
  scoreEl.textContent = score;

  let accuracy = attempts === 0 ? 100 : Math.floor((score / attempts) * 100);

  // troll: cap accuracy so it never looks good 💀
  if (accuracy > 40) accuracy = Math.floor(Math.random() * 40);

  accuracyEl.textContent = accuracy;
}

// spawn first target
spawnTarget();
