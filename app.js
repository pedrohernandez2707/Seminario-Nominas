const express = require('express');
const bodyParser = require('body-parser');
const usuariosRoutes = require('./routes/usuarios'); // Rutas de usuarios
const loginRoutes = require('./routes/login'); // Rutas de login
const empresasRoutes = require('./routes/empresas'); // Rutas de empresa
const empleadoRoutes = require('./routes/empleado'); // Rutas de empleados
const productosRoutes = require('./routes/productos'); // Rutas de productos
const compraEncRoutes = require('./routes/comprasEnc'); // Rutas de comprasEnc
const compraDetRoutes = require('./routes/comprasDet'); // Rutas de comprasDet
const puestosRoutes = require('./routes/puestos'); // Rutas de puestos y departamentos
const periodosRoutes = require('./routes/periodos'); // Rutas de periodos
const horasRoutes = require('./routes/horas'); // Rutas de horas extras y dobles
const comisionesRoutes = require('./routes/comisiones'); // Rutas de comisiones
const bonificacionesRoutes = require('./routes/bonificaciones'); // Rutas de bonificaciones
const reporteDiasRoutes = require('./routes/reporteDias'); // Rutas para el reporte de dias
const aportesRoutes = require('./routes/aportes'); // Rutas para el reporte de dias

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json({limit: '20mb'}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Usar las rutas en la aplicacion
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/empresas', empresasRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/compraEnc', compraEncRoutes);
app.use('/api/compraDet', compraDetRoutes);
app.use('/api/puestos', puestosRoutes);
app.use('/api/periodos', periodosRoutes);
app.use('/api/horas', horasRoutes);
app.use('/api/comisiones', comisionesRoutes);
app.use('/api/bonificaciones', bonificacionesRoutes);
app.use('/api/dias', reporteDiasRoutes);
app.use('/api/aportes', aportesRoutes);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
