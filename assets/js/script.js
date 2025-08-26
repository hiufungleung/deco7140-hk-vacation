/**
 * HK Vacation - Modernized JavaScript
 * Enhanced with modern ES6+ features and improved structure
 */

class HKVacationApp {
    constructor() {
        this.currentLocation = window.location.pathname;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('js');
            
            this.loadComponents();
            this.setupFaviconHandler();
        });
    }

    /**
     * Load header and footer components
     */
    async loadComponents() {
        try {
            await Promise.all([
                this.loadComponent('headerpage.html', '.header-container'),
                this.loadComponent('footerpage.html', '.footer-container')
            ]);
            
            // Initialize components after loading
            this.initHeader();
            this.initFooter();
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }

    /**
     * Generic component loader
     */
    async loadComponent(url, selector) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            
            const html = await response.text();
            const container = document.querySelector(selector);
            if (container) {
                container.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component ${url}:`, error);
        }
    }

    /**
     * Setup favicon handling for dark mode
     */
    setupFaviconHandler() {
        if (!window.matchMedia) return;
        
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        colorSchemeQuery.addEventListener('change', () => this.updateFavicon());
        this.updateFavicon();
    }

    /**
     * Update favicon based on color scheme
     */
    updateFavicon() {
        const isDarkMode = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
        const favicon = document.querySelector('.favicon');
        const faviconDark = document.querySelector('.favicon-dark');
        
        if (!favicon || !faviconDark) return;
        
        if (isDarkMode) {
            favicon.setAttribute('disabled', 'disabled');
            faviconDark.removeAttribute('disabled');
        } else {
            favicon.removeAttribute('disabled');
            faviconDark.setAttribute('disabled', 'disabled');
        }
    }

    /**
     * Initialize header functionality
     */
    initHeader() {
        this.setupMobileMenu();
        this.setupNavigation();
        this.setupDestinationsDropdown();
    }

    /**
     * Setup mobile menu functionality
     */
    setupMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuButton = document.querySelector('.mobile-nav__toggle');
        const menuCover = document.querySelector('.menu-cover');
        
        if (!mobileMenu || !menuButton || !menuCover) return;
        
        // Menu button click handler
        menuButton.addEventListener('click', () => {
            this.toggleMobileMenu(mobileMenu, menuCover, menuButton);
        });
        
        // Menu cover click handler
        menuCover.addEventListener('click', () => {
            this.closeMobileMenu(mobileMenu, menuCover, menuButton);
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                this.closeMobileMenu(mobileMenu, menuCover, menuButton);
            }
        });
        
        // Close menu when switching to desktop view
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                this.closeMobileMenu(mobileMenu, menuCover, menuButton);
            }
        });
    }

    /**
     * Toggle mobile menu state
     */
    toggleMobileMenu(mobileMenu, menuCover, menuButton) {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu(mobileMenu, menuCover, menuButton);
        } else {
            this.openMobileMenu(mobileMenu, menuCover, menuButton);
        }
    }

    /**
     * Open mobile menu
     */
    openMobileMenu(mobileMenu, menuCover, menuButton) {
        mobileMenu.classList.add('active');
        menuCover.classList.add('active');
        menuButton.setAttribute('data-toggle', 'open');
        menuButton.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu(mobileMenu, menuCover, menuButton) {
        mobileMenu.classList.remove('active');
        menuCover.classList.remove('active');
        menuButton.setAttribute('data-toggle', 'closed');
        menuButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scrolling
    }

    /**
     * Setup navigation highlighting
     */
    setupNavigation() {
        const navigationMap = {
            '/attraction.html': ['.nav-destinations', '.mobile-destinations'],
            '/outdoors.html': ['.nav-destinations', '.mobile-destinations'],
            '/culture.html': ['.nav-destinations', '.mobile-destinations'],
            '/arts.html': ['.nav-destinations', '.mobile-destinations'],
            '/dining.html': ['.nav-dining', '.mobile-dining'],
            '/shopping.html': ['.nav-shopping', '.mobile-shopping'],
            '/transport.html': ['.nav-transport', '.mobile-transport'],
            '/accommodation.html': ['.nav-accommodation', '.mobile-accommodation'],
            '/about-us.html': ['.nav-about-us', '.mobile-about-us']
        };

        const activeSelectors = navigationMap[this.currentLocation];
        if (!activeSelectors) return;

        activeSelectors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.classList.add('active');
            }
        });
    }

    /**
     * Setup destinations dropdown functionality
     */
    setupDestinationsDropdown() {
        const destinationsButton = document.querySelector('.mobile-destinations');
        const destinationsList = document.querySelector('.mobile-dropdown');
        
        if (!destinationsButton || !destinationsList) return;
        
        destinationsButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleDestinationsDropdown(destinationsButton, destinationsList);
        });
    }

    /**
     * Toggle destinations dropdown
     */
    toggleDestinationsDropdown(button, dropdown) {
        const isActive = dropdown.classList.contains('active');
        const textElement = button.querySelector('p');
        
        if (isActive) {
            dropdown.classList.remove('active');
            if (textElement) {
                textElement.innerHTML = '&nbsp;&nbsp;Destinations &#x25BE;';
            }
        } else {
            dropdown.classList.add('active');
            if (textElement) {
                textElement.innerHTML = '&nbsp;&nbsp;Destinations &#x25B4;';
            }
        }
    }

    /**
     * Initialize footer functionality
     */
    initFooter() {
        this.setupIconHovers();
        this.setupEmailValidation();
    }

    /**
     * Setup icon hover effects
     */
    setupIconHovers() {
        // Check if we're on mobile to skip hover effects
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        if (mediaQuery.matches) return;
        
        const icons = document.querySelectorAll('.explore-icon, .icon');
        
        icons.forEach(icon => {
            const originalSrc = icon.src;
            const hoverSrc = icon.dataset.hoverSrc;
            
            if (!hoverSrc) return;
            
            icon.addEventListener('mouseenter', () => {
                icon.src = hoverSrc;
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.src = originalSrc;
            });
        });
    }

    /**
     * Setup email validation functionality
     */
    setupEmailValidation() {
        const emailInput = document.querySelector('.email-input');
        const goButton = document.querySelector('.go-button');
        
        if (!emailInput || !goButton) return;
        
        goButton.addEventListener('click', () => {
            this.handleEmailSubmission(emailInput);
        });
        
        emailInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleEmailSubmission(emailInput);
            }
        });
    }

    /**
     * Handle email submission
     */
    handleEmailSubmission(emailInput) {
        const email = emailInput.value.trim();
        
        if (!email) {
            this.showSubscribeModal('.empty-warning');
        } else if (this.isValidEmail(email)) {
            this.showSubscribeModal('.valid-subscribed');
        } else {
            this.showSubscribeModal('.invalid-warning');
        }
        
        emailInput.value = '';
    }

    /**
     * Validate email address
     */
    isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    /**
     * Show subscribe modal
     */
    showSubscribeModal(selector) {
        const modal = document.querySelector(selector);
        if (!modal) return;
        
        modal.classList.add('active');
        
        // Auto-hide after 2 seconds
        setTimeout(() => {
            modal.classList.remove('active');
        }, 2000);
        
        // Close on click
        modal.addEventListener('click', () => {
            modal.classList.remove('active');
        }, { once: true });
    }
}

// Initialize the application
const app = new HKVacationApp();