import JugueteService from "../services/juguete.service.js";
const jugueteService = new JugueteService(); 

class ViewController {
    async mostrarJuguetes(req, res){
        try {
            const juguetes = await jugueteService.obtenerJuguetes(); 
            res.render("index", {juguetes}); 
        } catch (error) {
            res.status(500).send("Error terrrrrribleeeee"); 
        }
    }
}

export default ViewController; 