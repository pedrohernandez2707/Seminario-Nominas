const { Pool } = require('pg');



async function obtenerPeriodos(req, res) {

  const {dbConfig } = req;
  
  const pool = new Pool(dbConfig)

    try {
      const result = await pool.query(`SELECT * FROM periodos ORDER BY estado, periodo, mes, "año"`);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener: ' + error  });
    }
}


async function obtenerPeriodosActivo(req, res) {

  const {dbConfig } = req;
  
  const pool = new Pool(dbConfig)

    try {
      const result = await pool.query(`SELECT * FROM periodos WHERE estado = 'A'`);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener: ' + error  });
    }
}


// Endpoint para agregar todos los usuarios
async function agregarPeriodo(req, res) {

    const { periodo, mes, anio} = req.body;

    const { dbConfig } = req;

    const pool = new Pool(dbConfig)

    try {
      const result = await pool.query('CALL sp_Alta_Periodos($1, $2, $3)', [mes, anio, periodo]);
      res.status(200).json({result});
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al agregar: ' + error });
    }
}



module.exports = {
  obtenerPeriodos,
  agregarPeriodo,
  obtenerPeriodosActivo
};
