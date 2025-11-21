const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const mouse = { x: 0, y: 0 };

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    for (let i = 0; i < 8; i++) {  // fareyi takip ederken bolca parçacık
        particles.push(new Particle(mouse.x, mouse.y));
    }
});

class Particle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random()*60 + 160}, 100%, 50%)`; // cyan-yeşil tonlar
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.03;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.3) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}
animate();

// Arka plan yıldızları da ekleyelim (sabit + yavaş hareketli)
for (let i = 0; i < 200; i++) {
    particles.push(new Particle());
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
