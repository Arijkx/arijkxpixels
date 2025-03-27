document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button, .inner-container-button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            document.body.classList.add("shake");

            setTimeout(() => {
                document.body.classList.remove("shake");
            }, 500); // 0.5 Sekunden wie in der CSS-Animation
        });
    });
});