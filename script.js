// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            console.log('Form submission:', { name, email, message });
            
            // Show success message
            alert('Message sent! Thank you for contacting us.');
            
            // Clear the form
            contactForm.reset();
        });
    }
    
    // Affiliate link tracking
    const trackAffiliateClick = function(event) {
        const link = event.currentTarget;
        const productName = link.closest('.card, .product-card')?.querySelector('h3')?.textContent || 'Unknown Product';
        const destination = link.getAttribute('href');
        
        // In a real application, you would send this data to your analytics service
        console.log('Affiliate link clicked:', {
            productName,
            destination,
            timestamp: new Date().toISOString()
        });
    };
    
    // Add click event listeners to all buy buttons
    const affiliateLinks = document.querySelectorAll('.buy-button');
    affiliateLinks.forEach(function(link) {
        link.addEventListener('click', trackAffiliateClick);
    });
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add subtle animation to cards on page load
    const animateCards = function() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    };
    
    // Initialize card animations if cards exist
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        // Set initial styles for animation
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease';
        });
        
        // Start animation after a small delay
        setTimeout(animateCards, 200);

        // Add click listener to make entire card link to 'Read More' URL
        cards.forEach(card => {
            card.addEventListener('click', function(event) {
                // Prevent triggering navigation if the click is on an existing link within the card
                if (event.target.closest('a')) {
                    return;
                }

                const readMoreLink = card.querySelector('a.read-more');
                if (readMoreLink && readMoreLink.href) {
                    // Check if the link is internal or external
                    if (readMoreLink.hostname === window.location.hostname || !readMoreLink.hostname) {
                        // Internal link: navigate in the current tab
                        window.location.href = readMoreLink.href;
                    } else {
                        // External link: open in a new tab (though read-more links should be internal)
                        window.open(readMoreLink.href, '_blank', 'noopener,noreferrer');
                    }
                }
            });
        });
    }
}); 