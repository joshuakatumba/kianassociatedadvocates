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
        || panel.querySelector('.accordion-content');
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
    initializeExpandedAccordions();
    initializeFormHandlers();
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', initializeSite);
