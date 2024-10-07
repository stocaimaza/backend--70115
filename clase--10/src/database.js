// import mongoose from "mongoose";
// import configObject from "./config/config.js";
// const {mongo_url} = configObject; 

// mongoose.connect(mongo_url)
//     .then(() => console.log("Conectados a la BD"))
//     .catch((error) => console.log(error))

//////////////////////////////////////////////

//3) Patron de diseño Singleton: 
//Lo usamos para tener una instancia global en toda la aplicación. 
//El caso mas usado es en la conexión a una Base de Datos. 
//Este patron verifica si ya existe una instancia de esta clase, en caso de que exista, retorna esa instancia, caso contrario la crea. 

import mongoose from "mongoose";
import configObject from "./config/config.js";
const {mongo_url} = configObject; 

class BaseDatos {
    static #instancia; 
    //Se declara una variable estática y privada llamada #instancia. 

    constructor() {
        mongoose.connect(mongo_url); 
    }

    static getInstancia() {
        if (this.#instancia) {
            //Si ya tenemos una instancia, la retornamos: 
            return this.#instancia;
        }
        //Caso contrario, la creamos: 
        this.#instancia = new BaseDatos(); 
        return this.#instancia; 
    }

}

export default BaseDatos; 