import express from "express";
import cors from "cors";
import session from "express-session";
import environments from "./src/api/config/environments.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, userRoutes, saleRoutes, authRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";

const app = express();
const { port, session_key } = environments;

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

app.use(express.static(join(__dirname, "src/public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerUrl);
app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true
}));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);
app.use("/", authRoutes);
app.use("/", viewRoutes);

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.listen(port, () => {
    console.log(`Anteiku backend corriendo en http://localhost:${port}`);
});
