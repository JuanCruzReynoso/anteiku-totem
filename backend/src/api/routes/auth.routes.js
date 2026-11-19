import { Router } from "express";
import { showLogin, login, logout } from "../controllers/auth.controllers.js";

const authRoutes = Router();

authRoutes.get("/login", showLogin);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);

export default authRoutes;
