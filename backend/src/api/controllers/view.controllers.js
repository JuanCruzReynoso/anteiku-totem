import ExcelJS from "exceljs";
import * as productModel from "../models/product.model.js";
import * as saleModel from "../models/sale.model.js";

export async function dashboard(req, res) {
    try {
        const products = await productModel.getAll();
        return res.render("dashboard", { products, user: req.session.user });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al cargar el panel");
    }
}

export function altaForm(req, res) {
    res.render("productForm", { product: null, action: "/dashboard/productos", error: null, user: req.session.user });
}

export async function editarForm(req, res) {
    try {
        const product = await productModel.getById(req.params.id);
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }
        return res.render("productForm", {
            product,
            action: `/dashboard/productos/${product.id}`,
            error: null,
            user: req.session.user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al cargar el producto");
    }
}

export async function createProductView(req, res) {
    try {
        if (!req.file) {
            return res.status(400).render("productForm", {
                product: null,
                action: "/dashboard/productos",
                error: "La imagen es obligatoria",
                user: req.session.user
            });
        }
        const { name, price, category } = req.body;
        await productModel.create({
            name: name.trim(),
            price: Number(price),
            category,
            image: `/uploads/products/${req.file.filename}`
        });
        return res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al crear el producto");
    }
}

export async function updateProductView(req, res) {
    try {
        const product = await productModel.getById(req.params.id);
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }
        const { name, price, category } = req.body;
        await productModel.update(product.id, {
            name: name.trim(),
            price: Number(price),
            category,
            image: req.file ? `/uploads/products/${req.file.filename}` : product.image
        });
        return res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al modificar el producto");
    }
}

export async function toggleActiveView(req, res) {
    try {
        const active = req.body.active === "1" ? 1 : 0;
        const ok = await productModel.setActive(req.params.id, active);
        if (!ok) {
            return res.status(404).send("Producto no encontrado");
        }
        return res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al cambiar el estado del producto");
    }
}

export async function downloadExcel(req, res) {
    try {
        const sales = await saleModel.getAll();
        const workbook = new ExcelJS.Workbook();

        const hojaVentas = workbook.addWorksheet("Ventas");
        hojaVentas.columns = [{ width: 8 }, { width: 22 }, { width: 24 }, { width: 16 }];
        hojaVentas.views = [{ state: "frozen", ySplit: 3 }];

        hojaVentas.mergeCells("A1:D1");
        hojaVentas.getCell("A1").value = "Anteiku - Ventas";
        hojaVentas.getCell("A1").font = { bold: true, size: 14, color: { argb: "FFB91C1C" } };
        hojaVentas.getCell("A1").alignment = { horizontal: "center" };

        hojaVentas.getRow(3).values = ["ID", "Fecha", "Cliente", "Total"];
        hojaVentas.getRow(3).font = { bold: true, color: { argb: "FFFFFFFF" } };
        hojaVentas.getRow(3).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0A0A0A" } };

        let totalGeneral = 0;
        sales.forEach((sale, i) => {
            const fila = hojaVentas.getRow(4 + i);
            fila.values = [sale.id, sale.date, sale.user_name, Number(sale.total_price)];
            fila.getCell(2).numFmt = "dd/mm/yyyy hh:mm";
            fila.getCell(4).numFmt = "$ #,##0.00";
            if (i % 2 === 1) {
                fila.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF5F5F5" } };
            }
            totalGeneral += Number(sale.total_price);
        });

        const filaTotal = hojaVentas.getRow(4 + sales.length);
        filaTotal.values = ["", "", "TOTAL", totalGeneral];
        filaTotal.font = { bold: true };
        filaTotal.getCell(3).border = { top: { style: "thin" } };
        filaTotal.getCell(4).border = { top: { style: "thin" } };
        filaTotal.getCell(4).numFmt = "$ #,##0.00";

        const hojaDetalle = workbook.addWorksheet("Detalle por producto");
        hojaDetalle.columns = [{ width: 8 }, { width: 38 }, { width: 12 }, { width: 18 }, { width: 16 }];
        hojaDetalle.views = [{ state: "frozen", ySplit: 3 }];

        hojaDetalle.mergeCells("A1:E1");
        hojaDetalle.getCell("A1").value = "Anteiku - Detalle por producto";
        hojaDetalle.getCell("A1").font = { bold: true, size: 14, color: { argb: "FFB91C1C" } };
        hojaDetalle.getCell("A1").alignment = { horizontal: "center" };

        hojaDetalle.getRow(3).values = ["Venta", "Producto", "Cantidad", "Precio unitario", "Subtotal"];
        hojaDetalle.getRow(3).font = { bold: true, color: { argb: "FFFFFFFF" } };
        hojaDetalle.getRow(3).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0A0A0A" } };

        let numeroFila = 4;
        sales.forEach(sale => sale.products.forEach(product => {
            const fila = hojaDetalle.getRow(numeroFila);
            fila.values = [sale.id, product.name, product.cantidad, Number(product.price), Number((product.price * product.cantidad).toFixed(2))];
            fila.getCell(4).numFmt = "$ #,##0.00";
            fila.getCell(5).numFmt = "$ #,##0.00";
            numeroFila++;
        }));

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=ventas_anteiku.xlsx");
        await workbook.xlsx.write(res);
        return res.end();
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al generar el excel");
    }
}
