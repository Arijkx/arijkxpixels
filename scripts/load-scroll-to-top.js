// Scroll to Top Button dynamisch laden
document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopPlaceholder = document.getElementById("scroll-to-top-placeholder");
    
    if (scrollToTopPlaceholder) {
        fetch("components/scroll-to-top.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Scroll to Top Button konnte nicht geladen werden");
                }
                return response.text();
            })
            .then(html => {
                scrollToTopPlaceholder.innerHTML = html;
                
                // Initialize scroll to top button functionality after loading
                const scrollToTopButton = document.getElementById('scroll-to-top');
                
                if (scrollToTopButton) {
                    // Show/hide button based on scroll position
                    const checkScroll = () => {
                        if (window.pageYOffset > 300) {
                            scrollToTopButton.classList.add('show');
                        } else {
                            scrollToTopButton.classList.remove('show');
                        }
                    };
                    
                    // Check on scroll
                    window.addEventListener('scroll', checkScroll);
                    
                    // Initial check
                    checkScroll();
                    
                    // Scroll to top when button is clicked
                    scrollToTopButton.addEventListener('click', () => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    });
                }
            })
            .catch(error => {
                console.error("Fehler beim Laden des Scroll to Top Buttons:", error);
            });
    }
});

