async function fetchProducts(page = 1, category = null) {
    let url = `${API_URL}/api/products?page=${page}&limit=12`;
    if (category) {
        url += `&category=${category}`;
    }
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Error al cargar los productos");
    }
    return res.json();
}

async function createSale(user_name, products) {
    const res = await fetch(`${API_URL}/api/sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name, products })
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Error al registrar la venta");
    }
    return res.json();
}

// las imagenes vienen como ruta del backend (/uploads/...)
function imageUrl(path) {
    return API_URL + path;
}
