
import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    return response.status(500).json({ message: 'Server is not configured for authentication.' });
  }

  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT user_id, username, email, role, password FROM users WHERE email = $1',
      [email]
    );

    const user = rows[0];

    if (!user) {
      return response.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(401).json({ message: 'Invalid credentials.' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Set the token in an HttpOnly cookie for security
    response.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=3600`);

    return response.status(200).json({
        message: "Login successful",
        user: userWithoutPassword
    });
  } catch (error: any) {
    console.error('Database Error:', error);
    return response.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
