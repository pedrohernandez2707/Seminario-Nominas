const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios');
const { verificarToken } = require('../middleware/auth'); 
const extractDbConfig = require('../middleware/extractDbConfig'); 

// Rutas para usuarios
router.get('/', verificarToken, extractDbConfig, usuariosController.obtenerUsuarios);
router.post('/', verificarToken, extractDbConfig, usuariosController.agregarUsuario);
router.post('/clave', verificarToken, extractDbConfig, usuariosController.actualizarClave);
router.put('/', verificarToken, extractDbConfig, usuariosController.actualizarUsuario);



module.exports = router;
