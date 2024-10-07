import { Command } from "commander";
const program = new Command(); 

//1 - Comando // 2 - La descripción // 3 - Valor por default 

program
    .option("--mode <mode>", "modo de trabajo", "desarrollo")
program.parse();

export default program; 