//Importar el ProductoModel: 
import ProductoModel from "../models/productos.models.js";

//Recuerden la homologación de métodos!!!

class MongoDBJugueteDAO {
    async crearJuguete(datosJuguete) {
        try {
            const juguete = new ProductoModel(datosJuguete); 
            return await juguete.save(); 
        } catch (error) {
            throw new Error("Error al crear un juguete en MongoDB");
        }
    }

    async obtenerJuguetes(){
        try {
            return await ProductoModel.find(); 
        } catch (error) {
            throw new Error("Error al obtener los juguetes de MongoDB"); 
        }
    }

}

export default MongoDBJugueteDAO; 