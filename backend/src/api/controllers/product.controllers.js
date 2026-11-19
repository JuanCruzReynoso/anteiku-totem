import * as productModel from "../models/product.model.js";

export async function getProducts(req, res) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 12, 24);
        const category = ["coffee", "merch"].includes(req.query.category) ? req.query.category : null;
        const data = await productModel.getActivePage(page, limit, category);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los productos" });
    }
}

export async function createProduct(req, res) {
    try {
        const { name, price, category, image } = req.body;
        if (!image) {
            return res.status(400).json({ message: "La imagen (url) es obligatoria" });
        }
        const product = await productModel.create({
            name: name.trim(),
            price: Number(price),
            category,
            image
        });
        return res.status(201).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el producto" });
    }
}

export async function updateProduct(req, res) {
    try {
        const existing = await productModel.getById(req.params.id);
        if (!existing) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        const { name, price, category, image } = req.body;
        const product = await productModel.update(req.params.id, {
            name: name.trim(),
            price: Number(price),
            category,
            image: image || existing.image
        });
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al modificar el producto" });
    }
}

export async function toggleProduct(req, res) {
    try {
        const active = Number(req.body.active) === 1 ? 1 : 0;
        const ok = await productModel.setActive(req.params.id, active);
        if (!ok) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        return res.status(200).json({ message: `Producto ${active ? "activado" : "desactivado"}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cambiar el estado del producto" });
    }
}
