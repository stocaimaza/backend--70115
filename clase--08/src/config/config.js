//Instalamos dotenv: npm i dotenv
import dotenv from "dotenv";
import program from "../utils/commander.js"; 

let {mode} = program.opts(); 
//Recupero el modo que ingresamos por consola como argumento. 

//Pasamos a configurar el path de dotenv. 
dotenv.config({
    path: mode === "produccion" ? "./.env.produccion":"./.env.desarrollo"
}); 

//Me guardo las variables de entorno: 

const configObject = {
    puerto: process.env.PUERTO,
    mongo_url: process.env.MONGO_URL
}

export default configObject; 