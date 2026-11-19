const categoriasValidas = ["coffee", "merch"];

export function validateProduct(req, res, next) {
    const { name, price, category } = req.body;
    if (!name || name.trim().length < 2) {
        return res.status(400).json({ message: "El nombre es obligatorio (minimo 2 caracteres)" });
    }
    if (isNaN(Number(price)) || Number(price) <= 0) {
        return res.status(400).json({ message: "El precio debe ser un numero mayor a 0" });
    }
    if (!categoriasValidas.includes(category)) {
        return res.status(400).json({ message: "La categoria debe ser coffee o merch" });
    }
    next();
}

export function validateUser(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Nombre, email y contrasena son obligatorios" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "El email no es valido" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "La contrasena debe tener al menos 6 caracteres" });
    }
    next();
}

export function validateSale(req, res, next) {
    const { user_name, products } = req.body;
    if (!user_name || !user_name.trim()) {
        return res.status(400).json({ message: "Falta el nombre del cliente" });
    }
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "El carrito esta vacio" });
    }
    for (const item of products) {
        if (!Number.isInteger(Number(item.id)) || Number(item.id) <= 0) {
            return res.status(400).json({ message: "Producto invalido en el carrito" });
        }
        if (!Number.isInteger(Number(item.cantidad)) || Number(item.cantidad) <= 0) {
            return res.status(400).json({ message: "La cantidad debe ser un numero entero mayor a 0" });
        }
    }
    next();
}
