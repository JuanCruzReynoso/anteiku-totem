import bcrypt from "bcrypt";
import * as userModel from "../models/user.model.js";

// la contrasena se guarda hasheada, nunca en texto plano
export async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const existing = await userModel.getByEmail(email);
        if (existing) {
            return res.status(409).json({ message: "Ya existe un usuario con ese email" });
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name: name.trim(), email, password: hash });
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el usuario" });
    }
}
