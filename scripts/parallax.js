// Parallax-Effekt initialisieren (wird von load-header.js aufgerufen, oder als Fallback)
function initParallax() {
    const parallaxContainer = document.querySelector(".parallax-container");
    const layers = document.querySelectorAll(".parallax-layer");

    if (!parallaxContainer || layers.length === 0) {
        console.warn("Parallax-Container oder -Layer wurden nicht gefunden!");
        return;
    }

    // Bewegung im Bereich des Parallax-Headers
    parallaxContainer.addEventListener("mousemove", (event) => {
        const rect = parallaxContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const mouseX = event.clientX;

        layers.forEach((layer) => {
            const depth = parseFloat(layer.dataset.depth);
            const offsetX = ((mouseX - centerX) * depth);
            layer.style.transform = `translateX(${offsetX}px)`;
        });
    });

    // Langsame Rückkehr zum Ursprung, wenn die Maus den Bereich verlässt
    parallaxContainer.addEventListener("mouseleave", () => {
        layers.forEach((layer) => {
            layer.style.transform = "translateX(0px)";
        });
    });
}

// Fallback: Initialisierung beim DOMContentLoaded, falls Header nicht dynamisch geladen wird
document.addEventListener("DOMContentLoaded", () => {
    // Warte kurz, damit load-header.js zuerst versuchen kann
    setTimeout(() => {
        const headerPlaceholder = document.getElementById("header-placeholder");
        // Nur initialisieren, wenn kein Header-Platzhalter vorhanden ist (alte Seiten ohne Header-Komponente)
        if (!headerPlaceholder) {
            initParallax();
        }
    }, 100);
});