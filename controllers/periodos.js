const { Pool } = require('pg');



async function obtenerPeriodos(req, res) {

  const {dbConfig } = req;
  
  const pool = new Pool(dbConfig)

    try {
      const result = await pool.query(`SELECT t.descripcion, p.* FROM periodos p inner join tipo_periodo t on t.id = p.periodo ORDER BY estado, periodo, mes, "año"`);
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

async function cerrarPeriodo(req, res){

  const { periodo} = req.body;

  const { dbConfig } = req;

  const pool = new Pool(dbConfig)



  try {

    const resul = await pool.query('select * from nomina where periodo = $1',[periodo]);

    if(resul.rows.length === 0){
      return res.status(400).json({mensaje: 'No existe ningun registro en la nomina, no es posible cerrar el periodo'});
    }

    const result = await pool.query(`update periodos set estado = 'G' where id = $1`, [periodo]);
    res.status(200).json({result});
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar: ' + error });
  }

}

module.exports = {
  obtenerPeriodos,
  agregarPeriodo,
  obtenerPeriodosActivo,
  cerrarPeriodo
};
