import mysql from "mysql2/promise";
import environments from "../config/environments.js";

const { database } = environments;

// pool de conexiones: reutiliza conexiones en lugar de abrir una por peticion
const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;
