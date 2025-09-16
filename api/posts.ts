import pool from './db.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// This is your Vercel Serverless Function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure we are only handling GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Extract username from query parameters
  const { username } = req.query;

  try {
    let query = `
      SELECT 
        p.post_id, 
        p.title, 
        p.body, 
        p.slug, 
        p.created_at,
        u.username AS author_username
      FROM 
        posts p
      JOIN 
        users u ON p.user_id = u.user_id
      WHERE
        p.status = 'published'
    `;
    const params: string[] = [];

    // If a username is provided, filter by it
    if (typeof username === 'string' && username) {
        query += ' AND u.username = $1';
        params.push(username);
    }
    
    query += `
      ORDER BY 
        p.created_at DESC
      LIMIT 20;
    `;
    
    const { rows: posts } = await pool.query(query, params);

    // Return the posts as a JSON response
    return res.status(200).json(posts);

  } catch (error) {
    console.error('Database query failed:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
