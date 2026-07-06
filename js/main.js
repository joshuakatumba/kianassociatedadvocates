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
});
