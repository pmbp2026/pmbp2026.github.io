const pills = document.querySelectorAll('.speaker-pill');

pills.forEach(pill => {
    const btn = pill.querySelector('.pill-summary');
    const abstract = pill.querySelector('.pill-abstract');
    const icon = pill.querySelector('.expand-icon');

    btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Toggle this one
        btn.setAttribute('aria-expanded', String(!isOpen));
        abstract.hidden = isOpen;
        icon.textContent = isOpen ? '+' : '−';
        pill.classList.toggle('open', !isOpen);
    });
});
