//CREANDO UN CUSTOM ROUTER: 

import express from "express";
const router = express.Router(); 

class Router {
    constructor() {
        this.router = router; 
        this.init(); 
    }

    getRouter(){
        return this.router; 
        //Devuelve el objeto router. 
    }

    //Ahora vamos a crear los métodos para cada operacion del router. 

    //Esta es la ruta get de nuestro router. 
    get(path, ...callbacks){
        //Primer parametro es la ruta. 
        //Los siguientes son los callbacks que se ejecutaran cuando hagamos get en esta ruta determinada. 
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks)); 
    }

    //Método para aplicar los callbacks de la ruta: 
    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (req, res, next) => {
            try {
                await callback(req, res, next);
            } catch (error) {
                res.status(500).send("Error interno del servidor"); 
            }
        })
    }


    //Custom response: 

    generateCustomResponse(req, res, next) {
        res.sendSuccess = payload => res.send({status: "success", payload}); 
        res.sendServerError = error => res.status(500).send({status: "error", error});
        res.sendUserError = error => res.status(400).send({status: "error", error}); 
        next();
    }

}

export default Router; 