import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { rows } = await query('SELECT * FROM ranking_configs ORDER BY sort_order');
  return NextResponse.json(rows);
}

export async function PUT(request) {
  const auth = requireAuth(request);
  if (!auth.id) return auth;

  const body = await request.json();
  const items = Array.isArray(body) ? body : [body];

  for (const item of items) {
    await query(
      `UPDATE ranking_configs SET
        label_ar = $1, label_en = $2, category = $3,
        is_presence = $4, is_excellence = $5,
        presence_weight = $6, excellence_weight = $7,
        sort_order = $8, active = $9
      WHERE id = $10`,
      [
        item.label_ar, item.label_en, item.category || 'other',
        item.is_presence ? 1 : 0, item.is_excellence ? 1 : 0,
        item.presence_weight ?? 1.0, item.excellence_weight ?? 1.0,
        item.sort_order || 0, item.active !== false ? 1 : 0,
        item.id,
      ]
    );
  }

  return NextResponse.json({ success: true });
}

export async function POST(request) {
  const auth = requireAuth(request);
  if (!auth.id) return auth;

  const body = await request.json();

  const result = await query(
    `INSERT INTO ranking_configs (field_key, label_ar, label_en, category, is_presence, is_excellence, presence_weight, excellence_weight, sort_order, active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
    [
      body.field_key, body.label_ar, body.label_en, body.category || 'other',
      body.is_presence ? 1 : 0, body.is_excellence ? 1 : 0,
      body.presence_weight ?? 1.0, body.excellence_weight ?? 1.0,
      body.sort_order || 0, 1,
    ]
  );

  return NextResponse.json({ id: result.rows[0].id, success: true });
}
