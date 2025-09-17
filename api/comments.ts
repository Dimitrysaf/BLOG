
import pool from './db.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    // CORRECTED QUERY based on the schema in Documentation/DB.md
    const query = `
      SELECT 
        c.comment_id,
        c.comment_body, -- The column is named comment_body, not body
        c.created_at,
        p.title AS post_title,
        p.slug AS post_slug
      FROM 
        comments c
      JOIN 
        posts p ON c.post_id = p.post_id
      JOIN
        users u ON c.user_id = u.user_id
      WHERE
        c.status = 'approved' AND u.username = $1
      ORDER BY 
        c.created_at DESC;
    `;
    
    const { rows: comments } = await pool.query(query, [username]);

    return res.status(200).json(comments);

  } catch (error) {
    console.error('Database query failed:', error);
    if (error instanceof Error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Internal Server Error', error: 'An unknown error occurred' });
  }
}
