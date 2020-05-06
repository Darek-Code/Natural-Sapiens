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
server.use(cors());
server.use(helmet());
server.use(bodyParser.json());
server.use(cookieParser());
//server.use(jwtController.checkToken);
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// server.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// });

// server.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header("Access-Control-Allow-Headers", "x-requested-with, content-type");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Max-Age", "1000000000");
//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) { res.send(200); } else { next(); }
// });

// res.header('Access-Control-Allow-Origin', '*');
// res.header('Access-Control-Allow-Headers', 'content-type');
// res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

// server.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// });

//server.use(cors());
// Configurar cabeceras y cors


//server.use(jwtController.checkToken);
// server.use(express.static('static'));

server.get('/productosPorCategoria', productosController.listProductsByCategoryID);
server.get('/categorias', productosController.listCategories);
// Endpoints --> 5 por cada tabla:
// Get all:

server.get('/productos', productosController.listProducts);
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
server.delete('/deleteprovider/:id', provedoresController.deleteSingleProvider);

server.post('/login', provedoresController.login);

server.get('/', (req, res) => {
    res.send("¡Bienvenido!")
})


// Listening:
const PORT = process.argv[2]

server.listen(PORT, () => {
    console.log(`Servidor listo en el puerto -> ${PORT}`)
})
