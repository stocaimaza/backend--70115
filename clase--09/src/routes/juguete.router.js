import { Router } from "express";
const router = Router(); 

//Vinculamos el endpoint con el método correspondiente. 

//Importo el controlador y creo una instancia. 
import JugueteController from "../controllers/juguete.controller.js"; 
const jugueteController = new JugueteController(); 

router.get("/", jugueteController.obtenerJuguetes); 
router.post("/", jugueteController.crearJuguete); 


export default router; 