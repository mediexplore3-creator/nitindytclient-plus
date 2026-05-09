/**
 * NITINDYT CLIENT+ - Global Cursor Glow
 * Elevated z-index to ensure visibility across all sections (Header, Body, Footer).
 */
(function() {
    // Inject styles and @property for smooth color animation
    const style = document.createElement('style');
    style.textContent = `
        @property --glow-color {
            syntax: '<color>';
            initial-value: rgba(0, 255, 255, 0.25);
            inherits: false;
        }

        #cursor-glow {
            position: fixed;
            top: 0;
            left: 0;
            width: 350px;
            height: 350px;
            border-radius: 50%;
            pointer-events: none;
            /* Elevated z-index to stay visible over backgrounds, but below interactive elements if desired.
               However, with pointer-events: none, we can safely go very high. */
            z-index: 9999; 
            mix-blend-mode: screen;
            filter: blur(50px);
            will-change: transform, --glow-color;
            user-select: none;
            opacity: 0;
            transition: opacity 1.5s ease;
            background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
            animation: glowColorLoop 15s infinite alternate ease-in-out;
        }

        @keyframes glowColorLoop {
            0% { --glow-color: rgba(0, 255, 255, 0.2); }   /* Cyan */
            25% { --glow-color: rgba(255, 255, 255, 0.15); }  /* White */
            50% { --glow-color: rgba(0, 255, 255, 0.2); }   /* Aqua */
            75% { --glow-color: rgba(173, 216, 230, 0.2); } /* LightBlue */
            100% { --glow-color: rgba(255, 255, 255, 0.15); } /* White */
        }

        @media (hover: none) {
            #cursor-glow {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Create glow element
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let isMoving = false;

    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        if (!isMoving) {
            glow.style.opacity = '1';
            isMoving = true;
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Handle touch/fallback
    window.addEventListener('touchstart', () => {
        glow.style.opacity = '0';
    }, { passive: true });

    /**
     * Animation loop
     */
    function animate() {
        const ease = 0.12; 
        
        glowX += (mouseX - glowX) * ease;
        glowY += (mouseY - glowY) * ease;
        
        // Offset by half size (175px) to center
        glow.style.transform = `translate(${glowX - 175}px, ${glowY - 175}px)`;
        
        requestAnimationFrame(animate);
    }

    animate();
})();
