const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: 0, y: 0 };
let particles = [];

// Fare hareketi → bol parçacık + uzun iz
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    for (let i = 0; i < 12; i++) {  // bol bol parçacık
        particles.push({
            x: e.clientX + (Math.random() - 0.5) * 20,
            y: e.clientY + (Math.random() - 0.5) * 20,
            size: Math.random() * 6 + 3,
            speedX: Math.random() * 6 - 3,
            speedY: Math.random() * 6 - 3,
            life: 0
        });
    }
});

// Sadece 6 tane büyük, creepy göz (sabit pozisyonlarda)
const eyes = [
    { x: canvas.width * 0.2, y: canvas.height * 0.25 },
    { x: canvas.width * 0.8, y: canvas.height * 0.3 },
    { x: canvas.width * 0.35, y: canvas.height * 0.65 },
    { x: canvas.width * 0.7, y: canvas.height * 0.7 },
    { x: canvas.width * 0.15, y: canvas.height * 0.75 },
    { x: canvas.width * 0.85, y: canvas.height * 0.15 }
];

// Tam köşede 4 tane küçük neon top (hafif hareketli)
const orbs = [
    { x: 80, y: 80 },
    { x: canvas.width - 80, y: 80 },
    { x: canvas.width - 80, y: canvas.height - 80 },
    { x: 80, y: canvas.height - 80 }
];

function drawEyes() {
    eyes.forEach(eye => {
        // Göz beyazı
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(eye.x, eye.y, 50, 0, Math.PI * 2);
        ctx.fill();

        // Fare yönüne göre iris hareketi
        const angle = Math.atan2(mouse.y - eye.y, mouse.x - eye.x);
        const dist = Math.min(20, Math.hypot(mouse.x - eye.x, mouse.y - eye.y) / 10);
        const irisX = eye.x + Math.cos(angle) * dist;
        const irisY = eye.y + Math.sin(angle) * dist;

        // Siyah iris
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(irisX, irisY, 28, 0, Math.PI * 2);
        ctx.fill();

        // Küçük beyaz parlama
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(irisX + 8, irisY - 8, 10, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawOrbs() {
    orbs.forEach(orb => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, 80);
        gradient.addColorStop(0, '#00ff88');
        gradient.addColorStop(0.3, '#00ff8830');
        gradient.addColorStop(1, '#00ff8800');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, 80, 0, Math.PI * 2);
        ctx.fill();
    });
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawEyes();
    drawOrbs();

    // Parçacıklar
    particles.forEach((p, i) => {
        p.life++;
        p.x += p.speedX;
        p.y += p.speedY;
        p.size *= 0.96;

        ctx.fillStyle = `rgba(0, 255, 136, ${1 - p.life / 40})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life > 40 || p.size < 0.5) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    eyes[0].x = canvas.width * 0.2; eyes[1].x = canvas.width * 0.8;
    eyes[2].x = canvas.width * 0.35; eyes[3].x = canvas.width * 0.7;
    eyes[4].x = canvas.width * 0.15; eyes[5].x = canvas.width * 0.85;
    orbs[1].x = orbs[2].x = canvas.width - 80;
    orbs[2].y = orbs[3].y = canvas.height - 80;
});
