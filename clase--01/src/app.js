/** CLASE 1 - COOKIES Y SESSIONS **/

//Cookies: 
//Son pequeños archivos de texto que viven en el navegador del usuario. 
//Esta info viaja entre las peticiones del cliente y las respuestas del servidor. 

//¿Que pueden guardar?
//Id de las sesiones. 
//Preferencias del usuario (modo claro, idioma, moneda)
//Productos y servicios buscados

//Caracteristicas: 

//1) Como viven en el navegador y son de facil acceso evitamos colocar datos sensibles (contraseñas, medios de pago). 
//2) Le podemos configurar un tiempo de vida. 
//3) Podemos asignarles claves secretas para poder aumentar la seguridad
//4) Al almacenarse del lado del cliente, el espacio con el que se cuenta es limitado, por lo que se recomienda elegir de forma adecuada lo que se vaya a guardar como cookie.

//Instalamos Cookie Parser: 
//npm install cookie-parser

//2) Sesiones:
//Con las sesiones puedo mantener el vinculo, la informacion sobre el cliente. 

//Caracteristicas: 
//1- La información que se quiera guardar en session se almacena del lado del servidor.
//2- Del lado del cliente, se crea un identificador único para poder acceder a esa información desde el navegador.
//3- Los datos almacenados en session se borran al cerrar la ventana del navegador.
//4- Se utiliza principalmente para guardar los datos de usuario al iniciar sesión..

//instalamos: npm i express-session



import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express(); 
const PUERTO = 8080;

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

//Sumamos uno nuevo!

//Firmamos cookies: 
const miAltaClaveSecreta = "TinkiWinki";
app.use(cookieParser(miAltaClaveSecreta));

//Middleware de Session: 
app.use(session({
    secret: "secretCoder", 
    resave: true, 
    //Resave me permite mantener activa la sesion frente a la inactividad del usuario. 

    saveUninitialized: true
    //Permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada para contener. 
}))

//Rutas

//Seteamos una cookie: 
app.get("/setcookie", (req, res) => {
    //Usaremos el objeto "res" para asignarle una cookie al cliente.
    res.cookie("coderCookie", "Mi primera chamba con cookies",{maxAge: 5000}).send("Cookie seteada!");
    //La cookie vive en el navegador hasta que es eliminada, peeero si yo quiero que tenga un tiempo de vida limitado puedo configurar el "maxAge" (su valor es en ms)
})

//Enviamos una cookie firmada: 

app.get("/cookiefirmada", (req, res) => {
    res.cookie("cookieFirmada", "Esto es un mensaje secreto", {signed: true}).send("Cookie firmada enviada!"); 
})

//Obtenemos una cookie firmada: 

app.get("/recuperamoscookiefirmada", (req, res) => {
    let valorCookie = req.signedCookies.cookieFirmada;

    if (valorCookie) {
        res.send("Cookie recuperada: " + valorCookie);
    } else {
        res.send("Cookie invalida!");
    }
})

//Leer una cookie: 

app.get("/leercookie", (req, res) => {
    res.send(req.cookies.coderCookie); 
})

//Borramos una cookie: 

app.get("/borrarcuki", (req, res) => {
    res.clearCookie("coderCookie").send("Cookie eliminada");
})

//Levantamos la session en el endpoint contador: 

app.get("/contador", (req, res) => {
    if(req.session.counter) {
        req.session.counter++; 
        res.send("Se visito el sitio: " + req.session.counter + " veces"); 
    } else {
        req.session.counter = 1; 
        res.send("Bienvenido!"); 
    }
})

//Login con  Session ultra basico: 

app.get("/login", (req, res) => {
    let { usuario, pass } = req.query; 

    if ( usuario === "tinki" && pass === "winki" ) {
        req.session.user = usuario; 
        req.session.admin = true; 
        res.send("Inicio de sesión exitoso! La vida nos sonrie jajajajaja"); 
    } else {
        res.send("Datos incorrectos, moriras rata de dos patas!!!"); 
    }
})

//Ruta privada, si podes ingresar acá es porque estas logueado. 

//Middleware de autenticación de usuarios: 

function auth(req, res, next) {
    if(req.session.user === "tinki") {
        return next(); 
    } else {
        return res.status(401).send("Usuario no autorizado");
    }
}


app.get("/privado", auth ,(req, res) => {
    res.send("Si llegas hasta aca es porque estas logueado y sos alto crack!"); 
})


//Eliminamos datos de la session: 

app.get("/logout", (req, res) => {
    //Para eliminar datos de una variable de session, podemos utilizar el método destroy. 

    req.session.destroy((error) => {
        if(!error) {
            res.send("Sesion cerrada"); 
        } else {
            res.send("Tenemos un error"); 
        }
    })
})

app.listen(PUERTO, () => console.log(`Escuchando en el puerto: ${PUERTO}`));