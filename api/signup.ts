
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

const saltRounds = 10;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  // Destructure JWT_SECRET from environment variables
  const { DATABASE_URL, JWT_SECRET } = process.env;

  if (!DATABASE_URL || !JWT_SECRET) {
    return response.status(500).json({ message: 'Server is not configured for authentication.' });
  }

  const { username, email, password } = request.body;

  if (!username || !email || !password) {
    return response.status(400).json({ message: 'Username, email, and password are required.' });
  }

  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { rows: insertedRows } = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, role',
      [username, email, hashedPassword, 'subscriber']
    );

    if (insertedRows.length === 0) {
        return response.status(500).json({ message: 'Failed to create user.' });
    }

    const newUser = insertedRows[0];

    // Create a JWT token for the new user
    const token = jwt.sign(
        { userId: newUser.user_id, role: newUser.role },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return the new user and the token
    return response.status(201).json({ user: newUser, token });

  } catch (error: any) {
    console.error('Signup Error:', error);

    if (error.code === '23505') {
      if (error.constraint === 'users_email_key') {
        return response.status(409).json({ message: `A user with this email already exists.` });
      }
      if (error.constraint === 'users_username_key') {
        return response.status(409).json({ message: `A user with this username already exists.` });
      }
      return response.status(409).json({ message: `A user with these details already exists.` });
    }

    return response.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await pool.end();
  }
}
