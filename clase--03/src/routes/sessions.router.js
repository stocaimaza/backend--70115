import { Router } from "express";
const router = Router();
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/util.js";
import passport from "passport";

//REGISTER: VERSION PARA PASSPORT: 

router.post("/register", passport.authenticate("register", {failureRedirect:"/api/sessions/failregister"}) ,async(req, res) => {
    if(!req.user) return res.send("Credenciales invalidas"); 

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.session.login = true;

    res.redirect("/profile"); 
})

router.get("/failregister", (req, res) => {
    res.send("Fallo el registro, moriremos!");
})


//Ruta post para generar un nuevo usuario: 

// router.post("/register", async (req, res) => {
//     let { first_name, last_name, email, password, age } = req.body;

//     try {
//         //Verificar si el correo ya esta registrado: 
//         const existeUsuario = await UserModel.findOne({ email: email });

//         if (existeUsuario) {
//             return res.send("El correo ya esta registrado");
//         }

//         //Crear un nuevo usuario: 

//         const nuevoUsuario = await UserModel.create({
//             first_name,
//             last_name,
//             email,
//             password: createHash(password),
//             age
//         })

//         //Almacenar los datitos del usuario en la session: 
//         req.session.user = {
//             first_name: nuevoUsuario.first_name,
//             last_name: nuevoUsuario.last_name,
//             email: nuevoUsuario.email,
//             age: nuevoUsuario.age
//         }

//         req.session.login = true;

//         //res.status(201).send("Usuario creado con exito");
//         res.redirect("/profile");

//     } catch (error) {
//         res.status(500).send("Error interno del servidor", error);
//     }
// })

//LOGIN VERSION PARA PASSPORT: 

router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}) ,async ( req, res ) => {
    if(!req.user) return res.send("Credenciales invalidas"); 

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.session.login = true;

    res.redirect("/profile"); 
})

router.get("/faillogin", (req, res) => {
    res.send("Fallo la estrategia, vamos a morir!");
})


//Rutita para el login: 

// router.post("/login", async (req, res) => {
//     let { email, password } = req.body;

//     try {
//         const usuarioBuscado = await UserModel.findOne({ email: email });
//         if (usuarioBuscado) {
//             //if (usuarioBuscado.password === password) {
//             if(isValidPassword(password, usuarioBuscado)){
//                 //Almacenar los datitos del usuario en la session: 
//                 req.session.user = {
//                     first_name: usuarioBuscado.first_name,
//                     last_name: usuarioBuscado.last_name,
//                     email: usuarioBuscado.email,
//                     age: usuarioBuscado.age
//                 }

//                 req.session.login = true;

//                 res.redirect("/profile");
//             } else {
//                 res.status(401).send("Contraseña incorrecta"); 
//             }
//         } else {
//             res.status(404).send("Usuario no encontado, quien sos amigo? quien te conoce? ");
//         }
//     } catch (error) {
//         res.status(500).send("Error interno del servidor", error);
//     }
// })

//Logout: 

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

export default router; 