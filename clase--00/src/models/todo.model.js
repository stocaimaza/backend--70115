import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: String, 
    description: String, 
    completed: {
        type: Boolean, 
        default: false
    }
})

const TodoModel = mongoose.model("todos", schema); 

export default TodoModel;