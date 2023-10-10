const express = require('express');
const router = express.Router();
const aportesController = require('../controllers/aportes');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para aportes de empleado
router.get('/', verificarToken, extractDbConfig, aportesController.obtenerAportes);

router.post('/', verificarToken, extractDbConfig, aportesController.agregarAportes);

router.delete('/', verificarToken, extractDbConfig, aportesController.bajaAportes);


module.exports = router;
