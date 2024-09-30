//5) Listeners

//process.on() es un método que me permite registrar escuchadores de eventos (listeners), para los eventos que que ocurran en el proceso. 

//Algunos de los más utilizados: 

//on "exit": me permite ejecutar un código justo antes de la finalización del proceso. 

process.on("exit", (code) => {
    console.log("Finalizamos con este codigo: ", code); 
})

console.log("Pero si yo tengo este codigo adicional lineas mas abajo, se muestra igual antes del evento de cierre"); 

//on ‘uncaughtException’ : Para atrapar alguna excepción que no haya sido considerada en algún catch

process.on("uncaughtException", (error) => {
    console.log("Tuvimos que capturar un error ", error)
    process.exitCode = 1; 
})

firulais(); 

