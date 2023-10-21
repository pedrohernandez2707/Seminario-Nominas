const { Pool } = require('pg');
const cloudinary = require('../middleware/clodinaryConfig');


async function obtenerEmpleados(req, res) {
  // Obtiene la configuración de conexión dinámica desde el token
  const dbConfig = req.dbConfig;

  // Configura la conexión a la base de datos utilizando la configuración dinámica
  const pool = new Pool(dbConfig);

  try {
    const query = `SELECT *,  CASE WHEN estado = 'A' THEN true ELSE false END AS estado2 FROM Empleados Order by id`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los empleados' });
  }
}



async function obtenerFamiliaresEmpleado(req, res) {

  try {
    

    const idEmpleado = req.query.idEmpleado;

    if(!idEmpleado){
      return res.status(400).json({ mensaje: 'Debe Enviar el Id Empleado' });
    }

    const dbConfig = req.dbConfig;


    const pool = new Pool(dbConfig);


    const query = `SELECT *
    FROM Vempleados_familiares
    where empleados_id = $1`;

    const values = [idEmpleado]

    const result = await pool.query(query, values);

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los empleados_familiares' });
  }
}



async function obtenerFamiliares(req, res) {
  // Obtiene la configuración de conexión dinámica desde el token
  const dbConfig = req.dbConfig;

  // Configura la conexión a la base de datos utilizando la configuración dinámica
  const pool = new Pool(dbConfig);

  try {
    const query = `SELECT * FROM Familiares
                  ORDER BY id DESC
                  LIMIT 25`;

    const result = await pool.query(query);

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los familiares' });
  }
}


async function obtenerEmpleadosCombo(req, res) {
  // Obtiene la configuración de conexión dinámica desde el token
  const dbConfig = req.dbConfig;

  // Configura la conexión a la base de datos utilizando la configuración dinámica
  const pool = new Pool(dbConfig);

  try {
    const query = `SELECT id as value, CONCAT(nombres, ' ', apellidos) as label FROM Empleados`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los empleados' });
  }
}

async function obtenerEmpleadobyID(req, res) {
  // Obtiene la configuración de conexión dinámica desde el token
  const dbConfig = req.dbConfig;

  const { idEmpleado } = req.query.idEmpleado

  if(!idEmpleado){
    return res.status(400).json({ mensaje: 'No se proporcionó un Id de Empleado' });
  }

  // Configura la conexión a la base de datos utilizando la configuración dinámica
  const pool = new Pool(dbConfig);

  try {
    const query = `SELECT id as value, CONCAT(nombres, ' ', apellidos) as label 
    FROM Empleados
    WHERE ID = $1
    `;

    const values = [idEmpleado]

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los empleados' });
  }
}

async function agregarEmpleado(req, res) {

  const { Nombres, Apellidos, Telefono, Direccion, Dpi, Afiliacion_Igss, Estado_Civil, Fecha_Nacimiento, FechaContratacion, FechaBaja, Estado, Photo_Url, Puesto, Departamento, Sueldo } = req.body;

  // Obtiene la configuración de conexión dinámica desde el token
  const dbConfig = req.dbConfig;

  // Configura la conexión a la base de datos utilizando la configuración dinámica
  const pool = new Pool(dbConfig);

  try {
    const query = `
      INSERT INTO Empleados (Nombres, Apellidos, Telefono, Direccion, Dpi, AfiliacionIgss, EstadoCivil, Fecha_Nacimiento, FechaContratacion, FechaBaja, Estado, PhotoUrl, Puesto, Departamento, Sueldo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`;

    const values = [Nombres, Apellidos, Telefono, Direccion, Dpi, Afiliacion_Igss, Estado_Civil, Fecha_Nacimiento, FechaContratacion, FechaBaja, Estado, Photo_Url, Puesto, Departamento, Sueldo];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar el empleado' });
  }
}




async function agregarFamiliar(req, res) {

  const { Tipo, Genero, Telefono, Nombre} = req.body;

  const dbConfig = req.dbConfig;

  const pool = new Pool(dbConfig);

  try {

    const query = `
    INSERT INTO familiares (tipo, genero, nombre, telefono)
    values
    ($1, $2, $3, $4) RETURNING *`;

    const values = [Tipo, Genero, Nombre, Telefono];

    const result = await pool.query(query, values);

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar el Familiar' });
  }
}


async function desasignarFamiliar(req, res){
  try {

    const { idEmpleado, idFamiliar} = req.body;

    if(!idEmpleado || !idFamiliar){
      return res.status(400).json({mensaje: 'Faltan datos'})
    }

    const dbConfig = req.dbConfig;

    const pool = new Pool(dbConfig);

    const query = `DELETE FROM empleados_familiares 
    WHERE empleados_id = $1 AND familiares_id =$2`;

    const values = [idEmpleado, idFamiliar];

    const result = await pool.query(query, values);

    res.json(result.rows[0]);

    
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al subir el archivo' });
  }
}



async function asignarFamiliar(req, res) {

  try {

    const { idEmpleado, idFamiliar} = req.body;

    
    if(!idEmpleado || !idFamiliar){
      return res.status(400).json({mensaje: 'Faltan datos'})
    }

    const dbConfig = req.dbConfig;

    const pool = new Pool(dbConfig);

  
    const query = `
    INSERT INTO empleados_familiares (empleados_id, familiares_id)
    values
    ($1, $2) RETURNING *`;

    const values = [idEmpleado, idFamiliar];

    const result = await pool.query(query, values);

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al asignar el Familiar' });
  }
}





async function actualizarEmpleado(req, res) {
  const { Id, Nombres, Apellidos, Telefono, Direccion, Dpi, Afiliacion_Igss, Estado_Civil, Fecha_Nacimiento, FechaContratacion, FechaBaja, Estado, Puesto, Departamento, Sueldo } = req.body;
  // Obtiene la configuración de conexión dinámica desde el token
  const dbConfig = req.dbConfig;

  // Configura la conexión a la base de datos utilizando la configuración dinámica
  const pool = new Pool(dbConfig);

  try {
    const query = `
      UPDATE Empleados
      SET Nombres = $1, Apellidos = $2, Telefono = $3, Direccion = $4, Dpi = $5, AfiliacionIgss = $6, EstadoCivil = $7, Fecha_Nacimiento = $8, FechaContratacion = $9, FechaBaja = $10, Estado = $11, Puesto = $12, Departamento = $13, Sueldo = $14
      WHERE Id = $15 RETURNING *`;

    const values = [Nombres, Apellidos, Telefono, Direccion, Dpi, Afiliacion_Igss, Estado_Civil, Fecha_Nacimiento, FechaContratacion, FechaBaja, Estado, Puesto, Departamento, Sueldo, Id];
    
    const result = await pool.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el empleado' });
  }
}




  
async function savePhoto(req, res) {

  let secure_url = '';

  const { Id }  = req.body

  if(!Id){
    return res.status(400).json({ message: 'No se proporcionó un Id de Empleado' });
  }
  
  try {
    if (!req.body.base64) {
      return res.status(400).json({ message: 'No se proporcionó un archivo' });
    }
    
    const base64 = req.body.base64
    // Sube el archivo a Cloudinary
    const result = await cloudinary.uploader.upload(base64, {folder:'Empleados_Fotos'}, (error, result)=>{
      if(error){
      }else{
        //console.log('Imagen Subida Correctamente', result);
        secure_url = result.secure_url;
      }
    })

    const dbConfig = req.dbConfig;
    const pool = new Pool(dbConfig);

    const query = `
    UPDATE Empleados
    SET photourl = $1
    WHERE Id = $2 RETURNING *`;

    const values = [secure_url, Id];
  
    const result2 = await pool.query(query, values);

    return res.status(200).json({url : secure_url}) 


  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al subir el archivo' });
  }
}


async function obtenerDocs(req, res) {

  try {
    
    const idEmpleado = req.query.idEmpleado;

    if(!idEmpleado){
      return res.status(400).json({ mensaje: 'Debe Enviar el Id Empleado' });
    }

    const dbConfig = req.dbConfig;

    const pool = new Pool(dbConfig);

    const query = `SELECT *
    FROM documentosempleado
    where idempleado = $1`;

    const values = [idEmpleado]

    const result = await pool.query(query, values);

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los documentos empleado' });
  }
}




 
async function saveDoc(req, res) {

  let secure_url = '';

  const {Id, Tipo} = req.body;

  if(!Id){
    return res.status(400).json({ mensaje: 'No se proporcionó un Id de Empleado' });
  }

  if(!Tipo){
    return res.status(400).json({ mensaje: 'No se proporcionó un Tipo de documento' });
  }
  
  try {
    if (!req.body.base64) {
      return res.status(400).json({ mensaje: 'No se proporcionó un archivo' });
    }
    
    const base64 = req.body.base64
    // Sube el archivo a Cloudinary
    const result = await cloudinary.uploader.upload(base64, {folder:'Empleados_Docs', resource_type: 'auto', format:'pdf', maxFileSize: 10 * 1024 * 1024}, (error, result)=>{
      if(error){
      }else{
        secure_url = result.secure_url;
      }
    })

    const dbConfig = req.dbConfig;
    const pool = new Pool(dbConfig);

    const query = `INSERT INTO documentosempleado
    (idempleado, tipo, url)
    values($1, $2, $3)`;

    const values = [Id, Tipo, secure_url];
  
    await pool.query(query, values);

    return res.status(200).json({url : secure_url}) 

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al subir el archivo' });
  }
}



async function empleadoDash(req, res) {
  const dbConfig = req.dbConfig;

  const pool = new Pool(dbConfig);

  try {
    const query = `SELECT * FROM vempleados_dash LIMIT 8`;

    const result = await pool.query(query);

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los empleados' });
  }
}


module.exports = {
  obtenerEmpleados,
  agregarEmpleado,
  actualizarEmpleado,
  obtenerEmpleadosCombo,
  savePhoto,
  obtenerEmpleadobyID,
  agregarFamiliar,
  obtenerFamiliares,
  obtenerFamiliaresEmpleado,
  asignarFamiliar,
  desasignarFamiliar,
  saveDoc,
  obtenerDocs,
  empleadoDash

};
