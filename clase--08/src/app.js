/** CLASE 8 - PROCESO PRINCIPAL DEL SERVIDOR + GLOBAL & CHILD PROCESS **/

//Temas de hoy: 

//1) Objecto processo
//2) Manejo de argumentos
//3) Commander JS
//4) Manejo de variables de entorno
//5) Listeners
//6) Child Process

//Process

//console.log(process);

//Algunos elementos más importantes: 

//console.log(process.pid); 
//Obtengo el ID del proceso en el sistema operativo. 

//console.log(process.cwd()); 
//Me retorna el directorio actual del proceso

//console.log(process.version); 
// Me retorna la version de Node JS

//process.exit(); 
//esto finaliza el proceso. 

//console.log("Texto adicional!"); 

//console.log(process.memoryUsage()); 
//Me retorna en bytes
//Cantidad de memoria que usa el proceso. 

//2) Manejo de argumentos: 

//console.log(process.argv); 

//TRABAJAMOS CON DOTENV. 

import express from "express";
import mongoose from "mongoose";
const app = express(); 
import UserModel from "./models/usuarios.model.js";
import configObject from "./config/config.js";

const { mongo_url, puerto } = configObject; 

//Ruta

app.get("/", async (req, res) => {
    try {
        const usuarios = await UserModel.find(); 
        res.send(usuarios); 
    } catch (error) {
        res.status(500).send("Nos vamos a engripar esta primavera"); 
    }
})


app.listen(puerto, () => {
    console.log(`Escuchando el puerto: ${puerto}`);
})

//Nos conectamos con la BD: 

mongoose.connect(mongo_url)
    .then( () => console.log("Conexión exitosa"))
    .catch( (error) => console.log("Vamos a morir", error))


//6) Child Process

// function operacionCompleja() {
//     let result = 0; 

//     for(let i = 0; i < 5e9; i++ ) {
//         result += i; 
//     }

//     return result; 
// }

// app.get("/suma", (req, res) => {
//     const result = operacionCompleja(); 
//     res.send(`El resultado de la operación es: ${result}`); 
// })

//Pasitos para lograr el forkeo: 

//1) Separamos la función que nos trae problema a otro módulo. 
//2) La modificamos y la dejamos disponible para cuando el proceso padre la pida. 
//3) Ejecutar la ruta

import {fork} from "child_process"; 
//No hace falta instalar nada, ya es un proceso nativo. 

app.get("/suma", (req, res) => {
    const child = fork("./src/operacionesComplejas.js"); 
    child.send("iniciando"); 
    child.on("message", result => {
        res.send(`El resultado de la operacion es: ${result}`);
    })
})


