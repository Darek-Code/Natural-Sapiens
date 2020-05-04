const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const productosController = require('./controllers/productos.controller');
const provedoresController = require('./controllers/provedores.controller');
const aceiteController = require('./controllers/aceite.controller');
const zumosController = require('./controllers/zumos.controller');
const jwtController = require('./controllers/jwt.controller');
const { check } = require('express-validator');
const cors = require('cors');

// Creao el servidor:
const server = express();

// Middleware:
server.use(helmet());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(jwtController.checkToken);
server.use(cors());

// server.use(express.static('static'));


// Endpoints --> 5 por cada tabla:
// Get all:
server.get('/products', productosController.listProducts);
// Get detail:
server.get('/product/:id', productosController.getSingleProduct);
// Añadir productos:
server.post('/newProduct', [
    check('categorías').isString().escape().trim(),
], productosController.createSingleProduct);
//Modificar un producto existente:
server.put('/updateProduct', [
    check('categorías').isString().escape().trim(),
    check('id').isNumeric()
], productosController.updateSingleProduct);
//Eliminar un producto
server.delete('/product/:id', productosController.deleteSingleProduct)

server.get('/juices/list', zumosController.listJuices);
server.get('/juice/:id', zumosController.getSingleJuiceByID);
server.post('/newJuice', [
    check('nombre').isString().escape().trim(),
    check('tipo').isString().escape().trim()
], zumosController.createNewJuice);
server.put('/updateJuice', [
    check('nombre').isString().escape().trim(),
    check('tipo').isString().escape().trim(),
    check('id').isNumeric()
], zumosController.updateSingleJuice);
server.delete('/juice/:id', zumosController.deleteSingleJuice);

server.get('/aceite/list', aceiteController.listAceite);
server.get('/aceite/:id', aceiteController.getSingleAceiteByID);
server.post('/newAceite', [
    check('nombre').isString().escape().trim(),
    check('tipo').isString().escape().trim(),
    check('fk_productos').isNumeric()
], aceiteController.createNewAceite);
server.put('/updateAceite', [
    check('nombre').isString().escape().trim(),
    check('tipo').isString().escape().trim(),
    check('id').isNumeric()
], aceiteController.updateSingleAceite);
server.delete('/aceite/:id', aceiteController.deleteSingleAceite);

server.get('/providers', provedoresController.listProviders);
server.get('/provider/:id', provedoresController.getSingleProvider);
server.post('/newProvider', provedoresController.newProvider);
server.put('/updateProvider', provedoresController.updateSingleProvider);
server.delete('/provider/:id', provedoresController.deleteSingleProvider);

server.post('/login', provedoresController.login);

server.get('/', (req, res) => {
    res.send("¡Bienvenido!")
})


// Listening:
const PORT = process.argv[2]

server.listen(PORT, () => {
    console.log(`Servidor listo en el puerto ${PORT}`)
})
