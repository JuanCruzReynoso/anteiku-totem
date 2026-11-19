// pantalla de bienvenida: el cliente ingresa su nombre para empezar
document.getElementById("welcomeForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("clientName").value.trim();
    if (name.length < 2) {
        return;
    }
    localStorage.setItem("anteiku_name", name);
    window.location.href = "productos.html";
});
