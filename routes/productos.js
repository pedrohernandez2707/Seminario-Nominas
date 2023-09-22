const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para usuarios
router.get('/', verificarToken, extractDbConfig, productosController.obtenerProductos);
router.get('/combo', verificarToken, extractDbConfig, productosController.obtenerProductosCombo);

router.post('/', verificarToken, extractDbConfig, productosController.agregarProducto);

router.put('/', verificarToken, extractDbConfig, productosController.actualizarProducto);



module.exports = router;
