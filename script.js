// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

// Search Functionality
const searchBox = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchBox.value.trim();
    if (searchTerm) {
        // Add your search functionality here
        alert(`Căutare pentru: ${searchTerm}`);
    }
});

searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchBox.value.trim();
        if (searchTerm) {
            // Add your search functionality here
            alert(`Căutare pentru: ${searchTerm}`);
        }
    }
});

// Property Card Hover Effect
const propertyCards = document.querySelectorAll('.property-card');
propertyCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Mulțumim pentru mesaj! Vă vom contacta în curând.');
        contactForm.reset();
    });
}

// Scroll Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Add animation for property cards
document.querySelectorAll('.property-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Add animation for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Add animation for stats
document.querySelectorAll('.stat-item').forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'all 0.5s ease-out';
    observer.observe(stat);
});

// Add animation for contact form
const contactContent = document.querySelector('.contact-content');
if (contactContent) {
    contactContent.style.opacity = '0';
    contactContent.style.transform = 'translateY(20px)';
    contactContent.style.transition = 'all 0.5s ease-out';
    observer.observe(contactContent);
}

// Property Form Handling
const propertyForm = document.querySelector('.property-form');
const imageInput = document.querySelector('#property-images');
const imagePreview = document.querySelector('#image-preview');

// Image Preview
imageInput.addEventListener('change', function(e) {
    imagePreview.innerHTML = '';
    const files = e.target.files;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = `Preview ${i + 1}`;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-image';
                removeBtn.innerHTML = '×';
                removeBtn.onclick = function() {
                    img.remove();
                    removeBtn.remove();
                };
                
                const container = document.createElement('div');
                container.className = 'image-container';
                container.appendChild(img);
                container.appendChild(removeBtn);
                imagePreview.appendChild(container);
            };
            reader.readAsDataURL(file);
        }
    }
});

// Form Validation and Submission
propertyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const requiredFields = propertyForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    // Validate phone number format
    const phoneInput = document.getElementById('contact-phone');
    const phoneRegex = /^(\+40|0)[2-37][0-9]{8}$/;
    if (!phoneRegex.test(phoneInput.value)) {
        isValid = false;
        phoneInput.classList.add('error');
        alert('Vă rugăm să introduceți un număr de telefon valid.');
    }
    
    // Validate email format
    const emailInput = document.getElementById('contact-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('error');
        alert('Vă rugăm să introduceți o adresă de email validă.');
    }
    
    // Validate price
    const price = parseFloat(document.getElementById('property-price').value);
    if (price <= 0) {
        isValid = false;
        document.getElementById('property-price').classList.add('error');
        alert('Prețul trebuie să fie mai mare decât 0.');
    }
    
    // Validate area
    const areaInput = document.getElementById('property-area');
    if (areaInput.value <= 0) {
        isValid = false;
        areaInput.classList.add('error');
        alert('Suprafața trebuie să fie mai mare decât 0.');
    }
    
    // Validate images
    if (imagePreview.children.length === 0) {
        isValid = false;
        alert('Vă rugăm să încărcați cel puțin o imagine a proprietății.');
    }
    
    // Validate terms acceptance
    const termsCheckbox = document.querySelector('.checkbox-label input[type="checkbox"]');
    if (!termsCheckbox.checked) {
        isValid = false;
        termsCheckbox.classList.add('error');
        alert('Vă rugăm să acceptați termenii și condițiile.');
    }
    
    if (isValid) {
        // Here you would typically send the form data to your backend
        alert('Anunțul a fost postat cu succes! Vă vom contacta în curând pentru verificare.');
        propertyForm.reset();
        imagePreview.innerHTML = '';
        
        // Scroll to top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Premium Features
document.addEventListener('DOMContentLoaded', function() {
    // Listing Type Selector
    const typeButtons = document.querySelectorAll('.type-button');
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Property Filters
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Premium Card Selection
    const premiumCards = document.querySelectorAll('.premium-card');
    premiumCards.forEach(card => {
        card.addEventListener('click', function() {
            premiumCards.forEach(c => c.classList.remove('featured'));
            this.classList.add('featured');
        });
    });

    // Pagination
    const pageButtons = document.querySelectorAll('.page-button');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would typically load the new page content
            // For now, we'll just show a loading state
            const propertiesGrid = document.querySelector('.property-grid');
            if (propertiesGrid) {
                propertiesGrid.style.opacity = '0.5';
                setTimeout(() => {
                    propertiesGrid.style.opacity = '1';
                }, 500);
            }
        });
    });

    // Premium Badge Toggle
    const premiumToggle = document.getElementById('premium-toggle');
    if (premiumToggle) {
        premiumToggle.addEventListener('change', function() {
            const propertyCards = document.querySelectorAll('.property-card');
            propertyCards.forEach(card => {
                if (this.checked) {
                    card.classList.add('premium');
                } else {
                    card.classList.remove('premium');
                }
            });
        });
    }

    // VIP Badge Toggle
    const vipToggle = document.getElementById('vip-toggle');
    if (vipToggle) {
        vipToggle.addEventListener('change', function() {
            const propertyCards = document.querySelectorAll('.property-card');
            propertyCards.forEach(card => {
                if (this.checked) {
                    card.classList.add('vip');
                } else {
                    card.classList.remove('vip');
                }
            });
        });
    }

    // Premium Form Validation
    const premiumForm = document.getElementById('premium-form');
    if (premiumForm) {
        premiumForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const plan = document.querySelector('.premium-card.featured');
            if (!plan) {
                alert('Vă rugăm să selectați un plan premium');
                return;
            }

            const cardNumber = document.getElementById('card-number').value;
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;

            if (!cardNumber || !expiryDate || !cvv) {
                alert('Vă rugăm să completați toate câmpurile cardului');
                return;
            }

            // Here you would typically process the payment
            // For now, we'll just show a success message
            alert('Plată procesată cu succes! Veți primi în curând un email cu confirmarea.');
            premiumForm.reset();
        });
    }

    // Property Filters
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // Here you would typically filter the properties based on the selected values
            // For now, we'll just show a loading state
            const propertiesGrid = document.querySelector('.property-grid');
            if (propertiesGrid) {
                propertiesGrid.style.opacity = '0.5';
                setTimeout(() => {
                    propertiesGrid.style.opacity = '1';
                }, 500);
            }
        });
    });
});

// Authentication Functions
async function registerUser(userData) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Update UI
        updateAuthUI(data.user);
        showMessage('Înregistrare reușită!', 'success');
        return data;
    } catch (error) {
        showMessage(error.message, 'error');
        throw error;
    }
}

async function loginUser(credentials) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Update UI
        updateAuthUI(data.user);
        showMessage('Autentificare reușită!', 'success');
        return data;
    } catch (error) {
        showMessage(error.message, 'error');
        throw error;
    }
}

function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateAuthUI(null);
    showMessage('Deconectare reușită!', 'success');
}

function updateAuthUI(user) {
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');

    if (user) {
        // User is logged in
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        
        // Update user info
        const userName = userMenu.querySelector('.user-name');
        const userEmail = userMenu.querySelector('.user-email');
        if (userName) userName.textContent = user.name;
        if (userEmail) userEmail.textContent = user.email;

        // Update subscription badge
        const subscriptionBadge = userMenu.querySelector('.subscription-badge');
        if (subscriptionBadge) {
            subscriptionBadge.textContent = user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1);
            subscriptionBadge.className = `subscription-badge ${user.subscription}`;
        }
    } else {
        // User is logged out
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}

// Form Handlers
document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const userData = {
        name: this.querySelector('[name="name"]').value,
        email: this.querySelector('[name="email"]').value,
        password: this.querySelector('[name="password"]').value,
        phone: this.querySelector('[name="phone"]').value
    };

    try {
        await registerUser(userData);
        this.reset();
        // Close modal or redirect
        closeModal('register-modal');
    } catch (error) {
        console.error('Registration error:', error);
    }
});

document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const credentials = {
        email: this.querySelector('[name="email"]').value,
        password: this.querySelector('[name="password"]').value
    };

    try {
        await loginUser(credentials);
        this.reset();
        // Close modal or redirect
        closeModal('login-modal');
    } catch (error) {
        console.error('Login error:', error);
    }
});

// Logout handler
document.querySelector('.logout-button').addEventListener('click', function(e) {
    e.preventDefault();
    logoutUser();
});

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        updateAuthUI(user);
    }
});