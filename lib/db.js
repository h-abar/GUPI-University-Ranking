import pg from 'pg';

const { Pool } = pg;

let pool = null;

function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (connectionString) {
    pool = new Pool({
      connectionString,
      ssl: process.env.PGSSL === 'true' || connectionString.includes('railway') || connectionString.includes('rlwy')
        ? { rejectUnauthorized: false }
        : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  } else {
    pool = new Pool({
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      database: process.env.PGDATABASE || 'gupi',
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }

  pool.on('error', (err) => {
    console.error('Unexpected PostgreSQL pool error:', err);
  });

  return pool;
}

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS universities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  founded INTEGER,
  country TEXT,
  articles_2025 INTEGER,
  shanghai_ranking TEXT,
  the_ranking TEXT,
  ad_scientific_index TEXT,
  qs_ranking TEXT,
  arabic_ranking TEXT,
  scimago TEXT,
  cwts TEXT,
  unirank_world TEXT,
  qs_arab TEXT,
  the_arab TEXT,
  us_news TEXT,
  unirank_arabic TEXT,
  the_impact TEXT,
  ui_greenmetric TEXT,
  cwur TEXT,
  scholar_gps TEXT,
  rur TEXT,
  guv TEXT,
  description TEXT,
  short_code TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS ranking_configs (
  id SERIAL PRIMARY KEY,
  field_key TEXT UNIQUE NOT NULL,
  label_ar TEXT NOT NULL,
  label_en TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  is_presence INTEGER DEFAULT 0,
  is_excellence INTEGER DEFAULT 0,
  presence_weight REAL DEFAULT 1.0,
  excellence_weight REAL DEFAULT 1.0,
  sort_order INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS pillars (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1
);
`;

const SEED_RANKING_CONFIGS = [
  { field_key: 'shanghai_ranking', label_ar: 'شنغهاي (ARWU)', label_en: 'Shanghai ARWU', category: 'world', is_presence: 1, is_excellence: 1, sort_order: 1 },
  { field_key: 'the_ranking', label_ar: 'التايمز (THE)', label_en: 'THE World', category: 'world', is_presence: 1, is_excellence: 1, sort_order: 2 },
  { field_key: 'ad_scientific_index', label_ar: 'AD Scientific', label_en: 'AD Scientific Index', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 3 },
  { field_key: 'qs_ranking', label_ar: 'كيو إس (QS)', label_en: 'QS World', category: 'world', is_presence: 1, is_excellence: 1, sort_order: 4 },
  { field_key: 'scimago', label_ar: 'Scimago', label_en: 'Scimago', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 5 },
  { field_key: 'cwts', label_ar: 'CWTS', label_en: 'CWTS Leiden', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 6 },
  { field_key: 'unirank_world', label_ar: 'UniRank العالمي', label_en: 'UniRank World', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 7 },
  { field_key: 'arabic_ranking', label_ar: 'Arabic Ranking', label_en: 'Arabic Ranking', category: 'arab', is_presence: 0, is_excellence: 0, sort_order: 8 },
  { field_key: 'qs_arab', label_ar: 'QS العربي', label_en: 'QS Arab', category: 'arab', is_presence: 0, is_excellence: 0, sort_order: 9 },
  { field_key: 'the_arab', label_ar: 'THE العربي', label_en: 'THE Arab', category: 'arab', is_presence: 0, is_excellence: 0, sort_order: 10 },
  { field_key: 'us_news', label_ar: 'US News', label_en: 'US News', category: 'world', is_presence: 0, is_excellence: 0, sort_order: 11 },
  { field_key: 'unirank_arabic', label_ar: 'UniRank العربي', label_en: 'UniRank Arabic', category: 'arab', is_presence: 0, is_excellence: 0, sort_order: 12 },
  { field_key: 'the_impact', label_ar: 'THE Impact', label_en: 'THE Impact', category: 'impact', is_presence: 0, is_excellence: 0, sort_order: 13 },
  { field_key: 'ui_greenmetric', label_ar: 'UI GreenMetric', label_en: 'UI GreenMetric', category: 'special', is_presence: 0, is_excellence: 0, sort_order: 14 },
  { field_key: 'cwur', label_ar: 'CWUR', label_en: 'CWUR', category: 'world', is_presence: 0, is_excellence: 0, sort_order: 15 },
  { field_key: 'scholar_gps', label_ar: 'ScholarGPS', label_en: 'ScholarGPS', category: 'world', is_presence: 0, is_excellence: 0, sort_order: 16 },
  { field_key: 'rur', label_ar: 'RUR', label_en: 'Round University Ranking', category: 'world', is_presence: 0, is_excellence: 0, sort_order: 17 },
  { field_key: 'guv', label_ar: 'GUV', label_en: 'Global University Visibility', category: 'world', is_presence: 0, is_excellence: 0, sort_order: 18 },
];

const SEED_SETTINGS = [
  { key: 'index_title', value: 'مؤشر الحضور العالمي للجامعات' },
  { key: 'index_short', value: 'GUPI' },
  { key: 'index_year', value: '2027' },
  { key: 'max_presence_score', value: '7' },
  { key: 'max_excellence_score', value: '3' },
  { key: 'max_total_score', value: '10' },
  { key: 'sample_size', value: '70' },
  { key: 'tiebreaker_1', value: 'total_presence' },
  { key: 'tiebreaker_2', value: 'best_top_ranking' },
];

let initialized = false;

async function ensureSchema() {
  if (initialized) return;
  const p = getPool();
  await p.query(SCHEMA_SQL);

  // Seed default ranking configs if empty
  const { rows } = await p.query('SELECT COUNT(*) as c FROM ranking_configs');
  if (parseInt(rows[0].c) === 0) {
    for (const d of SEED_RANKING_CONFIGS) {
      await p.query(
        'INSERT INTO ranking_configs (field_key, label_ar, label_en, category, is_presence, is_excellence, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [d.field_key, d.label_ar, d.label_en, d.category, d.is_presence, d.is_excellence, d.sort_order]
      );
    }
  }

  // Seed default settings if empty
  const { rows: sRows } = await p.query('SELECT COUNT(*) as c FROM settings');
  if (parseInt(sRows[0].c) === 0) {
    for (const s of SEED_SETTINGS) {
      await p.query('INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING', [s.key, s.value]);
    }
  }

  initialized = true;
}

// Wrapper that ensures schema on first call
async function query(text, params) {
  await ensureSchema();
  return getPool().query(text, params);
}

export { getPool, query, ensureSchema };
