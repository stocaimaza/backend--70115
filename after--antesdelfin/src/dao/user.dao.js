import UsuarioModel from "./models/usuarios.model.js";

class UserDao {
    async findById(id) {
        return await UsuarioModel.findById(id); 
    }

    async findOne(query) {
        return await UsuarioModel.findOne(query); 
    }

    async save(userData) {
        const user = new UsuarioModel(userData); 
        return await user.save(); 
    }

    async update(id, userData) {
        return await UsuarioModel.findByIdAndUpdate(id, userData); 
    }

    async delete(id) {
        return await UsuarioModel.findByIdAndDelete(id); 
    }
}

export default new UserDao(); 