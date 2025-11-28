// Footer dynamisch laden
document.addEventListener("DOMContentLoaded", () => {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    
    if (footerPlaceholder) {
        fetch("components/footer.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Footer konnte nicht geladen werden");
                }
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error("Fehler beim Laden des Footers:", error);
            });
    }
});

