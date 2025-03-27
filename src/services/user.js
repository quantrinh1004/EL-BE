const jwt = require('jsonwebtoken');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const userDao = require('../daos/user');

const { generateRandomString } = require('../utils/random');
const {
  generateSalt,
  encryptPassword,
  comparePassword,
} = require('../utils/security');

const { JWT_SECRET_KEY, JWT_EXPIRES_TIME } = require('../configs');

const generateAccessToken = async (userId, isAdmin) => {
  const accessToken = await jwt.sign({ userId, isAdmin }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
  return accessToken;
};

const register = async ({ email, name, password }) => {
  let user = await userDao.findUser({ email });
  if (user) throw new CustomError(errorCodes.USER_EXISTS);

  const salt = generateSalt();
  const hashedPassword = password || generateRandomString(16);
  const encryptedPassword = await encryptPassword(hashedPassword, salt);

  user = await userDao.createUser({ email, name, password: encryptedPassword });
  return user;
};

const login = async (email, password) => {
  const user = await userDao.findUser({ email });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const isCorrectPassword = await comparePassword(password, user.password);
  if (!isCorrectPassword) throw new CustomError(errorCodes.WRONG_PASSWORD);

  const { isAdmin = false, _id: userId } = user;
  const accessToken = await generateAccessToken(userId, isAdmin);
  return { userId, accessToken };
};

const verifyAdmin = (accessToken) => {
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);
    const { userId, isAdmin } = decoded;
    return { userId, isAdmin };
  } catch (err) {
    throw new CustomError(errorCodes.UNAUTHORIZED);
  }
};

module.exports = { register, login, verifyAdmin };
