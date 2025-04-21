import { create, findByUsername } from '../models/userModel';
import { comparePassword, generateToken, hashPassword } from '../utils/auth';

export const register = async (req: any, res: any) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username or Password is required' });
  }

  const existing = await findByUsername(username);
  if (existing) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const hashed = await hashPassword(password);
  const user = await create({ username, password: hashed });
  const token = generateToken({ username: user.username });
  return res.status(201).json({ token });
};

export const login = async (req: any, res: any) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username or Password is required' });
  }
  const user = await findByUsername(username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken({ username: user.username });
  return res.status(200).json({ token });
};
