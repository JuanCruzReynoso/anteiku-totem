import "dotenv/config";

export default {
    port: process.env.PORT || 3000,
    session_key: process.env.SESSION_KEY || "anteiku",
    database: {
        host: process.env.DB_HOST || "localhost",
        name: process.env.DB_NAME || "anteiku_totem",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || ""
    }
};
