const express = require('express');
const router = express.Router();
const horasController = require('../controllers/horas');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para periodos
router.get('/', verificarToken, extractDbConfig, horasController.obtenerHorasEmpleado);

router.post('/', verificarToken, extractDbConfig, horasController.agregarHorasEmpleado);

router.delete('/', verificarToken, extractDbConfig, horasController.bajaHorasEmpleado);


module.exports = router;
