addEventListener('DOMContentLoaded', () => {
            const main = document.querySelector('main');
            main.style.display = 'flex';
            main.style.flexDirection = 'column';
            main.style.alignItems = 'center';
            main.style.justifyContent = 'center';

            const horrorSound = new Audio('assets/music/horror-ambient.mp3');
            //horrorSound.play();
            
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

            addIntro('h1', 'Welcome to the Scary Game!', 1000, { marginTop: '20%' });
            addIntro('p', 'Get ready for a spooky adventure...', 3000);
            addIntro('button', 'OK', 5000, { fontSize: '1.5em', color: 'black', padding: '5px', borderRadius: '8px' });

            addEventListener('click', (button) => {
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
                            element2.style.color = 'red';
                            element2.style.textAlign = 'center';
                            element2.style.marginTop = '1em';
                            Object.assign(element2.style, styles);
                            element2.textContent = text;
                            main.appendChild(element2);
                        }, delay);
                    };

                    addText('h2', 'Ready?', 500, { marginTop: '20%' });
                    setTimeout(() => {
                        const h2 = main.querySelector('h2');
                        if (h2) h2.classList.add('fade-out');
                    }, 9500);
                }
            });
        });