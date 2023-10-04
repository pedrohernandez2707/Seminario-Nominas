const multer = require('multer');

// Configura multer para manejar la carga de archivos
const storage = multer.memoryStorage(); // Almacena el archivo en memoria

const upload = multer({
  storage: storage,
  // Otras opciones de configuración de multer si es necesario
});

module.exports = upload;
