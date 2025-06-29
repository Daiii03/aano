const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let text = "Te amo";
let fontSize = 16;
let columns = canvas.width / (fontSize + 30);
let drops = Array(Math.floor(columns)).fill(1);
let speed = 100;
let color = "#ff007f";
let particles = [];

canvas.addEventListener('click', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  createExplosion(x, y);

  particles.push({
    x,
    y,
    vx: 0,
    vy: 0,
    alpha: 1,
    radius: 0,
    text: "Te amo"
  });
});

function createExplosion(x, y) {
  const numParticles = 60;
  for (let i = 0; i < numParticles; i++) {
    const angle = (Math.PI * 2 * i) / numParticles;
    const speedParticle = Math.random() * 4 + 1;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speedParticle,
      vy: Math.sin(angle) * speedParticle,
      alpha: 1,
      radius: 1.5,
      text: null
    });
  }
}

function drawParticles() {
  ctx.font = "bold 18px Arial";
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    if (p.text) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 4;
      ctx.fillStyle = `rgba(255, 105, 180, ${p.alpha})`;
      ctx.fillText(p.text, p.x - ctx.measureText(p.text).width / 2, p.y);
      ctx.shadowBlur = 0;
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 105, 180, ${p.alpha})`;
      ctx.fill();
    }

    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.03;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = color;
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    let x = i * (fontSize + 30);
    let y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 1;
    }

    drops[i]++;
  }

  drawParticles();
}

setInterval(draw, speed);
