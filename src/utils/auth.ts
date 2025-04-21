import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const comparePassword = (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);

export const generateToken = (payload: any) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
