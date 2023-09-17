const { Pool } = require('pg');

// Configuración de conexión a la base de datos PostgreSQL
const masterPool = new Pool({
  user: 'postgres',
  host: 'containers-us-west-187.railway.app',
  database: 'railway',
  password: 'eM1b0LjN5WDqCk7M1l5j',
  port: 7223,
});

// Endpoint para obtener todos los usuarios

async function obtenerEmpresas(req, res) {

  //const {dbConfig } = req;
  
  //console.log(dbConfig)

    try {
        const result = await masterPool.query('SELECT id, nombre, logo_url FROM list_empresas WHERE estado = true');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la lista de Empresas' });
    }
}


module.exports = {
  obtenerEmpresas,
};
