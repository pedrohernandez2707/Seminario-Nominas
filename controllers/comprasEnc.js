const { Pool } = require('pg');



// Endpoint para obtener todos los usuarios

async function obtenerCompraEnc(req, res) {

  const { compraId } = req.body;


  const {dbConfig } = req;
  
  //console.log(dbConfig)

  const pool = new Pool(dbConfig)

    try {
        const result = await pool.query('SELECT * FROM compra_empleado_enc WHERE codigo_compra = $1', [compraId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

// Endpoint para agregar todos los usuarios
async function agregarCompraEnc(req, res) {

  const { idEmpleado } = req.body;

  const {dbConfig } = req;

  const pool = new Pool(dbConfig)
  
  try {
    const result = await pool.query('INSERT INTO compra_empleado_enc (id_empleado, estado_compra, total) VALUES ($1, $2, $3) RETURNING *', [idEmpleado, 'P', '0.00']);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear una nueva compra' });
  }
}


module.exports = {
  obtenerCompraEnc,
  agregarCompraEnc 
};
