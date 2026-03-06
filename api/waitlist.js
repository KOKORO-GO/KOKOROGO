import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, source } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'メールアドレスが無効です。' });
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, source: source || 'direct' }]);

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'このメールアドレスは既に登録されています。' });
      }
      throw error;
    }

    // Send notification email to lynn@aloha.org
    try {
      await resend.emails.send({
        from: 'KokoroGo Waitlist <onboarding@resend.dev>',
        to: 'lynn@aloha.org',
        subject: `🎉 New KokoroGo Waitlist Signup: ${email}`,
        html: `
          <h2>New Waitlist Signup!</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Source:</strong> ${source || 'direct'}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Pacific/Honolulu' })} (HST)</p>
          <hr>
          <p style="color:#888;">This notification was sent from the KokoroGo waitlist at kokorogo.com</p>
        `
      });
    } catch (emailErr) {
      // Log but don't fail the signup if email notification fails
      console.error('[Waitlist] Email notification failed:', emailErr);
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
