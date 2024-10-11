//Hacemos una funcion que verifique que seas admin: 

export function soloAdmin(req, res, next) {
    if(req.user.role === "admin") {
        next(); 
    }else{
        res.status(403).send("Acceso denegado, este lugar es solo para admin queridoooo"); 
    }
}

//Hacemos una funcion que verifique que seas user: 

export function soloUser(req, res, next) {
    if(req.user.role === "user") {
        next(); 
    }else {
        res.status(403).send("Acceso denegado, este lugar es solo para usuarios comunachos"); 
    }
}