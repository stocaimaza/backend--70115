//Implementamos la estrategia de Passport con JWT: 

//Importamos passport y jwt: 

import passport from "passport";
import jwt from "passport-jwt"; 
//Guarda! Cuidado con lo que importan. 

const JWTStrategy = jwt.Strategy; 
const ExtractJwt = jwt.ExtractJwt; 

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
        secretOrKey: "coderhouse",
        //Misma palabra secreta que tenemos en App.js
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload); 
        } catch (error) {
            return done(error);
        }
    }))

    
}

const cookieExtractor = (req) => {
    let token = null; 
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]; 
    }
    return token; 
}

export default initializePassport;