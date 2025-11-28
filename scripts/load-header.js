// Header dynamisch laden und Parallax initialisieren
document.addEventListener("DOMContentLoaded", () => {
    const headerPlaceholder = document.getElementById("header-placeholder");
    
    if (headerPlaceholder) {
        fetch("components/header.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Header konnte nicht geladen werden");
                }
                return response.text();
            })
            .then(html => {
                headerPlaceholder.innerHTML = html;
                // Parallax-Effekt nach dem Laden des Headers initialisieren
                // Verwende initParallax aus parallax.js
                if (typeof initParallax === 'function') {
                    initParallax();
                }
            })
            .catch(error => {
                console.error("Fehler beim Laden des Headers:", error);
            });
    }
});

