// Disclaimer für erstes Besuch
document.addEventListener("DOMContentLoaded", () => {
    const disclaimer = document.getElementById('disclaimer');
    const closeButton = document.getElementById('disclaimer-close');
    
    // Prüfe ob Disclaimer bereits angezeigt wurde
    const disclaimerShown = localStorage.getItem('disclaimerShown');
    
    if (!disclaimerShown) {
        // Zeige Disclaimer nach kurzer Verzögerung
        setTimeout(() => {
            disclaimer.classList.remove('hidden');
            // Trigger reflow für Animation
            void disclaimer.offsetWidth;
            disclaimer.classList.add('show');
        }, 500);
    }
    
    // Schließen-Button Event
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            disclaimer.classList.remove('show');
            setTimeout(() => {
                disclaimer.classList.add('hidden');
            }, 500);
            // Markiere als angezeigt
            localStorage.setItem('disclaimerShown', 'true');
        });
    }
});

