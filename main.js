let lampEnabled = false;

addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    main.style.display = 'flex';
    main.style.flexDirection = 'column';
    main.style.alignItems = 'center';
    main.style.justifyContent = 'center';

    const horrorSound = new Audio('assets/music/horror-ambient.mp3');
    horrorSound.loop = true; //Repeat the sound 
            
    const addIntro = (tag, text, delay, styles = {}) => {
        setTimeout(() => {
            const element = document.createElement(tag);
            element.className = 'fade-in';
            element.style.color = 'white';
            element.style.textAlign = 'center';
            element.style.marginTop = '1em';
            Object.assign(element.style, styles);
            element.textContent = text;
            main.appendChild(element);
        }, delay);
    };

    addIntro('h1', 'Welcome to the Scary Game!', 1000, { zIndex: '100' });
    addIntro('p', 'For the best experience, turn up the volume. You can use headphones for optimal gameplay.', 3000, { zIndex: '100' });
    addIntro('button', 'OK', 5000, { fontSize: '1.5em', color: 'black', padding: '5px', borderRadius: '8px', zIndex: '100' });

    addEventListener('click', (button) => {
        horrorSound.play();
        if (button.target.tagName === 'BUTTON') {
            const h1 = main.querySelector('h1');
            const p = main.querySelector('p');
            const btn = main.querySelector('button');
            if (h1) h1.remove();
            if (p) p.remove();
            if (btn) btn.remove();

            const consequence = new Audio('assets/music/consequence.mp3');
            consequence.play();
            const addText = (tag, text, delay, styles = {}) => {
                setTimeout(() => {
                    const element2 = document.createElement(tag);
                    element2.className = 'fade-in';
                    element2.style.color = 'white';
                    element2.style.textAlign = 'center';
                    element2.style.marginTop = '1em';
                    Object.assign(element2.style, styles);
                    element2.textContent = text;
                    main.appendChild(element2);
                }, delay);
            };

            addText('h2', 'Ready?', 500, { zIndex: '100' });
            setTimeout(() => {
                const h2 = main.querySelector('h2');
                if (h2) h2.classList.add('fade-out');
            }, 9500);

            addText('p', 'Or not...', 10000, { zIndex: '100' });
            setTimeout(() => {
                const here = main.querySelector('p');
                if (here) here.classList.add('fade-out');
            }, 14500);

            setTimeout(() => {
                lampEnabled = true; // 🔦 la lampe est maintenant autorisée
            }, 16000); // un peu après le fade-out

        }
    });
});


    const darkness = document.getElementById('darkness');
    let active = false;

    // Désactiver le drag par défaut du navigateur
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });

    // Empêcher la sélection de texte pendant le drag
    document.addEventListener('selectstart', (e) => {
        if (active) {
            e.preventDefault();
            return false;
        }
    });

    function reveal(x, y) {
        darkness.style.background = `
            radial-gradient(
                circle 120px at ${x}px ${y}px,
                transparent 0%,
                rgba(0,0,0,0.9) 60%,
                black 100%
            )
        `;
    }


    // Souris
    document.addEventListener('mousedown', (e) => {
        if (!lampEnabled) return;
        e.preventDefault();
        active = true;
        reveal(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', () => {
        active = false;
        darkness.style.background = 'black';
    });

    document.addEventListener('mousemove', e => {
        if (active && lampEnabled) {
            e.preventDefault();
            reveal(e.clientX, e.clientY);
        }
    });

    // Tactile
    document.addEventListener('touchstart', () => active = true);
    document.addEventListener('touchend', () => {
        active = false;
        darkness.style.background = 'black';
    });

    document.addEventListener('touchmove', e => {
        if (!active) return;
        const touch = e.touches[0];
        reveal(touch.clientX, touch.clientY);
    });

function effetSonore() {
    // Générer un délai aléatoire entre 0.5 et 1 minute (30000 à 60000 ms)
    const delay = 30000 + Math.random() * 30000;
    setTimeout(() => {
        const bookfall = new Audio('assets/music/bookfall.mp3');
        bookfall.volume = 1.5;
        bookfall.play();
    }, delay);
};

effetSonore(); // Appeler la fonction une première fois


