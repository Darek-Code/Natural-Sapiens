const jwt = require('jsonwebtoken');
const restricted = require('../config/restricted');

exports.checkToken = (req, res, next) => {
    // 1. Comprobar si el endpoint es /login o /newProvider
     if (req.path !== "/login" && req.path !== "/newProvider") {

        // 2.Compruebo que elusuario tenga la cookie de sesión
        if (req.cookies["aqq"] !== undefined) {
            // 3. Comprobar el token
            jwt.verify(
                req.cookies["aqq"],
                restricted.jwt_key,
                (error, confirmacion) => {
                    if (error) {
                        //El token esté corrupto
                        console.log(error)
                        res.status(401).send({ "error": "Token no válido" });
                    } else if (confirmacion) {
                        //Hemos comprobado que el token es válido
                        next();
                    } else {
                        res.status(401).send({ "error": "Token no válido" });
                    }
                }
            )

        } else {
            res.status(401).send({ "error": "No estás autentificado", "loginURL": "/login" })
        }
    } else {
        //Estás intentando entrar a /login o a /newProvider
        next();
    }
}
