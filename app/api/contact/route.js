import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    const {
      name, jobTitle, email, phone,
      university, country, website,
      category, subject, message,
      consent, newsletter,
    } = await request.json();

    if (!name || !email || !message || !university) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const categoryLabels = {
      data_correction: 'طلب مراجعة/تحديث بيانات جامعة / University Data Review',
      methodology: 'استفسار حول المنهجية / Methodology Inquiry',
      partnership: 'طلب شراكة / Partnership Request',
      reports: 'طلب تقارير تحليلية / Custom Reports',
      media: 'استفسار إعلامي / Media Inquiry',
      technical: 'دعم فني / Technical Support',
      general: 'استفسار عام / General Inquiry',
    };

    const catLabel = categoryLabels[category] || 'استفسار عام / General Inquiry';
    const refNum = `GUPI-${Date.now().toString().slice(-6)}`;

    const notifyHtml = `
      <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #7c2d12; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
          <h2 style="margin: 0;">GUPI | منصة نخبة الجامعات</h2>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">رسالة جديدة من نموذج التواصل — Ref: #${refNum}</p>
        </div>
        <div style="background: #fafaf9; padding: 24px; border: 1px solid #e7e5e4; border-radius: 0 0 12px 12px;">
          <h3 style="color: #7c2d12; margin: 0 0 12px; font-size: 16px;">البيانات الشخصية / Personal Information</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <tr><td style="padding: 6px 0; font-weight: bold; color: #7c2d12; width: 140px;">الاسم / Name:</td><td style="padding: 6px 0; color: #1c1917;">${name}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #7c2d12;">المسمى / Job Title:</td><td style="padding: 6px 0; color: #1c1917;">${jobTitle || '—'}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #7c2d12;">البريد / Email:</td><td style="padding: 6px 0; color: #1c1917;">${email}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #7c2d12;">الهاتف / Phone:</td><td style="padding: 6px 0; color: #1c1917;">${phone || '—'}</td></tr>
          </table>
          <h3 style="color: #7c2d12; margin: 0 0 12px; font-size: 16px;">بيانات المؤسسة / Institution Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <tr><td style="padding: 6px 0; font-weight: bold; color: #7c2d12; width: 140px;">الجامعة / University:</td><td style="padding: 6px 0; color: #1c1917;">${university}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #7c2d12;">الدولة / Country:</td><td style="padding: 6px 0; color: #1c1917;">${country || '—'}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #7c2d12;">الموقع / Website:</td><td style="padding: 6px 0; color: #1c1917;">${website || '—'}</td></tr>
          </table>
          <h3 style="color: #7c2d12; margin: 0 0 12px; font-size: 16px;">تفاصيل الطلب / Request Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <tr><td style="padding: 6px 0; font-weight: bold; color: #7c2d12; width: 140px;">النوع / Type:</td><td style="padding: 6px 0; color: #1c1917;">${catLabel}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #7c2d12;">الموضوع / Subject:</td><td style="padding: 6px 0; color: #1c1917;">${subject || '—'}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #7c2d12;">النشرة / Newsletter:</td><td style="padding: 6px 0; color: #1c1917;">${newsletter ? 'نعم / Yes' : 'لا / No'}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 16px 0;">
          <p style="font-weight: bold; color: #7c2d12; margin: 0 0 8px;">الرسالة / Message:</p>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e7e5e4; color: #1c1917; line-height: 1.6; white-space: pre-wrap;">${message}</div>
        </div>
        <p style="text-align: center; color: #a8a29e; font-size: 12px; margin-top: 16px;">© 2026 GUPI — Global University Presence Index</p>
      </div>
    `;

    const autoReplyHtml = `
      <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #7c2d12; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
          <h2 style="margin: 0;">GUPI | مؤشر التواجد العالمي للجامعات</h2>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">رقم المرجع / Ref: #${refNum}</p>
        </div>
        <div style="background: #fafaf9; padding: 24px; border: 1px solid #e7e5e4; border-radius: 0 0 12px 12px; line-height: 1.8; color: #1c1917;">
          <p>عزيزي/عزيزتي ${name}،</p>
          <p>تحية طيبة وبعد،</p>
          <p>نؤكد لكم استلام رسالتكم المتعلقة بـ (${catLabel}) لجامعة/مؤسسة (${university}).</p>
          <p>يقوم فريق التحليل والتواصل الأكاديمي حالياً بمراجعة طلبكم وسنوافيكم بالرد في أقرب فرصة عبر البريد الإلكتروني.</p>
          <p>رقم المرجع الخاص بطلبكم هو: <strong>#${refNum}</strong></p>
          <p>مع خالص التقدير،<br>فريق مؤشر التواجد العالمي للجامعات (GUPI)</p>
        </div>
        <p style="text-align: center; color: #a8a29e; font-size: 12px; margin-top: 16px;">© 2026 GUPI — Global University Presence Index</p>
      </div>
    `;

    let sent = false;
    let sendMethod = 'none';

    // ─── Method 1: Resend HTTP API (port 443, never blocked) ───
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = process.env.RESEND_FROM || 'GUPI <onboarding@resend.dev>';

        // Send notification to GUPI team
        await resend.emails.send({
          from: fromEmail,
          to: ['gupi@topauniversity.com'],
          replyTo: email,
          subject: `[GUPI] ${catLabel} — ${subject || 'بدون موضوع'} (Ref: #${refNum})`,
          html: notifyHtml,
        });

        // Send auto-reply to user
        try {
          await resend.emails.send({
            from: fromEmail,
            to: [email],
            subject: `تم استلام طلبك | مؤشر التواجد العالمي للجامعات (Ref: #${refNum})`,
            html: autoReplyHtml,
          });
        } catch (autoErr) {
          console.error('Resend auto-reply error:', autoErr.message);
        }

        sent = true;
        sendMethod = 'resend';
      } catch (resendErr) {
        console.warn('Resend send failed:', resendErr.message);
      }
    }

    // ─── Method 2: SMTP fallback (requires Railway Pro plan) ───
    if (!sent) {
      const smtpPort = parseInt(process.env.SMTP_PORT || '465');
      const isSecure = process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === 'true'
        : smtpPort === 465;

      const createTransporter = (port, secure) => nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'mail.topauniversity.com',
        port: port,
        secure: secure,
        auth: {
          user: process.env.SMTP_USER || 'gupi@topauniversity.com',
          pass: process.env.SMTP_PASS || ';J;H+ZqDo,yGXDea',
        },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 8000,
        greetingTimeout: 5000,
        socketTimeout: 8000,
      });

      const mailOpts = {
        from: `"GUPI Contact Form" <gupi@topauniversity.com>`,
        to: 'gupi@topauniversity.com',
        replyTo: email,
        subject: `[GUPI] ${catLabel} — ${subject || 'بدون موضوع'} (Ref: #${refNum})`,
        html: notifyHtml,
      };

      try {
        const transporter = createTransporter(smtpPort, isSecure);
        await transporter.sendMail(mailOpts);
        sent = true;
        sendMethod = 'smtp';

        // Auto-reply
        try {
          await transporter.sendMail({
            from: `"GUPI" <gupi@topauniversity.com>`,
            to: email,
            subject: `تم استلام طلبك | مؤشر التواجد العالمي للجامعات (Ref: #${refNum})`,
            html: autoReplyHtml,
          });
        } catch (e) {
          console.error('SMTP auto-reply error:', e.message);
        }
      } catch (smtpErr) {
        console.warn('SMTP send failed:', smtpErr.message);
      }
    }

    // ─── Always log to server stdout as safety net ───
    console.log(`\n================ GUPI CONTACT INQUIRY [#${refNum}] ================`);
    console.log(`From: ${name} (${email}) | ${jobTitle || 'No Title'}`);
    console.log(`University: ${university} | Country: ${country || 'N/A'} | Website: ${website || 'N/A'}`);
    console.log(`Category: ${catLabel} | Subject: ${subject || 'N/A'}`);
    console.log(`Message: ${message}`);
    console.log(`Sent via: ${sendMethod} (${sent ? 'SUCCESS' : 'FAILED — logged to console'})`);
    console.log(`==================================================================\n`);

    return NextResponse.json({ success: true, ref: refNum, emailSent: sent });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
