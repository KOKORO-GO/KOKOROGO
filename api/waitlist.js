// Vercel Serverless Function — Waitlist signup
// TODO: Connect to your preferred backend (e.g., Supabase, Airtable, Google Sheets, etc.)

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, source } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'メールアドレスが無効です。' });
    }

    // --- Replace this section with your actual storage logic ---
    // Example with Supabase:
    // const { data, error } = await supabase.from('waitlist').insert({ email, source, created_at: new Date().toISOString() });

    // Example with Airtable:
    // await fetch(`https://api.airtable.com/v0/${BASE_ID}/Waitlist`, { ... });

    // For now, just log and return success
    console.log(`[Waitlist] New signup: ${email} (source: ${source || 'direct'})`);
    // -----------------------------------------------------------

    return res.status(200).json({
      message: '登録完了！先行アクセスのご案内をお送りします。'
    });
  } catch (error) {
    console.error('[Waitlist] Error:', error);
    return res.status(500).json({ error: 'サーバーエラーが発生しました。もう一度お試しください。' });
  }
}
