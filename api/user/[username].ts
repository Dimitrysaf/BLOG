
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'GET') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const { DATABASE_URL } = process.env;
  if (!DATABASE_URL) {
    return response.status(500).json({ message: 'Server is not configured.' });
  }

  const { username } = request.query;

  if (typeof username !== 'string') {
    return response.status(400).json({ message: 'Username is required.' });
  }

  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    // CORRECTED: Using the exact column names `user_id` and `created_at` from your schema.
    const { rows } = await pool.query(
      'SELECT user_id, username, role, created_at FROM users WHERE username = $1',
      [username]
    );

    const user = rows[0];

    if (!user) {
      return response.status(404).json({ message: 'User not found.' });
    }

    // The API response will now have keys: user_id, username, role, created_at
    return response.status(200).json(user);

  } catch (error: any) {
    console.error('Database Error:', error);
    return response.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await pool.end();
  }
}
