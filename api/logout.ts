import type { VercelRequest, VercelResponse } from '@vercel/node';
import { serialize } from 'cookie';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  // To clear a cookie, we set its expiration date to a time in the past.
  const cookie = serialize('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0),
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ message: 'Logged out successfully.' });
}
