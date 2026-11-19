import { Router } from "express";
import { createSale, getSales } from "../controllers/sale.controllers.js";
import { validateSale } from "../middlewares/validations.js";

const saleRoutes = Router();

saleRoutes.post("/", validateSale, createSale);
saleRoutes.get("/", getSales);

export default saleRoutes;
