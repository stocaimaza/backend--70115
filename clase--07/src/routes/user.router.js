import { Router } from "express";
const router = Router(); 
import UsuarioModel from "../models/usuarios.model.js";
import jwt from "jsonwebtoken"; 
import passport from "passport";
import { createHash, isValidPassword } from "../utils/util.js";

//Register: 

router.post("/register", async (req, res) => {
    let {usuario, password} = req.body; 

    try {
        //Verificamos si el usuario ya existe: 
        const existeUsuario = await UsuarioModel.findOne({usuario}); 

        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe");
        }

        //Creamos un nuevo usuario: 
        const nuevoUsuario = new UsuarioModel({
            usuario, 
            password: createHash(password)
        });

        await nuevoUsuario.save(); 

        //Generar el token JWT
        const token = jwt.sign({usuario: nuevoUsuario.usuario}, "coderhouse", {expiresIn: "1h"}); 

        //Creamos la cookie
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, 
            httpOnly: true
        })

        res.redirect("/api/sessions/current"); 

    } catch (error) {
        res.status(500).send("Error interno del servidor"); 
    }
})

//Login: 

router.post("/login", async (req, res) => {
    let {usuario, password} = req.body; 

    try {
        //Buscar el usuario en MongoDB
        const usuarioEncontrado = await UsuarioModel.findOne({usuario}); 

        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no identificado"); 
        }

        //Verificamos la contraseña
        if(!isValidPassword(password, usuarioEncontrado)) {
            return res.status(401).send("Cualquier cosa pusiste, escribi bien!"); 
        }

         //Generar el token JWT
         const token = jwt.sign({usuario: usuarioEncontrado.usuario, rol: usuarioEncontrado.rol}, "coderhouse", {expiresIn: "1h"}); 

         //Creamos la cookie
         res.cookie("coderCookieToken", token, {
             maxAge: 3600000, 
             httpOnly: true
         })
 
         res.redirect("/api/sessions/current"); 


    } catch (error) {
        res.status(500).send("Error interno del servidor"); 
    }
})

router.get("/current", passport.authenticate("current", {session: false}), (req, res) => {
    res.render("home", {usuario: req.user.usuario}); 
})

//Logout: 

router.post("/logout", (req, res) => {
    //Limpiamos la cookie 
    res.clearCookie("coderCookieToken"); 
    res.redirect("/login"); 
})

//Ruta Admin: 

router.get("/admin", passport.authenticate("current", {session: false}), (req, res) => {
    if(req.user.rol !== "admin") {
        return res.status(403).send("Acceso denegado, vete ladron malvado de mi vida!"); 
    }

    //Si el usuario es administrador, mostrar la vista correcta. 
    res.render("admin");
})


export default router; 