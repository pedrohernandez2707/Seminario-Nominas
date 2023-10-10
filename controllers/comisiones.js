const { Pool } = require('pg');



async function obtenerComisionesEmpleado(req, res) {

  try {
    
    const {dbConfig } = req;

    const idEmpleado = req.query.idEmpleado
    const idPeriodo = req.query.idPeriodo
        
    const pool = new Pool(dbConfig)

    const result = await pool.query(`SELECT * FROM comisiones_empleado WHERE id_empleado = $1 and id_periodo = $2`, [idEmpleado, idPeriodo]);
    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener: ' + error  });
  }
}


function calcularComision(ventas) {

  if (ventas >= 0 && ventas <= 100000) {
    return ventas * 0.0;
  } else if (ventas >= 100001 && ventas <= 200000) {
    return ventas * 0.025;
  } else if (ventas >= 200001 && ventas <= 400000) {
    return ventas * 0.035;
  } else if (ventas > 400000) {
    return ventas * 0.045;
  } else {
    return 0; // Ventas negativas o no válidas
  }
}


async function agregarComisionesEmpleado(req, res) {

  try {

    const {dbConfig } = req;
    
    const pool = new Pool(dbConfig)

    const {idEmpleado, venta, idPeriodo} = req.body
    
    const comision = calcularComision(venta)
  
  
    const result = await pool.query(
      'INSERT INTO comisiones_empleado(id_empleado, comision, id_periodo) VALUES ($1, $2, $3)', 
      [idEmpleado, comision, idPeriodo]
    );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al insertar: ' + error  });
  }
}




async function bajaComisionesEmpleado(req, res) {

  try {
    
    const {dbConfig } = req;

    const idEmpleado = req.query.idEmpleado
    const idPeriodo = req.query.idPeriodo
        
    
    const pool = new Pool(dbConfig)

    const result = await pool.query(`DELETE FROM comisiones_empleado WHERE id_empleado = $1 and id_periodo = $2`, [idEmpleado, idPeriodo]);
    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar: ' + error  });
  }
}


async function obtenerEmpleadosCombo(req, res) {
  // Obtiene la configuración de conexión dinámica desde el token
  const dbConfig = req.dbConfig;

  // Configura la conexión a la base de datos utilizando la configuración dinámica
  const pool = new Pool(dbConfig);

  try {
    const query = `SELECT id as value, CONCAT(nombres, ' ', apellidos) as label FROM Empleados
    where departamento = 3`; //departamento de ventas
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los empleados' });
  }
}


module.exports = {
  agregarComisionesEmpleado,
  obtenerComisionesEmpleado,
  bajaComisionesEmpleado,
  obtenerEmpleadosCombo
};
