import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { rankUniversities } from '@/lib/scoring';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { rows } = await query('SELECT * FROM universities ORDER BY id');
  const ranked = await rankUniversities(rows);

  const XLSX = await import('xlsx');

  const headers = [
    'الترتيب', 'اسم الجامعة', 'الدولة', 'تاريخ التأسيس', 'عدد الأبحاث 2025',
    'درجة GUPI', 'الحضور (7)', 'التميز (3)',
    'Shanghai Ranking', 'THE', 'AD Scientific Index', 'QS',
    'Arabic Ranking', 'Scimago', 'CWTS', 'UniRank World',
    'QS Arab', 'THE Arab', 'US News', 'UniRank Arabic',
    'THE Impact', 'UI GreenMetric', 'CWUR', 'ScholarGPS', 'RUR', 'GUV',
  ];

  const dataRows = ranked.map((u) => [
    u.rank, u.name, u.country, u.founded, u.articles_2025,
    u.gupi.totalScore, u.gupi.presenceScore, u.gupi.excellenceScore,
    u.shanghai_ranking, u.the_ranking, u.ad_scientific_index, u.qs_ranking,
    u.arabic_ranking, u.scimago, u.cwts, u.unirank_world,
    u.qs_arab, u.the_arab, u.us_news, u.unirank_arabic,
    u.the_impact, u.ui_greenmetric, u.cwur, u.scholar_gps, u.rur, u.guv,
  ]);

  const data = [headers, ...dataRows];
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'GUPI Rankings');

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

  return new NextResponse(buf, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="GUPI_Rankings_Export.xlsx"',
    },
  });
}
