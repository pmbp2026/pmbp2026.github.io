/// const pills = document.querySelectorAll('.speaker-pill');
/// 
/// pills.forEach(pill => {
///     const btn = pill.querySelector('.pill-summary');
///     const abstract = pill.querySelector('.pill-abstract');
///     const icon = pill.querySelector('.expand-icon');
/// 
///     btn.addEventListener('click', () => {
///         const isOpen = btn.getAttribute('aria-expanded') === 'true';
/// 
///         // Toggle this one
///         btn.setAttribute('aria-expanded', String(!isOpen));
///         abstract.hidden = isOpen;
///         icon.textContent = isOpen ? '+' : '−';
///         pill.classList.toggle('open', !isOpen);
///     });
/// });
/// 
/// function openPill(pill) {
///     pill.querySelector('.pill-summary').setAttribute('aria-expanded', 'true');
///     pill.querySelector('.pill-abstract').hidden = false;
///     pill.querySelector('.expand-icon').textContent = '−';
///     pill.classList.add('open');
/// }
/// 
/// const hash = window.location.hash.slice(1);
/// if (hash) {
///     const target = document.getElementById(hash);
///     if (target && target.classList.contains('speaker-pill')) {
///         openPill(target);
///         target.scrollIntoView({ behavior: 'smooth', block: 'center' });
///     }
/// }else {
///     openPill(document.querySelector('.speaker-pill'));
/// }

const pills = document.querySelectorAll('.speaker-pill');
pills.forEach(pill => {
    const btn = pill.querySelector('.pill-summary');
    const abstract = pill.querySelector('.pill-abstract');
    const icon = pill.querySelector('.expand-icon');
    btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
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

// Handle in-page anchor clicks — forces scroll + opens abstract every time,
// even when the hash hasn't changed between clicks
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const id = this.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        history.pushState(null, '', this.getAttribute('href'));
        if (target.classList.contains('speaker-pill')) {
            openPill(target);
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

// Handle fragment on initial page load
const hash = window.location.hash.slice(1);
if (hash) {
    const target = document.getElementById(hash);
    if (target && target.classList.contains('speaker-pill')) {
        openPill(target);
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
} else {
    openPill(document.querySelector('.speaker-pill'));
}


// scrolling
const scrollBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

