const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY,);
  } catch (err) {
    return null;
  }
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
  hashPassword,
  comparePassword,
};
