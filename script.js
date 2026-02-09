const targetDate = new Date(2026, 3, 17, 12, 0, 0);

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const pad = (value) => String(value).padStart(2, "0");

function updateCountdown() {
  const now = new Date();
  let diffMs = targetDate - now;

  if (diffMs < 0) {
    diffMs = 0;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = days;
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const enemyLayer = document.getElementById("enemy-layer");
const enemyCount = 5;
const enemies = [];

function createEnemy(index) {
  const size = (48 + Math.random() * 36) * 1.5;
  const element = document.createElement("img");
  element.src = "enemy.png";
  element.alt = `Enemy ${index + 1}`;
  element.className = "enemy";
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;
  enemyLayer.appendChild(element);

  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - size);
  const y = Math.random() * (height - size);
  const speed = 50 + Math.random() * 70;
  const angle = Math.random() * Math.PI * 2;

  return {
    element,
    size,
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  };
}

for (let i = 0; i < enemyCount; i += 1) {
  enemies.push(createEnemy(i));
}

let lastTime = performance.now();

function animateEnemies(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;
  const width = window.innerWidth;
  const height = window.innerHeight;

  enemies.forEach((enemy) => {
    enemy.x += enemy.vx * dt;
    enemy.y += enemy.vy * dt;

    if (enemy.x <= 0) {
      enemy.x = 0;
      enemy.vx *= -1;
    } else if (enemy.x + enemy.size >= width) {
      enemy.x = width - enemy.size;
      enemy.vx *= -1;
    }

    if (enemy.y <= 0) {
      enemy.y = 0;
      enemy.vy *= -1;
    } else if (enemy.y + enemy.size >= height) {
      enemy.y = height - enemy.size;
      enemy.vy *= -1;
    }

    const spin = Math.atan2(enemy.vy, enemy.vx) * (180 / Math.PI);
    enemy.element.style.transform = `translate3d(${enemy.x}px, ${enemy.y}px, 0) rotate(${spin}deg)`;
  });

  requestAnimationFrame(animateEnemies);
}

requestAnimationFrame(animateEnemies);
