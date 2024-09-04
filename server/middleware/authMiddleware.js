const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send('Token não fornecido');

  jwt.verify(token, 'chave-secreta', (err, decoded) => {
    if (err) return res.status(500).send('Falha na autenticação do token');
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
