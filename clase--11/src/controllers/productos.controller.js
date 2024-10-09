import ProductoModel from "../models/productos.models.js";
import { respuesta } from "../utils/reutilizable.js";

//Importamos todos los DAOS: 
// import MongoDBJugueteDAO from "../dao/mongoDBJugueteDAO.js";
// import FileSystemJugueteDAO from "../dao/fileSystemJugueteDAO.js";
// import MemoryJugueteDAO from "../dao/memoryJugueteDAO.js";

//Con Factory:
import DAO from "../dao/factory.js";
const jugueteService = new DAO(); 


//Trabajamos con DTO: 
import JugueteDTO from "../dto/juguete.dto.js";


class ProductoController {
    async getProductos(req, res) {
        try {
            const productos = await jugueteService.obtenerJuguetes(); 
            respuesta(res, 200, productos); 
        } catch (error) {
            respuesta(res, 500, "Error al obtener los productos"); 
        }
    }

    async postProducto(req, res){
        const { nombre, categoria, precio } = req.body; 
        try {
            //Creamos un nuevo JugueteDTO sin necesidad de pasar el fullname: 
            const jugueteDTO = new JugueteDTO(nombre, categoria, precio); 

            //Pasamos el jugueteDTO al Services para su creacion: 
            const juguete = await jugueteService.crearJuguete(jugueteDTO); 

            respuesta(res, 201, juguete); 
        } catch (error) {
            respuesta(res, 500, "Error al obtener productos"); 
        }
    }
}

export default ProductoController; 