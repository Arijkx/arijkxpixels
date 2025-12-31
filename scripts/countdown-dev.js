// Countdown bis Juli 2026
function updateCountdown() {
    const countdown1 = document.getElementById('countdown1');
    const countdown2 = document.getElementById('countdown2');
    
    // Prüfen ob Elemente existieren
    if (!countdown1 || !countdown2) {
        return;
    }
    
    const targetDate = new Date('2026-07-01T00:00:00');
    const now = new Date();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        countdown1.textContent = 'Verfügbar!';
        countdown2.textContent = 'Verfügbar!';
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    countdown1.textContent = countdownText;
    countdown2.textContent = countdownText;
}

// Warten bis DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Countdown sofort aktualisieren und dann jede Sekunde
    updateCountdown();
    setInterval(updateCountdown, 1000);
});