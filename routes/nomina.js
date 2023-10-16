const express = require('express');
const router = express.Router();
const nominaController = require('../controllers/nomina');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para generacion de nomina

router.get('/', verificarToken, extractDbConfig, nominaController.imprimirNomina);

router.post('/', verificarToken, extractDbConfig, nominaController.generarNomina);



module.exports = router;
