import { Router } from "express";
const router = Router();
import TodoModel from "../models/todo.model.js";

//Ruta principal que muestra todas las tareas (tudus): 

router.get("/", async (req, res) => {
    try {
        const tudus = await TodoModel.find().lean();

        res.render("todos", { tudus });
    } catch (error) {
        res.status(500).send("Error del servidor al recuperar los tudus");
    }
})

//Ruta para crear un nuevo tudu: 

router.post("/todos", async (req, res) => {
    const { title, description } = req.body;
    try {
        const nuevoTudu = new TodoModel({ title, description });
        await nuevoTudu.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error del servidor al enviar tudus");
    }
})

//Ruta para renderizar la vista "new": 

router.get("/new", (req, res) => {
    res.render("new");
})

//Ruta para marcar como completada una actividad:

router.post("/todos/:id/complete", async (req, res) => {
    try {
        const tudu = await TodoModel.findById(req.params.id);
        tudu.completed = true;
        await tudu.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})

//Ruta para eliminar un tudu: 

router.post("/todos/:id/delete", async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


export default router; 