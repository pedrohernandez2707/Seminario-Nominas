const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleado');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 
const upload = require('../middleware/multerConfig'); // Importa la configuración de multer


// Ruta para obtener todos los empleados
router.get('/', verificarToken, extractDbConfig, empleadosController.obtenerEmpleados);
router.get('/combo', verificarToken, extractDbConfig, empleadosController.obtenerEmpleadosCombo);
router.get('/byID', verificarToken, extractDbConfig, empleadosController.obtenerEmpleadosCombo);
router.get('/familiar', verificarToken, extractDbConfig, empleadosController.obtenerFamiliares);
router.get('/famEmpleado', verificarToken, extractDbConfig, empleadosController.obtenerFamiliaresEmpleado);
router.get('/obtenerDocs', verificarToken, extractDbConfig, empleadosController.obtenerDocs);


// Ruta para agregar un empleado
router.post('/', verificarToken, extractDbConfig, empleadosController.agregarEmpleado);
router.post('/familiar', verificarToken, extractDbConfig, empleadosController.agregarFamiliar);
router.post('/asignar', verificarToken, extractDbConfig, empleadosController.asignarFamiliar);
router.post('/desasignar', verificarToken, extractDbConfig, empleadosController.desasignarFamiliar);
router.post('/imagen', verificarToken, extractDbConfig, upload.single('File'), empleadosController.savePhoto);
router.post('/saveDoc', verificarToken, extractDbConfig, upload.single('File'), empleadosController.saveDoc);

// Ruta para actualizar un empleado por ID
router.put('/', verificarToken, extractDbConfig, empleadosController.actualizarEmpleado);

module.exports = router;
