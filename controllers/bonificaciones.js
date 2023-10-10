const { Pool } = require('pg');



async function obtenerBonificacionesEmpleado(req, res) {

  try {
    
    const {dbConfig } = req;

    const idEmpleado = req.query.idEmpleado
    const idPeriodo = req.query.idPeriodo
        
    const pool = new Pool(dbConfig)

    const result = await pool.query(`SELECT * FROM bonificaciones_empleado WHERE id_empleado = $1 and id_periodo = $2`, [idEmpleado, idPeriodo]);
    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener: ' + error  });
  }
}


function calcularBonificacion(piezas) {

  if (piezas >= 0) {

    return piezas * 0.05
    
  } else {
    return 0; //negativas o no válidas
  }
}


async function agregarBonificacionesEmpleado(req, res) {

  try {

    const {dbConfig } = req;
    
    const pool = new Pool(dbConfig)

    const {idEmpleado, piezas, idPeriodo} = req.body
    
    const bono = calcularBonificacion(piezas)
  
  
    const result = await pool.query(
      'INSERT INTO bonificaciones_empleado(id_empleado, bonificacion, id_periodo) VALUES ($1, $2, $3)', 
      [idEmpleado, bono, idPeriodo]
    );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al insertar: ' + error  });
  }
}




async function bajaBonificacionesEmpleado(req, res) {

  try {
    
    const {dbConfig } = req;

    const idEmpleado = req.query.idEmpleado
    const idPeriodo = req.query.idPeriodo
        
    
    const pool = new Pool(dbConfig)

    const result = await pool.query(`DELETE FROM bonificaciones_empleado WHERE id_empleado = $1 and id_periodo = $2`, [idEmpleado, idPeriodo]);
    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar: ' + error  });
  }
}


async function obtenerEmpleadosCombo(req, res) {
  const dbConfig = req.dbConfig;

  const pool = new Pool(dbConfig);

  try {

    const query = `SELECT id as value, CONCAT(nombres, ' ', apellidos) as label FROM Empleados
    where departamento = 4`; //departamento de produccion
    const result = await pool.query(query);
    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los empleados' });
  }
}


module.exports = {
  agregarBonificacionesEmpleado,
  obtenerBonificacionesEmpleado,
  bajaBonificacionesEmpleado,
  obtenerEmpleadosCombo
};
