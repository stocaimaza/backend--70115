import Router from "./router.js";

class UserRouter extends Router {
    init() {
        this.get("/", (req, res) => {
            //res.send("Get de User"); 
            res.sendSuccess("Hola Alumnos, tenemos hambre, que llegue ya el almuerzo");
        })

        // this.post("/", (req, res) => {
        //     res.send("Get de User"); 
        // })

        // this.put("/", (req, res) => {
        //     res.send("Get de User"); 
        // })

        // this.delete("/", (req, res) => {
        //     res.send("Get de User"); 
        // })

    }
}

export default UserRouter; 