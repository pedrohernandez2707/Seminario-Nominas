const express = require('express');
const router = express.Router();
const bonificacionesController = require('../controllers/bonificaciones');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para periodos
router.get('/', verificarToken, extractDbConfig, bonificacionesController.obtenerBonificacionesEmpleado);
router.get('/empleado', verificarToken, extractDbConfig, bonificacionesController.obtenerEmpleadosCombo);

router.post('/', verificarToken, extractDbConfig, bonificacionesController.agregarBonificacionesEmpleado);

router.delete('/', verificarToken, extractDbConfig, bonificacionesController.bajaBonificacionesEmpleado);


module.exports = router;
