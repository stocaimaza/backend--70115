import mongoose from "mongoose";

const jugueteSchema = new mongoose.Schema({
    nombre: String,
    categoria: String,
    precio: Number
})

const JugueteModel = mongoose.model("juguetes", jugueteSchema); 

export default JugueteModel; 