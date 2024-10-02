import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse70110:coderhouse@cluster0.pripd.mongodb.net/Jugueteria?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexión exitosa!"))
    .catch((error) => console.log("Tenemos un error fatal, todo mal: ", error))