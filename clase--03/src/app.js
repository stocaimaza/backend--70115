
import express from "express";
const app = express(); 
const PUERTO = 8080;
import {engine} from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import "./database.js";
//Passport: 
import passport from "passport";
import initializePassport from "./config/passport.config.js";


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
    resave: true, 
    saveUninitialized: true, 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse70110:coderhouse@cluster0.pripd.mongodb.net/Storage?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })
}))
//Cambios para usar passport: 
initializePassport(); 
app.use(passport.initialize());
app.use(passport.session());


/////////////////////////////////////////////////////////////////////////////

//Ejercicio de Login y Registro
app.use("/api/sessions", sessionsRouter); 
app.use("/", viewsRouter);


app.listen(PUERTO, () => console.log("Escuchando en el puerto de Mar del Plata"));