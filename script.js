// Fireworks (automatic)
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
 let slideIndex = 0;
      function showSlides() {
        let slides = document.getElementsByClassName("slides");
        for (let i = 0; i < slides.length; i++)
          slides[i].style.display = "none";
        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 3000);
      }
      showSlides();

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.alpha = 1;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.01;
    this.draw();
  }
}
// Letters
function openLetter(msg) {
  alert(msg);
}
// Reveal Reasons
const reasons = document.querySelectorAll(".reason");
let delay = 1000;
reasons.forEach((r, i) => {
 setTimeout(() => {
 r.style.opacity = 1;
 }, delay * i);
});
// Surprise Button - Petals
function dropPetals() {
  for (let i = 0; i < 30; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.background = ["pink", "red", "hotpink"][
      Math.floor(Math.random() * 3)
    ];
    petal.style.animationDuration = 3 + Math.random() * 3 + "s";
    document.body.appendChild(petal);
    petal.addEventListener("animationend", () => petal.remove());
  }
}

let particles = [];

// Automatically generate fireworks at random positions
function autoFireworks() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2; // top half of screen
  const colors = ["red", "yellow", "white", "blue", "pink", "lime"];
  for (let i = 0; i < 50; i++) {
    particles.push(
      new Particle(x, y, colors[Math.floor(Math.random() * colors.length)])
    );
  }
}

// Launch a firework every 800ms
setInterval(autoFireworks, 800);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    } else p.update();
  });
}

animate();



