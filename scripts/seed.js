import { query, ensureSchema } from '../lib/db';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  await ensureSchema();

  // Create default admin
  const { rows: adminRows } = await query('SELECT id FROM admins WHERE username = $1', ['admin']);
  if (adminRows.length === 0) {
    const hash = bcrypt.hashSync('admin123', 10);
    await query('INSERT INTO admins (username, password_hash) VALUES ($1, $2)', ['admin', hash]);
    console.log('Created default admin: admin / admin123');
  }

  // Load seed data
  const seedPath = path.join(__dirname, '..', 'seed_data.json');
  const data = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));

  // Clear existing universities
  await query('DELETE FROM universities');

  const cols = [
    'name', 'founded', 'country', 'articles_2025',
    'shanghai_ranking', 'the_ranking', 'ad_scientific_index', 'qs_ranking',
    'arabic_ranking', 'scimago', 'cwts', 'unirank_world',
    'qs_arab', 'the_arab', 'us_news', 'unirank_arabic',
    'the_impact', 'ui_greenmetric', 'cwur', 'scholar_gps', 'rur', 'guv'
  ];
  const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');

  const headerMap = {
    'اسم الجامعة': 'name',
    'Founded': 'founded',
    'Country': 'country',
    'Articles2025': 'articles_2025',
    'Shanghai Ranking\n2025 ': 'shanghai_ranking',
    'THE  2026': 'the_ranking',
    'AD Scientific Index': 'ad_scientific_index',
    'QS 2027': 'qs_ranking',
    'Arabic  Ranking 2025': 'arabic_ranking',
    'Scimago2026': 'scimago',
    'CWTS  2025': 'cwts',
    'world rank UniRank 2026': 'unirank_world',
    'QS ARAB  2026': 'qs_arab',
    'THE ARAB 2026': 'the_arab',
    "US NewsRanking's2026": 'us_news',
    'UniRank Arabic2026\n2025': 'unirank_arabic',
    'THE IMPACT  2025': 'the_impact',
    'UI GreenMetric ': 'ui_greenmetric',
    'CENTER FOR WORLD UNIVERSITY RANKINGS2026': 'cwur',
    'ScholarGPS  2025 ': 'scholar_gps',
    'Wround ranking RUR': 'rur',
    ' Global University Visibility Rankings (GUV)': 'guv',
  };

  let count = 0;
  for (const row of data) {
    const mapped = {};
    for (const [excelHeader, dbField] of Object.entries(headerMap)) {
      mapped[dbField] = row[excelHeader] ?? null;
    }
    const values = cols.map((c) => mapped[c] || null);
    await query(
      `INSERT INTO universities (${cols.join(', ')}) VALUES (${placeholders})`,
      values
    );
    count++;
  }

  console.log(`Seeded ${count} universities`);
  console.log('Done!');
}

seed().catch(console.error);
