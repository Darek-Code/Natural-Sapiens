const connection = require('./db.model');

exports.getAllJuices = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query("SELECT * FROM zumos");
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })

};

exports.getJuiceByID = (juiceID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM zumos WHERE ID = ${juiceID}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
};

exports.insertSingleJuice = (nombre, tipo, fk_productos) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await connection.query(`
            INSERT INTO zumos (nombre, tipo, fk_productos) VALUES ("${nombre}", "${tipo}", ${fk_productos})`)
            resolve(result)
        } catch (error) {
            reject(error)
        }

    })
};

exports.updateJuice = (id, nombre, tipo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `
            UPDATE zumos
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

exports.removeJuice = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const sql = `DELETE FROM zumos WHERE ID = ${id}`;
            const result = await connection.query(sql);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })

};
