// pantalla del carrito: cantidades y confirmacion de la compra
const cartList = document.getElementById("cartList");
const modal = document.getElementById("confirmModal");

function render() {
    const cart = getCart();
    updateBadge();

    if (cart.length === 0) {
        cartList.innerHTML = `
            <div class="empty-cart">
                <p>Tu carrito esta vacio</p>
                <a class="btn btn-primary" href="productos.html">Ver productos</a>
            </div>`;
        document.getElementById("cartTotal").textContent = "0";
        document.getElementById("checkoutBtn").disabled = true;
        return;
    }

    document.getElementById("checkoutBtn").disabled = false;
    cartList.innerHTML = "";
    cart.forEach(item => {
        const row = document.createElement("article");
        row.className = "cart-row";
        row.innerHTML = `
            <img src="${imageUrl(item.image)}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p class="unit">$ ${item.price.toLocaleString("es-AR")} c/u</p>
                <div class="cart-controls">
                    <div class="cantidad">
                        <button class="cantidad-btn" data-action="minus" data-id="${item.id}" aria-label="Quitar uno">-</button>
                        <span>${item.cantidad}</span>
                        <button class="cantidad-btn" data-action="plus" data-id="${item.id}" aria-label="Agregar uno">+</button>
                    </div>
                    <div class="cart-right">
                        <span class="subtotal">$ ${(item.price * item.cantidad).toLocaleString("es-AR")}</span>
                        <button class="quitar" data-action="remove" data-id="${item.id}">Quitar</button>
                    </div>
                </div>
            </div>
        `;
        cartList.appendChild(row);
    });

    document.getElementById("cartTotal").textContent = cartTotal().toLocaleString("es-AR");
}

cartList.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    const id = button.dataset.id;
    if (button.dataset.action === "plus") changeCantidad(id, 1);
    if (button.dataset.action === "minus") changeCantidad(id, -1);
    if (button.dataset.action === "remove") removeFromCart(id);
    render();
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
    modal.classList.add("open");
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    modal.classList.remove("open");
});

document.getElementById("okBtn").addEventListener("click", async () => {
    try {
        const items = getCart().map(item => ({ id: item.id, cantidad: item.cantidad }));
        const sale = await createSale(localStorage.getItem("anteiku_name"), items);
        sessionStorage.setItem("anteiku_last_sale", JSON.stringify(sale));
        clearCart();
        window.location.href = "ticket.html";
    } catch (error) {
        alert("No pudimos registrar tu compra. Probá de nuevo en un momento.");
        modal.classList.remove("open");
    }
});

render();
