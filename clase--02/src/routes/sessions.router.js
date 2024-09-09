import { Router } from "express";
const router = Router();
import UserModel from "../models/user.model.js";

//Ruta post para generar un nuevo usuario: 

router.post("/register", async (req, res) => {
    let { first_name, last_name, email, password, age } = req.body;

    try {
        //Verificar si el correo ya esta registrado: 
        const existeUsuario = await UserModel.findOne({ email: email });

        if (existeUsuario) {
            return res.send("El correo ya esta registrado");
        }

        //Crear un nuevo usuario: 

        const nuevoUsuario = await UserModel.create({
            first_name,
            last_name,
            email,
            password,
            age
        })

        //Almacenar los datitos del usuario en la session: 
        req.session.user = {
            first_name: nuevoUsuario.first_name,
            last_name: nuevoUsuario.last_name,
            email: nuevoUsuario.email
        }

        req.session.login = true;

        res.status(201).send("Usuario creado con exito");

    } catch (error) {
        res.status(500).send("Error interno del servidor", error);
    }
})

//Rutita para el login: 

router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {
        const usuarioBuscado = await UserModel.findOne({ email: email });
        if (usuarioBuscado) {
            if (usuarioBuscado.password === password) {
                //Almacenar los datitos del usuario en la session: 
                req.session.user = {
                    first_name: usuarioBuscado.first_name,
                    last_name: usuarioBuscado.last_name,
                    email: usuarioBuscado.email
                }

                req.session.login = true;

                res.redirect("/profile");
            } else {
                res.status(401).send("Contraseña incorrecta"); 
            }
        } else {
            res.status(404).send("Usuario no encontado, quien sos amigo? quien te conoce? ");
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor", error);
    }
})

export default router; 