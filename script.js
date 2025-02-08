document.getElementById("cover").addEventListener("click", function () {
  document.getElementById("book").classList.add("open");
  this.classList.add("flipped");

  setTimeout(() => {
    document.getElementById("inside").classList.add("show");
    document.getElementById("inside-cover").classList.add("show");
  }, 500);
});

const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function createHeart() {
  const numHearts = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < numHearts; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
      angle: Math.random() * 360,
    });
  }
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < hearts.length; i++) {
    const heart = hearts[i];
    ctx.globalAlpha = heart.opacity;
    ctx.fillStyle = "red";
    ctx.font = heart.size + "px Arial";
    ctx.fillText("❤️", heart.x, heart.y);

    heart.y -= heart.speed;
    heart.x += Math.sin(heart.angle) * 0.5;
    heart.angle += 0.1;
    heart.opacity -= 0.002;

    if (heart.opacity <= 0 || heart.y < -50) {
      hearts.splice(i, 1);
      i--;
    }
  }
}

function updateHearts() {
  createHeart();
  drawHearts();
  requestAnimationFrame(updateHearts);
}

updateHearts();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseenter", function () {
  const maxX = 200;
  const maxY = 100;

  const randomX = Math.floor(Math.random() * maxX) - maxX / 2;
  const randomY = Math.floor(Math.random() * maxY) - maxY / 2;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

document.getElementById("yesBtn").addEventListener("click", function () {
  document.getElementById("book").classList.remove("open");
  document.getElementById("book").classList.add("closed");

  setTimeout(() => {
    document.getElementById("cover").classList.remove("flipped");
    document.getElementById("inside").classList.remove("show");
    document.getElementById("inside-cover").classList.remove("show");

    document.getElementById("cover").innerHTML =
      "Yay! I knew you’d say yes! ❤️<br>You're my perfect Valentine!";
    document.getElementById("cover").style.pointerEvents = "none";
  });
});
