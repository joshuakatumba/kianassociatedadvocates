document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Accordion functionality for Services section (e.g. on Homepage)
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const btn = item.querySelector('.accordion-btn');
            if (btn) {
                btn.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Close all items
                    accordionItems.forEach(i => {
                        i.classList.remove('active');
                        const content = i.querySelector('.accordion-content');
                        if (content) {
                            content.style.maxHeight = null;
                        }
                    });

                    // Open clicked item if it wasn't already active
                    if (!isActive) {
                        item.classList.add('active');
                        const content = item.querySelector('.accordion-content');
                        if (content) {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        }
                    }
                });
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenuClose && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    }

    // Mobile Menu Accordions
    const mobileAccordionItems = document.querySelectorAll('.mobile-accordion-item');
    if (mobileAccordionItems.length > 0) {
        mobileAccordionItems.forEach(item => {
            const btn = item.querySelector('.mobile-accordion-btn');
            if (btn) {
                btn.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close others
                    mobileAccordionItems.forEach(i => {
                        i.classList.remove('active');
                        const content = i.querySelector('.mobile-accordion-content');
                        const icon = i.querySelector('i[data-lucide="chevron-down"]');
                        if (content) content.style.maxHeight = null;
                        if (icon) icon.style.transform = 'rotate(0deg)';
                    });

                    // Open clicked if not already active
                    if (!isActive) {
                        item.classList.add('active');
                        const content = item.querySelector('.mobile-accordion-content');
                        const icon = item.querySelector('i[data-lucide="chevron-down"]');
                        if (content) content.style.maxHeight = content.scrollHeight + 'px';
                        if (icon) icon.style.transform = 'rotate(180deg)';
                    }
                });
            }
        });
    }
});
