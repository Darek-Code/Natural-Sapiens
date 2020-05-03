const connection = require('./db.model');

exports.getAllProviders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query("SELECT * FROM provedores");
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })

};

exports.getProviderByID = (providerID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await connection.query(`SELECT * FROM provedores WHERE ID = ${providerID}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
};

exports.createProvider = (nombre, localidad, telefono, mail, contraseña, fecha_inscripcion, fk_productos) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await connection.query(`
            INSERT INTO provedores (nombre, localidad, telefono, mail, contraseña, fecha_inscripcion, fk_productos)
            VALUES ("${nombre}", "${localidad}", ${telefono}, "${mail}", "${contraseña}", ${fecha_inscripcion}, ${fk_productos})
            `)
            resolve(result)
        } catch (error) {
            reject(error);

        }
    })

};

exports.updateProvider = (id, nombre, localidad, telefono, mail, contraseña, fecha_inscripcion, fk_productos) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `
            UPDATE provedores
            SET nombre = "${nombre}", localidad = "${localidad}", telefono = ${telefono}, mail = "${mail}", contraseña = "${contraseña}", fecha_inscripcion = ${fecha_inscripcion}, fk_productos = ${fk_productos}
            WHERE ID = ${id};
            `
            const result = await connection.query(sql);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
};

exports.removeProvider = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const sql = `DELETE FROM provedores WHERE ID = ${id}`;
            const result = await connection.query(sql);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })

};

// SELECT == READ (CRUD)
exports.getProviderById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await connection.query(`
                SELECT * FROM provedores WHERE ID = ${id};
            `)
            resolve(result)
        } catch (error) {
            reject(error);
        }
    })
};
