//Recuerden que usamos dotenv para acceder a las variables de entorno. 
//npm i dotenv
import dotenv from "dotenv"; 

dotenv.config();

export default {
    persistence: process.env.PERSISTENCE || "memory" //Opción por default
}

