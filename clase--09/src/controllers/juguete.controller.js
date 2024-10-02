import JugueteService from "../services/juguete.service.js";
const jugueteService = new JugueteService(); 

class JugueteController {
    async crearJuguete(req, res) {
        try {
            const juguete = await jugueteService.crearJuguete(req.body); 
            res.json(juguete); 
        } catch (error) {
            res.status(500).json({error: "Error del servidor"})
        }
    }

    async obtenerJuguetes(req, res) {
        try {
            const juguetes = await jugueteService.obtenerJuguetes(); 
            res.json(juguetes); 
        } catch (error) {
            res.status(500).json({error: "Error del servidor"})
        }
    }
}

export default JugueteController; 