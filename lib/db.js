import pg from 'pg';
import bcrypt from 'bcryptjs';

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
  shanghai_excellence INTEGER,
  the_ranking TEXT,
  the_excellence INTEGER,
  ad_scientific_index TEXT,
  ad_scientific_excellence INTEGER,
  qs_ranking TEXT,
  qs_excellence INTEGER,
  arabic_ranking TEXT,
  arabic_ranking_excellence INTEGER,
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

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value TEXT,
  label TEXT,
  section TEXT DEFAULT 'home',
  type TEXT DEFAULT 'text',
  sort_order INTEGER DEFAULT 0
);

-- Add excellence columns if they don't exist (for existing databases)
ALTER TABLE universities ADD COLUMN IF NOT EXISTS shanghai_excellence INTEGER;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS the_excellence INTEGER;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS ad_scientific_excellence INTEGER;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS qs_excellence INTEGER;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS arabic_ranking_excellence INTEGER;
`;

const SEED_RANKING_CONFIGS = [
  { field_key: 'shanghai_ranking', label_ar: 'شنغهاي (ARWU)', label_en: 'Shanghai ARWU', category: 'world', is_presence: 1, is_excellence: 1, sort_order: 1 },
  { field_key: 'the_ranking', label_ar: 'التايمز (THE)', label_en: 'THE World', category: 'world', is_presence: 1, is_excellence: 1, sort_order: 2 },
  { field_key: 'ad_scientific_index', label_ar: 'AD Scientific', label_en: 'AD Scientific Index', category: 'world', is_presence: 1, is_excellence: 1, sort_order: 3 },
  { field_key: 'qs_ranking', label_ar: 'كيو إس (QS)', label_en: 'QS World', category: 'world', is_presence: 1, is_excellence: 1, sort_order: 4 },
  { field_key: 'scimago', label_ar: 'Scimago', label_en: 'Scimago', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 5 },
  { field_key: 'cwts', label_ar: 'CWTS', label_en: 'CWTS Leiden', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 6 },
  { field_key: 'unirank_world', label_ar: 'UniRank العالمي', label_en: 'UniRank World', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 7 },
  { field_key: 'arabic_ranking', label_ar: 'Arabic Ranking', label_en: 'Arabic Ranking', category: 'arab', is_presence: 1, is_excellence: 1, sort_order: 8 },
  { field_key: 'qs_arab', label_ar: 'QS العربي', label_en: 'QS Arab', category: 'arab', is_presence: 1, is_excellence: 0, sort_order: 9 },
  { field_key: 'the_arab', label_ar: 'THE العربي', label_en: 'THE Arab', category: 'arab', is_presence: 1, is_excellence: 0, sort_order: 10 },
  { field_key: 'us_news', label_ar: 'US News', label_en: 'US News', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 11 },
  { field_key: 'unirank_arabic', label_ar: 'UniRank العربي', label_en: 'UniRank Arabic', category: 'arab', is_presence: 1, is_excellence: 0, sort_order: 12 },
  { field_key: 'the_impact', label_ar: 'THE Impact', label_en: 'THE Impact', category: 'impact', is_presence: 1, is_excellence: 0, sort_order: 13 },
  { field_key: 'ui_greenmetric', label_ar: 'UI GreenMetric', label_en: 'UI GreenMetric', category: 'special', is_presence: 1, is_excellence: 0, sort_order: 14 },
  { field_key: 'cwur', label_ar: 'CWUR', label_en: 'CWUR', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 15 },
  { field_key: 'scholar_gps', label_ar: 'ScholarGPS', label_en: 'ScholarGPS', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 16 },
  { field_key: 'rur', label_ar: 'RUR', label_en: 'Round University Ranking', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 17 },
  { field_key: 'guv', label_ar: 'GUV', label_en: 'Global University Visibility', category: 'world', is_presence: 1, is_excellence: 0, sort_order: 18 },
];

const SEED_SETTINGS = [
  { key: 'index_title', value: 'مؤشر الحضور العالمي للجامعات' },
  { key: 'index_short', value: 'GUPI' },
  { key: 'index_year', value: '2027' },
  { key: 'max_presence_score', value: '18' },
  { key: 'max_excellence_score', value: '5' },
  { key: 'max_total_score', value: '100' },
  { key: 'presence_total_weight', value: '70' },
  { key: 'excellence_total_weight', value: '30' },
  { key: 'sample_size', value: '70' },
  { key: 'tiebreaker_1', value: 'total_presence' },
  { key: 'tiebreaker_2', value: 'best_top_ranking' },
];

const SEED_SITE_CONTENT = [
  // Hero section
  { key: 'hero_badge', value: 'Global University Presence Index • 2027', label: 'شارة الهيرو (إنجليزي)', section: 'hero', type: 'text', sort_order: 1 },
  { key: 'hero_title', value: 'مؤشر الحضور العالمي للجامعات (GUPI)', label: 'العنوان الرئيسي', section: 'hero', type: 'text', sort_order: 2 },
  { key: 'hero_subtitle', value: 'التميز يُقاس بالحضور العالمي', label: 'العنوان الفرعي', section: 'hero', type: 'text', sort_order: 3 },
  { key: 'hero_description', value: 'مؤشر رائد عربي متخصص في قياس وتقييم الظهور الدولي للجامعات، معتمدة على منهجية حديثة فائقة التنسيق عبر 18 تصنيفاً عالمياً تدمج بين منهجية علمية مستقلة وتقنيات الذكاء الاصطناعي.', label: 'وصف الهيرو', section: 'hero', type: 'textarea', sort_order: 4 },
  { key: 'hero_cta1', value: 'استكشف ترتيب الجامعات', label: 'زر الإجراء الأول', section: 'hero', type: 'text', sort_order: 5 },
  { key: 'hero_cta2', value: 'لوحة البيانات التفاعلية', label: 'زر الإجراء الثاني', section: 'hero', type: 'text', sort_order: 6 },
  // Stats
  { key: 'stat_universities', value: '70', label: 'عدد الجامعات', section: 'stats', type: 'number', sort_order: 10 },
  { key: 'stat_universities_label', value: 'جامعة عربية نُخبة', label: 'وصف عدد الجامعات', section: 'stats', type: 'text', sort_order: 11 },
  { key: 'stat_rankings', value: '18', label: 'عدد التصنيفات', section: 'stats', type: 'number', sort_order: 12 },
  { key: 'stat_rankings_label', value: 'تصنيفاً عالمياً', label: 'وصف عدد التصنيفات', section: 'stats', type: 'text', sort_order: 13 },
  { key: 'stat_excellence', value: '5', label: 'تصنيفات التميز', section: 'stats', type: 'number', sort_order: 14 },
  { key: 'stat_excellence_label', value: 'تصنيفات كبرى للتميز', label: 'وصف تصنيفات التميز', section: 'stats', type: 'text', sort_order: 15 },
  { key: 'stat_total', value: '100', label: 'الدرجة الكلية', section: 'stats', type: 'number', sort_order: 16 },
  { key: 'stat_total_label', value: 'الدرجة الكلية للمؤشر', label: 'وصف الدرجة الكلية', section: 'stats', type: 'text', sort_order: 17 },
  // Vision section
  { key: 'vision_eyebrow', value: 'الرؤية العامة والمنهجية', label: 'عنوان فرعي للقسم', section: 'vision', type: 'text', sort_order: 20 },
  { key: 'vision_title', value: 'منصة نخبة الجامعات العربية', label: 'عنوان قسم الرؤية', section: 'vision', type: 'text', sort_order: 21 },
  { key: 'vision_subtitle', value: '«نخبة الجامعات العربية – TOP A University» منصة رقمية مستقلة تركز على الجامعات العربية في فضاء التصنيفات العالمية، وتقدّم محتوى تحليلياً مبسطاً يساعد الطالب وصانع القرار والمهتم بالتعليم العالي على قراءة الأرقام والتقارير بلغة واضحة وعصرية. نحن نؤمن أن الوصول إلى معلومة تصنيفية موثوقة ومنسقة هو الخطوة الأولى نحو قرار أكاديمي أفضل.', label: 'وصف الرؤية', section: 'vision', type: 'textarea', sort_order: 22 },
  { key: 'vision_mission', value: 'تهدف منصة نخبة الجامعات العربية عبر GUPI إلى إنشاء مؤشر عالمي عربي متخصص في قياس وتقييم حضور الجامعات، معتمدة على منهجية حديثة فائقة التنسيق تدمج بين:', label: 'نص الرسالة', section: 'vision', type: 'textarea', sort_order: 23 },
  // Vision pillars
  { key: 'pillar1_title', value: 'البيانات الأكاديمية', label: 'المحور 1', section: 'vision_pillars', type: 'text', sort_order: 30 },
  { key: 'pillar1_desc', value: 'تحليل شامل للبيانات الأكاديمية الموثقة', label: 'وصف المحور 1', section: 'vision_pillars', type: 'text', sort_order: 31 },
  { key: 'pillar2_title', value: 'التحليل الرقمي', label: 'المحور 2', section: 'vision_pillars', type: 'text', sort_order: 32 },
  { key: 'pillar2_desc', value: 'أدوات تحليل رقمي متقدمة لقياس الأداء', label: 'وصف المحور 2', section: 'vision_pillars', type: 'text', sort_order: 33 },
  { key: 'pillar3_title', value: 'الذكاء الاصطناعي', label: 'المحور 3', section: 'vision_pillars', type: 'text', sort_order: 34 },
  { key: 'pillar3_desc', value: 'توظيف تقنيات الذكاء الاصطناعي في التقييم', label: 'وصف المحور 3', section: 'vision_pillars', type: 'text', sort_order: 35 },
  { key: 'pillar4_title', value: 'اللوحات التفاعلية', label: 'المحور 4', section: 'vision_pillars', type: 'text', sort_order: 36 },
  { key: 'pillar4_desc', value: 'لوحات بيانات تفاعلية لعرض النتائج', label: 'وصف المحور 4', section: 'vision_pillars', type: 'text', sort_order: 37 },
  // Independence section
  { key: 'independence_title', value: 'استقلالية وحياد تام', label: 'عنوان الاستقلالية', section: 'independence', type: 'text', sort_order: 40 },
  { key: 'independence_text', value: 'نحن مستقلون تمامًا عن الجامعات العربية وعن الجهات المالكة للتصنيفات العالمية. لا نمثّل أي تصنيف دولي، ولا نعمل لصالح جامعة بعينها، ولا نقدم خدمات ترويج مدفوعة تتعارض مع الحياد.', label: 'نص الاستقلالية', section: 'independence', type: 'textarea', sort_order: 41 },
  // Formula section
  { key: 'formula_eyebrow', value: 'منهج المؤشر', label: 'عنوان فرعي للمعادلة', section: 'formula', type: 'text', sort_order: 50 },
  { key: 'formula_title', value: 'معادلة مؤشر الحضور العالمي', label: 'عنوان المعادلة', section: 'formula', type: 'text', sort_order: 51 },
  { key: 'formula_subtitle', value: 'إطار كمي معياري مستقل — حضور دولي عبر 18 تصنيفاً، وتميز أكاديمي عبر 5 تصنيفات كبرى', label: 'وصف المعادلة', section: 'formula', type: 'textarea', sort_order: 52 },
  // CTA section
  { key: 'cta_eyebrow', value: 'GUPI 2027', label: 'شارة الختام', section: 'cta', type: 'text', sort_order: 60 },
  { key: 'cta_title', value: 'لأفضل 70 جامعة عربية', label: 'عنوان الختام', section: 'cta', type: 'text', sort_order: 61 },
  { key: 'cta_subtitle', value: 'اكتشف أحدث ترتيب واستكشف مواقع المؤسسات التعليمية ضمن الإطار القياسي الشامل', label: 'وصف الختام', section: 'cta', type: 'textarea', sort_order: 62 },
  { key: 'cta_button', value: 'اكتشف ترتيب الجامعات الآن', label: 'زر الختام', section: 'cta', type: 'text', sort_order: 63 },
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
  } else {
    // Update existing configs with new is_excellence values
    for (const d of SEED_RANKING_CONFIGS) {
      await p.query(
        'UPDATE ranking_configs SET is_presence = $1, is_excellence = $2 WHERE field_key = $3',
        [d.is_presence, d.is_excellence, d.field_key]
      );
    }
  }

  // Seed or update settings
  const { rows: sRows } = await p.query('SELECT COUNT(*) as c FROM settings');
  if (parseInt(sRows[0].c) === 0) {
    for (const s of SEED_SETTINGS) {
      await p.query('INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING', [s.key, s.value]);
    }
  } else {
    // Update existing settings with new values
    for (const s of SEED_SETTINGS) {
      await p.query('INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value', [s.key, s.value]);
    }
  }

  // Seed site_content
  for (const c of SEED_SITE_CONTENT) {
    await p.query(
      'INSERT INTO site_content (key, value, label, section, type, sort_order) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (key) DO UPDATE SET label = EXCLUDED.label, section = EXCLUDED.section, type = EXCLUDED.type, sort_order = EXCLUDED.sort_order',
      [c.key, c.value, c.label, c.section, c.type, c.sort_order]
    );
  }

  // Create or update default admin
  const ADMIN_EMAIL = 'abulayeth@gmail.com';
  const ADMIN_PASSWORD = 'Gupi$ecure2026!Adm1n';
  const { rows: aRows } = await p.query('SELECT id FROM admins WHERE username = $1', ['admin']);
  if (aRows.length > 0) {
    // Update old admin to new email + password
    const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);
    await p.query('UPDATE admins SET username = $1, password_hash = $2 WHERE id = $3', [ADMIN_EMAIL, hash, aRows[0].id]);
  } else {
    const { rows: eRows } = await p.query('SELECT COUNT(*) as c FROM admins WHERE username = $1', [ADMIN_EMAIL]);
    if (parseInt(eRows[0].c) === 0) {
      const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);
      await p.query('INSERT INTO admins (username, password_hash) VALUES ($1, $2)', [ADMIN_EMAIL, hash]);
    }
  }

  initialized = true;
}

// Wrapper that ensures schema on first call
async function query(text, params) {
  await ensureSchema();
  return getPool().query(text, params);
}

export { getPool, query, ensureSchema, SEED_SITE_CONTENT };
