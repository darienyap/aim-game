<<<<<<< HEAD
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
=======
const gameArea = document.getElementById('gameArea');
const scoreEl = document.getElementById('score');
const accuracyEl = document.getElementById('accuracy');

let score = 0;
let attempts = 0;
let timeLeft = 30;
const timerEl = document.getElementById('timer');

function spawnTarget() {
  const target = document.createElement('div');
  target.classList.add('target');

  const x = Math.random() * (gameArea.clientWidth - 60);
  const y = Math.random() * (gameArea.clientHeight - 60);

  target.style.left = x + 'px';
  target.style.top = y + 'px';

  // troll: move away when cursor gets close
  target.addEventListener('mouseenter', () => {
    const newX = Math.random() * (gameArea.clientWidth - 60);
    const newY = Math.random() * (gameArea.clientHeight - 60);
    target.style.left = newX + 'px';
    target.style.top = newY + 'px';
  });

  target.addEventListener('click', () => {
    if (timeLeft <= 0) return;
    attempts++;

    // troll: sometimes don't count score
    if (Math.random() < 0.3) {
      score++;
    }

    updateStats();
    target.remove();
    spawnTarget();
  });

  gameArea.appendChild(target);
}

// clicking anywhere else = miss
gameArea.addEventListener('click', (e) => {
  if (!e.target.classList.contains('target')) {
    attempts++;
    updateStats();
  }
});

function updateStats() {
  scoreEl.textContent = score;

  let accuracy = attempts === 0 ? 100 : Math.floor((score / attempts) * 100);

  // troll: cap accuracy so it never looks good
  if (accuracy > 40) accuracy = Math.floor(Math.random() * 40);

  accuracyEl.textContent = accuracy;
}

// spawn first target
spawnTarget();

const timerInterval = setInterval(() => {
  timeLeft--;
  timerEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);

    // End game screen
    gameArea.innerHTML = `
      <h2>Time's up!</h2>
      <p>Score: ${score}</p>
      <p>Accuracy: ${accuracyEl.textContent}%</p>
      <p>darien is forever da goat as always :)</p>
    `;
    document.getElementById('replayBtn').style.display = 'inline-block';
  }
}, 1000);

document.getElementById('replayBtn').addEventListener('click', () => {
  // reset variables
  score = 0;
  attempts = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  accuracyEl.textContent = 100;
  timerEl.textContent = timeLeft;

  // hide replay button
  document.getElementById('replayBtn').style.display = 'none';

  // clear and restart game area
  gameArea.innerHTML = '';
  spawnTarget();

  // restart timer
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameArea.innerHTML = `
        <h2>Time's up!</h2>
        <p>Score: ${score}</p>
        <p>Accuracy: ${accuracyEl.textContent}%</p>
        <p>Skill issue 😭</p>
      `;
      document.getElementById('replayBtn').style.display = 'inline-block';
    }
  }, 1000);
});
>>>>>>> 741eda9 (2nd draft)
