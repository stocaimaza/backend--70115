import { Router } from "express";
const router = Router();
import passport from "passport";



//REGISTER: VERSION PARA PASSPORT: 

router.post("/register", passport.authenticate("register", {failureRedirect:"/api/sessions/failregister"}) ,async(req, res) => {
    if(!req.user) return res.send("Credenciales invalidas"); 

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.session.login = true;

    res.redirect("/profile"); 
})

router.get("/failregister", (req, res) => {
    res.send("Fallo el registro, moriremos!");
})


//LOGIN VERSION PARA PASSPORT: 

router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}) ,async ( req, res ) => {
    if(!req.user) return res.send("Credenciales invalidas"); 

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.session.login = true;

    res.redirect("/profile"); 
})

router.get("/faillogin", (req, res) => {
    res.send("Fallo la estrategia, vamos a morir!");
})


//Logout: 

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

//VERSION PARA GITHUB: 

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}) ,(req, res) => {})

router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async (req, res) => {
    //La estrategia de GitHub nos retornará el usuario, entonces lo agregamos a nuestro objeto de session: 
    req.session.user = req.user; 
    req.session.login = true; 
    res.redirect("/profile");
})

//Version para Google: 

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}), async (req, res) => {
    //No necesitamos completar nada, porque todo el trabajo lo hace passport. 
})


router.get("/googlecallback", passport.authenticate("google", {failureRedirect: "/login"}), async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile"); 
})

export default router; 