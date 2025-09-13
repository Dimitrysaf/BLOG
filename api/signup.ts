
import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!process.env.DATABASE_URL) {
    return response.status(500).json({ message: 'Database connection details are not configured.' });
  }

  const { username, email, password } = request.body;

  if (!username || !email || !password) {
    return response.status(400).json({ message: 'Username, email, and password are required.' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await connection.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, 'subscriber']
    );

    const [rows] = await connection.execute(
        'SELECT user_id, username, email, role FROM users WHERE email = ?',
        [email]
    );

    const newUser = (rows as any)[0];

    return response.status(201).json({ user: newUser });

  } catch (error: any) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
        return response.status(409).json({ message: `A user with this email or username already exists.` });
    }
    return response.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    if (connection) {
        await connection.end();
    }
  }
}
