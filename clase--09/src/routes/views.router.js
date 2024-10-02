import { Router } from "express";
const router = Router(); 

import ViewController from "../controllers/view.controller.js"; 
const viewController = new ViewController(); 

router.get("/", viewController.mostrarJuguetes); 

export default router;