// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? '&times;' : '&#9776;';
});

// Close menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '&#9776;';
    });
});

// Sticky Header & Active Link Highlighting
const header = document.getElementById('site-header');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Header effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Scroll Spy
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

let delay = 0;
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, delay);
            delay += 200; // Stagger effect
            observer.unobserve(entry.target);
        }
    });

    // Reset delay for next batch of items scrolled into view
    setTimeout(() => { delay = 0; }, 200);
}, observerOptions);

// Add initial styling and observe
document.querySelectorAll('.section-container, .hero-content, .hero-graphics, .project-card, .video-wrapper, .reveal-text').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(el);
});

// Setup styles and observe elements that come from the left
document.querySelectorAll('.slide-in-left').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-150px)';
    el.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(el);
});

// CSS class added to elements on intersection
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translate(0, 0) !important;
    }
`;
document.head.appendChild(style);

// Simple form handle to prevent submit and show dynamic message
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit') || contactForm.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = 'Message Sent ✨';
        btn.style.background = '#00c853'; // Validated color
        contactForm.reset();

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = ''; // Revert to original styling
        }, 3000);
    });
}

// Letter animation splitting logic
document.querySelectorAll('.animated-letters').forEach(el => {
    const text = el.textContent.replace(/\s+/g, ' ').trim();
    el.textContent = ''; // Clear original text

    // Split into characters, preserve spaces using innerHTML
    let charIndex = 0;
    for (let char of text) {
        const span = document.createElement('span');
        if (char === ' ') {
            span.innerHTML = '&nbsp;';
        } else {
            span.textContent = char;
        }

        // Add staggered delay to each individual letter
        span.style.animationDelay = `${(charIndex * 0.03) + 0.3}s`;
        el.appendChild(span);
        charIndex++;
    }
});

// Contact Image Particle Assembly Animation
const initContactAnimation = () => {
    const canvas = document.getElementById('contact-particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('contact-image-container');
    const img = document.getElementById('contact-main-img');
    
    let width, height;
    let particles = [];
    let animationFrame;
    let assembled = false;

    const resize = () => {
        const rect = container.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor(targetX, targetY) {
            this.targetX = targetX;
            this.targetY = targetY;
            // Start from much further away for a grander entrance
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.max(width, height) * (1.5 + Math.random() * 2);
            this.x = targetX + Math.cos(angle) * dist;
            this.y = targetY + Math.sin(angle) * dist;
            
            this.size = 1 + Math.random() * 1.5;
            this.speed = 0.01 + Math.random() * 0.02; // Slower start
            this.accel = 1.03; // Faster acceleration
            this.alpha = 0.8;
        }

        update() {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            this.x += dx * this.speed;
            this.y += dy * this.speed;
            this.speed *= this.accel;
            
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 0.5) {
                this.x = this.targetX;
                this.y = this.targetY;
                return true;
            }
            return false;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 107, 0, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const createParticles = () => {
        particles = [];
        // Draw image to hidden canvas or temporary context to get pixel data
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = width;
        tempCanvas.height = height;
        
        // We need the image to be loaded to sample it
        tempCtx.drawImage(img, 0, 0, width, height);
        
        // Sample points - more points for better definition
        const step = 8; // Adjust step for density (lower is denser)
        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
                particles.push(new Particle(x, y));
            }
        }
        
        // Add some random extra dots for volume
        for (let i = 0; i < 500; i++) {
            particles.push(new Particle(Math.random() * width, Math.random() * height));
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        let allArrived = true;

        particles.forEach(p => {
            const arrived = p.update();
            p.draw();
            if (!arrived) allArrived = false;
        });

        if (allArrived) {
            assembled = true;
            img.style.opacity = '1';
            // Fade out particles slowly
            let fadeOut = setInterval(() => {
                ctx.clearRect(0, 0, width, height);
                let anyVisible = false;
                particles.forEach(p => {
                    p.alpha -= 0.03;
                    if (p.alpha > 0) {
                        p.draw();
                        anyVisible = true;
                    }
                });
                if (!anyVisible) {
                    clearInterval(fadeOut);
                    cancelAnimationFrame(animationFrame);
                }
            }, 30);
            return;
        }

        animationFrame = requestAnimationFrame(animate);
    };

    const contactObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !assembled) {
            // Ensure image is loaded before sampling
            if (img.complete) {
                createParticles();
                animate();
            } else {
                img.onload = () => {
                    createParticles();
                    animate();
                };
            }
            contactObserver.unobserve(container);
        }
    }, { threshold: 0.1 }); // Trigger earlier so user sees dots flying in

// Skill Cards 3D Tilt Effect
const initTiltEffect = () => {
    const cards = document.querySelectorAll('.skill-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
        
        // Add smooth transition for the return
        card.style.transition = 'transform 0.1s ease-out';
    });
};

// ... existing code ...
    contactObserver.observe(container);
};

// Robust Hash Scrolling on Load
window.addEventListener('load', () => {
    initContactAnimation();
    initTiltEffect();
    if (window.location.hash) {
        // First jump immediately 
        const target = document.querySelector(window.location.hash);
        if (target) {
            // A bit of delay to let IntersectionObserver animations settle
            setTimeout(() => {
                const headerOffset = document.getElementById('site-header').offsetHeight || 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                     top: offsetPosition,
                     behavior: 'smooth'
                });
            }, 500);
        }
    }
});
