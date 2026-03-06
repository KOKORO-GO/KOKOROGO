import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, source } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'メールアドレスが無効です。' });
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, source: source || 'direct' }]);

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'このメールアドレスは既に登録されています。' });
      }
      throw error;
    }

    return res.status(200).json({
      message: '登録完了！先行アクセスのご案内をお送りします。🎉'
    });
  } catch (error) {
    console.error('[Waitlist] Error:', error);
    return res.status(500).json({
      error: 'サーバーエラーが発生しました。もう一度お試しください。'
    });
  }
}
