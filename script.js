document.addEventListener("DOMContentLoaded", () => {
    // Pixel Yağmur - DAHA KARANLIK + DAHA AZ + DAHA YAVAŞ
    const canvas = document.getElementById("pixelRain");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drops = [];
    for(let i = 0; i < 180; i++) {  // 250'ten 180'e düşürdüm → daha az
        drops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: Math.random() * 5 + 3,  // daha yavaş
            size: Math.floor(Math.random() * 3) + 1
        });
    }

    function drawPixelRain() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0, 140, 180, 0.35)";  // daha koyu ve şeffaf
        drops.forEach(d => {
            ctx.fillRect(d.x, d.y, d.size, d.size * 7);
            d.y += d.speed;
            if(d.y > canvas.height) d.y = -30;
        });
        requestAnimationFrame(drawPixelRain);
    }
    drawPixelRain();

    // START butonu (geçiş aynı, hızlı)
    document.getElementById("startBtn").addEventListener("click", () => {
        const curtain = document.getElementById("curtain");
        curtain.classList.add("active");
        setTimeout(() => {
            document.getElementById("intro").style.display = "none";
            document.getElementById("portfolio").style.display = "block";
            startMatrix();
            setTimeout(() => curtain.classList.add("close"), 300);
        }, 800);
    });

    // Matrix (gölge zaten style'da uzatıldı, kod aynı)
    function startMatrix() {
        const m = document.getElementById("matrixRain");
        const c = m.getContext("2d");
        m.width = window.innerWidth;
        m.height = window.innerHeight;
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const cols = m.width / 20;
        const y = Array(Math.floor(cols)).fill(0);
        function draw() {
            c.fillStyle = "rgba(0,0,0,0.05)";
            c.fillRect(0,0,m.width,m.height);
            c.fillStyle = "#0f0";
            c.font = "16px monospace";
            y.forEach((yp, i) => {
                const text = chars[Math.floor(Math.random() * chars.length)];
                c.fillText(text, i*20, yp*20);
                if(yp*20 > m.height && Math.random() > 0.975) y[i] = 0;
                else y[i]++;
            });
        }
        setInterval(draw, 40);
    }
});
