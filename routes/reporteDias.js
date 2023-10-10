const express = require('express');
const router = express.Router();
const reporteDiasController = require('../controllers/reporteDias');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para reportar dias
router.get('/', verificarToken, extractDbConfig, reporteDiasController.obtenerReporteHoras);

router.post('/', verificarToken, extractDbConfig, reporteDiasController.agregarReporteDias);

router.delete('/', verificarToken, extractDbConfig, reporteDiasController.bajaReporteDias);


module.exports = router;
