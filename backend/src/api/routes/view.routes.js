import { Router } from "express";
import {
    dashboard,
    altaForm,
    editarForm,
    createProductView,
    updateProductView,
    toggleActiveView,
    downloadExcel
} from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/auth.js";
import { validateProduct } from "../middlewares/validations.js";
import upload from "../middlewares/upload.js";

const viewRoutes = Router();

viewRoutes.get("/dashboard", requireLogin, dashboard);
viewRoutes.get("/dashboard/alta", requireLogin, altaForm);
viewRoutes.get("/dashboard/editar/:id", requireLogin, editarForm);
viewRoutes.post("/dashboard/productos", requireLogin, upload.single("image"), validateProduct, createProductView);
viewRoutes.post("/dashboard/productos/:id", requireLogin, upload.single("image"), validateProduct, updateProductView);
viewRoutes.post("/dashboard/productos/:id/activo", requireLogin, toggleActiveView);
viewRoutes.get("/dashboard/ventas/excel", requireLogin, downloadExcel);

export default viewRoutes;
