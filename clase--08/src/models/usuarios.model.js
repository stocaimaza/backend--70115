import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: String, 
    apellido: String,
    legajo: Number
})

const UserModel = mongoose.model("usuarios", userSchema); 

export default UserModel;