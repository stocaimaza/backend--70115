/** CLASE 5 - PASSPORT AVANZADO **/

//npm i express cookie-parser passport jsonwebtoken

//Recordemos: JWT es una implementación SIN ESTADO que me permite mantener el ciclo de vida de la sesión del usuario. 

//¿Como funciona? 

//1) El servidor genera un token y se lo envia al cliente. 
//2) El navegador almacena ese token y lo envia en cada request por medio de los headers. 
//3) El servidor recibe las peticiones, busca el token de JWT en los headers, si lo encuentra procede con la solicitud, sino pide autenticacion. 

import express from "express";
const app = express(); 
const PUERTO = 8080; 
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"; 
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { authorization, passportCall } from "./utils/util.js";

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();


//Rutas

app.post("/login", (req, res) => {
    let {usuario, pass} = req.body; 

    if(usuario === "tinki" && pass === "winki") {
        //Si los datos son correctos, voy a generar el token, y lo envio al usuario: 
        let token = jwt.sign({usuario, pass, role:"admin"}, "coderhouse", {expiresIn: "24h"}); 
        //res.send({message: "Login exitoso", token});

        //Trabajando con Cukis: 
        res.cookie("coderCookieToken", token, {maxAge: 60*60*1000, httpOnly: true}).send({message: "Login Exitoso la vida nos sonrie!"});

        //60*60*1000 esto representa una hora en milisegundos; 

    }else{
        res.send("Login Fallido, moriremos!");
    }
})

//Creamos la ruta current: 

// app.get("/current", passport.authenticate("jwt", {session: false}) ,(req, res) => {
//     res.send(req.user); 
// })


//Usamos PassportCall: 

app.get("/current", passportCall("jwt"), authorization("admin") ,(req, res) => {
    res.send("Sos admin, felicitaciones!"); 
})



//Listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`); 
})