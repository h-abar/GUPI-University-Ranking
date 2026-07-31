import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { rankUniversities, getRankingConfigs, getSettings } from '@/lib/scoring';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [{ rows }, configs, settings] = await Promise.all([
    query('SELECT * FROM universities ORDER BY id'),
    getRankingConfigs(),
    getSettings(),
  ]);
  const ranked = await rankUniversities(rows, configs, settings);
  return NextResponse.json(ranked);
}

export async function POST(request) {
  const body = await request.json();

  const cols = [
    'name', 'name_en', 'founded', 'country', 'country_en', 'articles_2025',
    'shanghai_ranking', 'the_ranking', 'ad_scientific_index', 'qs_ranking',
    'arabic_ranking', 'scimago', 'cwts', 'unirank_world',
    'qs_arab', 'the_arab', 'us_news', 'unirank_arabic',
    'the_impact', 'ui_greenmetric', 'cwur', 'scholar_gps', 'rur', 'guv'
  ];
  const values = cols.map((c) => body[c] || null);
  const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');

  const result = await query(
    `INSERT INTO universities (${cols.join(', ')}) VALUES (${placeholders}) RETURNING id`,
    values
  );

  return NextResponse.json({ id: result.rows[0].id, success: true });
}
