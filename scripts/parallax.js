document.addEventListener("DOMContentLoaded", () => {
    const parallaxContainer = document.querySelector(".parallax-container");
    const layers = document.querySelectorAll(".parallax-layer");

    if (!parallaxContainer || layers.length === 0) {
        console.error("Parallax-Container oder -Layer wurden nicht gefunden!");
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
});