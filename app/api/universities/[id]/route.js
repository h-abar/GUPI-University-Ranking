import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { rankUniversities } from '@/lib/scoring';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { rows } = await query('SELECT * FROM universities WHERE id = $1', [params.id]);
  if (rows.length === 0) {
    return NextResponse.json({ error: 'University not found' }, { status: 404 });
  }
  const all = await query('SELECT * FROM universities ORDER BY id');
  const ranked = await rankUniversities(all.rows);
  const found = ranked.find((u) => u.id === parseInt(params.id));
  return NextResponse.json(found || rows[0]);
}

export async function PUT(request, { params }) {
  const body = await request.json();

  const cols = [
    'name', 'founded', 'country', 'articles_2025',
    'shanghai_ranking', 'the_ranking', 'ad_scientific_index', 'qs_ranking',
    'arabic_ranking', 'scimago', 'cwts', 'unirank_world',
    'qs_arab', 'the_arab', 'us_news', 'unirank_arabic',
    'the_impact', 'ui_greenmetric', 'cwur', 'scholar_gps', 'rur', 'guv',
    'description', 'short_code'
  ];
  const values = cols.map((c) => body[c] || null);
  values.push(parseInt(params.id));
  const setClause = cols.map((c, i) => `${c} = $${i + 1}`).join(', ');
  const idParam = `$${cols.length + 1}`;

  await query(
    `UPDATE universities SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ${idParam}`,
    values
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(request, { params }) {
  await query('DELETE FROM universities WHERE id = $1', [parseInt(params.id)]);
  return NextResponse.json({ success: true });
}
