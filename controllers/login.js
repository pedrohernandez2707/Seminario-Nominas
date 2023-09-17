const { generarToken } = require('../middleware/auth');
const { Pool } = require('pg');

// Configuración de conexión a la base de datos PostgreSQL

const masterPool = new Pool({
  user: 'postgres',
  host: 'containers-us-west-187.railway.app',
  database: 'railway',
  password: 'eM1b0LjN5WDqCk7M1l5j',
  port: 7223,
});

async function iniciarSesion(req, res) {

  const { email, contraseña, idEmpresa } = req.body;

  try {
    
      const query = 'SELECT * FROM list_empresas where id = $1';
      const result = await masterPool.query(query,[idEmpresa]);

      if (result.rows.length === 0){
        return res.status(400).json({ mensaje: 'Empresa Invalida' });
      }


      const pool = new Pool({
        user: result.rows[0].user,
        host: result.rows[0].host,
        database: result.rows[0].db,
        password: result.rows[0].pass,
        port: result.rows[0].port,
      });


      const dbConfig ={
        user: result.rows[0].user,
        host: result.rows[0].host,
        database: result.rows[0].db,
        password: result.rows[0].pass,
        port: result.rows[0].port,
      };

    
      // Consultar la base de datos para verificar las credenciales
      const query2 = 'SELECT id FROM usuarios WHERE email = $1 AND contraseña = $2';
      const result2 = await pool.query(query2, [email, contraseña]);
  
      if (result2.rows.length === 0) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
  
      const usuarioId = result2.rows[0].id;

      const dynamicDbConfig = { ...dbConfig, database: dbConfig.database };

      const token = generarToken(usuarioId, dynamicDbConfig); // Generar un token
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en la autenticación' });
    }
  }

module.exports = {
  iniciarSesion,
};