const mouseImg = document.getElementById('mouse');
const eyes = document.querySelectorAll('.eye');
const sections = document.querySelectorAll('.section');

document.addEventListener('mousemove', (e) => {
    mouseImg.style.left = e.clientX - 75 + 'px';
    mouseImg.style.top = e.clientY - 75 + 'px';

    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const pupil = eye.querySelector('::after') || eye;
        const dist = Math.min(20, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 10);
        pupil.style.left = 50 + Math.cos(angle) * dist + '%';
        pupil.style.top = 50 + Math.sin(angle) * dist + '%';
    });
});

// Rastgele göz konumları
eyes.forEach(eye => {
    eye.style.left = Math.random() * 80 + 10 + '%';
    eye.style.top = Math.random() * 80 + 10 + '%';
});

// Tıklama ile bölüm aç
eyes.forEach(eye => {
    if (eye.dataset.section) {
        eye.addEventListener('click', () => {
            document.getElementById(eye.dataset.section).style.display = 'flex';
        });
    }
});

// Bölümden çıkmak için herhangi yere tıkla
sections.forEach(sec => {
    sec.addEventListener('click', () => sec.style.display = 'none');
});
