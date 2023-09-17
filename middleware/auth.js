const jwt = require('jsonwebtoken');

// Función para generar un token
function generarToken(usuarioId, dbConfig) {
  return jwt.sign({ usuarioId, dbConfig }, '938b8240ed29054608e7f29b117b834d1597592a471d3d70862aae2c9d0ba51a', { expiresIn: '24h' });
}

// Middleware para verificar el token
function verificarToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  jwt.verify(token, '938b8240ed29054608e7f29b117b834d1597592a471d3d70862aae2c9d0ba51a', (error, decoded) => {
    if (error) {
      return res.status(401).json({ mensaje: 'Token inválido.' });
    }
    req.usuarioId = decoded.usuarioId;
    next();
  });
}

module.exports = {
  generarToken,
  verificarToken,
};
