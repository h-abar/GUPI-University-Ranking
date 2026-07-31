import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET — public, returns all site_content as key-value map
export async function GET() {
  try {
    const { rows } = await query('SELECT key, value FROM site_content ORDER BY sort_order');
    const map = {};
    for (const row of rows) {
      map[row.key] = row.value;
    }
    return NextResponse.json(map);
  } catch (err) {
    console.error('Content GET error:', err);
    return NextResponse.json({}, { status: 200 });
  }
}

// PUT — admin only, accepts { key1: value1, key2: value2, ... }
export async function PUT(request) {
  const auth = requireAuth(request);
  if (!auth.id) return auth;

  try {
    const data = await request.json();
    for (const [key, value] of Object.entries(data)) {
      await query(
        'UPDATE site_content SET value = $1 WHERE key = $2',
        [String(value), key]
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Content PUT error:', err);
    return NextResponse.json({ error: 'فشل التحديث' }, { status: 500 });
  }
}
