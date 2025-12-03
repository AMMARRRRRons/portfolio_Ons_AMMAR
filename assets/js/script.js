// ============================================
// JavaScript for Ons Ammar Portfolio
// ============================================

// ============================================
// Dark Mode Toggle
// ============================================
function initDarkMode() {
    // Garder la valeur sauvegardée mais ne pas forcer ici :
    // le script inline dans index.html gère déjà l'état initial
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;

    if (savedTheme === 'dark') {
        html.classList.add('dark');
    } else if (savedTheme === 'light') {
        html.classList.remove('dark');
    }
}

function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        console.log('Mode clair activé');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        console.log('Mode sombre activé');
    }
}

// Initialize dark mode immediately (before DOM is ready to avoid flash)
initDarkMode();

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements after DOM is loaded
    const darkModeToggle = document.getElementById('darkModeToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const contactForm = document.getElementById('contactForm');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // ============================================
    // Dark Mode Toggle Event Listener
    // ============================================
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            toggleDarkMode();
        });
        console.log('✅ Dark mode toggle button trouvé et event listener attaché');
    } else {
        console.error('❌ Dark mode toggle button non trouvé!');
    }

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    function toggleMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('show');
            const icon = mobileMenuToggle?.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('show')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }

    // Event listener for mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('show')) {
                toggleMobileMenu();
            }
        });
    });

    // ============================================
    // Smooth Scroll for Navigation Links
    // ============================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // Active Navigation Link on Scroll
    // ============================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // ============================================
    // Scroll Animations
    // ============================================
    function observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all cards and sections
        const elementsToObserve = document.querySelectorAll(
            '.skill-card, .project-card, .education-card, .cert-card'
        );
        
        elementsToObserve.forEach(el => observer.observe(el));
    }

    // Initialize scroll animations
    observeElements();

    // ============================================
    // Contact Form Handling
    // ============================================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Create mailto link (since we don't have a backend)
            const subject = encodeURIComponent(`Contact depuis le portfolio - ${name}`);
            const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:ons.ammar@edu.univ-paris13.fr?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Merci pour votre message ! Votre client email va s\'ouvrir.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // ============================================
    // Header Shadow on Scroll
    // ============================================
    function handleHeaderShadow() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
        }
    }

    window.addEventListener('scroll', handleHeaderShadow);
    handleHeaderShadow(); // Initial check

    // ============================================
    // Handle Window Resize
    // ============================================
    window.addEventListener('resize', () => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768 && mobileMenu && mobileMenu.classList.contains('show')) {
            toggleMobileMenu();
        }
    });

    // ============================================
    // Performance: Lazy Load Images (if added later)
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add fade-in animation to hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.classList.add('fade-in');
    }

    // ============================================
    // Achievement Modal Handling
    // ============================================
    const achievementCards = document.querySelectorAll('.achievement-card');
    const achievementModal = document.getElementById('achievementModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const closeModal = document.getElementById('closeModal');

    function openAchievementModal(imageSrc, title) {
        if (modalImage && modalTitle && achievementModal) {
            modalImage.src = imageSrc;
            modalImage.alt = title;
            modalTitle.textContent = title;
            achievementModal.classList.remove('hidden');
            setTimeout(() => {
                achievementModal.classList.add('show');
            }, 10);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeAchievementModal() {
        if (achievementModal) {
            achievementModal.classList.remove('show');
            setTimeout(() => {
                achievementModal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            }, 300);
        }
    }

    // Add click event listeners to achievement cards
    achievementCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const imageSrc = card.getAttribute('data-image');
            const title = card.getAttribute('data-title');
            if (imageSrc) {
                openAchievementModal(imageSrc, title);
            }
        });
    });

    // Close modal when clicking close button
    if (closeModal) {
        closeModal.addEventListener('click', closeAchievementModal);
    }

    // Close modal when clicking outside the modal content
    if (achievementModal) {
        achievementModal.addEventListener('click', (e) => {
            if (e.target === achievementModal) {
                closeAchievementModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && achievementModal && !achievementModal.classList.contains('hidden')) {
            closeAchievementModal();
        }
    });
});

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-blue-500'
    } text-white`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('translate-x-0');
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('-translate-x-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// Console Message
// ============================================
console.log('%c👋 Bienvenue sur le portfolio de Ons Ammar!', 'color: #ec4899; font-size: 16px; font-weight: bold;');
console.log('%cCybersecurity & Computer Engineering', 'color: #a855f7; font-size: 12px;');
