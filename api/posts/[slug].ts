
import pool from '../db.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Slug is required' });
  }

  try {
    const query = `
      SELECT 
        p.post_id, 
        p.title, 
        p.body, 
        p.created_at, 
        u.username AS author_username
      FROM 
        posts p
      JOIN 
        users u ON p.user_id = u.user_id
      WHERE 
        p.slug = $1;
    `;
    
    const { rows } = await pool.query(query, [slug]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(rows[0]);

  } catch (error) {
    console.error('Database query failed:', error);
    if (error instanceof Error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
    return res.status(500).json({ message: 'Internal Server Error', error: 'An unknown error occurred' });
  }
}
