// efecto glitch del titulo de la marca en la bienvenida
(function () {
    const word = document.getElementById("heroWord");
    if (!word) return;

    const original = "Anteiku";
    const chars = "!@#$%&*<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // palabras que aparecen por un instante durante el glitch
    const palabrasOcultas = [
        "幽霊", "東京", "珈琲", "影", "悪魔", "幻", "黒", "血", "夜", "静寂",
        "uwu", "coffee!", "miau", "tatakae", "sugoi!", "touka koukan", "FLCL", "EVA 01"
    ];

    function scramble() {
        const letters = original.split("");
        const cuantos = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < cuantos; i++) {
            const pos = Math.floor(Math.random() * letters.length);
            letters[pos] = chars[Math.floor(Math.random() * chars.length)];
        }
        word.textContent = letters.join("");
        word.classList.add("glitch-active");
    }

    function glitch() {
        let cambios = 0;
        const intervalo = setInterval(() => {
            scramble();
            cambios++;
            if (cambios >= 5) {
                clearInterval(intervalo);

                // 15% de las veces, un flash con una palabra oculta
                if (Math.random() < 0.15) {
                    const oculta = palabrasOcultas[Math.floor(Math.random() * palabrasOcultas.length)];
                    word.textContent = oculta;
                    setTimeout(() => {
                        word.textContent = original;
                        word.classList.remove("glitch-active");
                    }, 180);
                } else {
                    word.textContent = original;
                    word.classList.remove("glitch-active");
                }
            }
        }, 45);
    }

    setInterval(() => {
        if (Math.random() < 0.6) glitch();
    }, 3500);
})();
