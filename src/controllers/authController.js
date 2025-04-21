const {findByUsername, create} = require("../models/userModel");
const {hashPassword, generateToken} = require("../utils/auth");
exports.register = async (req, res) => {
  const {username, password} = req.body
  if (!username || !password) {
    return res.status(400).json({error: 'Username or Password is required'})
  }

  const existing = await findByUsername(username)
  if (existing) {
    return res.status(409).json({error: 'User already exists'})
  }

  const hashed = await hashPassword(password)
  const user = await create({username, password: hashed})
  const token = generateToken({username: user.username})
  return res.status(201).json({token})
}
