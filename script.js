// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => { // Ensure DOM is loaded
    const navToggle = document.querySelector('.nav-toggle');
    const header = document.querySelector('header');

    if (navToggle && header) {
        navToggle.addEventListener('click', () => {
            header.classList.toggle('nav-active'); // Toggle the class on the header

            // Optional: Prevent body scroll when mobile menu is open
            if (header.classList.contains('nav-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Optional: Close menu if a navigation link is clicked
        const navLinks = header.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (header.classList.contains('nav-active')) {
                    header.classList.remove('nav-active');
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        });

        // Optional: Close menu if clicking outside the menu (on the overlay)
        // This requires targeting the nav ul itself if it has the background
        const navMenu = header.querySelector('nav ul');
        if (navMenu) {
            navMenu.addEventListener('click', (event) => {
                 // Close only if the click is directly on the ul (the overlay background)
                 // not on a link inside it.
                if (event.target === navMenu && header.classList.contains('nav-active')) {
                     header.classList.remove('nav-active');
                     document.body.style.overflow = ''; // Restore scrolling
                }
            });
        }
    }
});

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

    initializeDarkMode(); // Initialize dark mode
});

// Function to log affiliate link clicks
function logAffiliateClick(platform, product) {
    if (typeof gtag === 'function') {
        gtag('event', 'affiliate_link_click', {
            'event_category': 'Affiliate Links',
            'event_label': `${platform} - ${product}`,
            'value': 1 // Optional: Assign a value if desired
        });
    } else {
        console.log('gtag not defined, skipping affiliate click log for:', platform, product);
    }
}

// Back to Top Button Logic
// Get the button
let mybutton = document.getElementById("back-to-top");

// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    if (mybutton) { // Check if button exists before trying to style it
        mybutton.style.display = "block";
        mybutton.style.opacity = "1";
        mybutton.style.visibility = "visible";
    }
  } else {
    if (mybutton) {
        // Start fade out
        mybutton.style.opacity = "0";
        // Use timeout to set display none after fade out transition completes
        setTimeout(() => {
            if (mybutton.style.opacity === "0") { // Double check opacity hasn't changed
                 mybutton.style.visibility = "hidden";
                 mybutton.style.display = "none";
            }
        }, 500); // Match the transition duration in CSS
    }
  }
}

// When the user clicks on the button, scroll to the top of the document smoothly
function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add event listener if the button exists
if (mybutton) {
    mybutton.addEventListener("click", topFunction);
} 

// Dynamically update copyright year
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Dark Mode Toggle Logic
// Function to apply the theme (dark/light)
function applyTheme(isDark) {
    document.body.classList.toggle('light-mode', !isDark);
    const toggleBtn = document.getElementById('dark-mode-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = isDark ? '🌙' : '☀️';
        toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
}

// Function to initialize and handle dark mode
function initializeDarkMode() {
    const toggleBtn = document.getElementById('dark-mode-toggle');

    // Get preference from localStorage, default to dark (true)
    let isDarkModePreferred = localStorage.getItem('darkMode') !== 'false'; // Default to true if 'darkMode' is null or 'true'

    // Apply the theme as soon as the body is available or DOM is loaded
    applyTheme(isDarkModePreferred);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            // Check current state by looking at the class on the body
            const currentlyDark = !document.body.classList.contains('light-mode');
            const newModeIsDark = !currentlyDark; // Toggle the mode

            applyTheme(newModeIsDark);
            localStorage.setItem('darkMode', String(newModeIsDark));
        });
    }
}

/* ============================ */
/* Inspiration Music Player     */
/* ============================ */

document.addEventListener('DOMContentLoaded', () => {
    const inspireButton = document.getElementById('inspire-music-button');
    const inspireAudio = document.getElementById('inspiration-audio');

    if (inspireButton && inspireAudio) {
        inspireAudio.preload = 'metadata';

        // Check localStorage to resume playback
        const savedTime = localStorage.getItem('rigRaterMusicTime');
        const wasPlaying = localStorage.getItem('rigRaterMusicPlaying') === 'true';

        if (wasPlaying && savedTime !== null) {
            inspireAudio.currentTime = parseFloat(savedTime);
            inspireAudio.play().then(() => {
                inspireButton.textContent = 'Inspiration Mode';
                inspireButton.setAttribute('aria-label', 'Pause Inspiration Mode Music');
            }).catch(error => {
                console.error("Audio play failed on load:", error);
                // Clear stored state if play fails to prevent issues
                localStorage.removeItem('rigRaterMusicTime');
                localStorage.removeItem('rigRaterMusicPlaying');
            });
        }

        inspireButton.addEventListener('click', () => {
            if (inspireAudio.paused) {
                inspireAudio.play().then(() => {
                    inspireButton.textContent = 'Inspiration Mode';
                    inspireButton.setAttribute('aria-label', 'Pause Inspiration Mode Music');
                    localStorage.setItem('rigRaterMusicPlaying', 'true'); // Explicitly set playing state
                }).catch(error => {
                    console.error("Audio play failed on click:", error);
                    inspireButton.textContent = 'Inspiration Mode';
                    inspireButton.setAttribute('aria-label', 'Activate Inspiration Mode Music');
                    localStorage.setItem('rigRaterMusicPlaying', 'false');
                });
            } else {
                inspireAudio.pause();
                inspireButton.textContent = 'Inspiration Mode';
                inspireButton.setAttribute('aria-label', 'Activate Inspiration Mode Music');
                localStorage.setItem('rigRaterMusicPlaying', 'false');
            }

            if (window.gtag) {
                gtag('event', 'inspiration_mode_click', {
                    'event_category': 'engagement',
                    'event_label': 'Inspiration Mode Button'
                });
            }
        });

        inspireAudio.addEventListener('ended', () => {
            inspireButton.textContent = 'Be inspired, push this button';
            inspireButton.setAttribute('aria-label', 'Play inspirational music');
            localStorage.setItem('rigRaterMusicPlaying', 'false');
            localStorage.removeItem('rigRaterMusicTime'); // Clear time when ended
        });

        // Save state when audio is paused or played
        inspireAudio.addEventListener('pause', () => {
            if (!inspireAudio.ended) { // Don't save time if it's because the audio ended
                localStorage.setItem('rigRaterMusicTime', inspireAudio.currentTime.toString());
            }
            // If paused by user, the click handler above already sets rigRaterMusicPlaying to false.
            // If paused due to page unload, beforeunload will handle it.
        });

        inspireAudio.addEventListener('play', () => {
            localStorage.setItem('rigRaterMusicPlaying', 'true');
        });
        inspireAudio.addEventListener('playing', () => { // Fired after play starts or resumes
            localStorage.setItem('rigRaterMusicPlaying', 'true');
        });

    }
});

// Save music state before the page unloads
window.addEventListener('beforeunload', () => {
    const inspireAudio = document.getElementById('inspiration-audio');
    if (inspireAudio && !inspireAudio.paused) {
        localStorage.setItem('rigRaterMusicTime', inspireAudio.currentTime.toString());
        localStorage.setItem('rigRaterMusicPlaying', 'true');
    } else if (inspireAudio && inspireAudio.paused) {
        // If it's paused but there's a time, keep the time, but mark as not playing unless ended
        if (localStorage.getItem('rigRaterMusicPlaying') !== 'false' && !inspireAudio.ended) {
             // This case might be redundant if click/ended handlers are robust
        }
        // If explicitly paused by user, 'rigRaterMusicPlaying' is already 'false'.
        // If it ended, 'rigRaterMusicPlaying' is 'false' and time is cleared.
        // If it was never played or played and then paused, the state should reflect that.
        // The primary goal of beforeunload is to catch playing audio.
    }
});

// Function to initialize Swiper carousels 

/* ============================ */
/* Share Bar Functionality      */
/* ============================ */
document.addEventListener('DOMContentLoaded', function() {
    var copyBtns = document.querySelectorAll('.copy-link-btn');
    copyBtns.forEach(function(copyBtn) {
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                // Find the tooltip next to this button
                var tooltip = copyBtn.parentElement.querySelector('.copy-tooltip');
                if (tooltip) {
                    tooltip.textContent = 'Link copied!';
                    tooltip.classList.add('show-tooltip');
                    setTimeout(() => {
                        tooltip.classList.remove('show-tooltip');
                    }, 1200);
                }
            });
        });
    });
});

// Share Bar: Dynamic Twitter Message
// This will update the Twitter share link with a cool message
// Homepage: general message, other pages: use page title

document.addEventListener('DOMContentLoaded', function() {
    var twitterBtn = document.querySelector('.share-bar-horizontal a[aria-label*="Twitter"]');
    if (twitterBtn) {
        var pageTitle = document.title;
        var pageUrl = window.location.href;
        var isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
        var message = isHome
            ? "Check out the best PC hardware reviews and guides at Rig Rater! 🚀"
            : `Read my review: ${pageTitle} on Rig Rater! 🔥`;
        var shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(pageUrl)}`;
        twitterBtn.setAttribute('href', shareUrl);
    }
}); 