class JugueteDTO {
    constructor(nombre, categoria, precio) {
        this.nombre = nombre; 
        this.categoria = categoria; 
        this.precio = precio; 
        this.fullname = `${nombre} - ${categoria}`; //Concatenamos nombre y categoria para crear el fullname. 
    }
}

export default JugueteDTO; 