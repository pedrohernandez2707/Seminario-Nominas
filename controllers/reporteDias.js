const { Pool } = require('pg');



async function obtenerReporteHoras(req, res) {

  try {
    
    const {dbConfig } = req;

    const idEmpleado = req.query.idEmpleado
    const idPeriodo = req.query.idPeriodo
        
    const pool = new Pool(dbConfig)

    const result = await pool.query(`SELECT * FROM reporte_horas_empleado WHERE id_empleado = $1 and id_periodo = $2`, [idEmpleado, idPeriodo]);
    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener: ' + error  });
  }
}



async function agregarReporteDias(req, res) {

  try {

    const {dbConfig } = req;
    
    const pool = new Pool(dbConfig)

    const {idEmpleado, dias, idPeriodo} = req.body
      
  
    const result = await pool.query(
      'INSERT INTO reporte_horas_empleado(id_empleado, reporte_dias, id_periodo) VALUES ($1, $2, $3)', 
      [idEmpleado, dias, idPeriodo]
    );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al insertar: ' + error  });
  }
}




async function bajaReporteDias(req, res) {

  try {
    
    const {dbConfig } = req;

    const idEmpleado = req.query.idEmpleado
    const idPeriodo = req.query.idPeriodo
        
    
    const pool = new Pool(dbConfig)

    const result = await pool.query(`DELETE FROM reporte_dias_empleado WHERE id_empleado = $1 and id_periodo = $2`, [idEmpleado, idPeriodo]);
    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar: ' + error  });
  }
}



module.exports = {
  agregarReporteDias,
  obtenerReporteHoras,
  bajaReporteDias,
};
