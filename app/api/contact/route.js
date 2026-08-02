import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, category, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'mail.topauniversity.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'gupi@topauniversity.com',
        pass: process.env.SMTP_PASS || ';J;H+ZqDo,yGXDea',
      },
    });

    const categoryLabels = {
      general: 'استفسار عام / General Inquiry',
      data_correction: 'تصحيح بيانات جامعة / University Data Correction',
      partnership: 'شراكة وتعاون / Partnership & Collaboration',
      media: 'استفسار إعلامي / Media Inquiry',
      consulting: 'استشارات تصنيف / Ranking Consulting',
      technical: 'دعم فني / Technical Support',
    };

    const mailOptions = {
      from: `"GUPI Contact Form" <gupi@topauniversity.com>`,
      to: 'gupi@topauniversity.com',
      replyTo: email,
      subject: `[GUPI] ${categoryLabels[category] || 'استفسار عام'} — ${subject || 'بدون موضوع'}`,
      html: `
        <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #7c2d12; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <h2 style="margin: 0;">GUPI | منصة نخبة الجامعات</h2>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">رسالة جديدة من نموذج التواصل</p>
          </div>
          <div style="background: #fafaf9; padding: 24px; border: 1px solid #e7e5e4; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #7c2d12; width: 120px;">الاسم / Name:</td>
                <td style="padding: 8px 0; color: #1c1917;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #7c2d12;">البريد / Email:</td>
                <td style="padding: 8px 0; color: #1c1917;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #7c2d12;">النوع / Type:</td>
                <td style="padding: 8px 0; color: #1c1917;">${categoryLabels[category] || 'استفسار عام'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #7c2d12;">الموضوع / Subject:</td>
                <td style="padding: 8px 0; color: #1c1917;">${subject || '—'}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 16px 0;">
            <p style="font-weight: bold; color: #7c2d12; margin: 0 0 8px;">الرسالة / Message:</p>
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e7e5e4; color: #1c1917; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          <p style="text-align: center; color: #a8a29e; font-size: 12px; margin-top: 16px;">© 2026 GUPI — Global University Presence Index</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
