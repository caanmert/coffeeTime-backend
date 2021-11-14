const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  console.log('authenticatetoken');
  const { JWT_SECRET } = process.env;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(200).json({ message: 'Token is invalid' });

  jwt.verify(token, JWT_SECRET, (err, decodedObj) => {
    if (err) return res.status(200).json({ message: 'Not authorized' });
    req.user = decodedObj;
    return next();
  });
}

function authAdmin(req, res, next) {
  const { ADMIN } = process.env;

  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(200).json({ message: 'Token is invalid' });
  const decoded = jwt.decode(token);

  if (ADMIN === decoded.name) { next(); } else {
    return res.status(200).json({ message: 'Not authorized' });
  }
}

module.exports = {
  authenticateToken,
  authAdmin,
};
