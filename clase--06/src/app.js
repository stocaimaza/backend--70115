/** CLASE 06 - RUTEO AVANZADO **/

//Temas de hoy: 
//1) Expresiones Regulares
//2) Restringiendo parametros
//3) Validando Parametros
//4) Custom Router
//5) Custom Response

//1) Expresiones regulares: son herramientas que nos permiten validar diferentes patrones en algunas cadenas de texto. 
//Por ejemplo: validar si el texto ingresado por el usuario corresponde a un email con este formato: "nombre@dominio.com"

//Ejemplo con un Email: 

// let correoIngresado = "lionel@messi.com"; 
// let correoFalso = "tinkiwinki";

// const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// console.log(patronCorreo.test(correoIngresado));  // True
// console.log(patronCorreo.test(correoFalso)); //Falsete 

//Ejemplo con números de telefono: 

//Esperamos este formato: (xxx) xxx - xxxx 

// let telefonoIngresado = "(223) 669-1111"
// let telefonoFalsete = "1234";
// let patronTelefono = /\(\d{3}\) \d{3}-\d{4}/;

// console.log("Verificamos un tel: " + patronTelefono.test(telefonoFalsete)); 

//Levantamos un pequeñin servidor. 

import express from "express"; 
const app = express(); 
const PUERTO = 8080; 
import clientesRouter from "./routes/clientes.router.js";

//Middleware 
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

//Rutas
app.use("/clientes", clientesRouter); 

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})

//////////////////////////////////////////////////////

// ¿Que hacer con todas las rutas que no coinciden con ningún endpoint?

// app.get("*", (req, res) => {
//     res.status(404).send("Recurso no encontrado, moriras!");
// })

//Custom Router: 
import UserRouter from "./routes/user.router.js";
const userRouter = new UserRouter(); 
app.use("/users", userRouter.getRouter()); 