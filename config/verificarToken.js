const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (error, user) => {
      if (error) {
        return res.status(403).json({ message: 'Invalid token!' });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'You are not authenticated' });
  }
};

const verifyTokenAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'You are not authorized' });
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json({ message: 'You are not authorized' });
      }
    });
  };

module.exports = { verifyToken, verifyTokenAuthorization,verifyTokenAndAdmin };
