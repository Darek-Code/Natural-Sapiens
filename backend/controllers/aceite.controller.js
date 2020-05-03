const aceiteModel = require('../models/aceite.model');
const { validationResult } = require('express-validator');


exports.listAceite = async (req, res) => {
    try {
        const resultados = await aceiteModel.getAllAceite();
        res.send(resultados)
    } catch (error) {
        res.send(error)
    }
};

exports.getSingleAceiteByID = async (req, res) => {
    try {
        // Sacar del path param el ID del producto
        const id = req.params.id;
        //Pedir al Modelo que saque los datos de los aceite por su ID
        const aceite = await aceiteModel.getAceiteByID(id);
        //Lógica para comprobar que el zumo exista
        if (aceite.length === 0) {
            res.status(400).send({ "message": "Ese ID no existe en la base de datos" })
        } else {
            res.send(aceite)
        }

    } catch (error) {
        res.send(error)
    }
};

exports.createNewAceite = async (req, res) => {
    //Sacar del body la información del nuevo producto
    const errors = validationResult(req) //Ejecuta las validaciones
    if (errors.isEmpty()) {
        const nombre = req.body.nombre;
        const tipo = req.body.tipo;
        const fk_productos = req.body.fk_productos;

        //Llamar al modelo y pedirle que inserte el aceite
        try {
            const result = await aceiteModel.insertSingleAceite(nombre, tipo, fk_productos)
            res.send({ "message": "Ok producto añadido", "nuevoId": result.insertId })
        } catch (error) {
            res.send(error)
        }

    } else {
        res.status(400).send({ "error": "El body está mal formado", "explicacion": errors })
    }
};

exports.updateSingleAceite = async (req, res) => {
    const errors = validationResult(req) //Ejecutar las validaciones
    if (errors.isEmpty()) {
        const id = req.body.id;
        const nombre = req.body.nombre;
        const tipo = req.body.tipo;
        // Llamo al modelo:
        try {
            const result = await productosModel.updateAceite(id, nombre, tipo);
            if (result.affectedRows > 0) {
                res.send({ "message": "Dato modyficado con éxito!" })
            } else {
                res.status(404).send({ "error": "Ese ID no existe" })
            }
        } catch (error) {
            res.send(error);
        }
    } else {
        res.status(400).send({ "error": "El body está mal formado", "explicación": errors })
    }
};

exports.deleteSingleAceite = async (req, res) => {
    //Coger de los path params el ID
    const id = req.params.id;
    //Pedir al modelo que elimine ese producto
    try {
        const results = await productosModel.removeAceite(id);
        //Comprobar que el ID exista
        if (results.affectedRows > 0) {
            //Enviar confirmación al cliente
            res.send({ "message": `Ok producto con el id ${id} eliminado!` })
        } else {
            res.status(404).send({ "error": "Ese ID no existe." })
        }
    } catch (error) {
        res.send(error)
    }
};
