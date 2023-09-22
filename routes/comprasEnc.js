const express = require('express');
const router = express.Router();
const compraEncController = require('../controllers/comprasEnc');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para usuarios
router.get('/', verificarToken, extractDbConfig, compraEncController.obtenerCompraEnc);
router.post('/', verificarToken, extractDbConfig, compraEncController.agregarCompraEnc);



module.exports = router;
