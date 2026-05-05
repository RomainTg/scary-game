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

    addIntro('h1', 'Bienvenue dans l\'horrible expérience de mes 3 plus gros défauts !', 1000, { zIndex: '100' });
    addIntro('p', 'Ce jeu est exclusivement destiné aux utilisateurs d\' un ordinateur. Vous y trouverez mes 3 plus gros défauts. Aurez-vous le courage de les affronter ?', 1000, { zIndex: '100' });
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
            const h1 = main.querySelector('h1');
            const p = main.querySelector('p');
            const btn = main.querySelector('button');
            const link = main.querySelector('a');
            if (h1) h1.remove();
            if (p) p.remove();
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

                // Configuration du hotspot 1
                const hotspot = {
                    xPercent: 76,
                    yPercent: 70,
                    radiusPercent: 6  // rayon de 6% de la largeur de l'écran
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
                    radiusPercent: 6
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
                    radiusPercent: 6
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
                                // Si pas de timer en cours, en démarrer un
                                if (!hoverTimer3) {
                                    hoverTimer3 = setTimeout(() => {
                                        alert("Défaut 3/3 : Têtu. Ça ne se soigne pas ça ?");
                                        alertShown3 = true;
                                        document.querySelector('#scene img').src = 'assets/images/bedroom.png';
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
                                scream.play();
                                // Si pas de timer en cours, en démarrer un
                                if (!hoverTimer2) {
                                    hoverTimer2 = setTimeout(() => {
                                        alert("Défaut 2/3 : Réservé. Après un combo bière/saucisson ça va tout de suite mieux !");
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
                                // Si pas de timer en cours, en démarrer un
                                if (!hoverTimer) {
                                    hoverTimer = setTimeout(() => {
                                        alert("Défaut 1/3 : Perfectionniste. Est-ce vraiment un défaut ?");
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

                        // Vérifier si on est dans la zone sensible
                        if (isInHotspot(e.clientX, e.clientY)) {
                            // Si pas de timer en cours, en démarrer un
                            if (!hoverTimer && !alertShown) {
                                hoverTimer = setTimeout(() => {
                                    alert("Défaut 1/3 : Perfectionniste. Est-ce vraiment un défaut ?");
                                    alertShown = true;
                                    document.querySelector('#scene img').src = 'assets/images/bureau.png';
                                }, 500); // 500ms = 0.5 seconde
                            }
                        } else {
                            // Si on quitte la zone, annuler le timer
                            if (hoverTimer) {
                                clearTimeout(hoverTimer);
                                hoverTimer = null;
                            }
                        }
                    }
                });

                // Tactile
                document.addEventListener('touchstart', () => active = true);
                
                document.addEventListener('touchend', () => {
                    active = false;
                    darkness.style.background = 'black';
                    
                    // Annuler le timer si on relâche le doigt
                    if (hoverTimer) {
                        clearTimeout(hoverTimer);
                        hoverTimer = null;
                    }
                });

                document.addEventListener('touchmove', e => {
                    if (!active) return;
                    const touch = e.touches[0];
                    reveal(touch.clientX, touch.clientY);
                    
                    // Vérifier si on est dans la zone sensible (tactile)
                    if (isInHotspot(touch.clientX, touch.clientY)) {
                        if (!hoverTimer && !alertShown) {
                            hoverTimer = setTimeout(() => {
                                alert("Défaut 1/3 : Perfectionniste. Est-ce vraiment un défaut ?");
                                alertShown = true;
                                document.querySelector('#scene img').src = 'assets/images/bureau.png';
                            }, 500);
                        }
                    } else {
                        if (hoverTimer) {
                            clearTimeout(hoverTimer);
                            hoverTimer = null;
                        }
                    }
                });            
            }, 16000); // Fin du setTimeout principal
        }
    });
});

const bookfall = new Audio('assets/music/bookfall.mp3');
    bookfall.volume = 1;
const scream2 = new Audio('assets/music/scream2.mp3');
    scream2.volume = 1;

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

effetSonore(); // Appeler la fonction




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
