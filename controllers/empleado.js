const { Pool } = require('pg');

async function obtenerEmpleados(req, res) {
  // Obtiene la configuración de conexión dinámica desde el token
  const dbConfig = req.dbConfig;

  // Configura la conexión a la base de datos utilizando la configuración dinámica
  const pool = new Pool(dbConfig);

  try {
    const query = `SELECT *,  CASE WHEN estado = 'A' THEN true ELSE false END AS estado2 FROM Empleados`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
}

async function agregarEmpleado(req, res) {

  const { Nombres, Apellidos, Telefono, Direccion, Dpi, Afiliacion_Igss, Estado_Civil, Fecha_Nacimiento, FechaContratacion, FechaBaja, Estado, Photo_Url, Puesto, Departamento, Profesion } = req.body;

  // Obtiene la configuración de conexión dinámica desde el token
  const dbConfig = req.dbConfig;

  // Configura la conexión a la base de datos utilizando la configuración dinámica
  const pool = new Pool(dbConfig);

  try {
    const query = `
      INSERT INTO Empleados (Nombres, Apellidos, Telefono, Direccion, Dpi, AfiliacionIgss, EstadoCivil, Fecha_Nacimiento, FechaContratacion, FechaBaja, Estado, PhotoUrl, Puesto, Departamento, Profesion)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`;

    const values = [Nombres, Apellidos, Telefono, Direccion, Dpi, Afiliacion_Igss, Estado_Civil, Fecha_Nacimiento, FechaContratacion, FechaBaja, Estado, Photo_Url, Puesto, Departamento, Profesion];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar el empleado' });
  }
}

async function actualizarEmpleado(req, res) {
  const { Id, Nombres, Apellidos, Telefono, Direccion, Dpi, Afiliacion_Igss, Estado_Civil, Fecha_Nacimiento, FechaContratacion, FechaBaja, Estado, Photo_Url, Puesto, Departamento, Profesion } = req.body;
  // Obtiene la configuración de conexión dinámica desde el token
  const dbConfig = req.dbConfig;

  // Configura la conexión a la base de datos utilizando la configuración dinámica
  const pool = new Pool(dbConfig);

  try {
    const query = `
      UPDATE Empleados
      SET Nombres = $1, Apellidos = $2, Telefono = $3, Direccion = $4, Dpi = $5, AfiliacionIgss = $6, EstadoCivil = $7, Fecha_Nacimiento = $8, FechaContratacion = $9, FechaBaja = $10, Estado = $11, PhotoUrl = $12, Puesto = $13, Departamento = $14, Profesion = $15
      WHERE Id = $16 RETURNING *`;

    const values = [Nombres, Apellidos, Telefono, Direccion, Dpi, Afiliacion_Igss, Estado_Civil, Fecha_Nacimiento, FechaContratacion, FechaBaja, Estado, Photo_Url, Puesto, Departamento, Profesion, Id];
    
    const result = await pool.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el empleado' });
  }
}

module.exports = {
  obtenerEmpleados,
  agregarEmpleado,
  actualizarEmpleado,
};
