/** CLASE 0 - NIVELAMOS REALIZANDO UN TODO LIST CON MONGOOSE Y EXPRESS **/

import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import todosRouter from "./routes/todo.router.js";
const app = express(); 
const PUERTO = 8080; 

//Nos conectamos con la BD: 
mongoose.connect("mongodb+srv://coderhouse70110:coderhouse@cluster0.pripd.mongodb.net/Todos?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Nos conectamos a MongoDB"))
    .catch( (error) => console.log("Tenemos un error, vamos a morir: ", error))

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

//Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars"); 
app.set("views", "./src/views");

//Rutas
app.use("/", todosRouter); 

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})
