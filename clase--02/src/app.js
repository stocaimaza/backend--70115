/** CLASE 2 - COOKIES, SESSIONS & STORAGE   **/

//Para lograr persistencia de la sesiones con File Storage: 

//1) Instalamos: npm i session-file-store
//2) Importamos el módulo
//3) Lo inicializamos conectando a la session

//Trabajamos con MongoDB: 

//1) Instalamos: npm install connect-mongo
//2) Importamos y configuramos el middleware

import express from "express";
const app = express(); 
const PUERTO = 8080;
import {engine} from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
//import FileStore from "session-file-store"; 
//Lo inicializamos de la siguiente forma: 
//const fileStore = FileStore(session); 
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import "./database.js";

//Express-Handlebars
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views");

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());
//Trabajamos con Session: 
app.use(session({
    secret: "secretCoder",
    //Es el valor para firmar las cookies

    resave: true, 
    //Esta config me permite mantener la sesión activa frente a la inactividad del usuario. 

    saveUninitialized: true, 
    //Me permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada para contener. 

    //2) Utilizando File Storage: 
    //store: new fileStore({path: "./src/sessions", ttl: 10, retries: 1})
    //path: la ruta donde se van a guardar los archivitos de sesión. 
    //ttl: Time To Live! (en segundos va!)
    //retries: cantidad de veces que el servidor tratará de leer el archivo. 

    //3) Utilizando Mongo Storage: 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse70110:coderhouse@cluster0.pripd.mongodb.net/Storage?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })
}))

//mongodb+srv://coderhouse70110:<db_password>@cluster0.pripd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


//Rutas
// app.get("/crearcuki", (req, res) => {
//     res.cookie("cuki", "Esto es una cukkiiii").send("Cuki Seteada!"); 
// })

// app.get("/borrarcuki", (req, res) => {
//     res.clearCookie("cuki").send("Cuki borrada!");
// })

//Rutas con session: 

// app.get("/login", (req, res) => {
//     let usuario = req.query.usuario;  

//     req.session.usuario = usuario; 
//     res.send("Guardamos el usuario por medio de query"); 
// })

//Verificamos al usuario recien logueado. 

// app.get("/usuario", (req, res) => {
//     if(req.session.usuario) {
//         return res.send(`El usuario registrado es el siguiente: ${req.session.usuario}`); 
//     }

//     res.send("No tenemos un usuario registrado, vamos a morir"); 

// })


/////////////////////////////////////////////////////////////////////////////

//Ejercicio de Login y Registro
app.use("/api/sessions", sessionsRouter); 
app.use("/", viewsRouter);


app.listen(PUERTO, () => console.log("Escuchando en el puerto de Mar del Plata"));