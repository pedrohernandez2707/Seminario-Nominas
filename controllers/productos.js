const { Pool } = require('pg');

// Configuración de conexión a la base de datos PostgreSQL
// const pool = new Pool({
//   user: 'postgres',
//   host: 'containers-us-west-163.railway.app',
//   database: 'railway',
//   password: 'nCnJ19BMOH6EYooaRuB9',
//   port: 7335,
// });

// Endpoint para obtener todos los usuarios

async function obtenerProductos(req, res) {

  const {dbConfig } = req;
  
  //console.log(dbConfig)

  const pool = new Pool(dbConfig)

    try {
        const result = await pool.query('SELECT id_producto, descripcion, precio, fecha FROM productos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

async function obtenerProductosCombo(req, res) {

  const {dbConfig } = req;
  
  //console.log(dbConfig)

  const pool = new Pool(dbConfig)

    try {
        const result = await pool.query('SELECT id_producto as value, descripcion as label, precio FROM productos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

// Endpoint para agregar todos los usuarios
async function agregarProducto(req, res) {
    const { descripcion, precio} = req.body;

    const {dbConfig } = req;

    const pool = new Pool(dbConfig)
    
    try {
      const result = await pool.query('INSERT INTO productos (descripcion, precio) VALUES ($1, $2) RETURNING *', [descripcion, precio]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar el producto' });
    }
}


// Endpoint para actualizar un usuario por ID
async function actualizarProducto(req, res) {
    const {id, descripcion, precio } = req.body;
   
    const {dbConfig } = req;

    const pool = new Pool(dbConfig)
   
    try {
      const result = await pool.query('UPDATE productos SET descripcion = $1, precio = $2 WHERE id_producto = $3 RETURNING *', [descripcion, precio, id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
}

module.exports = {
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  obtenerProductosCombo
};
