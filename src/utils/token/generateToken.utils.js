const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../configs/env.config');

const generateToken = (userId, login) => {
  const token = jwt.sign({ userId, login }, JWT_SECRET_KEY, {
    expiresIn: '6h'
  });
  return token;
};

module.exports = generateToken;
