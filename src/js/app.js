const button = document.getElementById("dark-mode-button");
let darkModeActive = false;

function darkMode() {
    var element = document.body;
    darkModeActive = !darkModeActive;

    if (darkModeActive) {
        element.classList.add("dark-mode");
        anime({
            targets: '.morph .mode',
            d: [{ value: 'M20.5 30.8647C20.4253 47.9854 35 61.9997 30.8647 61.9997C13.7441 61.9249 -0.0744019 47.9854 0.000301466 30.8647C0.0750049 13.7441 14.0146 -0.0744019 31.1352 0.000301466C35 0.000301466 20.5747 13.7441 20.5 30.8647Z' }],
            easing: 'easeOutQuad',
            fill: '#FFD87B',
            duration: 700,
        });
    } else {
        element.classList.remove("dark-mode");
        anime({
            targets: '.morph .mode',
            d: [{ value: 'M62.1344 31.2703C62.0597 48.3909 48.1201 62.2094 30.9995 62.1347C13.8788 62.06 0.0603637 48.1204 0.135067 30.9997C0.20977 13.8791 14.1494 0.0606078 31.27 0.135311C48.3907 0.210015 62.2091 14.1496 62.1344 31.2703Z' }],
            easing: 'easeOutQuad',
            fill: '#FDB813',
            duration: 700,
        });
    }
}

button.removeEventListener("click", darkMode);
button.addEventListener("click", darkMode);
