// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================
const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '❤️', '🩷', '✨'];

function createFloatingHeart() {
    const container = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (16 + Math.random() * 20) + 'px';
    heart.style.animationDuration = (6 + Math.random() * 8) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 16000);
}

setInterval(createFloatingHeart, 800);

// ============================================
// SPARKLE PARTICLES
// ============================================
function createSparkles() {
    const container = document.getElementById('sparkles');
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDuration = (2 + Math.random() * 4) + 's';
        sparkle.style.animationDelay = Math.random() * 5 + 's';
        sparkle.style.width = (2 + Math.random() * 4) + 'px';
        sparkle.style.height = sparkle.style.width;
        container.appendChild(sparkle);
    }
}
createSparkles();

// ============================================
// ENVELOPE INTERACTION
// ============================================
const envelopeWrapper = document.getElementById('envelopeWrapper');
const questionContent = document.getElementById('questionContent');

envelopeWrapper.addEventListener('click', () => {
    envelopeWrapper.style.transition = 'all 0.6s ease';
    envelopeWrapper.style.transform = 'scale(0) rotate(20deg)';
    envelopeWrapper.style.opacity = '0';

    setTimeout(() => {
        envelopeWrapper.style.display = 'none';
        questionContent.classList.remove('hidden');
        questionContent.classList.add('visible');
        initNoButton();
    }, 600);
});

// ============================================
// "HAYIR" BUTTON - ESCAPE LOGIC
// ============================================
const btnNo = document.getElementById('btnNo');
const hintText = document.getElementById('hintText');
let noAttempts = 0;

const noMessages = [
    "Hoop! Nereye? 😏",
    "Yakalayamazsın! 😜",
    "Hayır yok burada 💅",
    "Evet'e bas hadi! 😘",
    "Kaçıyorum! 🏃‍♀️",
    "İmkansız! 🚫",
    "Doğru cevap Evet! 💖",
    "Ben hızlıyım 💨",
    "Pes et ve Evet de! 😂",
    "Seviyorsun biliyorum! 🥰"
];

function initNoButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();

    // Position initially next to the yes button
    btnNo.style.position = 'relative';
    btnNo.style.left = '0';
    btnNo.style.top = '0';

    btnNo.addEventListener('mouseenter', handleNoEscape);
    btnNo.addEventListener('touchstart', handleNoEscape, { passive: true });
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        handleNoEscape();
    });
}

function handleNoEscape() {
    noAttempts++;

    // Show funny message
    hintText.textContent = noMessages[noAttempts % noMessages.length];
    hintText.style.opacity = '1';

    // Calculate new random position within the viewport
    const btnRect = btnNo.getBoundingClientRect();
    const maxX = window.innerWidth - btnRect.width - 20;
    const maxY = window.innerHeight - btnRect.height - 20;

    const newX = 20 + Math.random() * (maxX - 20);
    const newY = 20 + Math.random() * (maxY - 20);

    // Make button absolute and move it
    btnNo.style.position = 'fixed';
    btnNo.style.left = newX + 'px';
    btnNo.style.top = newY + 'px';
    btnNo.style.zIndex = '100';
    btnNo.style.transition = 'none';

    // Add a little shake animation
    btnNo.style.animation = 'none';
    btnNo.offsetHeight; // Reflow
    btnNo.style.animation = 'shake 0.3s ease';

    // Make it smaller after many attempts
    if (noAttempts > 5) {
        const scale = Math.max(0.5, 1 - (noAttempts - 5) * 0.08);
        btnNo.style.transform = `scale(${scale})`;
    }

    // Make it more transparent
    if (noAttempts > 8) {
        const opacity = Math.max(0.3, 1 - (noAttempts - 8) * 0.1);
        btnNo.style.opacity = opacity;
    }
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0); }
        25% { transform: translateX(-8px) rotate(-5deg); }
        50% { transform: translateX(8px) rotate(5deg); }
        75% { transform: translateX(-4px) rotate(-2deg); }
    }
`;
document.head.appendChild(shakeStyle);

// ============================================
// SHOW ROSE - "EVET" BUTTON CLICKED
// ============================================
function showRose() {
    const questionScreen = document.getElementById('questionScreen');
    const roseScreen = document.getElementById('roseScreen');

    // Hide the escaped no button
    btnNo.style.display = 'none';

    // Transition screens
    questionScreen.classList.remove('active');

    setTimeout(() => {
        roseScreen.classList.add('active');
        startPetalRain();
        createFireworks();
    }, 800);
}

// ============================================
// PETAL RAIN ON ROSE SCREEN
// ============================================
function startPetalRain() {
    const container = document.getElementById('petalsRain');
    const colors = [
        'radial-gradient(ellipse, #ffffff, #f1f3f5)',
        'radial-gradient(ellipse, #f8f9fa, #e9ecef)',
        'radial-gradient(ellipse, #fff0f3, #ffe3e8)',
        'radial-gradient(ellipse, #f1f3f5, #dee2e6)',
    ];

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'falling-petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];
        petal.style.animationDuration = (4 + Math.random() * 6) + 's';
        petal.style.animationDelay = Math.random() * 2 + 's';
        petal.style.width = (12 + Math.random() * 14) + 'px';
        petal.style.height = (14 + Math.random() * 16) + 'px';

        const rotation = Math.random() * 360;
        petal.style.borderRadius = `${50 + Math.random() * 20}% 0 ${50 + Math.random() * 20}% ${50 + Math.random() * 20}%`;
        petal.style.transform = `rotate(${rotation}deg)`;

        container.appendChild(petal);
        setTimeout(() => petal.remove(), 12000);
    }

    // Initial burst
    for (let i = 0; i < 20; i++) {
        setTimeout(createPetal, i * 100);
    }

    // Continuous rain
    setInterval(createPetal, 400);
}

// ============================================
// FIREWORKS EFFECT
// ============================================
function createFireworks() {
    const container = document.getElementById('petalsRain');

    function burst(x, y) {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = x + '%';
            particle.style.top = y + '%';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';

            const isPink = Math.random() > 0.5;
            const hue = isPink ? (Math.random() * 40 + 320) : (Math.random() * 20 + 200); // Pink or silver-blue
            const lightness = Math.random() > 0.5 ? 90 : 75;
            particle.style.background = `hsl(${hue}, 100%, ${lightness}%)`;
            particle.style.boxShadow = `0 0 6px hsl(${hue}, 100%, ${lightness}%)`;

            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 50 + Math.random() * 80;
            const dx = Math.cos(angle) * velocity;
            const dy = Math.sin(angle) * velocity;

            particle.style.transition = 'all 1s ease-out';
            particle.style.opacity = '1';

            container.appendChild(particle);

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${dx}px, ${dy}px)`;
                particle.style.opacity = '0';
            });

            setTimeout(() => particle.remove(), 1200);
        }
    }

    // Multiple bursts
    setTimeout(() => burst(30, 20), 500);
    setTimeout(() => burst(70, 15), 1000);
    setTimeout(() => burst(50, 25), 1500);
    setTimeout(() => burst(20, 35), 2500);
    setTimeout(() => burst(80, 30), 3000);
}
