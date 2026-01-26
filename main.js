addEventListener('DOMContentLoaded', () => {
            const main = document.querySelector('main');
            main.style.display = 'flex';
            main.style.flexDirection = 'column';
            main.style.alignItems = 'center';
            
            const addText = (tag, text, delay, styles = {}) => {
                setTimeout(() => {
                    const el = document.createElement(tag);
                    el.className = 'fade-in';
                    el.style.color = 'white';
                    el.style.textAlign = 'center';
                    el.style.marginTop = '1em';
                    Object.assign(el.style, styles);
                    el.textContent = text;
                    main.appendChild(el);
                }, delay);
            };
            
            addText('h1', 'Welcome to the Scary Game!', 1000, { marginTop: '20%' });
            addText('p', 'Get ready for a spooky adventure...', 3000);
            addText('button', 'OK', 5000, { fontSize: '1.5em', color: 'black', padding: '5px', borderRadius: '8px' });

            addEventListener('click', (button) => {
                if (button.target.tagName === 'BUTTON') {
                    const h1 = main.querySelector('h1');
                    const p = main.querySelector('p');
                    const btn = main.querySelector('button');
                    if (h1) h1.remove();
                    if (p) p.remove();
                    if (btn) btn.remove();
                }
            });
        });