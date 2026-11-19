(function () {
    // el tema default es el oscuro salvo que haya uno guardado
    document.documentElement.dataset.theme = localStorage.getItem("anteiku_theme") || "dark";

    // el tema elegido se guarda para que persista al recargar
    window.toggleTheme = function () {
        const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        localStorage.setItem("anteiku_theme", next);
    };
})();
