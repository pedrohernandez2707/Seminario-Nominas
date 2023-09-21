const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleado');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Ruta para obtener todos los empleados
router.get('/', verificarToken, extractDbConfig, empleadosController.obtenerEmpleados);

// Ruta para agregar un empleado
router.post('/', verificarToken, extractDbConfig, empleadosController.agregarEmpleado);

// Ruta para actualizar un empleado por ID
router.put('/', verificarToken, extractDbConfig, empleadosController.actualizarEmpleado);

module.exports = router;
