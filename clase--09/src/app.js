/** CLASE 09 - MODELO DE CAPAS **/

import express from "express";
import {engine} from "express-handlebars"; 
import jugueteRouter from "./routes/juguete.router.js";
import viewsRouter from "./routes/views.router.js"; 
import "./database.js";
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Express-Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//Rutas
app.use("/juguetes", jugueteRouter); 
app.use("/", viewsRouter); 

app.listen(PUERTO, () => console.log("Escuchando en el puerto 8080")); 



