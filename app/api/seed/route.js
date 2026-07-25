import { NextResponse } from 'next/server';
import { query, ensureSchema } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const SEED_SECRET = process.env.SEED_SECRET || 'gupi-seed-2026';

const COLS = [
  'name', 'founded', 'country', 'articles_2025',
  'shanghai_ranking', 'shanghai_excellence',
  'the_ranking', 'the_excellence',
  'ad_scientific_index', 'ad_scientific_excellence',
  'qs_ranking', 'qs_excellence',
  'arabic_ranking', 'arabic_ranking_excellence',
  'scimago', 'cwts', 'unirank_world',
  'qs_arab', 'the_arab', 'us_news', 'unirank_arabic',
  'the_impact', 'ui_greenmetric', 'cwur', 'scholar_gps', 'rur', 'guv'
];

async function doSeed() {
  await ensureSchema();

  const { SEED_UNIVERSITIES } = await import('@/scripts/seed-data.js');

  const placeholders = COLS.map((_, i) => `$${i + 1}`).join(', ');

  await query('DELETE FROM universities');

  let count = 0;
  for (const uni of SEED_UNIVERSITIES) {
    if (!uni.name) continue;
    const values = COLS.map((c) => uni[c] != null ? uni[c] : null);

    try {
      await query(
        `INSERT INTO universities (${COLS.join(', ')}) VALUES (${placeholders})`,
        values
      );
      count++;
    } catch (e) {
      console.error('Error inserting row:', uni.name, e.message);
    }
  }

  // Update descriptions
  const { updateDescriptionsData } = await import('@/scripts/update-descriptions-data.js');
  const { rows: universities } = await query('SELECT id, name FROM universities');
  let descCount = 0;
  for (const uni of universities) {
    const info = updateDescriptionsData[uni.name];
    if (info) {
      await query('UPDATE universities SET description = $1, short_code = $2 WHERE id = $3', [info.desc, info.code, uni.id]);
      descCount++;
    }
  }

  return { success: true, count, descriptions: descCount };
}

export async function GET(request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');

  if (secret !== SEED_SECRET) {
    const auth = requireAuth(request);
    if (!auth.id) return auth;
  }

  try {
    const result = await doSeed();
    return NextResponse.json(result);
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: err.message || 'Seed failed' }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = requireAuth(request);
  if (!auth.id) return auth;

  try {
    const result = await doSeed();
    return NextResponse.json(result);
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: err.message || 'Seed failed' }, { status: 500 });
  }
}
