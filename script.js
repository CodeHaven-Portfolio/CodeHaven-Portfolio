const mouse = { x: 0, y: 0 };
const mouseImg = document.getElementById('mouse');

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouseImg.style.left = e.clientX + 'px';
    mouseImg.style.top = e.clientY + 'px';

    document.querySelectorAll('.eye').forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const ex = rect.left + rect.width / 2;
        const ey = rect.top + rect.height / 2;
        const angle = Math.atan2(mouse.y - ey, mouse.x - ex);
        const distance = Math.min(25, Math.hypot(mouse.x - ex, mouse.y - ey) / 8);

        // Sadece göz bebeğini hareket ettir (dönen gözlerde bile)
        eye.style.setProperty('--px', 50 + Math.cos(angle) * distance + '%');
        eye.style.setProperty('--py', 50 + Math.sin(angle) * distance + '%');
    });
});

// CSS variable ile göz bebeği hareketi
const style = document.createElement('style');
style.innerHTML = `.eye::after { left: var(--px, 50%); top: var(--py, 50%); }`;
document.head.appendChild(style);

// Rastgele konum
document.querySelectorAll('.eye').forEach(eye => {
    eye.style.left = Math.random() * 75 + 10 + '%';
    eye.style.top = Math.random() * 75 + 10 + '%';
});

// Tıklama
document.querySelectorAll('.clickable').forEach(eye => {
    eye.addEventListener('click', () => {
        const section = eye.dataset.section;
        document.getElementById(section).style.display = 'flex';
    });
});

document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', () => m.style.display = 'none');
});
