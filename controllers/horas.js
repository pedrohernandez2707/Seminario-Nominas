const { Pool } = require('pg');



async function agregarHorasEmpleado(req, res) {

  try {

    const {dbConfig } = req;
    
    const pool = new Pool(dbConfig)

    const {idEmpleado, horasExtras, horasDobles, idPeriodo} = req.body
  
    
    const result = await pool.query(
      'INSERT INTO horas_empleado(id_empleado, horas_extas, horas_dobles, id_periodo) VALUES ($1, $2, $3, $4)', 
      [idEmpleado, horasExtras, horasDobles, idPeriodo]
    );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al insertar: ' + error  });
  }
}


async function obtenerHorasEmpleado(req, res) {

  try {
    
    const {dbConfig } = req;

    const idEmpleado = req.query.idEmpleado
    const idPeriodo = req.query.idPeriodo
        
    
    const pool = new Pool(dbConfig)

    const result = await pool.query(`SELECT * FROM horas_empleado WHERE id_empleado = $1 and id_periodo = $2`, [idEmpleado, idPeriodo]);
    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener: ' + error  });
  }
}


async function bajaHorasEmpleado(req, res) {

  try {
    
    const {dbConfig } = req;

    const idEmpleado = req.query.idEmpleado
    const idPeriodo = req.query.idPeriodo
        
    
    const pool = new Pool(dbConfig)

    const result = await pool.query(`DELETE FROM horas_empleado WHERE id_empleado = $1 and id_periodo = $2`, [idEmpleado, idPeriodo]);
    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar: ' + error  });
  }
}



module.exports = {
  agregarHorasEmpleado,
  obtenerHorasEmpleado,
  bajaHorasEmpleado
};
