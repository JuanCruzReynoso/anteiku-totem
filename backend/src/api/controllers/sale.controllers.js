import * as saleModel from "../models/sale.model.js";

export async function createSale(req, res) {
    try {
        const sale = await saleModel.create(req.body.user_name, req.body.products);
        return res.status(201).json(sale);
    } catch (error) {
        if (error.message === "PRODUCTO_INVALIDO") {
            return res.status(400).json({ message: "Hay productos invalidos o inactivos en el carrito" });
        }
        console.error(error);
        return res.status(500).json({ message: "Error al registrar la venta" });
    }
}

export async function getSales(req, res) {
    try {
        const sales = await saleModel.getAll();
        return res.status(200).json(sales);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener las ventas" });
    }
}
