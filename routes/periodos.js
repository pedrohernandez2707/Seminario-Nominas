const express = require('express');
const router = express.Router();
const periodosController = require('../controllers/periodos');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para periodos
router.get('/', verificarToken, extractDbConfig, periodosController.obtenerPeriodos);
router.get('/activo', verificarToken, extractDbConfig, periodosController.obtenerPeriodosActivo);


router.post('/', verificarToken, extractDbConfig, periodosController.agregarPeriodo);



module.exports = router;
