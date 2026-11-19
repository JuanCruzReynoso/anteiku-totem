document.documentElement.dataset.theme = localStorage.getItem("anteiku_theme") || "dark";
window.toggleTheme = function () {
    var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("anteiku_theme", next);
};
