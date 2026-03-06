export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body;

    if (password === 'Sky') {
      // Set auth cookie — httpOnly, secure, 7-day expiry
      res.setHeader('Set-Cookie', [
        `kokorogo_auth=1; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`
      ]);
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ error: 'Incorrect password' });
  } catch (error) {
    console.error('[Auth] Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
