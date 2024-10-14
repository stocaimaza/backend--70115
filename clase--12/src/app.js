/** CLASE 12 - MAILING Y MENSAJERIA **/

//Temas de hoy: 
//Protocolo SMTP. 
//Nodemailer. 
//Twilio: sms y mensajes de voz, pre grabados, whatsapp. 

import express from "express"; 
import nodemailer from "nodemailer"; 
import twilio from "twilio";
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public")); 

app.get("/", (req, res) => {
    res.send("Este prox finde vean la Sustancia"); 
})

//Ruta para enviar un email: 

app.get("/mail", async (req, res) => {
    try {
        await transport.sendMail({
            from: "Coder Test <firulais@gmail.com>",
            to: "stocaimaza@hotmail.com", 
            subject: "Correo de prueba", 
            html: `<h1> Liberen a Carpi! Es inocente </h1>
                    <img src="cid:patito1">`,

            //Para enviar como adjunto: 
            attachments: [{
                filename: "patito.jpg",
                path: "./src/public/img/patito.jpg",
                cid: "patito1"
            }]
        })
        
        res.send("Correo enviado correctamente");
    } catch (error) {
        res.status(500).send("Error al enviar un mail, la sustancia te atrapara!"); 
    }
})

app.post("/enviarmensaje", async (req, res) => {
    const { email, mensaje } = req.body; 

    try {
        await transport.sendMail({
            from: "Coder Test <coderhouse70110@gmail.com>",
            to: email, 
            subject: "TEST", 
            text: mensaje
        })
        res.send("Correo enviado, liberen a carpi!");
    } catch (error) {
        res.status(500).send("Error al enviar el mensaje");
    }
})

//Vamos a crear un objeto especial llamado "transporte". Aca voy a configurar el servicio SMTP que vamos a utilizar. 

const transport = nodemailer.createTransport({
    service: "gmail", 
    port: 587, 
    auth: {
        user: "", 
        pass: ""
    }
})

//Twilio: servicio que nos permite usar SMS, WhatsApp, chatbots, mensajes de voz pre grabados. 

//1) Instalamos: npm install twilio
//2) Importamos. 
//3) Nos guardamos las credenciales. 

const TWILIO_ACCOUNT_SID = "";
const TWILIO_AUTH_TOKEN = "";
const TWILIO_SMS_NUMBER = "";

//4) Configuramos el cliente: 
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER); 

//5) Creamos la ruta para enviar un sms: 

app.get("/sms", async (req, res) => {
    await client.messages.create({
        body: "tu auto ya esta listo para retirar del lavadero", 
        from: TWILIO_SMS_NUMBER, 
        to: ""
    })
    res.send("Enviando el SMS!"); 
})

app.listen(PUERTO, () => console.log(`Escuchando en ${PUERTO}`)); 