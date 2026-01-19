// Add scrolled class to header on scroll
let lastScrollY = window.scrollY;
let ticking = false;

// Smooth header scroll effect
window.addEventListener('scroll', function() {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const header = document.getElementById('header');
            if (lastScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Hamburger menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.scrollY;
                const parallaxSpeed = 0.5;
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            // When a container becomes visible, animate its children
            const children = entry.target.querySelectorAll('.organiser-card, .venue-card');
            children.forEach(child => {
                child.classList.add('is-visible');
            });
        }
    });
}, observerOptions);

// Add fade-in class to sections and observe them
const sections = document.querySelectorAll('.scope-section, .venue-section, .organisers-section');
sections.forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add easing to scroll on mousewheel
let isScrolling;
window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    document.body.style.pointerEvents = 'none';
    
    isScrolling = setTimeout(function() {
        document.body.style.pointerEvents = 'auto';
    }, 66);
}, false);

// Horizontal scroll navigation for organisers
const organisersGrid = document.querySelector('.organisers-grid');
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');

if (organisersGrid && scrollLeftBtn && scrollRightBtn) {
    const scrollAmount = 320; // Width of one card + gap
    
    scrollLeftBtn.addEventListener('click', function() {
        organisersGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    scrollRightBtn.addEventListener('click', function() {
        organisersGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Update button states based on scroll position
    function updateScrollButtons() {
        const maxScroll = organisersGrid.scrollWidth - organisersGrid.clientWidth;
        scrollLeftBtn.disabled = organisersGrid.scrollLeft <= 0;
        scrollRightBtn.disabled = organisersGrid.scrollLeft >= maxScroll - 1;
    }
    
    organisersGrid.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons(); // Initial state
}

// // Observe individual organiser cards for staggered animation
if (organisersGrid) {
    observer.observe(organisersGrid);
}

// // Observe individual organiser cards for staggered animation
// const organiserCards = document.querySelectorAll('.organiser-card');
// organiserCards.forEach(card => {
//     observer.observe(card);
// });

// // Also observe venue cards
// const venueCards = document.querySelectorAll('.venue-card');
// venueCards.forEach(card => {
//     observer.observe(card);
// });

// // // Also observe venue cards
// // const cards = document.querySelectorAll('.organiser-card, .venue-card');
// // cards.forEach(card => {
// //     observer.observe(card);
// // });