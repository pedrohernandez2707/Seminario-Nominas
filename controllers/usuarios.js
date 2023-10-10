const { Pool } = require('pg');
const bcrypt = require('bcryptjs');


// Configuración de conexión a la base de datos PostgreSQL
// const pool = new Pool({
//   user: 'postgres',
//   host: 'containers-us-west-163.railway.app',
//   database: 'railway',
//   password: 'nCnJ19BMOH6EYooaRuB9',
//   port: 7335,
// });

// Endpoint para obtener todos los usuarios

async function obtenerUsuarios(req, res) {

  const {dbConfig } = req;
  
  //console.log(dbConfig)

  const pool = new Pool(dbConfig)

    try {
        const result = await pool.query('SELECT id, nombre, apellido, activo, rol, email FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

// Endpoint para agregar todos los usuarios
async function agregarUsuario(req, res) {
  try {
    const { nombre, apellido, email, contraseña, activo = true, rol = 'usuario' } = req.body;

    const {dbConfig } = req;

    const pool = new Pool(dbConfig)

    const valida = await pool.query('SELECT 1 from usuarios where email = $1', [email])

    if(valida.rows.length > 0){
      return res.status(400).json({mensaje: 'El correo electronico ya existe, no es posible agregar al usuario'})
    }

    const salt = bcrypt.genSaltSync(10);
    // Cifrar la contraseña con la sal
    const hashedPassword = bcrypt.hashSync(contraseña, salt);
    
    const result = await pool.query('INSERT INTO usuarios (nombre, apellido, email, contraseña, activo, rol) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [nombre, apellido, email, hashedPassword, activo, rol]);
    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar el usuario: ' + error });
  }
}


// Endpoint para actualizar un usuario por ID
async function actualizarUsuario(req, res) {
    const {id, nombre, apellido, email, activo, rol } = req.body;
   
    const {dbConfig } = req;

    const pool = new Pool(dbConfig)
   
    try {
      const result = await pool.query('UPDATE usuarios SET nombre = $1, apellido = $2, email = $3, activo = 4$, rol = $5 WHERE id = $6 RETURNING *', [nombre, apellido, email, activo, rol, id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar el usuario: ' + error });
    }
}



async function actualizarClave(req, res) {

  const {id, clave } = req.body;
 
  const {dbConfig } = req;

  const pool = new Pool(dbConfig)

  const salt = bcrypt.genSaltSync(10);
    // Cifrar la contraseña con la sal
  const hashedPassword = bcrypt.hashSync(clave, salt);
 
  try {
    const result = await pool.query('UPDATE usuarios SET contraseña = $1 where id = $2 RETURNING *', [hashedPassword, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la clave: ' + error });
  }
}


module.exports = {
  obtenerUsuarios,
  agregarUsuario,
  actualizarUsuario,
  actualizarClave
};
