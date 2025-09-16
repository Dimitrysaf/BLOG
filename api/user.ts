import { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './db.js';
import jwt from 'jsonwebtoken';

const getUserIdFromRequest = (req: VercelRequest): number | null => {
  const { token } = req.cookies;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userId = getUserIdFromRequest(req);

  if (!userId) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  // Handle GET request to fetch authenticated user's profile
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query(
        'SELECT user_id, username, email, role, created_at FROM users WHERE user_id = $1',
        [userId]
      );

      const user = rows[0];

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      console.error('Get User Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Handle username update
  if (req.method === 'PATCH') {
    const { username } = req.body;

    if (!username || typeof username !== 'string' || username.length < 3) {
      return res.status(400).json({ message: 'Username must be a string of at least 3 characters.' });
    }

    try {
      // Check if username is taken by another user
      const { rows: existingUser } = await pool.query(
        'SELECT user_id FROM users WHERE username = $1 AND user_id != $2',
        [username, userId]
      );

      if (existingUser.length > 0) {
        return res.status(409).json({ message: 'Username is already taken.' });
      }

      // Update the user in the database
      const { rows: updatedUser } = await pool.query(
        'UPDATE users SET username = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 RETURNING user_id, username, email, role, created_at',
        [username, userId]
      );

      if (updatedUser.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Return the updated user object
      return res.status(200).json(updatedUser[0]);
    } catch (error: any) {
      console.error('Update User Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Handle account deletion
  if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM users WHERE user_id = $1', [userId]);
      
      // Clear the authentication cookie
      res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict');
      return res.status(200).json({ message: 'Account deleted successfully.' });
    } catch (error: any) {
      console.error('Delete User Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Handle unsupported methods
  res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
