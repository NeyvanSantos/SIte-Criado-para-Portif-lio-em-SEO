document.addEventListener('DOMContentLoaded', () => {
    
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const menuIconSpans = document.querySelectorAll('.mobile-menu-btn span');

    mobileBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            menuIconSpans.style.transform = 'none';
            menuIconSpans.style.opacity = '1';
            menuIconSpans.style.transform = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = '#0b1826';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid #AE8625';
            navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            
            menuIconSpans.style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuIconSpans.style.opacity = '0';
            menuIconSpans.style.transform = 'rotate(-45deg) translate(5px, -6px)';
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.8rem 5%';
            header.style.background = 'rgba(11, 24, 38, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '1.2rem 5%';
            header.style.background = 'rgba(11, 24, 38, 0.85)';
            header.style.boxShadow = 'none';
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    menuIconSpans.style.transform = 'none';
                    menuIconSpans.style.opacity = '1';
                    menuIconSpans.style.transform = 'none';
                }
            }
        });
    });

    const cartCount = document.querySelector('.cart-count');
    const addButtons = document.querySelectorAll('.btn-add');
    let count = 0;

    addButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            count++;
            cartCount.textContent = count;
            cartCount.style.transform = 'scale(1.5)';
            setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
            
            const originalText = this.textContent;
            this.textContent = 'Adicionado';
            this.style.background = '#F7EF8A';
            this.style.color = '#0b1826';
            this.style.borderColor = '#F7EF8A';
            this.style.fontWeight = 'bold';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'transparent';
                this.style.color = '#fff';
                this.style.borderColor = 'rgba(255,255,255,0.2)';
                this.style.fontWeight = 'normal';
            }, 2000);
        });
    });
});