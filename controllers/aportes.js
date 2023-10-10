const { Pool } = require('pg');



async function obtenerAportes(req, res) {

  try {
    
    const {dbConfig } = req;

    const idEmpleado = req.query.idEmpleado
    const idPeriodo = req.query.idPeriodo
        
    const pool = new Pool(dbConfig)

    const result = await pool.query(`SELECT * FROM aportes_empleado WHERE id_empleado = $1 and id_periodo = $2`, [idEmpleado, idPeriodo]);
    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener: ' + error  });
  }
}



async function agregarAportes(req, res) {

  try {

    const {dbConfig } = req;
    
    const pool = new Pool(dbConfig)

    const {idEmpleado, aporte, idPeriodo} = req.body
      
  
    const result = await pool.query(
      'INSERT INTO aportes_empleado(id_empleado, total_aporte, id_periodo) VALUES ($1, $2, $3)', 
      [idEmpleado, aporte, idPeriodo]
    );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al insertar: ' + error  });
  }
}




async function bajaAportes(req, res) {

  try {
    
    const {dbConfig } = req;

    const idEmpleado = req.query.idEmpleado
    const idPeriodo = req.query.idPeriodo
        
    
    const pool = new Pool(dbConfig)

    const result = await pool.query(`DELETE FROM aportes_empleado WHERE id_empleado = $1 and id_periodo = $2`, [idEmpleado, idPeriodo]);
    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar: ' + error  });
  }
}



module.exports = {
  agregarAportes,
  obtenerAportes,
  bajaAportes,
};
