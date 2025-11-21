const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drops = [];

class Drop {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.speed = Math.random() * 4 + 2;
        this.length = Math.random() * 20 + 10;
        this.thickness = Math.random() * 2 + 1;
    }
    fall() {
        this.y += this.speed;
        if (this.y > canvas.height) this.y = -20;
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.6)';
        ctx.lineWidth = this.thickness;
        ctx.stroke();
    }
}

for(let i = 0; i < 300; i++) drops.push(new Drop());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(drop => {
        drop.fall();
        drop.draw();
    });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
