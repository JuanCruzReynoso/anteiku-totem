import connection from "../database/db.js";

export async function getByEmail(email) {
    const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
}

// los usuarios que se crean por endpoint son administradores
export async function create(data) {
    const [result] = await connection.query(
        "INSERT INTO users (name, email, password, es_admin) VALUES (?, ?, ?, 1)",
        [data.name, data.email, data.password]
    );
    return { id: result.insertId, name: data.name, email: data.email, es_admin: 1 };
}
