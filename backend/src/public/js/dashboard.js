let pendingForm = null;
const modal = document.getElementById("confirmModal");

document.querySelectorAll("form[data-confirm]").forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();
        pendingForm = form;
        document.getElementById("confirmText").textContent =
            "Seguro que queres " + form.dataset.confirm.toLowerCase() + " este producto?";
        modal.classList.add("open");
    });
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    modal.classList.remove("open");
    pendingForm = null;
});

document.getElementById("okBtn").addEventListener("click", () => {
    if (pendingForm) pendingForm.submit();
});

// filtro por categoria
document.querySelectorAll(".pill").forEach(pill => {
    pill.addEventListener("click", () => {
        document.querySelector(".pill.active").classList.remove("active");
        pill.classList.add("active");
        const cat = pill.dataset.cat;
        document.querySelectorAll("tbody tr").forEach(row => {
            row.style.display = cat === "all" || row.dataset.cat === cat ? "" : "none";
        });
    });
});
