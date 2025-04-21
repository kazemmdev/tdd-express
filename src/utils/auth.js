const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),
  comparePassword: (password, hashedPassword) => bcrypt.compare(password, hashedPassword),
  generateToken: (payload) => jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'}),
}
