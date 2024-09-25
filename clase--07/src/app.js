import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./database.js";
import viewsRouter from "./routes/views.router.js"; 
import usersRouter from "./routes/user.router.js";
import initializePassport from "./config/passport.config.js";

const app = express(); 
const PUERTO = 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize()); 
initializePassport(); 

//Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/", viewsRouter);
app.use("/api/sessions", usersRouter); 

app.listen(PUERTO, () => {
    console.log(`Puerto: ${PUERTO}`); 
})