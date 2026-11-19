import connection from "../database/db.js";

// la venta se registra en una transaccion: si algo falla, no queda media venta en la BD
export async function create(user_name, items) {
    const conn = await connection.getConnection();
    try {
        await conn.beginTransaction();

        const ids = items.map(item => item.id);
        const [rows] = await conn.query(
            "SELECT id, name, price FROM products WHERE active = 1 AND id IN (?)",
            [ids]
        );

        if (rows.length !== new Set(ids).size) {
            throw new Error("PRODUCTO_INVALIDO");
        }

        let total = 0;
        const detalle = items.map(item => {
            const product = rows.find(row => row.id === Number(item.id));
            const subtotal = Number(product.price) * item.cantidad;
            total += subtotal;
            return { id: product.id, name: product.name, price: Number(product.price), cantidad: item.cantidad, subtotal };
        });

        const [saleResult] = await conn.query(
            "INSERT INTO sales (user_name, total_price) VALUES (?, ?)",
            [user_name.trim(), total.toFixed(2)]
        );

        for (const item of detalle) {
            await conn.query(
                "INSERT INTO product_sales (product_id, sale_id, cantidad) VALUES (?, ?, ?)",
                [item.id, saleResult.insertId, item.cantidad]
            );
        }

        await conn.commit();
        return {
            id: saleResult.insertId,
            user_name: user_name.trim(),
            total_price: total.toFixed(2),
            date: new Date(),
            products: detalle
        };
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

// listado de ventas con sus productos asociados (relacion N:M)
export async function getAll() {
    const [sales] = await connection.query("SELECT * FROM sales ORDER BY date DESC");
    const [rows] = await connection.query(`
        SELECT ps.sale_id, ps.cantidad, p.id, p.name, p.price, p.image
        FROM product_sales ps
        JOIN products p ON p.id = ps.product_id
    `);

    return sales.map(sale => ({
        ...sale,
        products: rows
            .filter(row => row.sale_id === sale.id)
            .map(({ sale_id, ...product }) => product)
    }));
}
