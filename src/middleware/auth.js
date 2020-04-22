/* eslint-disable */
const UnauthorizedError = require('./../errors/UnauthorizedError');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./../configs/env.config');
const userService = require('./../resources/users/user.service');
const allowedRegexp = '^(/doc(/|[a-z0-9-.])*|/login|/)$';

const auth = async (req, res, next) => {
  try {
    if (req.originalUrl.match(allowedRegexp)) {
      return next();
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const user = await userService.getById(decoded.userId);
    if (!user || user.login !== decoded.login) {
      throw new Error();
    }
    req.currentUser = {
      user,
      token
    };
    return next();
  } catch (error) {
    return next(new UnauthorizedError('Please authenticate.'));
  }
};

module.exports = auth;
