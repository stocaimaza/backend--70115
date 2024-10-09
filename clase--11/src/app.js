/** CLASE 11 - ARQUITECTURA DEL SERVIDOR: PERSISTENCIA **/

//Levantar un servidor: 

import express from "express";
import productosRouter from "./routes/productos.router.js"; 
import cors from "cors"; 
const app = express(); 
const PUERTO = 8080; 
import "./database.js";



//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public")); 
app.use(cors()); 


//Rutas
app.use("/productos", productosRouter);

//Listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto de Bahia Blanca`); 
})

