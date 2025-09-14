import type { VercelRequest, VercelResponse } from '@vercel/node';

// CORRECTED: Rewritten to match the project's Vercel-style API route structure,
// removing the incompatible h3 library.
export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // To delete a cookie, we set its expiration date to a time in the past.
  // The name ('session'), Path, and HttpOnly attributes should match how the cookie was set during login.
  response.setHeader('Set-Cookie', 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax');

  // Return a success status.
  return response.status(200).json({ status: 'logged_out' });
}
