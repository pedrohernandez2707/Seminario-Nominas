const express = require('express');
const bodyParser = require('body-parser');
const usuariosRoutes = require('./routes/usuarios'); // Rutas de usuarios
const loginRoutes = require('./routes/login'); // Rutas de usuarios
const empresasRoutes = require('./routes/empresas'); // Rutas de usuarios
const empleadoRoutes = require('./routes/empleado'); // Rutas de usuarios

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Usar las rutas de usuarios
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/empresas', empresasRoutes);
app.use('/api/empleado', empleadoRoutes);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
