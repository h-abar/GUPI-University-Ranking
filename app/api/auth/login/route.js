import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'gupi-secret-key-2026';

export async function POST(request) {
  const { username, password } = await request.json();

  const { rows } = await query('SELECT * FROM admins WHERE username = $1', [username]);
  if (rows.length === 0) {
    return NextResponse.json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة' }, { status: 401 });
  }

  const admin = rows[0];
  const valid = bcrypt.compareSync(password, admin.password_hash);
  if (!valid) {
    return NextResponse.json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة' }, { status: 401 });
  }

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '7d' });

  const response = NextResponse.json({ success: true, token });
  response.cookies.set('gupi_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return response;
}
