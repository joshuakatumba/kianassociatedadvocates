/**
 * ==========================================================================
 * KIAN ASSOCIATED ADVOCATES — MAIN JAVASCRIPT FILE
 * Refactored modular JavaScript handling site navigation, accordions, and icons.
 * Organized strictly into 9 functional blocks.
 * ==========================================================================
 */


/* ==========================
   DOM Element Selection
   ========================== */

/** @type {NodeListOf<Element>} Homepage services section accordion panels */
const serviceAccordionPanels = document.querySelectorAll('.service-accordion__panel, .accordion-item');

/** @type {HTMLElement|null} Mobile navigation menu overlay container */
const mobileNavOverlay = document.getElementById('mobile-nav-overlay') || document.getElementById('mobile-menu');

/** @type {HTMLElement|null} Button trigger that opens the mobile menu overlay */
const mobileNavToggle = document.getElementById('mobile-nav-toggle') || document.getElementById('mobile-menu-btn');

/** @type {HTMLElement|null} Button trigger that closes the mobile menu overlay */
const mobileNavClose = document.getElementById('mobile-nav-close') || document.getElementById('mobile-menu-close');

/** @type {NodeListOf<Element>} Mobile navigation accordion panels */
const mobileNavAccordionPanels = document.querySelectorAll('.mobile-nav-accordion__panel, .mobile-accordion-item');


/* ==========================
   Configuration Variables
   ========================== */

/** CSS class name representing an expanded accordion panel */
const EXPANDED_PANEL_CLASS = 'is-expanded';

/** Legacy CSS class name for active accordion panel compatibility */
const LEGACY_ACTIVE_CLASS = 'active';

/** Tailwind CSS class controlling off-screen translation of mobile menu overlay */
const MOBILE_NAV_HIDDEN_CLASS = 'translate-x-full';


/* ==========================
   Utility Functions
   ========================== */

/**
 * Checks whether the Lucide vector icon rendering library is available.
 * @returns {boolean} True if Lucide is defined globally.
 */
function isLucideAvailable() {
    return typeof lucide !== 'undefined';
}

/**
 * Re-initializes Lucide SVG vector icons in the DOM.
 */
function refreshLucideIcons() {
    if (isLucideAvailable()) {
        lucide.createIcons();
    }
}

/**
 * Sets max-height on an accordion container to enable smooth CSS height transitions.
 * @param {Element|null} bodyElement - Target container element.
 * @param {number|null} height - Content pixel height, or null to collapse.
 */
function setAccordionBodyHeight(bodyElement, height) {
    if (!bodyElement) return;
    bodyElement.style.maxHeight = height !== null ? `${height}px` : null;
}

/**
 * Retrieves the collapsible body container within an accordion panel.
 * @param {Element} panel - Accordion panel element.
 * @returns {Element|null} Collapsible body element.
 */
function getAccordionBody(panel) {
    return panel.querySelector('.service-accordion__body')
        || panel.querySelector('.accordion-content')
        || panel.querySelector('.mobile-nav-accordion__body');
}

/**
 * Retrieves the chevron indicator icon within a mobile accordion panel.
 * @param {Element} panel - Mobile accordion panel element.
 * @returns {HTMLElement|null} Chevron icon element.
 */
function getMobileAccordionIcon(panel) {
    return panel.querySelector('.mobile-nav-accordion__icon')
        || panel.querySelector('i[data-lucide="chevron-down"]');
}

/**
 * Checks whether an accordion panel is currently in an expanded state.
 * @param {Element} panel - Accordion panel element.
 * @returns {boolean} True if expanded.
 */
function isPanelExpanded(panel) {
    return panel.classList.contains(EXPANDED_PANEL_CLASS)
        || panel.classList.contains(LEGACY_ACTIVE_CLASS);
}

/**
 * Collapses all accordion panels in a provided collection.
 * @param {NodeListOf<Element>} panels - List of accordion panels to collapse.
 */
function collapseAllPanels(panels) {
    panels.forEach((panel) => {
        panel.classList.remove(EXPANDED_PANEL_CLASS, LEGACY_ACTIVE_CLASS);
        setAccordionBodyHeight(getAccordionBody(panel), null);

        const mobileIcon = getMobileAccordionIcon(panel);
        if (mobileIcon) {
            mobileIcon.style.transform = 'rotate(0deg)';
        }
    });
}


/* ==========================
   Event Listeners
   ========================== */

/**
 * Registers click handlers for services section accordion panels.
 */
function bindServiceAccordionListeners() {
    serviceAccordionPanels.forEach((panel) => {
        const trigger = panel.querySelector('.service-accordion__trigger')
            || panel.querySelector('.accordion-btn');

        if (trigger) {
            trigger.addEventListener('click', () => toggleServiceAccordion(panel));
        }
    });
}

/**
 * Registers click handlers for opening and closing the mobile menu overlay.
 */
function bindMobileNavListeners() {
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', openMobileNav);
    }
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileNav);
    }
}

/**
 * Registers click handlers for mobile navigation accordion panels.
 */
function bindMobileNavAccordionListeners() {
    mobileNavAccordionPanels.forEach((panel) => {
        const trigger = panel.querySelector('.mobile-nav-accordion__trigger')
            || panel.querySelector('.mobile-accordion-btn');

        if (trigger) {
            trigger.addEventListener('click', () => toggleMobileNavAccordion(panel));
        }
    });
}


/* ==========================
   Navigation Functions
   ========================== */

/**
 * Opens the mobile navigation menu overlay and disables body scrolling.
 */
function openMobileNav() {
    if (!mobileNavOverlay) return;
    mobileNavOverlay.classList.add('is-open', 'mobile-nav-overlay--open');
    mobileNavOverlay.setAttribute('aria-hidden', 'false');
    if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the mobile navigation menu overlay and restores body scrolling.
 */
function closeMobileNav() {
    if (!mobileNavOverlay) return;
    mobileNavOverlay.classList.remove('is-open', 'mobile-nav-overlay--open');
    mobileNavOverlay.setAttribute('aria-hidden', 'true');
    if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
}


/* ==========================
   UI Functions
   ========================== */

/**
 * Expands a target accordion panel and sets its container height to its full scroll height.
 * @param {Element} panel - Accordion panel to expand.
 */
function expandAccordionPanel(panel) {
    panel.classList.add(EXPANDED_PANEL_CLASS, LEGACY_ACTIVE_CLASS);
    const body = getAccordionBody(panel);
    if (body) {
        setAccordionBodyHeight(body, body.scrollHeight);
    }
}

/**
 * Toggles a services section accordion panel (collapses others to allow only one open panel).
 * @param {Element} clickedPanel - Clicked services accordion panel.
 */
function toggleServiceAccordion(clickedPanel) {
    const wasExpanded = isPanelExpanded(clickedPanel);
    collapseAllPanels(serviceAccordionPanels);

    if (!wasExpanded) {
        expandAccordionPanel(clickedPanel);
    }
}

/**
 * Toggles a mobile navigation accordion panel (collapses others to allow only one open panel).
 * @param {Element} clickedPanel - Clicked mobile accordion panel.
 */
function toggleMobileNavAccordion(clickedPanel) {
    const wasExpanded = isPanelExpanded(clickedPanel);
    collapseAllPanels(mobileNavAccordionPanels);

    if (!wasExpanded) {
        clickedPanel.classList.add(EXPANDED_PANEL_CLASS, LEGACY_ACTIVE_CLASS);
        const body = clickedPanel.querySelector('.mobile-nav-accordion__body')
            || clickedPanel.querySelector('.mobile-accordion-content');
        const icon = getMobileAccordionIcon(clickedPanel);

        if (body) {
            setAccordionBodyHeight(body, body.scrollHeight);
        }
        if (icon) {
            icon.style.transform = 'rotate(180deg)';
        }
    }
}


/* ==========================
   Form Functions
   ========================== */

/**
 * Initializes form validation and dynamic behavior across the application.
 */
function initializeFormHandlers() {
    // Form handling logic for contact and appointment forms can be attached here.
}


/* ==========================
   Animation Functions
   ========================== */

/**
 * Smooth transition animation helper.
 * Container max-height animations are handled via CSS transition properties.
 */


/* ==========================
   Sector Tab Functions
   ========================== */

function bindSectorTabListeners() {
    const tabBtns = document.querySelectorAll('.sector-tab-btn');
    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');

            // Get target pane ID
            const targetId = btn.getAttribute('data-target');

            // Hide all panes
            document.querySelectorAll('.sector-tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });

            // Show target pane
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

/* ==========================
   Initialization
   ========================== */

/**
 * Restores initial accordion state for panels pre-configured as expanded in HTML.
 */
function initializeExpandedAccordions() {
    serviceAccordionPanels.forEach((panel) => {
        if (isPanelExpanded(panel)) {
            expandAccordionPanel(panel);
        }
    });
}

/**
 * Bootstraps all dynamic interactive features after the DOM is fully loaded.
 */
function initializeSite() {
    refreshLucideIcons();
    bindServiceAccordionListeners();
    bindMobileNavListeners();
    bindMobileNavAccordionListeners();
    if (typeof bindSectorTabListeners === 'function') {
        bindSectorTabListeners();
    }
    initializeExpandedAccordions();
    initializeFormHandlers();
    bindContactForm();
    initializeCookieBanner();
    initializeFlatpickr();
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', initializeSite);

/* ==========================
   Toast Notification System
   ========================== */

/**
 * Shows a premium slide-in toast notification.
 * @param {'success'|'error'} type - Toast type (controls color/icon).
 * @param {string} title - Bold heading text.
 * @param {string} message - Secondary description text.
 */
function showToast(type, title, message) {
    // Remove any existing toasts
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const icons = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
    };

    const toast = document.createElement('div');
    toast.className = `toast-notification toast--${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="toast-notification__icon">${icons[type]}</div>
        <div class="toast-notification__content">
            <div class="toast-notification__title">${title}</div>
            <div class="toast-notification__message">${message}</div>
        </div>
        <button type="button" class="toast-notification__close" aria-label="Dismiss notification">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="toast-notification__progress">
            <div class="toast-notification__progress-bar"></div>
        </div>
    `;

    document.body.appendChild(toast);

    // Trigger slide-in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add('toast--visible');
        });
    });

    // Auto-dismiss after 5s
    const autoDismiss = setTimeout(() => dismissToast(toast), 5000);

    // Manual close
    toast.querySelector('.toast-notification__close').addEventListener('click', () => {
        clearTimeout(autoDismiss);
        dismissToast(toast);
    });
}

/**
 * Dismisses a toast notification with a slide-out animation.
 * @param {HTMLElement} toast - The toast element to dismiss.
 */
function dismissToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    // Fallback removal
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 600);
}


/* ==========================
   EmailJS Form Handling
   ========================== */

function bindContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init("F0fdWC6WNW1TkrSA1");
        }

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnLabel = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('svg');
            const originalText = btnLabel ? btnLabel.innerText : submitBtn.innerText;

            // Set loading state
            if (btnLabel) btnLabel.innerText = 'Sending...';
            if (btnIcon) btnIcon.style.display = 'none';
            submitBtn.disabled = true;

            // Send the form using the provided Service ID and Template ID
            emailjs.sendForm('service_wnh7o0q', 'template_gwuni8g', this)
                .then(() => {
                    showToast(
                        'success',
                        'Message Sent Successfully!',
                        'Thank you for reaching out. Our team will get back to you within 24 hours.'
                    );
                    contactForm.reset();
                    if (btnLabel) btnLabel.innerText = originalText;
                    if (btnIcon) btnIcon.style.display = '';
                    submitBtn.disabled = false;
                }, (error) => {
                    showToast(
                        'error',
                        'Message Failed to Send',
                        'Something went wrong. Please try again later or contact us directly by phone.'
                    );
                    if (btnLabel) btnLabel.innerText = originalText;
                    if (btnIcon) btnIcon.style.display = '';
                    submitBtn.disabled = false;
                });
        });
    }
}


/* ==========================
   Flatpickr Initialization
   ========================== */

function initializeFlatpickr() {
    if (typeof flatpickr !== 'undefined') {
        const dateInput = document.querySelector('.flatpickr-date');
        const timeInput = document.querySelector('.flatpickr-time');
        
        if (dateInput) {
            flatpickr(dateInput, {
                dateFormat: "m/d/Y",
                minDate: "today"
            });
        }
        
        if (timeInput) {
            flatpickr(timeInput, {
                enableTime: true,
                noCalendar: true,
                dateFormat: "h:i K"
            });
        }
    }
}

/* ==========================
   Cookie Banner Handling
   ========================== */

function initializeCookieBanner() {
    const cookieConsent = localStorage.getItem('kian_cookie_consent');
    if (cookieConsent) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-banner__content">
            <div class="cookie-banner__text">
                <p>We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.</p>
            </div>
            <div class="cookie-banner__actions">
                <button class="cookie-banner__btn cookie-banner__btn--decline" id="cookie-decline">Decline</button>
                <button class="cookie-banner__btn cookie-banner__btn--accept" id="cookie-accept">Accept</button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', () => {
        localStorage.setItem('kian_cookie_consent', 'accepted');
        banner.classList.add('cookie-banner--hiding');
        setTimeout(() => banner.remove(), 300);
    });

    document.getElementById('cookie-decline').addEventListener('click', () => {
        localStorage.setItem('kian_cookie_consent', 'declined');
        banner.classList.add('cookie-banner--hiding');
        setTimeout(() => banner.remove(), 300);
    });
}
