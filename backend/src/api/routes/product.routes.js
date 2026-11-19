import { Router } from "express";
import { getProducts, createProduct, updateProduct, toggleProduct } from "../controllers/product.controllers.js";
import { validateProduct } from "../middlewares/validations.js";

const productRoutes = Router();

productRoutes.get("/", getProducts);
productRoutes.post("/", validateProduct, createProduct);
productRoutes.put("/:id", validateProduct, updateProduct);
productRoutes.patch("/:id/active", toggleProduct);

export default productRoutes;
