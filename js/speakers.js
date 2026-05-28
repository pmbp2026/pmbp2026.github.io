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

function openPill(pill) {
    pill.querySelector('.pill-summary').setAttribute('aria-expanded', 'true');
    pill.querySelector('.pill-abstract').hidden = false;
    pill.querySelector('.expand-icon').textContent = '−';
    pill.classList.add('open');
}

const hash = window.location.hash.slice(1);
if (hash) {
    const target = document.getElementById(hash);
    if (target && target.classList.contains('speaker-pill')) {
        openPill(target);
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}else {
    openPill(document.querySelector('.speaker-pill'));
}
