//3) Procesamiento de Argumentos con Commander: 
//Instalan: npm i commander

import { Command } from "commander";
const program = new Command(); 

//1 - Comando // 2 - La descripción // 3 - Valor de default

program
    .option("-p <port>", "puerto donde se inicia el servidor", 8080)
    .option("--mode <mode>", "modo de trabajo", "desarrollo")
program.parse(); 
//Finalizamos la configuración. 

//Verificamos que esto realmente funciona: 
//console.log("Opciones: ", program.opts()); 

export default program; 
