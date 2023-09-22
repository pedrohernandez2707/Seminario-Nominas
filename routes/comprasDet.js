const express = require('express');
const router = express.Router();
const compraDetController = require('../controllers/comprasDet');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para usuarios
router.post('/id', verificarToken, extractDbConfig, compraDetController.obtenerCompraDet);
router.post('/', verificarToken, extractDbConfig, compraDetController.agregarCompraDet);



module.exports = router;
