const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresas');
//const { verificarToken } = require('../middleware/auth'); 
//const extractDbConfig = require('../middleware/decodeToken'); 

// Rutas para login
router.get('/', empresasController.obtenerEmpresas);



module.exports = router;
