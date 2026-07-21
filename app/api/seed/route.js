import { NextResponse } from 'next/server';
import { query, ensureSchema } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const auth = requireAuth(request);
  if (!auth.id) return auth;

  try {
    await ensureSchema();

    // Read the Excel file from the project root
    const excelPath = path.join(process.cwd(), 'GUPI 2027.xlsx');
    if (!fs.existsSync(excelPath)) {
      return NextResponse.json({ error: 'Excel file not found: GUPI 2027.xlsx' }, { status: 404 });
    }

    const buffer = fs.readFileSync(excelPath);
    const XLSX = await import('xlsx');
    const wb = XLSX.read(buffer, { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];

    const rawRows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });
    if (rawRows.length < 2) {
      return NextResponse.json({ error: 'Excel file is empty' }, { status: 400 });
    }

    const headers = rawRows[0];
    const dataRows = rawRows.slice(1).filter((r) => r[0] != null);

    const headerMap = {
      'اسم الجامعة': 'name',
      'Founded': 'founded',
      'Country': 'country',
      'Articles2025': 'articles_2025',
      'Shanghai Ranking': 'shanghai_ranking',
      'THE': 'the_ranking',
      'AD Scientific Index': 'ad_scientific_index',
      'QS': 'qs_ranking',
      'Arabic Ranking': 'arabic_ranking',
      'Scimago': 'scimago',
      'CWTS': 'cwts',
      'world rank UniRank': 'unirank_world',
      'QS ARAB': 'qs_arab',
      'THE ARAB': 'the_arab',
      'US News': 'us_news',
      'UniRank Arabic': 'unirank_arabic',
      'THE IMPACT': 'the_impact',
      'UI GreenMetric': 'ui_greenmetric',
      'CENTER FOR WORLD UNIVERSITY RANKINGS': 'cwur',
      'ScholarGPS': 'scholar_gps',
      'Wround ranking RUR': 'rur',
      'Global University Visibility Rankings': 'guv',
    };

    function cleanValue(val) {
      if (val === null || val === undefined) return null;
      const s = String(val).trim().replace(/\xa0/g, '').replace(/ـ/g, '').replace(/^-+$/, '');
      if (s === '' || s === 'None' || s === 'null') return null;
      return s;
    }

    function findHeader(headers, key) {
      const lowerKey = key.toLowerCase();
      return headers.findIndex((h) => {
        if (h == null) return false;
        return String(h).trim().replace(/\s+/g, ' ').toLowerCase().includes(lowerKey);
      });
    }

    const colMap = {};
    for (const [excelKey, dbField] of Object.entries(headerMap)) {
      const idx = findHeader(headers, excelKey);
      if (idx >= 0) {
        colMap[dbField] = idx;
      }
    }

    const cols = [
      'name', 'founded', 'country', 'articles_2025',
      'shanghai_ranking', 'the_ranking', 'ad_scientific_index', 'qs_ranking',
      'arabic_ranking', 'scimago', 'cwts', 'unirank_world',
      'qs_arab', 'the_arab', 'us_news', 'unirank_arabic',
      'the_impact', 'ui_greenmetric', 'cwur', 'scholar_gps', 'rur', 'guv'
    ];
    const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');

    // Clear existing universities
    await query('DELETE FROM universities');

    let count = 0;
    for (const row of dataRows) {
      const mapped = {};
      for (const [dbField, colIdx] of Object.entries(colMap)) {
        mapped[dbField] = cleanValue(row[colIdx]);
      }
      if (!mapped.name) continue;

      if (mapped.founded) mapped.founded = parseInt(mapped.founded) || null;
      if (mapped.articles_2025) mapped.articles_2025 = parseInt(mapped.articles_2025) || null;

      const values = cols.map((c) => mapped[c] || null);

      try {
        await query(
          `INSERT INTO universities (${cols.join(', ')}) VALUES (${placeholders})`,
          values
        );
        count++;
      } catch (e) {
        console.error('Error inserting row:', mapped.name, e.message);
      }
    }

    // Also run descriptions update
    const { rows: universities } = await query('SELECT id, name FROM universities');
    let descCount = 0;
    const { updateDescriptionsData } = await import('@/scripts/update-descriptions-data.js');
    for (const uni of universities) {
      const info = updateDescriptionsData[uni.name];
      if (info) {
        await query('UPDATE universities SET description = $1, short_code = $2 WHERE id = $3', [info.desc, info.code, uni.id]);
        descCount++;
      }
    }

    return NextResponse.json({ success: true, count, descriptions: descCount });
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: err.message || 'Seed failed' }, { status: 500 });
  }
}
