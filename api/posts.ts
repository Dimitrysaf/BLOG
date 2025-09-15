import { neon } from '@neondatabase/serverless';
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
    // Create a new Neon DB connection
    const sql = neon(process.env.DATABASE_URL as string);

    let posts;

    // If a username is provided, filter by it
    if (typeof username === 'string' && username) {
      posts = await sql`
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
          u.username = ${username} AND p.status = 'published'
        ORDER BY 
          p.created_at DESC
        LIMIT 20;
      `;
    } else {
      // Otherwise, fetch all posts
      posts = await sql`
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
        ORDER BY 
          p.created_at DESC
        LIMIT 20;
      `;
    }

    // Return the posts as a JSON response
    return res.status(200).json(posts);

  } catch (error) {
    console.error('Database query failed:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
