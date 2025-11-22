document.addEventListener("DOMContentLoaded", () => {
    // Pixel Yağmur (intro sadece)
    const canvas = document.getElementById("pixelRain");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;

    const drops = [];
    for(let i = 0; i < 500; i++) {
        drops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: Math.random() * 8 + 4,
            length: Math.random() * 15 + 10,
            color: "rgba(0, 255, 255, 0.8)"
        });
    }

    function pixelRain() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drops.forEach(d => {
            ctx.fillStyle = d.color;
            for(let i = 0; i < d.length; i += 4) {
                ctx.fillRect(d.x, d.y + i, 3, 8);
            }
            d.y += d.speed;
            if(d.y > canvas.height) d.y = -20;
        });
        requestAnimationFrame(pixelRain);
    }
    pixelRain();

    // START butonu
    document.getElementById("startBtn").addEventListener("click", () => {
        const curtain = document.getElementById("curtain");
        curtain.classList.add("active"); // soldan geliyor

        setTimeout(() => {
            curtain.classList.add("close"); // sağa kayboluyor
            setTimeout(() => {
                document.getElementById("intro").style.display = "none";
                document.getElementById("portfolio").style.display = "block";
                startMatrixRain();
            }, 1900);
        }, 2000);
    });

    // Matrix Yağmuru (sadece portfolio ekranında)
    function startMatrixRain() {
        const mCanvas = document.getElementById("matrixRain");
        const mCtx = mCanvas.getContext("2d");
        mCanvas.width = window.innerWidth;
        mCanvas.height = window.innerHeight;

        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const cols = mCanvas.width / 20;
        const drops = Array(Math.floor(cols)).fill(1);

        function draw() {
            mCtx.fillStyle = "rgba(0,0,0,0.05)";
            mCtx.fillRect(0,0,mCanvas.width,mCanvas.height);
            mCtx.fillStyle = "#0f0";
            mCtx.font = "15px monospace";
            drops.forEach((y,i) => {
                const text = chars[Math.floor(Math.random()*chars.length)];
                mCtx.fillText(text, i*20, y*20);
                if(y*20 > mCanvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            });
        }
        setInterval(draw, 40);
    }
});
