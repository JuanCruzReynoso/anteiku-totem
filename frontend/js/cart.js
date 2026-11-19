// carrito guardado en localStorage para que no se pierda al cambiar de pantalla
const CART_KEY = "anteiku_cart";

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    const item = cart.find(i => i.id === product.id);
    if (item) {
        item.cantidad += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            cantidad: 1
        });
    }
    saveCart(cart);
}

function changeCantidad(id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === Number(id));
    if (!item) return cart;
    item.cantidad += delta;
    if (item.cantidad <= 0) {
        return removeFromCart(id);
    }
    saveCart(cart);
    return cart;
}

function removeFromCart(id) {
    const cart = getCart().filter(i => i.id !== Number(id));
    saveCart(cart);
    return cart;
}

function cartCount() {
    return getCart().reduce((total, item) => total + item.cantidad, 0);
}

function updateBadge() {
    const badge = document.getElementById("cartBadge");
    if (badge) {
        badge.textContent = cartCount();
    }
}

function cartTotal() {
    return getCart().reduce((total, item) => total + item.price * item.cantidad, 0);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
}
