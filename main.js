let lampEnabled = false; // Variable pour contrôler l'activation de la lampe

addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    main.style.display = 'flex';
    main.style.flexDirection = 'column';
    main.style.alignItems = 'center';
    main.style.justifyContent = 'center';

    const scream = new Audio('assets/music/scream.mp3');
    scream.volume = 1;
    const horrorSound = new Audio('assets/music/horror-ambient.mp3');
    horrorSound.volume = 0.3;
    const bookfall = new Audio('assets/music/bookfall.mp3');
    bookfall.volume = 1;
    const scream2 = new Audio('assets/music/scream2.mp3');
    scream2.volume = 1;
    const cry = new Audio('assets/music/womanCry.mp3');
    cry.volume = 0.7;
    const laugh = new Audio('assets/music/laugh.mp3');
    laugh.volume = 1;
    const pain = new Audio('assets/music/pain.mp3');
    pain.volume = 1;
    const jumpscare = new Audio('assets/music/jump1.mp3');
    jumpscare.volume = 1;

    const allSounds = [scream, horrorSound, bookfall, scream2, cry, laugh, pain, jumpscare];
    function muteAllSounds() {
        allSounds.forEach(s => { s.pause(); s.currentTime = 0; });
    }

    horrorSound.loop = true; //Repeat the sound 
            
    const addIntro = (tag, text, delay, styles = {}) => {
        setTimeout(() => {
            const element = document.createElement(tag);
            element.className = 'fade-in';
            element.style.color = 'white';
            element.style.textAlign = 'center';
            element.style.marginTop = '1em';
            element.style.padding = '0 3em';
            Object.assign(element.style, styles);
            element.textContent = text;
            main.appendChild(element);
        }, delay);
    };

    addIntro('h1', 'Bienvenue dans l\'horrible expérience des plus gros défauts !', 1000, { textTransform: 'uppercase', zIndex: '100' });
    addIntro('p', 'ATTENTION ce jeu est exclusivement jouable sur ordinateur. Vous y trouverez mes plus gros défauts !', 1000, { zIndex: '100' });
    addIntro('p', 'Pour cela, rien de plus facile ! Il vous faudra simplement maintenir le clic gauche de votre souris pour activer la lampe.', 1000, { zIndex: '100' });
    addIntro('p', 'Une fois activée, la lampe vous permettra de révéler mes défauts en les pointant avec celle-ci.', 1000, { zIndex: '100' });
    addIntro('p', 'Aurez-vous le courage de les affronter ?', 1000, { zIndex: '100' });
    addIntro('p', '(Pour une expérience optimale, veuillez utiliser un casque audio et augmenter le volume.)', 1000, { fontStyle: 'italic', color: '#ff0000', zIndex: '100' });
    addIntro('button', 'OK', 1000, { fontSize: '1.5em', color: 'black', padding: '5px', borderRadius: '8px', zIndex: '100' });
    addIntro('a', 'Mentions légales & Confidentialité', 1000, { zIndex: '100', fontSize: '0.75em', color: '#aaa', cursor: 'pointer',
    textDecoration: 'underline', position: 'absolute', bottom: '1em' });

setTimeout(() => {
    const link = main.querySelector('a');
    if (link) link.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('legal-modal').style.display = 'block';
    });
}, 1100);

    addEventListener('click', (button) => {
        if (button.target.closest('#legal-modal')) return;
        if (button.target.tagName === 'BUTTON') {
            horrorSound.play();
            effetSonore();
            const h1 = main.querySelector('h1');
            const p = main.querySelectorAll('p');
            const btn = main.querySelector('button');
            const link = main.querySelector('a');
            if (h1) h1.remove();
            if (p) p.forEach((element) => element.remove());
            if (btn) btn.remove();
            if (link) link.remove();

            const consequence = new Audio('assets/music/consequence.mp3');
            consequence.play();
            consequence.volume = 0.5;
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

            addText('h2', 'Prêt ?', 500, { fontSize: '3.5em', zIndex: '100' });
            setTimeout(() => {
                const h2 = main.querySelector('h2');
                if (h2) h2.classList.add('fade-out');
            }, 9000);

            setTimeout(() => {
                lampEnabled = true; // 🔦 la lampe est maintenant autorisée

                // Configuration du hotspot 1
                const hotspot = {
                    xPercent: 76,
                    yPercent: 70,
                    radiusPercent: 7  // rayon de 7% de la largeur de l'écran
                };

                let hoverTimer = null;
                let alertShown = false;

                function getImageOffset() {
                    const img = document.querySelector('#scene img');
                    const screenW = window.innerWidth;
                    const screenH = window.innerHeight;
                    const imgRatio = img.naturalWidth / img.naturalHeight;
                    const screenRatio = screenW / screenH;

                    let renderedW, renderedH, offsetX, offsetY;

                    if (screenRatio > imgRatio) {
                        renderedW = screenW;
                        renderedH = screenW / imgRatio;
                        offsetX = 0;
                        offsetY = (screenH - renderedH) / 2;
                    } else {
                        renderedH = screenH;
                        renderedW = screenH * imgRatio;
                        offsetX = (screenW - renderedW) / 2;
                        offsetY = 0;
                    }
                    return { renderedW, renderedH, offsetX, offsetY };
                }

                // Fonction pour vérifier si le curseur est dans la zone
                function isInHotspot(x, y) {
                    const { renderedW, renderedH, offsetX, offsetY } = getImageOffset();
                    const centerX = offsetX + (renderedW * hotspot.xPercent) / 100;
                    const centerY = offsetY + (renderedH * hotspot.yPercent) / 100;
                    const radius = (window.innerWidth * hotspot.radiusPercent) / 100;
                    return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) <= radius;
                }

                // Définir hotspot2
                const hotspot2 = {
                    xPercent: 60,
                    yPercent: 73.6,
                    radiusPercent: 7
                };

                let hoverTimer2 = null;
                let alertShown2 = false;

                function isInHotspot2(x, y) {
                    const { renderedW, renderedH, offsetX, offsetY } = getImageOffset();
                    const centerX = offsetX + (renderedW * hotspot2.xPercent) / 100;
                    const centerY = offsetY + (renderedH * hotspot2.yPercent) / 100;
                    const radius = (window.innerWidth * hotspot2.radiusPercent) / 100;
                    return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) <= radius;
                }

                // Définir hotspot3
                const hotspot3 = {
                    xPercent: 29.6, 
                    yPercent: 41.45,  
                    radiusPercent: 7
                };

                let hoverTimer3 = null;
                let alertShown3 = false;

                function isInHotspot3(x, y) {
                    const { renderedW, renderedH, offsetX, offsetY } = getImageOffset();
                    const centerX = offsetX + (renderedW * hotspot3.xPercent) / 100;
                    const centerY = offsetY + (renderedH * hotspot3.yPercent) / 100;
                    const radius = (window.innerWidth * hotspot3.radiusPercent) / 100;
                    return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) <= radius;
                }

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
                    if (e.target.closest('#legal-modal')) return;
                    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
                    if (!lampEnabled) return;
                    e.preventDefault();
                    active = true;
                    reveal(e.clientX, e.clientY);
                });

                document.addEventListener('mouseup', (e) => {
                    if (e.target.closest('#legal-modal')) return;
                    active = false;
                    darkness.style.background = 'black';
                    
                    // Annuler le timer si on relâche la souris
                    if (hoverTimer) {
                        clearTimeout(hoverTimer);
                        hoverTimer = null;
                    }
                });

                document.addEventListener('mousemove', e => {
                    if (active) {
                        e.preventDefault();
                        reveal(e.clientX, e.clientY);

                        // Vérifier le hotspot 3 si on est au stage 3
                        if (alertShown && alertShown2) {
                            if (isInHotspot3(e.clientX, e.clientY)) {
                                jumpscare.play();
                                // Si pas de timer en cours, en démarrer un
                                if (!hoverTimer3) {
                                    hoverTimer3 = setTimeout(() => {
                                        showDefect(
                                            "Défaut 3/3 : Obstiné", " Ça ne se soigne pas ça ?",
                                        );
                                        alertShown3 = true;
                                        document.querySelector('#scene img').src = 'assets/images/bedroom.png';
                                        setTimeout(() => showGameOver(), 4000);
                                    }, 500);
                                }
                            } else {
                                // Si on quitte la zone du hotspot 3, annuler le timer
                                if (hoverTimer3) {
                                    clearTimeout(hoverTimer3);
                                    hoverTimer3 = null;
                                }
                            }
                        }  
                        
                        // Vérifier le hotspot 2 si on est au stage 2
                        if (alertShown && !alertShown2) {
                            if (isInHotspot2(e.clientX, e.clientY)) {
                                jumpscare.play();
                                // Si pas de timer en cours, en démarrer un
                                if (!hoverTimer2) {
                                    hoverTimer2 = setTimeout(() => {
                                        showDefect(
                                            "Défaut 2/3 : Timidité",
                                            "Après un combo bière/saucisson, ça va tout de suite mieux !"
                                        );
                                        alertShown2 = true;
                                        document.querySelector('#scene img').src = 'assets/images/bedroom.png';
                                    }, 500);
                                }
                            } else {
                                // Si on quitte la zone du hotspot 2, annuler le timer
                                if (hoverTimer2) {
                                    clearTimeout(hoverTimer2);
                                    hoverTimer2 = null;
                                }
                            }
                        }
                        // Sinon vérifier le hotspot 1
                        else if (!alertShown) {
                            if (isInHotspot(e.clientX, e.clientY)) {
                                cry.play( setTimeout(() => {
                                    soundfadein(cry, 1, 0, 1000); // Fondu en 1 seconde
                                    soundfadeout(cry, 1, 0, 3000); // Fondu en 3 secondes
                                }));
                                // Si pas de timer en cours, en démarrer un
                                if (!hoverTimer) {
                                    hoverTimer = setTimeout(() => {
                                        jumpscare.play();
                                        showDefect(
                                            "Défaut 1/3 : Perfectionniste",
                                            "Est-ce vraiment un défaut finalement ?"
                                        );
                                        alertShown = true;
                                        document.querySelector('#scene img').src = 'assets/images/bureau.png';
                                    }, 500);
                                } else {
                                    // Si on quitte la zone, annuler le timer
                                    if (hoverTimer) { 
                                        clearTimeout(hoverTimer);
                                        hoverTimer = null;
                                    }
                                } 
                            }
                        }
                    }
                });       
            }, 16000); // Fin du setTimeout principal
        }
    });
});

function effetSonore() {
    // Générer un délai aléatoire entre 0.5 et 1 minute (30000 à 60000 ms)
    const delay = 30000 + Math.random() * 30000;
    setTimeout(() => {
        bookfall.play();
    setTimeout(() => {
        scream2.play();
        soundfadein(scream2, 1, 0, 1000); // Fondu en 1 seconde
        soundfadeout(scream2, 1, 0, 3000); // Fondu en 3 secondes
    }, 2000); // Délai de 1.5 secondes après le bookfall
    }, delay);
};

function showDefect(title, description) {
    const container = document.createElement('div');

    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.textAlign = 'center';
    container.style.zIndex = '9999';
    container.style.pointerEvents = 'none';

    const h1 = document.createElement('h1');
    h1.textContent = title;
    h1.style.color = 'red';
    h1.style.fontSize = '5em';
    h1.style.marginBottom = '0.5em';

    const p = document.createElement('p');
    p.textContent = description;
    p.style.color = 'white';
    p.style.fontSize = '1.5em';

    container.appendChild(h1);
    container.appendChild(p);
    document.body.appendChild(container);

    // animation
    container.style.opacity = '0';

    requestAnimationFrame(() => {
        container.style.opacity = '1';
    });

    // fade out après 4s
    setTimeout(() => {
        container.style.opacity = '0';
        setTimeout(() => container.remove(), 1000);
    }, 3000);
}

function showGameOver() {
    lampEnabled = false; // Désactiver la lampe pour éviter les interactions pendant le game over
    muteAllSounds();
    const container = document.createElement('div');
 
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.textAlign = 'center';
    container.style.zIndex = '9999';
    container.style.pointerEvents = 'none';
    container.style.opacity = '0';
    container.style.transition = 'opacity 2s ease';
 
    const h1 = document.createElement('h1');
    h1.textContent = 'GAME OVER';
    h1.style.color = 'red';
    h1.style.fontSize = '5em';
    h1.style.marginBottom = '0.5em';
    h1.style.letterSpacing = '0.1em';
 
    const p1 = document.createElement('p');
    p1.textContent = 'Vous avez survécu à mes pires défauts.';
    p1.style.color = 'white';
    p1.style.fontSize = '1.5em';
    p1.style.marginBottom = '0.5em';
 
    const p2 = document.createElement('p');
    p2.textContent = 'Merci d\'avoir joué — et d\'avoir eu le courage d\'aller jusqu\'au bout !';
    p2.style.color = '#ccc';
    p2.style.fontSize = '1.1em';
    p2.style.fontStyle = 'italic';
 
    container.appendChild(h1);
    container.appendChild(p1);
    container.appendChild(p2);
    document.body.appendChild(container);
 
    requestAnimationFrame(() => {
        container.style.opacity = '1';
    });
}



/*document.addEventListener('click', (e) => {
    const xPercent = (e.clientX / window.innerWidth) * 100;
    const yPercent = (e.clientY / window.innerHeight) * 100;
    
    console.log(`X: ${xPercent.toFixed(2)}%, Y: ${yPercent.toFixed(2)}%`);
    
    // Bonus : afficher visuellement
    const marker = document.createElement('div');
    marker.style.position = 'fixed';
    marker.style.left = e.clientX + 'px';
    marker.style.top = e.clientY + 'px';
    marker.style.width = '10px';
    marker.style.height = '10px';
    marker.style.background = 'red';
    marker.style.borderRadius = '50%';
    marker.style.zIndex = '9999';
    document.body.appendChild(marker);
});*/
