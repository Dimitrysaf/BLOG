
import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
    return response.status(500).json({ message: 'Server is not configured for authentication.' });
  }

  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: 'Email and password are required.' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);

    const [rows] = await connection.execute(
      'SELECT user_id, username, email, role, password FROM users WHERE email = ?',
      [email]
    );

    const user = (rows as any)[0];

    if (!user) {
      return response.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(401).json({ message: 'Invalid credentials.' });
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );

    return response.status(200).json({ 
        message: "Login successful",
        token,
        user: userWithoutPassword
    });

  } catch (error: any) {
    console.error(error);
    return response.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    if (connection) {
        await connection.end();
    }
  }
}
