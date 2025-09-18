import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import pool from './db.js'; // Assuming you have a db connection setup

interface DecodedToken {
  userId: string;
  username: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: 'Authentication token not found.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // Additionally, you could verify the user still exists in the database
    const userQuery = 'SELECT user_id, username FROM users WHERE user_id = $1';
    const userResult = await pool.query(userQuery, [decoded.userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = {
        id: userResult.rows[0].user_id,
        username: userResult.rows[0].username
    };

    return res.status(200).json({ user });

  } catch (error) {
    // Catches invalid/expired tokens or database errors
    return res.status(401).json({ message: 'Invalid or expired authentication token.' });
  }
}
