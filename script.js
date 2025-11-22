document.addEventListener("DOMContentLoaded", () => {
    // Pixel Yağmur - baya kararttım + çok az + yavaş
    const canvas = document.getElementById("pixelRain");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drops = [];
    for(let i = 0; i < 100; i++) {  // 180'den 100'e düşürdüm → çok az
        drops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: Math.random() * 4 + 2,  // daha yavaş
            size: Math.floor(Math.random() * 2) + 1
        });
    }

    function drawPixelRain() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0, 100, 180, 0.25)";  // koyu mavi tonları
        drops.forEach(d => {
            ctx.fillRect(d.x, d.y, d.size, d.size * 8);
            d.y += d.speed;
            if(d.y > canvas.height) d.y = -40;
        });
        requestAnimationFrame(drawPixelRain);
    }
    drawPixelRain();

    // START butonu - perde tam kapanınca geçiş
    document.getElementById("startBtn").addEventListener("click", () => {
        const curtain = document.getElementById("curtain");
        curtain.classList.add("active");

        // 4 saniye sonra (perde tamamen kapandıktan sonra) geçiş
        setTimeout(() => {
            document.getElementById("intro").style.display = "none";
            document.getElementById("portfolio").style.display = "block";
            startMatrix();
            setTimeout(() => curtain.classList.add("close"), 500);
        }, 4000);
    });

    // Matrix aynı
    function startMatrix() {
        const m = document We've been working on this for a while now, but it's finally ready! The site is live and looks amazing. Here's the link: https://codeheaven-henna.vercel.app

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
