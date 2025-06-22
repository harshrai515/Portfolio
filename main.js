// ===== LOADER =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// ===== CUSTOM CURSOR =====
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });
    
    // Cursor hover effect
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item, .certification-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
        });
    });
});

// ===== NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    // Sticky navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        if (navToggle.classList.contains('active')) {
            navToggle.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
            navToggle.querySelector('span:nth-child(2)').style.opacity = '0';
            navToggle.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            navToggle.querySelector('span:nth-child(1)').style.transform = 'none';
            navToggle.querySelector('span:nth-child(2)').style.opacity = '1';
            navToggle.querySelector('span:nth-child(3)').style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.querySelector('span:nth-child(1)').style.transform = 'none';
            navToggle.querySelector('span:nth-child(2)').style.opacity = '1';
            navToggle.querySelector('span:nth-child(3)').style.transform = 'none';
        });
    });
});

// ===== THREE.JS BACKGROUND =====
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('webgl-canvas');
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ffff, 0.5);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2) / 100;
        mouseY = (event.clientY - window.innerHeight / 2) / 100;
    }
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Update camera
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        // Update renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        
        // Rotate particles
        particlesMesh.rotation.x = elapsedTime * 0.05;
        particlesMesh.rotation.y = elapsedTime * 0.03;
        
        // Mouse movement effect
        particlesMesh.rotation.x += mouseY * 0.05;
        particlesMesh.rotation.y += mouseX * 0.05;
        
        // Render
        renderer.render(scene, camera);
        
        // Call animate again on the next frame
        window.requestAnimationFrame(animate);
    };
    
    animate();
});

// ===== GSAP ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate skill bars
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        
        gsap.to(skill, {
            width: `${level}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: skill,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate certification items
    const certificationItems = document.querySelectorAll('.certification-item');
    
    certificationItems.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: -30,
            duration: 0.8,
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate about content
    gsap.from('.about-image', {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
    
    gsap.from('.about-text', {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
    
    // Animate contact content
    gsap.from('.contact-info', {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
    
    gsap.from('.contact-form', {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
});

// ===== PROJECT FILTERING =====
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power2.out',
                        onStart: function() {
                            card.style.display = 'block';
                        }
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.5,
                        ease: 'power2.out',
                        onComplete: function() {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
});

// ===== FORM SUBMISSION =====
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Disable submit button and show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                // Send form data to backend
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, subject, message })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    showNotification('Success!', data.message, 'success');
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message
                    showNotification('Error!', data.message, 'error');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showNotification('Error!', 'Failed to send message. Please try again later.', 'error');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
    
    // Function to show notification
    function showNotification(title, message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        
        // Add notification content
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            </div>
            <div class="notification-content">
                <h3>${title}</h3>
                <p>${message}</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add notification to DOM
        document.body.appendChild(notification);
        
        // Add styles for notification
        const style = document.createElement('style');
        if (!document.querySelector('style[data-notification-styles]')) {
            style.setAttribute('data-notification-styles', '');
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    background-color: var(--bg-secondary);
                    border-left: 4px solid;
                    padding: 15px 20px;
                    border-radius: 5px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    z-index: 9999;
                    min-width: 300px;
                    max-width: 450px;
                    transform: translateX(120%);
                    opacity: 0;
                    animation: slideIn 0.3s forwards, slideOut 0.3s forwards 5s;
                }
                
                .notification-success {
                    border-color: #00ff00;
                }
                
                .notification-error {
                    border-color: #ff0055;
                }
                
                .notification-icon {
                    font-size: 24px;
                }
                
                .notification-success .notification-icon {
                    color: #00ff00;
                }
                
                .notification-error .notification-icon {
                    color: #ff0055;
                }
                
                .notification-content {
                    flex: 1;
                }
                
                .notification-content h3 {
                    font-size: 18px;
                    margin-bottom: 5px;
                }
                
                .notification-content p {
                    font-size: 14px;
                    color: var(--text-secondary);
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 16px;
                    padding: 5px;
                    transition: var(--transition-fast);
                }
                
                .notification-close:hover {
                    color: var(--text-primary);
                }
                
                @keyframes slideIn {
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(120%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5300);
    }
});

// ===== SCROLL TO TOP =====
document.addEventListener('DOMContentLoaded', () => {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add styles for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--neon-primary);
            color: var(--bg-primary);
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: var(--transition-medium);
            box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-top-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 255, 255, 0.4);
        }
    `;
    document.head.appendChild(style);
});