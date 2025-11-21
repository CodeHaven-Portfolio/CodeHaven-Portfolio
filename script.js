const bg = document.getElementById('bg');
const beam = document.getElementById('beam');
const ctxBg = bg.getContext('2d');
const ctxBeam = beam.getContext('2d');

bg.width = beam.width = window.innerWidth;
bg.height = beam.height = window.innerHeight;

const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// Matrix Rain
const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const columns = bg.width / 20;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctxBg.fillStyle = 'rgba(0,0,0,0.04)';
    ctxBg.fillRect(0,0,bg.width,bg.height);
    ctxBg.fillStyle = '#0f0';
    ctxBg.font = '15px monospace';

    for(let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random()*matrix.length)];
        ctxBg.fillText(text, i*20, drops[i]*20);
        if(drops[i]*20 > bg.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}

// Mouse Beam + Particles
const particles = [];
function createParticle(x, y) {
    particles.push({
        x, y,
        vx: (Math.random()-0.5)*8,
        vy: (Math.random()-0.5)*8,
        life: 1,
        color: `hsl(${Math.random()*60 + 180},100%,50%)`
    });
}

function drawBeam() {
    ctxBeam.clearRect(0,0,beam.width,beam.height);
    const gradient = ctxBeam.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
    gradient.addColorStop(0, 'rgba(0,255,255,0.3)');
    gradient.addColorStop(1, 'transparent');
    ctxBeam.fillStyle = gradient;
    ctxBeam.fillRect(0,0,beam.width,beam.height);

    particles.forEach((p,i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        ctxBeam.globalAlpha = p.life;
        ctxBeam.fillStyle = p.color;
        ctxBeam.fillRect(p.x, p.y, 4, 4);
        if(p.life <= 0) particles.splice(i,1);
    });
}

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    for(let i = 0; i < 10; i++) createParticle(e.clientX, e.clientY);
});

function animate() {
    drawMatrix();
    drawBeam();
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    bg.width = beam.width = window.innerWidth;
    bg.height = beam.height = window.innerHeight;
});
