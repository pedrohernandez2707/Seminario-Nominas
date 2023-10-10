const { Pool } = require('pg');



async function obtenerPuestos(req, res) {

  const {dbConfig } = req;
  
  //console.log(dbConfig)

  const pool = new Pool(dbConfig)

    try {
      const result = await pool.query('SELECT id as value, nombre as label FROM puestos');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener los puestos: ' + error  });
    }
}


// Endpoint para agregar todos los usuarios
async function agregarPuesto(req, res) {

    const { nombre} = req.body;

    const { dbConfig } = req;

    const pool = new Pool(dbConfig)

    try {

      const result = await pool.query('SELECT * FROM puestos WHERE UPPER(nombre) = UPPER($1)', [nombre]);
      
      if(result.rows.length >0){
        return res.status(400).json({mensaje: 'Error el Puesto ya Existe!'})
      }
      
    } catch (error) {
      return res.status(400).json({mensaje: 'Error al agregar el puesto: ' + error})
    }
    
    try {
      const result = await pool.query('INSERT INTO puestos (nombre) VALUES ($1) RETURNING *', [nombre]);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al agregar el puesto: ' + error });
    }
}





async function obtenerDeptos(req, res) {

  const {dbConfig } = req;
  
  //console.log(dbConfig)

  const pool = new Pool(dbConfig)

    try {
        const result = await pool.query('SELECT id as value, nombre as label FROM departamentos');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los departamentos: ' + error  });
    }
}


// Endpoint para agregar todos los usuarios
async function agregarDeptos(req, res) {

    const { nombre} = req.body;

    const { dbConfig } = req;

    const pool = new Pool(dbConfig)

    try {

      const result = await pool.query('SELECT * FROM departamentos WHERE UPPER(nombre) = UPPER($1)', [nombre]);
      if(result.rows.length >0){
        return res.status(400).json({mensaje: 'Error el Departamento ya Existe!'})
      }
      
    } catch (error) {
      return res.status(400).json({mensaje: 'Error al agregar el departamento: ' + error})
    }
    
    try {
      const result = await pool.query('INSERT INTO departamentos (nombre) VALUES ($1) RETURNING *', [nombre]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al agregar el departamento: ' + error });
    }
}


module.exports = {
  obtenerPuestos,
  agregarPuesto,
  agregarDeptos,
  obtenerDeptos
};
