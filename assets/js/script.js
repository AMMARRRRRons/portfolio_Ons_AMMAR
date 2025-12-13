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
const RECIPIENT_EMAIL = 'ons.ammar@etudiant-isi.utm.tn';

// ============================================
// EmailJS Configuration
// ============================================
// IMPORTANT: Suivez le guide GUIDE_EMAILJS_PAS_A_PAS.md pour configurer
// 
// ÉTAPES RAPIDES:
// 1. Créez un compte sur https://www.emailjs.com/ (gratuit)
// 2. Ajoutez un service email (Gmail) -> copiez le Service ID
// 3. Créez un template email -> copiez le Template ID  
// 4. Obtenez votre Public Key dans Account > General
// 5. Remplacez les valeurs ci-dessous par vos identifiants
//
// REMPLACEZ CES VALEURS PAR VOS VRAIS IDENTIFIANTS:
const EMAILJS_SERVICE_ID = 'service_rwbacqf';        // ✅ Service ID configuré
const EMAILJS_TEMPLATE_ID = 'template_9rkyugg';      // ✅ Template ID configuré
const EMAILJS_PUBLIC_KEY = 'UWtXhwew_bc1pYDG5';       // ⬅️ Remplacez par votre Public Key (obtenez-la dans EmailJS > Account > General > API Keys)

// Initialize EmailJS si configuré
(function() {
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

async function sendFormData(templateParams) {
    // Vérifier si EmailJS est disponible
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS n\'est pas chargé. Vérifiez votre connexion internet.');
    }

    // Vérifier si EmailJS est configuré
    if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
        !EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID === 'service_portfolio' || 
        !EMAILJS_TEMPLATE_ID || EMAILJS_TEMPLATE_ID === 'template_portfolio') {
        // Essayer avec FormSubmit en fallback
        return await sendFormDataFallback(templateParams);
    }

    try {
        console.log('Envoi EmailJS avec:', {
            service: EMAILJS_SERVICE_ID,
            template: EMAILJS_TEMPLATE_ID,
            params: templateParams
        });
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );
        console.log('Réponse EmailJS:', response);
        return response;
    } catch (error) {
        console.error('Erreur EmailJS complète:', error);
        console.error('Détails:', {
            status: error.status,
            text: error.text,
            message: error.message
        });
        // Essayer avec FormSubmit en fallback
        return await sendFormDataFallback(templateParams);
    }
}

// Fallback avec FormSubmit
async function sendFormDataFallback(data) {
    const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;
    const formData = new FormData();
    
    // Convertir les données en format FormSubmit
    if (data.to_email) formData.append('_to', data.to_email);
    if (data.subject) formData.append('_subject', data.subject);
    if (data.from_email) formData.append('_replyto', data.from_email);
    if (data.message) formData.append('message', data.message);
    if (data.from_name) formData.append('name', data.from_name);
    formData.append('_next', window.location.href);
    formData.append('_captcha', 'false');

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur: ${errorText || 'Impossible d\'envoyer l\'email'}`);
    }

    return await response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements after DOM is loaded
    const darkModeToggle = document.getElementById('darkModeToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const contactForm = document.getElementById('contactForm');
    const navLinks = document.querySelectorAll('.nav-link');
    const adviceForm = document.getElementById('adviceForm');
    
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
            // État ouvert/fermé basé sur la classe "show" (voir CSS #mobileMenu.show)
            const isOpen = mobileMenu.classList.contains('show');

            if (isOpen) {
                // Fermer le menu
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
            } else {
                // Ouvrir le menu
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('show');
            }

            if (mobileMenuToggle) {
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    if (!isOpen) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Format email content as requested: "Nom, Email, Message"
            const emailContent = `${name}, ${email}, ${message}`;
            
            const templateParams = {
                to_email: RECIPIENT_EMAIL,
                name: name,                    // Pour le template {{name}}
                from_name: name,               // Pour le template {{from_name}}
                from_email: email,             // Pour le template {{from_email}}
                message: emailContent,         // Pour le template {{message}}
                subject: `Contact portfolio - ${name || 'Anonyme'}`  // Pour le template {{subject}}
            };

            try {
                console.log('=== DÉBUT ENVOI EMAIL ===');
                console.log('Paramètres envoyés:', templateParams);
                const result = await sendFormData(templateParams);
                console.log('=== EMAIL ENVOYÉ AVEC SUCCÈS ===');
                console.log('Résultat:', result);
                showNotification('Merci pour votre message ! Il a été envoyé.', 'success');
                contactForm.reset();
            } catch (err) {
                console.error('=== ERREUR LORS DE L\'ENVOI ===');
                console.error('Erreur complète:', err);
                console.error('Type:', typeof err);
                console.error('Message:', err.message);
                console.error('Stack:', err.stack);
                showNotification(err.message || 'Envoi impossible pour le moment. Réessayez plus tard.', 'error');
            }
        });
    }

    if (adviceForm) {
        adviceForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(adviceForm);
            const name = formData.get('advice-name') || 'Anonyme';
            const advice = formData.get('advice-message') || '';

            // Format email content as requested: "Nom, Conseil"
            const emailContent = `${name}, ${advice}`;

            const templateParams = {
                to_email: RECIPIENT_EMAIL,
                name: name,                    // Pour le template {{name}}
                from_name: name,               // Pour le template {{from_name}}
                message: emailContent,         // Pour le template {{message}}
                subject: `Recommandation portfolio - ${name}`  // Pour le template {{subject}}
            };

            try {
                const result = await sendFormData(templateParams);
                showNotification('Merci pour votre conseil ! Il a été envoyé.', 'success');
                adviceForm.reset();
            } catch (err) {
                console.error('Erreur:', err);
                showNotification(err.message || 'Envoi impossible pour le moment. Réessayez plus tard.', 'error');
            }
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
            toggleMobileMenu(); // referme le menu et remet l’icône "bars"
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
        console.log('Opening modal with:', imageSrc, title); // Debug
        if (modalImage && modalTitle && achievementModal) {
            modalImage.src = imageSrc;
            modalImage.alt = title;
            modalTitle.textContent = title;
            achievementModal.classList.remove('hidden');
            setTimeout(() => {
                achievementModal.classList.add('show');
            }, 10);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            console.error('Modal elements not found:', { modalImage, modalTitle, achievementModal });
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

    // ============================================
    // Compétences (RT) Modal Handling
    // ============================================
    const competenceCards = document.querySelectorAll('.rt-competence-card');
    const competenceModal = document.getElementById('competenceModal');
    const competenceTitle = document.getElementById('competenceModalTitle');
    const competenceDesc = document.getElementById('competenceModalDesc');
    const competenceLink = document.getElementById('competenceModalLink');
    const closeCompetenceModal = document.getElementById('closeCompetenceModal');

    function openCompetenceModal(title, description, pdfLink) {
        if (competenceModal && competenceTitle && competenceDesc && competenceLink) {
            competenceTitle.textContent = title || '';
            competenceDesc.textContent = description || '';
            competenceLink.href = pdfLink || '#';
            competenceModal.classList.remove('hidden');
            setTimeout(() => {
                competenceModal.classList.add('show');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCompetenceModalFn() {
        if (competenceModal) {
            competenceModal.classList.remove('show');
            setTimeout(() => {
                competenceModal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
    }

    competenceCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            const pdf = card.getAttribute('data-pdf');
            openCompetenceModal(title, description, pdf);
        });
    });

    if (closeCompetenceModal) {
        closeCompetenceModal.addEventListener('click', closeCompetenceModalFn);
    }

    if (competenceModal) {
        competenceModal.addEventListener('click', (e) => {
            if (e.target === competenceModal) {
                closeCompetenceModalFn();
            }
        });
    }

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (achievementModal && !achievementModal.classList.contains('hidden')) {
                closeAchievementModal();
            }
            if (competenceModal && !competenceModal.classList.contains('hidden')) {
                closeCompetenceModalFn();
            }
        }
    });

    // ============================================
    // Certification Modal Handling
    // ============================================
    const certificationCards = document.querySelectorAll('.certification-card');
    console.log('Found certification cards:', certificationCards.length); // Debug

    // Add click event listeners to certification cards
    certificationCards.forEach((card, index) => {
        console.log(`Setting up card ${index}:`, card); // Debug
        
        // Make sure the card is clickable
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const imageSrc = card.getAttribute('data-image');
            const title = card.getAttribute('data-title');
            console.log('Certification clicked:', imageSrc, title); // Debug
            if (imageSrc) {
                openAchievementModal(imageSrc, title);
            } else {
                console.error('No image source found for certification card');
            }
        }, true); // Use capture phase to catch events early
        
        // Prevent image clicks from interfering
        const cardImage = card.querySelector('img');
        if (cardImage) {
            cardImage.style.pointerEvents = 'none'; // Let clicks pass through to parent
        }
    });

    // ============================================
    // Welcome Banner
    // ============================================
    const welcomeBanner = document.getElementById('welcomeBanner');
    const closeWelcomeBanner = document.getElementById('closeWelcomeBanner');

    function hideWelcomeBanner() {
        if (welcomeBanner) {
            welcomeBanner.classList.add('hidden');
        }
    }

    if (closeWelcomeBanner) {
        closeWelcomeBanner.addEventListener('click', hideWelcomeBanner);
    }
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
console.log('%c👋 Bienvenue sur le portfolio de Ons Ammar!', 'color: #ff2f81; font-size: 16px; font-weight: bold;');
console.log('%cCybersecurity & Computer Engineering', 'color: #38b7ff; font-size: 12px;');
