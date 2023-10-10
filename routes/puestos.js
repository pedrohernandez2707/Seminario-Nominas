const express = require('express');
const router = express.Router();
const puestosController = require('../controllers/puestos');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para puestos y departamentos
router.get('/', verificarToken, extractDbConfig, puestosController.obtenerPuestos);
router.get('/deptos', verificarToken, extractDbConfig, puestosController.obtenerDeptos);


router.post('/', verificarToken, extractDbConfig, puestosController.agregarPuesto);
router.post('/deptos', verificarToken, extractDbConfig, puestosController.agregarDeptos);



module.exports = router;
