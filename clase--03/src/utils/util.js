//Bcrypt es una libreria de hashing de contraseñas
//1) Instalamos: npm install bcrypt
//2) Importamos el módulo

import bcrypt from "bcrypt"; 

//Vamos a crear dos funciones: 
//a) createHash: aplica el hash al password. 
//b) isValidPassword: compara el password proporcionado por la base de datos. 

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 

//hashSync: toma el password que le pasamos y aplica el proceso de hasheo a partir de un salt. 

//Un "salt" es un string random que se hace para que el proceso se realice de forma impredecible. 
//(10) = generará un salt de 10 caracteres. 

//ESTE PROCESO ES IRREVERSIBLE!! AHH VAMOS A MORIR!!!! 

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

//Al comparar los password, retorna true o false segun corresponda. 

export {createHash, isValidPassword};