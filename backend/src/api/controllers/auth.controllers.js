import bcrypt from "bcrypt";
import * as userModel from "../models/user.model.js";

export function showLogin(req, res) {
    res.render("login");
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.getByEmail(email);
        if (!user || user.es_admin !== 1 || !(await bcrypt.compare(password, user.password))) {
            return res.render("login", { error: "Email o contrasena incorrectos" });
        }
        req.session.user = { id: user.id, name: user.name };
        return res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        return res.render("login", { error: "Error al iniciar sesion" });
    }
}

export function logout(req, res) {
    req.session.destroy(() => res.redirect("/login"));
}
