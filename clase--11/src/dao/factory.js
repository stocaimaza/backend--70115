import config from "../config/config.js";
import MemoryJugueteDAO from "./memoryJugueteDAO.js";
import FileSystemJugueteDAO from "./fileSystemJugueteDAO.js";
import MongoDBJugueteDAO from "./mongoDBJugueteDAO.js";

let DAO; 

switch(config.persistence) {
    case "mongo":
        DAO = MongoDBJugueteDAO; 
        break; 
    case "memory": 
        DAO = MemoryJugueteDAO; 
        break; 
    case "file": 
        DAO = FileSystemJugueteDAO; 
        break; 
    default: 
        throw new Error("Persistencia no valida"); 
}

export default DAO; 