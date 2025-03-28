const asyncMiddleware = require('./async');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const authService = require('../services/user');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new CustomError(errorCodes.UNAUTHORIZED);
  }

  const [tokenType, accessToken] = authorization.split(' ');

  if (tokenType !== 'Bearer' || !accessToken) {
    throw new CustomError(errorCodes.UNAUTHORIZED);
  }

  const user = await authService.verifyAccessToken(accessToken);

  if (!user.userId) {
    throw new CustomError(errorCodes.UNAUTHORIZED);
  }

  req.user = user;
  req.userId = user.userId;

  if (['/users/logout', '/users/verify'].includes(req.path)) {
    req.accessToken = accessToken;
  }

  return next();
};

module.exports = {
  auth: asyncMiddleware(auth),
};
