import connection from "../database/db.js";

export async function getAll() {
    const [rows] = await connection.query("SELECT * FROM products ORDER BY id");
    return rows;
}

export async function getActivePage(page = 1, limit = 12, category = null) {
    const where = category ? "WHERE active = 1 AND category = ?" : "WHERE active = 1";
    const params = category ? [category] : [];

    const [totalRows] = await connection.query(`SELECT COUNT(*) AS total FROM products ${where}`, params);
    const total = totalRows[0].total;
    const offset = (page - 1) * limit;

    const [rows] = await connection.query(
        `SELECT * FROM products ${where} ORDER BY id LIMIT ? OFFSET ?`,
        [...params, limit, offset]
    );

    return {
        products: rows,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1
    };
}

export async function getById(id) {
    const [rows] = await connection.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
}

export async function create(data) {
    const [result] = await connection.query(
        "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)",
        [data.name, data.image, data.category, data.price]
    );
    return getById(result.insertId);
}

export async function update(id, data) {
    const [result] = await connection.query(
        "UPDATE products SET name = ?, image = ?, category = ?, price = ? WHERE id = ?",
        [data.name, data.image, data.category, data.price, id]
    );
    return result.affectedRows === 0 ? null : getById(id);
}

export async function setActive(id, active) {
    const [result] = await connection.query("UPDATE products SET active = ? WHERE id = ?", [active, id]);
    return result.affectedRows > 0;
}
