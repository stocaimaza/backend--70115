import { Router } from "express";
const router = Router();
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/util.js";
import passport from "passport";
import generateToken from "../utils/jsonwebtoken.js";

//Ejercicio: Registro con JWT. 

router.post("/register", async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body; 

    try {
        const existeUsuario = await UserModel.findOne({email});

        if(existeUsuario) {
            return res.send("El email ya esta registrado!"); 
        }

        //Si no existe, creamos uno nuevo: 
        const nuevoUsuario = await UserModel.create({
            first_name,
            last_name,
            email,
            password: createHash(password),
            age
        }); 

        //Generamos el token: 
        const token = generateToken({
            first_name: nuevoUsuario.first_name, 
            last_name: nuevoUsuario.last_name, 
            email: nuevoUsuario.email
        });

        res.status(201).send({message: "Usuario creado", token}); 
    } catch (error) {
        res.status(500).send("Error fatal la compu se prende fuego");
    }
})





//REGISTER: VERSION PARA PASSPORT: 

// router.post("/register", passport.authenticate("register", {failureRedirect:"/api/sessions/failregister"}) ,async(req, res) => {
//     if(!req.user) return res.send("Credenciales invalidas"); 

//     req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         age: req.user.age,
//         email: req.user.email
//     }

//     req.session.login = true;

//     res.redirect("/profile"); 
// })

// router.get("/failregister", (req, res) => {
//     res.send("Fallo el registro, moriremos!");
// })


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

//LOGIN CON JSON WEB TOKEN: 

router.post("/login", async(req, res) => {
    const {email, password} = req.body; 

    try {
        const usuario = await UserModel.findOne({email}); 

        if(!usuario) {
            return res.send("Y ese usuario de donde salio? Quien te conoce? "); 
        }

        if(!isValidPassword(password, usuario)) {
            return res.send("Credenciales invalida!!! Moriras!"); 
        }

        //Si la contraseña es correcta generamos el token: 
        const token = generateToken({
            first_name: usuario.first_name,
            last_name: usuario.last_name, 
            email: usuario.email, 
            age: usuario.age
        })

        res.send({mesage:"Todo bien! Logueado con exito!", token});
    } catch (error) {
        res.status(500).send("Error TERRIBLEEEEEE!");
    }
})


//LOGIN VERSION PARA PASSPORT: 

// router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}) ,async ( req, res ) => {
//     if(!req.user) return res.send("Credenciales invalidas"); 

//     req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         age: req.user.age,
//         email: req.user.email
//     }

//     req.session.login = true;

//     res.redirect("/profile"); 
// })

// router.get("/faillogin", (req, res) => {
//     res.send("Fallo la estrategia, vamos a morir!");
// })


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

//VERSION PARA GITHUB: 

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}) ,(req, res) => {})

router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async (req, res) => {
    //La estrategia de GitHub nos retornará el usuario, entonces lo agregamos a nuestro objeto de session: 
    req.session.user = req.user; 
    req.session.login = true; 
    res.redirect("/profile");
})


export default router; 