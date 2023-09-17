const jwt = require('jsonwebtoken');

function extractDbConfig(req, res, next) {
  const token = req.header('Authorization');

  if (token) {
    jwt.verify(token, '938b8240ed29054608e7f29b117b834d1597592a471d3d70862aae2c9d0ba51a', (error, decoded) => {
      if (!error && decoded.dbConfig) {
        req.dbConfig = decoded.dbConfig;
      }
    });
  }

  next();
}

module.exports = extractDbConfig;
