import ProductoModel from "../models/productos.models.js";
import { respuesta } from "../utils/reutilizable.js";

class ProductoController {
    async getProductos(req, res) {
        try {
            const productos = await ProductoModel.find(); 
            respuesta(res, 200, productos); 
        } catch (error) {
            respuesta(res, 500, "Error al obtener los productos"); 
        }
    }

    async postProducto(req, res){
        try {
            const nuevoJuguete = req.body; 
            await ProductoModel.create(nuevoJuguete); 
            respuesta(res, 201, "Producto creado exitosamente"); 
        } catch (error) {
            respuesta(res, 500, "Error al obtener productos"); 
        }
    }
}

export default ProductoController; 