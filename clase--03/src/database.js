import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse70110:coderhouse@cluster0.pripd.mongodb.net/Storage?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la BD"))
    .catch((error) => console.log("Tenemos un error: ", error))