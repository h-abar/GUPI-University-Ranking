// GUPI Scoring Logic - Configurable via DB (PostgreSQL)
import { query } from './db';

async function getRankingConfigs() {
  const { rows } = await query('SELECT * FROM ranking_configs WHERE active = 1 ORDER BY sort_order');
  return rows;
}

async function getSettings() {
  const { rows } = await query('SELECT key, value FROM settings');
  const settings = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return settings;
}

function isPresent(value) {
  if (value === null || value === undefined) return false;
  const s = String(value).trim();
  if (s === '' || s === 'ـ' || s === '-' || s === 'None' || s === 'null') return false;
  return true;
}

function extractNumber(value) {
  if (value === null || value === undefined) return null;
  const s = String(value).replace(/[^\d]/g, '');
  if (s === '') return null;
  const num = parseInt(s, 10);
  return isNaN(num) ? null : num;
}

function calculateGupiScore(uni, configs = null, settings = null) {
  const maxPresence = parseInt(settings.max_presence_score || '7', 10);
  const maxExcellence = parseInt(settings.max_excellence_score || '3', 10);

  // Presence score
  let presenceScore = 0;
  const presenceDetails = [];
  const presenceConfigs = configs.filter((c) => c.is_presence === 1 || c.is_presence === true);

  for (const config of presenceConfigs) {
    const present = isPresent(uni[config.field_key]);
    const weight = config.presence_weight || 1.0;
    if (present) presenceScore += weight;
    presenceDetails.push({
      label: config.label_ar,
      label_en: config.label_en,
      present,
      weight,
      field: config.field_key,
      category: config.category,
    });
  }
  presenceScore = Math.min(presenceScore, maxPresence);

  // Excellence score
  let excellenceScore = 0;
  const excellenceDetails = [];
  const excellenceConfigs = configs.filter((c) => c.is_excellence === 1 || c.is_excellence === true);

  for (const config of excellenceConfigs) {
    const present = isPresent(uni[config.field_key]);
    const weight = config.excellence_weight || 1.0;
    if (present) excellenceScore += weight;
    excellenceDetails.push({
      label: config.label_ar,
      label_en: config.label_en,
      present,
      weight,
      field: config.field_key,
    });
  }
  excellenceScore = Math.min(excellenceScore, maxExcellence);

  const totalScore = Math.round((presenceScore + excellenceScore) * 100) / 100;

  // Tiebreakers
  const totalPresence = presenceScore;

  let bestTopRanking = Infinity;
  for (const config of excellenceConfigs) {
    if (isPresent(uni[config.field_key])) {
      const num = extractNumber(uni[config.field_key]);
      if (num !== null && num < bestTopRanking) {
        bestTopRanking = num;
      }
    }
  }

  return {
    presenceScore: Math.round(presenceScore * 100) / 100,
    excellenceScore: Math.round(excellenceScore * 100) / 100,
    totalScore,
    maxPresence,
    maxExcellence,
    maxTotal: maxPresence + maxExcellence,
    presenceDetails,
    excellenceDetails,
    totalPresence,
    bestTopRanking: bestTopRanking === Infinity ? null : bestTopRanking,
  };
}

async function rankUniversities(universities, configs = null, settings = null) {
  if (!configs) configs = await getRankingConfigs();
  if (!settings) settings = await getSettings();

  const withScores = universities.map((u) => ({
    ...u,
    gupi: calculateGupiScore(u, configs, settings),
  }));

  withScores.sort((a, b) => {
    if (b.gupi.totalScore !== a.gupi.totalScore) {
      return b.gupi.totalScore - a.gupi.totalScore;
    }
    if (b.gupi.totalPresence !== a.gupi.totalPresence) {
      return b.gupi.totalPresence - a.gupi.totalPresence;
    }
    const aRank = a.gupi.bestTopRanking ?? Infinity;
    const bRank = b.gupi.bestTopRanking ?? Infinity;
    return aRank - bRank;
  });

  let rank = 1;
  for (let i = 0; i < withScores.length; i++) {
    withScores[i].rank = rank++;
  }

  return withScores;
}

export {
  getRankingConfigs,
  getSettings,
  isPresent,
  calculateGupiScore,
  extractNumber,
  rankUniversities,
};
