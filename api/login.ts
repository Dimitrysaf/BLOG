
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const { DATABASE_URL, JWT_SECRET } = process.env;

  if (!DATABASE_URL || !JWT_SECRET) {
    return response.status(500).json({ message: 'Server is not configured for authentication.' });
  }

  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: 'Email and password are required.' });
  }

  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

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

    return response.status(200).json({
        message: "Login successful",
        token,
        user: userWithoutPassword
    });
  } catch (error: any) {
    console.error('Database Error:', error);
    return response.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await pool.end();
  }
}
