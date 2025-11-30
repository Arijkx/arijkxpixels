// Disclaimer für erstes Besuch
document.addEventListener("DOMContentLoaded", () => {
    const disclaimer = document.getElementById('disclaimer');
    const closeButton = document.getElementById('disclaimer-close');
    
    if (!disclaimer) return;
    
    // Bestimme den localStorage Key basierend auf der Seite
    let storageKey = 'disclaimerShown';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'quests.html') {
        storageKey = 'questsDisclaimerShown';
    } else if (currentPage === 'rewards.html') {
        storageKey = 'rewardsDisclaimerShown';
    }
    // Für index.html bleibt es 'disclaimerShown'
    
    // Prüfe ob Disclaimer bereits angezeigt wurde
    const disclaimerShown = localStorage.getItem(storageKey);
    
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
            // Markiere als angezeigt mit dem spezifischen Key
            localStorage.setItem(storageKey, 'true');
        });
    }
});

