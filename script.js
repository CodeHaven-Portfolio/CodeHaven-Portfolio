const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: 0, y: 0 };
let trail = [];

// Fare hareketi (çok az parçacık, sadece iz bırakıyor)
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (Math.random() < 0.15) { // %15 ihtimalle spawn, çok az
        trail.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 4 + 2,
            life: 0
        });
    }
});

// Köşelere 4 tane yavaş neon orb
const orbs = [
    { x: 100, y: 100, targetX: canvas.width - 100, targetY: 100 },
    { x: canvas.width - 100, y: 100, targetX: canvas.width - 100, targetY: canvas.height - 100 },
    { x: canvas.width - 100, y: canvas.height - 100, targetX: 100, targetY: canvas.height - 100 },
    { x: 100, y: canvas.height - 100, targetX: 100, targetY: 100 }
];

function drawEyes() {
    // 10 tane göz rastgele yerleştir (sabit pozisyon)
    for (let i = 0; i < 10; i++) {
        let ex = (canvas.width / 11) * (i + 1);
        let ey = canvas.height / 2 + Math.sin(i) * 200;

        // Göz beyazı
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ex, ey, 40, 0, Math.PI * 2);
        ctx.fill();

        // Göz bebeği (fareyi takip eder)
        let angle = Math.atan2(mouse.y - ey, mouse.x - ex);
        let pupilX = ex + Math.cos(angle) * 18;
        let pupilY = ey + Math.sin(angle) * 18;

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(pupilX, pupilY, 18, 0, Math.PI * 2);
        ctx.fill();

        // Parlama
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(pupilX - 5, pupilY - 5, 6, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawOrbs() {
    orbs.forEach((orb, i) => {
        // Yavaş yavaş köşeler arasında dolaşsın
        orb.x += (orb.targetX - orb.x) * 0.00005;
        orb.y += (orb.targetY - orb.y) * 0.00005;

        let gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, 120);
        gradient.addColorStop(0, 'rgba(0, 255, 136, 0.6)');
        gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, 120, 0, Math.PI * 2);
        ctx.fill();
    });
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawEyes();
    drawOrbs();

    // Hafif trail efekti
    trail.forEach((p, i) => {
        p.life++;
        p.size *= 0.96;
        ctx.fillStyle = `rgba(0, 255, 136, ${1 - p.life / 30})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.life > 30) trail.splice(i, 1);
    });

    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
