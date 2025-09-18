
import pool from '../../db.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

// Helper to get user ID from token
interface DecodedToken {
  userId: string;
}

async function getUserId(req: VercelRequest): Promise<string | null> {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.auth_token;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    return decoded.userId;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}

// Helper to get post_id from slug
async function getPostId(slug: string) {
  const { rows } = await pool.query('SELECT post_id FROM posts WHERE slug = $1', [slug]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0].post_id;
}

// GET /api/posts/[slug]/comments
async function handleGet(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query as { slug: string };

  try {
    const postId = await getPostId(slug);
    if (!postId) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const query = `
      SELECT 
        c.comment_id, 
        c.comment_body, 
        c.created_at, 
        c.parent_comment_id,
        COALESCE(u.username, '[deleted]') AS author_username
      FROM 
        comments c
      LEFT JOIN 
        users u ON c.user_id = u.user_id
      WHERE 
        c.post_id = $1 AND c.status = 'approved'
      ORDER BY 
        c.created_at ASC; -- Order by oldest first to build the tree correctly
    `;
    const { rows: comments } = await pool.query(query, [postId]);

    // Build a tree structure from the flat list of comments
    const commentMap = new Map();
    comments.forEach(comment => {
      comment.replies = [];
      commentMap.set(comment.comment_id, comment);
    });

    const commentTree: any[] = [];
    comments.forEach(comment => {
      if (comment.parent_comment_id) {
        const parent = commentMap.get(comment.parent_comment_id);
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        commentTree.push(comment);
      }
    });

    // Reverse the top-level comments to show newest first
    commentTree.reverse();

    return res.status(200).json(commentTree);
  } catch (error) {
    console.error('Database query failed:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// POST /api/posts/[slug]/comments
async function handlePost(req: VercelRequest, res: VercelResponse) {
  const userId = await getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const { slug } = req.query as { slug: string };
  const { comment_body, parent_comment_id } = req.body;

  if (!comment_body || typeof comment_body !== 'string' || comment_body.trim().length === 0) {
    return res.status(400).json({ message: 'Comment body is required.' });
  }

  try {
    const postId = await getPostId(slug);
    if (!postId) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const insertQuery = `
      INSERT INTO comments (post_id, user_id, comment_body, parent_comment_id, status)
      VALUES ($1, $2, $3, $4, 'approved')
      RETURNING comment_id, comment_body, created_at, user_id, parent_comment_id;
    `;
    const { rows } = await pool.query(insertQuery, [postId, userId, comment_body.trim(), parent_comment_id || null]);
    
    const userQuery = 'SELECT username FROM users WHERE user_id = $1';
    const userResult = await pool.query(userQuery, [rows[0].user_id]);
    const author_username = userResult.rows[0].username;

    const newComment = {
      ...rows[0],
      author_username,
      replies: []
    };
    
    delete newComment.user_id;

    return res.status(201).json(newComment);
  } catch (error) {
    console.error('Database insert failed:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
