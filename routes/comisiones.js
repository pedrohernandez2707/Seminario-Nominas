const express = require('express');
const router = express.Router();
const comisionesController = require('../controllers/comisiones');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para periodos
router.get('/', verificarToken, extractDbConfig, comisionesController.obtenerComisionesEmpleado);
router.get('/empleado', verificarToken, extractDbConfig, comisionesController.obtenerEmpleadosCombo);

router.post('/', verificarToken, extractDbConfig, comisionesController.agregarComisionesEmpleado);

router.delete('/', verificarToken, extractDbConfig, comisionesController.bajaComisionesEmpleado);


module.exports = router;
