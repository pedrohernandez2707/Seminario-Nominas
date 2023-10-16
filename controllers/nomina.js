const { Pool } = require('pg');



async function generarNomina(req, res) {

  try {
    
    const {dbConfig } = req;

    const {idPeriodo} = req.body
        
    const pool = new Pool(dbConfig)

    const result = await pool.query(`CALL public.generar_nomina_empleados($1)`, [idPeriodo]);
    
    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar la nomina: ' + error  });
  }
}



async function imprimirNomina(req, res) {

  try {
    
    const {dbConfig } = req;

    const idPeriodo = req.query.idPeriodo
        
    const pool = new Pool(dbConfig)

    const result = await pool.query(`SELECT * FROM VDETALLE_NOMINA WHERE periodo = $1 order by departamento, puesto`, [idPeriodo]);

    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener: ' + error  });
  }
}




module.exports = {
  generarNomina,
  imprimirNomina
};
