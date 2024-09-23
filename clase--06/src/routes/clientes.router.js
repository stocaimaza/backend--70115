import { Router } from "express";
const router = Router(); 

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //En esta situacion yo estoy esperando un parametro por la URL que seria el nombre del cliente. 

    //¿Que ocurre si el cliente ingresa numeros o caracteres especiales en lugar de su nombre? 

    //Para solucionar este problema y recibir solo los parametros esperados podemos usar expresiones regulares. 

    let cliente = req.params.cliente; 
    res.send("Cliente: " + cliente);
})

//Otra forma de hacerlo: 

router.get("/email/:email", (req, res) => {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let email = req.params.email; 

    if(patronCorreo.test(email)) {
        res.send("Email valido: " + email); 
    } else {
        res.send("Email inválido"); 
    }
})


//3) Validando Parámetros: 

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    res.send("Obteniendo un recurso a partir del param cliente " + req.params.cliente);
})

router.post("/nombre/:cliente([a-z]+)", (req, res) => {
    res.send("Enviando un recurso a partir del param cliente " + req.params.cliente);
})

router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    res.send("Actualizando un recurso a partir del param cliente " + req.params.cliente);
})

router.delete("/nombre/:cliente([a-z]+)", (req, res) => {
    res.send("Eliminando un recurso a partir del param cliente " + req.params.cliente);
})

//Nos encontramos que en los 4 métodos hay lineas de código que son iguales y se van a repetir. 

//a) Obtener un parametro de la URL (cliente). 
//b) Buscar ese cliente en nuestra base de datos. 
//c) Una vez validado, continuar con la operacion que corresponda. 

//Esas operaciones que se repiten las podemos encapsular en un middleware "router.param"

router.param("cliente", (req, res, next, cliente) => {
    //Como no tengo base de datos conectado ni archivo json, voy a crear un array con mis clientes registrados: 
    const clientes = ["firulais", "lionel", "pepe", "util"]; 

    //Buscamos el cliente en nuestro array: 
    if(clientes.includes(cliente)){
        req.cliente = cliente; 
        next(); 
    } else {
        res.send("Cliente no encontrado"); 
    }
})


export default router; 