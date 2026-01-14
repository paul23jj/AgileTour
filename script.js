// ====================================
// MENU MOBILE
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    const iconMenu = menuToggle.querySelector('.icon-menu');
    const iconClose = menuToggle.querySelector('.icon-close');
    const navLinksMobile = document.querySelectorAll('.nav-link-mobile');

    // Toggle du menu mobile
    menuToggle.addEventListener('click', function() {
        navMobile.classList.toggle('active');
        
        // Afficher/cacher les icônes
        if (navMobile.classList.contains('active')) {
            iconMenu.style.display = 'none';
            iconClose.style.display = 'block';
        } else {
            iconMenu.style.display = 'block';
            iconClose.style.display = 'none';
        }
    });

    // Fermer le menu quand on clique sur un lien
    navLinksMobile.forEach(function(link) {
        link.addEventListener('click', function() {
            navMobile.classList.remove('active');
            iconMenu.style.display = 'block';
            iconClose.style.display = 'none';
        });
    });

    // ====================================
    // NAVIGATION STICKY
    // ====================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Ajouter un fond plus opaque lors du scroll
        if (currentScroll > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        }

        lastScroll = currentScroll;
    });

    // ====================================
    // ONGLETS DU PROGRAMME
    // ====================================
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Retirer la classe active de tous les boutons et contenus
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            tabContents.forEach(function(content) {
                content.classList.remove('active');
            });

            // Ajouter la classe active au bouton cliqué et au contenu correspondant
            this.classList.add('active');
            document.getElementById('tab-' + tabName).classList.add('active');
        });
    });

    // ====================================
    // SMOOTH SCROLL POUR LES ANCRES
    // ====================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorer les liens vides
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                
                // Calculer la position en tenant compte du header fixe
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ====================================
    // ANIMATIONS AU SCROLL (FADE IN)
    // ====================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Sélectionner les éléments à animer
    const animatedElements = document.querySelectorAll('.session-card, .speaker-card, .timeline-item, .sponsor-card, .feature-card');

    animatedElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ====================================
    // COMPTEUR ANIMÉ POUR LES STATS DU HERO
    // ====================================
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = function(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (element.dataset.suffix || '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Observer pour les stats
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(function(stat) {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (!isNaN(number)) {
                        stat.dataset.suffix = text.replace(/\d/g, '');
                        animateCounter(stat, 0, number, 2000);
                    }
                });
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // ====================================
    // PARALLAX LÉGER POUR LES IMAGES
    // ====================================
    const parallaxImages = document.querySelectorAll('.hero-image, .timeline-image img');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

        parallaxImages.forEach(function(img) {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            img.style.transform = 'translateY(' + yPos + 'px)';
        });
    });

    // ====================================
    // GESTION DU FORMULAIRE NEWSLETTER
    // ====================================
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.email-input');
    const subscribeBtn = document.querySelector('.btn-subscribe');

    if (newsletterForm && subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (email === '') {
                alert('Veuillez entrer votre adresse email.');
                return;
            }
            
            // Validation basique de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Simulation d'inscription
            alert('Merci pour votre inscription ! Vous recevrez bientôt nos actualités.');
            emailInput.value = '';
        });

        // Soumettre avec Enter
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }

    // ====================================
    // EFFET HOVER SUR LES CARTES
    // ====================================
    const cards = document.querySelectorAll('.session-card, .speaker-card, .sponsor-card');

    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ====================================
    // CHRONOMÈTRE COMPTE À REBOURS (optionnel)
    // ====================================
    function updateCountdown() {
        const eventDate = new Date('2024-09-26T09:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Vous pouvez afficher ce compte à rebours où vous voulez
            console.log(days + 'j ' + hours + 'h ' + minutes + 'm ' + seconds + 's');
        }
    }

    // Mettre à jour le compte à rebours toutes les secondes
    setInterval(updateCountdown, 1000);

    // ====================================
    // DÉTECTION DE LA HAUTEUR POUR LE HERO
    // ====================================
    function setHeroHeight() {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.minHeight = window.innerHeight + 'px';
        }
    }

    setHeroHeight();
    window.addEventListener('resize', setHeroHeight);

    // ====================================
    // ANIMATION DES GRADIENTS (OPTIONNEL)
    // ====================================
    const decorativeBlurs = document.querySelectorAll('.decorative-blur');

    decorativeBlurs.forEach(function(blur) {
        let position = 0;
        setInterval(function() {
            position += 0.5;
            blur.style.transform = 'translateY(' + Math.sin(position / 10) * 20 + 'px)';
        }, 50);
    });

    // ====================================
    // GESTION DES BOUTONS CTA
    // ====================================
    const ctaButtons = document.querySelectorAll('.btn-hero-primary, .btn-gradient, .btn-dark, .btn-white');

    ctaButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            // Vérifier si le bouton a un lien parent
            if (!this.parentElement.tagName === 'A') {
                e.preventDefault();
                // Vous pouvez ajouter ici la logique pour ouvrir un modal d'inscription
                alert('Fonctionnalité d\'inscription à venir !');
            }
        });
    });

    // ====================================
    // LAZY LOADING DES IMAGES
    // ====================================
    const images = document.querySelectorAll('img[src]');

    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.addEventListener('load', function() {
                        img.style.opacity = '1';
                    });
                }
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(function(img) {
        imageObserver.observe(img);
    });

    // ====================================
    // EFFET DE TYPING (optionnel pour le titre)
    // ====================================
    function typeWriter(element, text, speed) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Vous pouvez décommenter ceci pour activer l'effet typing sur le titre
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 100);
    // }

    // ====================================
    // LOG DE DÉMARRAGE
    // ====================================
    console.log('🚀 Agile Tour Sophia 2024 - Site chargé avec succès !');
    console.log('📅 Événement : 26 Septembre 2024');
    console.log('📍 Lieu : Sophia Antipolis');
});
