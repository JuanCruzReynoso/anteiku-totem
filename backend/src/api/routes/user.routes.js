import { Router } from "express";
import { createUser } from "../controllers/user.controllers.js";
import { validateUser } from "../middlewares/validations.js";

const userRoutes = Router();

userRoutes.post("/", validateUser, createUser);

export default userRoutes;
