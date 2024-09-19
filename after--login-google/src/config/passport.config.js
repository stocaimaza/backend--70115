//Instalamos: npm install passport passport-local
//Importamos los módulos: 
import passport from "passport";
import local from "passport-local";

//Traemos UserModel y las funciones de Bcrypt: 
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/util.js";

//Nueva estrategia con Google: 
import GoogleStrategy from "passport-google-oauth20";

//Trabajamos con GitHub: 
import GitHubStrategy from "passport-github2";
///////////////////////////////////////////////////

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        //Le digo que quiero tener acceso al objeto request
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
            //Verificamos si ya existe un registro con ese email
            let user = await UserModel.findOne({ email });

            if (user) return done(null, false);

            //Pero si no existe, voy a crear un registro de usuario nuevo: 

            let newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let result = await UserModel.create(newUser);
            //Si todo resulta bien, mandamos done con el usuario generado. 
            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }));

    //Agregamos otra estrategia mas, ahora para el "Login": 

    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            //Primero verifico si existe un usuario con ese email. 
            const user = await UserModel.findOne({ email });
            if (!user) {
                console.log("Este usuario no existe ahhh auxilio!");
                return done(null, false);
            }
            //Si existe voy a verificar la contraseña: 
            if (!isValidPassword(password, user)) return done(null, false);

            return done(null, user);

        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({ _id: id });
        done(null, user);
    })


    //Acá desarrollamos la nueva estrategia con GitHub: 
    passport.use("github", new GitHubStrategy({
        clientID: "Iv23ctzm1m5Ss49FUTsE",
        clientSecret: "6545919819926c3986ac439d0fa83b36a493f05a",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        //Recomendado! Mostrar el perfil por consola para conocer los datos que me llegan: 
        console.log("Profile", profile);

        try {
            let user = await UserModel.findOne({ email: profile._json.email })

            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 37,
                    email: profile._json.email,
                    password: ""
                }

                let result = await UserModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }))

    //Nueva estrategia con Google: 

    passport.use("google", new GoogleStrategy({
        clientID: "444057825914-gcf2nf60ons13oqkks3f77vpc50332tj.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/api/sessions/googlecallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findOne({ email: profile._json.email })

            if (!user) {
                let newUser = {
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    age: 37,
                    email: profile._json.email,
                    password: ""
                }

                let result = await UserModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }))


}

export default initializePassport;