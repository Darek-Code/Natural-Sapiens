const connection = require('./db.model');

exports.getAllAceite = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query("SELECT * FROM aceite");
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })

};

exports.getAceiteByID = (aceiteID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM aceite WHERE ID = ${aceiteID}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
};

exports.insertSingleAceite = (nombre, tipo, fk_productos) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await connection.query(`
            INSERT INTO aceite (nombre, tipo, fk_productos) VALUES ("${nombre}", "${tipo}", ${fk_productos})`)
            resolve(result)
        } catch (error) {
            reject(error)
        }

    })
};

exports.updateAceite = (id, nombre, tipo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `
            UPDATE aceite
            SET nombre = "${nombre}, tipo="${tipo}", fk_productos=${fk_productos}"
            WHERE ID = ${id};
            `
            const result = await connection.query(sql);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
};

exports.removeAceite = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const sql = `DELETE FROM aceite WHERE ID = ${id}`;
            const result = await connection.query(sql);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })

};