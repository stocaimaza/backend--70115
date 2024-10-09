import fs from "fs"; 

//Recuerden la homologación de métodos!!!

class FileSystemJugueteDAO {

    async crearJuguete(datosJuguete) {
        try {
            //Leemos el archivo actual: 
            const juguetes = await this.leerArchivo(); 

            //Agregamos el nuevo juguete: 
            juguetes.push(datosJuguete); 

            //Guardamos el archivo actualizado: 
            await this.escribirArchivo(juguetes); 
            
            return datosJuguete; 
        } catch (error) {
            throw new Error("Error al crear el juguete en el sistema de archivos"); 
        }

    }

    async obtenerJuguetes() {
        try {
            //Leemos el archivo:
            const juguetes = await this.leerArchivo(); 
            return juguetes; 
        } catch (error) {
            throw new Error("Error al obtener los juguetes desde el sistema de archivos"); 
        }
    }

    //Funciones auxiliares: 
    async leerArchivo() {
        const data = await fs.promises.readFile("./src/data/juguetes.json"); 
        return JSON.parse(data); 
    }

    async escribirArchivo(data) {
        await fs.promises.writeFile("./src/data/juguetes.json", JSON.stringify(data, null, 2)); 
    }
}

export default FileSystemJugueteDAO; 